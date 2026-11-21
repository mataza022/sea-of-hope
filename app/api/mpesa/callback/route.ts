import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore, collection, query, where, getDocs, updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function POST(req: Request) {
  try {
    const rawText = await req.text();
    
    // Safeguard against empty bodies
    if (!rawText || rawText.trim() === "") {
      console.warn("⚠️ Received empty callback body — ignoring.");
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const body = JSON.parse(rawText);
    console.log("M-Pesa Callback:", JSON.stringify(body, null, 2));

    const cb = body.Body?.stkCallback;
    if (!cb) {
      console.warn("No stkCallback in body");
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const checkoutRequestId = cb.CheckoutRequestID;
    if (!checkoutRequestId) {
      console.warn("No CheckoutRequestID in callback");
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const q = query(
      collection(db, "donations"),
      where("checkoutRequestId", "==", checkoutRequestId)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      console.warn("No donation for CheckoutRequestID:", checkoutRequestId);
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const docRef = snap.docs[0].ref;

    if (cb.ResultCode === 0) {
      const items = cb.CallbackMetadata?.Item || [];
      const receipt = items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
      await updateDoc(docRef, {
        status: "completed",
        mpesaReceipt: receipt || "",
        completedAt: new Date().toISOString(),
      });
      console.log(`✅ Payment confirmed — receipt ${receipt}`);
    } else {
      await updateDoc(docRef, {
        status: "failed",
        errorMessage: cb.ResultDesc || "Payment failed",
      });
      console.log(`❌ Payment failed — ${cb.ResultDesc}`);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error: any) {
    console.error("Callback Error:", error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 });
  }
}
