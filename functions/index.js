const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { Resend } = require("resend");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

setGlobalOptions({ region: "africa-south1" });
admin.initializeApp();
const db = admin.firestore();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "markmataza061@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

// ---------- Helpers ----------
function normalizePhone(input) {
  const d = String(input || "").replace(/\D/g, "");
  if (d.startsWith("254") && d.length === 12) return d;
  if (d.startsWith("0") && d.length === 10) return "254" + d.slice(1);
  if ((d.startsWith("7") || d.startsWith("1")) && d.length === 9) return "254" + d;
  return null;
}

// ============ EXISTING TRIGGERS ============
exports.onHelpRequest = onDocumentCreated(
  { document: "help_requests/{docId}" },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;
    const resend = new Resend(process.env.RESEND_KEY);
    const emoji = data.urgency === "emergency" ? "🚨" : data.urgency === "urgent" ? "⚠️" : "📋";
    try {
      await resend.emails.send({
        from: `Sea of Hope <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `${emoji} New Help Request — ${data.urgency.toUpperCase()}`,
        html: `<h2>New Help Request</h2><p><b>Name:</b> ${data.name || "Anonymous"}</p><p><b>Phone:</b> ${data.phone}</p>`,
      });
    } catch (e) { console.error("Error:", e); }
  }
);

exports.onContactMessage = onDocumentCreated(
  { document: "contact_messages/{docId}" },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;
    const resend = new Resend(process.env.RESEND_KEY);
    try {
      await resend.emails.send({
        from: `Sea of Hope <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        replyTo: data.email,
        subject: `New Contact — ${data.subject}`,
        html: `<h2>New Contact Message</h2><p><b>From:</b> ${data.name} &lt;${data.email}&gt;</p><p>${data.message}</p>`,
      });
    } catch (e) { console.error("Error:", e); }
  }
);

// Renamed subject — this fires on every pledge (pending)
exports.onDonation = onDocumentCreated(
  { document: "donations/{docId}" },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;
    const resend = new Resend(process.env.RESEND_KEY);
    const symbol = data.currency === "USD" ? "$" : "KSh";
    try {
      await resend.emails.send({
        from: `Sea of Hope <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        replyTo: data.donorEmail,
        subject: `New Donation Pledge — ${symbol} ${data.amount?.toLocaleString()}`,
        html: `<h2>New Donation Pledge (pending payment)</h2>
          <p><b>Amount:</b> ${symbol} ${data.amount?.toLocaleString()}</p>
          <p><b>Method:</b> ${data.paymentMethod || "unknown"}</p>
          <p><b>Frequency:</b> ${data.frequency}</p>
          <p><b>Donor:</b> ${data.donorName} &lt;${data.donorEmail}&gt;</p>`,
      });
    } catch (e) { console.error("Error:", e); }
  }
);

// NEW — fires only when payment actually succeeds
exports.onDonationCompleted = onDocumentUpdated(
  { document: "donations/{docId}" },
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) return;
    if (before.status === "completed" || after.status !== "completed") return;

    const resend = new Resend(process.env.RESEND_KEY);
    const symbol = after.currency === "USD" ? "$" : "KSh";
    try {
      await resend.emails.send({
        from: `Sea of Hope <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        replyTo: after.donorEmail,
        subject: `✅ Payment Confirmed — ${symbol} ${after.amount?.toLocaleString()}`,
        html: `<h2>Payment Confirmed</h2>
          <p><b>Amount:</b> ${symbol} ${after.amount?.toLocaleString()}</p>
          <p><b>Method:</b> ${after.paymentMethod}</p>
          <p><b>Donor:</b> ${after.donorName} &lt;${after.donorEmail}&gt;</p>
          <p><b>Reference:</b> ${after.mpesaReceipt || after.stripePaymentIntentId || "—"}</p>`,
      });
    } catch (e) { console.error("Error:", e); }
  }
);

// ============ RATE LIMITER (db now declared above) ============
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

exports.checkRateLimit = onCall({ region: "africa-south1" }, async (request) => {
  const ip = request.rawRequest?.ip ||
    request.rawRequest?.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const docRef = db.collection("rate_limits").doc(ip);
  try {
    return await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      const data = doc.exists ? doc.data() : { requests: [], blockedUntil: null };
      if (data.blockedUntil && data.blockedUntil > now) {
        const min = Math.ceil((data.blockedUntil - now) / 60000);
        throw new HttpsError("resource-exhausted", `Too many submissions. Try again in ${min} minute(s).`);
      }
      const recent = (data.requests || []).filter((t) => t > windowStart);
      if (recent.length >= RATE_LIMIT_MAX) {
        const blockedUntil = now + RATE_LIMIT_WINDOW_MS;
        transaction.set(docRef, { requests: recent, blockedUntil });
        throw new HttpsError("resource-exhausted", "Too many submissions. Try again in 1 hour.");
      }
      recent.push(now);
      transaction.set(docRef, { requests: recent, blockedUntil: null });
      return { success: true, remaining: RATE_LIMIT_MAX - recent.length };
    });
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    return { success: true, remaining: RATE_LIMIT_MAX };
  }
});

