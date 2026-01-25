"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import ReferralBox from './ReferralBox';

export default function AirdropForm() {
  const searchParams = useSearchParams();
  const [wallet, setWallet] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [refLink, setRefLink] = useState("");

  const referrer = searchParams.get('ref');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet || !email) return alert("Hunters need a wallet and email!");
    
    setLoading(true);
    setStatus("");

    try {
      console.log("Connecting to the forest..."); // Debug log
      const userRef = doc(db, "hunters", wallet.toLowerCase().trim());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setStatus("You're already in the hunt!");
        setRefLink(`${window.location.origin}?ref=${wallet.toLowerCase().trim()}`);
      } else {
        // Register new user
        await setDoc(userRef, {
          wallet: wallet.toLowerCase().trim(),
          email: email.trim(),
          referredBy: referrer ? referrer.toLowerCase().trim() : "direct",
          referrals: 0,
          timestamp: new Date()
        });

        // Credit the referrer if one exists
        if (referrer && referrer.toLowerCase().trim() !== wallet.toLowerCase().trim()) {
          const referrerRef = doc(db, "hunters", referrer.toLowerCase().trim());
          const refSnap = await getDoc(referrerRef);
          if (refSnap.exists()) {
            await updateDoc(referrerRef, { referrals: increment(1) });
          }
        }

        setStatus("Successfully joined!");
        setRefLink(`${window.location.origin}?ref=${wallet.toLowerCase().trim()}`);
      }
    } catch (err) {
      console.error("FIREBASE ERROR:", err); // This will print the EXACT error now
      setStatus("Connection error. Check console.");
    } finally {
      setLoading(false); // This ensures the button stops saying "Registering"
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {!refLink ? (
        <form 
          onSubmit={handleSubmit} 
          className="bg-emerald-900/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-emerald-700 shadow-2xl space-y-5"
        >
          <div className="text-center mb-2">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Join the Hunt</h2>
            <p className="text-xs text-emerald-400 font-bold uppercase">Enter your details for the 50M pool</p>
          </div>

          <div>
            <label className="block text-[10px] font-black text-emerald-500 mb-1 ml-1 uppercase tracking-widest">
              Wallet Address
            </label>
            <input 
              required
              className="w-full bg-emerald-950 border border-emerald-800 p-4 rounded-xl text-white focus:border-lime-400 outline-none transition-all placeholder:text-emerald-800"
              placeholder="0x... or Solana Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-emerald-500 mb-1 ml-1 uppercase tracking-widest">
              Email Address
            </label>
            <input 
              required
              type="email"
              className="w-full bg-emerald-950 border border-emerald-800 p-4 rounded-xl text-white focus:border-lime-400 outline-none transition-all placeholder:text-emerald-800"
              placeholder="hunter@forest.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-lime-400 text-emerald-950 font-black py-4 rounded-xl hover:bg-lime-300 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(163,230,53,0.2)]"
          >
            {loading ? "REGISTERING..." : "CLAIM 50M AIRDROP"}
          </button>

          {status && (
            <div className="bg-emerald-950/50 py-2 px-4 rounded-lg border border-emerald-800">
              <p className="text-center text-xs font-bold text-lime-400 uppercase tracking-tighter">
                {status}
              </p>
            </div>
          )}
        </form>
      ) : (
        <ReferralBox link={refLink} />
      )}
    </div>
  );
}