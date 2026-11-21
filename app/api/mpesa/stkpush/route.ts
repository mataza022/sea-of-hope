import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, amount, donationId } = await req.json();

    const key = process.env.MPESA_CONSUMER_KEY!;
    const secret = process.env.MPESA_CONSUMER_SECRET!;
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const callbackUrl = process.env.MPESA_CALLBACK_URL!;

    if (!key || !secret || !shortcode || !passkey || !callbackUrl) {
      throw new Error("Missing MPESA_* env vars — check .env.local");
    }

    const baseUrl = "https://sandbox.safaricom.co.ke";
    const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

    const authRes = await fetch(
      `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: { Authorization: `Basic ${credentials}`, Accept: "application/json" },
        cache: "no-store",
      }
    );
    const authData = await authRes.json();
    if (!authRes.ok) {
      console.error("Auth Error:", authData);
      throw new Error(
        `Safaricom Auth Failed (${authRes.status}): ${authData.errorMessage || authData.error || "unknown"}`
      );
    }

    const token = authData.access_token;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
    const formattedPhone = String(phone).replace(/\D/g, "").replace(/^0/, "254");
    const shortRef = String(donationId || "SOH").slice(0, 12);

    const res = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.max(1, Math.round(amount)),
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: shortRef,
        TransactionDesc: "Sea of Hope Donation",
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("STK Error Response:", text);
      throw new Error(`STK push failed (${res.status}): ${text}`);
    }
    const data = JSON.parse(text);

    return NextResponse.json({
      success: true,
      CheckoutRequestID: data.CheckoutRequestID,
      CustomerMessage: data.CustomerMessage,
    });
  } catch (error: any) {
    console.error("🚨 M-Pesa STK Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