// ============ M-PESA STK PUSH ============
exports.initiateMpesa = onCall({ region: "africa-south1" }, async (request) => {
  const { amount, phone, name, email, purpose, frequency } = request.data || {};
  if (!amount || amount < 10) throw new HttpsError("invalid-argument", "Minimum donation is KES 10");
  const phoneNorm = normalizePhone(phone);
  if (!phoneNorm) throw new HttpsError("invalid-argument", "Invalid Kenyan phone number");

  const docRef = await db.collection("donations").add({
    amount, currency: "KES", frequency, purpose,
    donorName: name || "", donorEmail: email || "", donorPhone: phoneNorm,
    paymentMethod: "mpesa", status: "pending",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  const apiRef = `SOH-${docRef.id}`;
  try {
    const res = await fetch("https://api.intasend.com/api/v1/payment/mpesa-stk-push/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INTASEND_SECRET_KEY}`,
      },
      body: JSON.stringify({ amount, phone_number: phoneNorm, api_ref: apiRef, currency: "KES", narrative: `Sea of Hope - ${purpose}` }),
    });
    const data = await res.json();
    if (!res.ok) {
      await docRef.update({ status: "failed", errorMessage: data?.detail || "STK failed" });
      throw new HttpsError("internal", data?.detail || "M-Pesa request failed");
    }
    await docRef.update({ intasendInvoiceId: data.invoice?.invoice_id, apiRef });
    return { donationId: docRef.id, invoiceId: data.invoice?.invoice_id };
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    await docRef.update({ status: "failed", errorMessage: err.message });
    throw new HttpsError("internal", err.message);
  }
});

// ============ STRIPE PAYMENT INTENT ============
exports.createStripeIntent = onCall({ region: "africa-south1" }, async (request) => {
  const { amount, name, email, purpose, frequency } = request.data || {};
  if (!amount || amount < 1) throw new HttpsError("invalid-argument", "Invalid amount");

  const docRef = await db.collection("donations").add({
    amount, currency: "USD", frequency, purpose,
    donorName: name || "", donorEmail: email || "", donorPhone: null,
    paymentMethod: "stripe", status: "pending",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: { donationId: docRef.id, purpose: purpose || "", frequency: frequency || "" },
    });
    await docRef.update({ stripePaymentIntentId: intent.id });
    return { donationId: docRef.id, clientSecret: intent.client_secret };
  } catch (err) {
    await docRef.update({ status: "failed", errorMessage: err.message });
    throw new HttpsError("internal", err.message);
  }
});

// ============ INTASEND WEBHOOK ============
exports.intasendWebhook = onRequest({ region: "africa-south1" }, async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  const { api_ref, state, invoice_id, mpesa_receipt } = req.body || {};
  if (!api_ref || !state) return res.status(400).send("Bad request");
  if (!api_ref.startsWith("SOH-")) return res.status(400).send("Unknown ref");

  const donationId = api_ref.slice(4);
  const docRef = db.collection("donations").doc(donationId);
  const doc = await docRef.get();
  if (!doc.exists) return res.status(404).send("Not found");
  if (doc.data().status === "completed") return res.status(200).send("Already completed");

  if (state === "COMPLETE" || state === "SUCCESS") {
    await docRef.update({
      status: "completed",
      mpesaReceipt: mpesa_receipt || invoice_id || "",
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else if (state === "FAILED") {
    await docRef.update({ status: "failed", errorMessage: "M-Pesa payment failed" });
  }
  return res.status(200).send("ok");
});

// ============ STRIPE WEBHOOK ============
exports.stripeWebhook = onRequest({ region: "africa-south1" }, async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const donationId = intent.metadata?.donationId;
    if (donationId) {
      await db.collection("donations").doc(donationId).update({
        status: "completed",
        stripeChargeId: intent.latest_charge,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  } else if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object;
    const donationId = intent.metadata?.donationId;
    if (donationId) {
      await db.collection("donations").doc(donationId).update({
        status: "failed",
        errorMessage: intent.last_payment_error?.message || "Payment failed",
      });
    }
  }
  return res.status(200).json({ received: true });
});
