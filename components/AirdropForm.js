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

  // Task States for all 4 specific requirements
  const [tasks, setTasks] = useState({
    twitterFoot: false,
    telegramHunter: false,
    twitterGekko: false,
    twitterKasogon: false,
  });

  const referrer = searchParams.get('ref');

  // Helper to handle task clicks
  const completeTask = (taskName, url) => {
    window.open(url, '_blank');
    setTasks(prev => ({ ...prev, [taskName]: true }));
  };

  // Logic to ensure all 4 tasks are clicked
  const allTasksDone = 
    tasks.twitterFoot && 
    tasks.telegramHunter && 
    tasks.twitterGekko && 
    tasks.twitterKasogon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!allTasksDone) {
      return alert("You must complete all 4 tasks to unlock your allocation!");
    }
    
    if (!wallet || !email) return alert("Hunters need a wallet and email!");
    
    setLoading(true);
    setStatus("");

    try {
      const userRef = doc(db, "hunters", wallet.toLowerCase().trim());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setStatus("You're already in the hunt!");
        setRefLink(`${window.location.origin}?ref=${wallet.toLowerCase().trim()}`);
      } else {
        await setDoc(userRef, {
          wallet: wallet.toLowerCase().trim(),
          email: email.trim(),
          referredBy: referrer ? referrer.toLowerCase().trim() : "direct",
          referrals: 0,
          tasksCompleted: true,
          timestamp: new Date()
        });

        if (referrer && referrer.toLowerCase().trim() !== wallet.toLowerCase().trim()) {
          const referrerRef = doc(db, "hunters", referrer.toLowerCase().trim());
          const refSnap = await getDoc(referrerRef);
          if (refSnap.exists()) {
            await updateDoc(referrerRef, { referrals: increment(1) });
          }
        }

        setStatus("Successfully joined the pack!");
        setRefLink(`${window.location.origin}?ref=${wallet.toLowerCase().trim()}`);
      }
    } catch (err) {
      console.error("FIREBASE ERROR:", err);
      setStatus("The forest connection failed. Try again.");
    } finally {
      setLoading(false);
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
            <h2 className="text-xl font-black text-white uppercase tracking-tight italic">Join the Hunt</h2>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Complete 4 tasks to unlock 50M $FOOT</p>
          </div>

          {/* Social Task Checklist Section */}
          <div className="space-y-3 bg-emerald-950/50 p-4 rounded-2xl border border-emerald-800">
            <h3 className="text-[10px] font-black text-lime-400 uppercase mb-2 tracking-widest">Required Steps</h3>
            
            {/* Task 1: FootBig92126 */}
            <button 
              type="button"
              onClick={() => completeTask('twitterFoot', 'https://x.com/FootBig92126')}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${tasks.twitterFoot ? 'border-lime-500 bg-lime-500/10' : 'border-emerald-700 bg-emerald-900 hover:border-emerald-500'}`}
            >
              <span className="text-xs font-bold text-white">Follow @FootBig92126</span>
              {tasks.twitterFoot ? <span className="text-lime-400 font-bold">✓</span> : <span className="bg-emerald-800 px-2 py-1 rounded text-[9px] font-bold text-emerald-400 uppercase">Follow</span>}
            </button>

            {/* Task 2: Telegram */}
            <button 
              type="button"
              onClick={() => completeTask('telegramHunter', 'https://t.me/bigfoothunterai')}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${tasks.telegramHunter ? 'border-lime-500 bg-lime-500/10' : 'border-emerald-700 bg-emerald-900 hover:border-emerald-500'}`}
            >
              <span className="text-xs font-bold text-white">Join Telegram Group</span>
              {tasks.telegramHunter ? <span className="text-lime-400 font-bold">✓</span> : <span className="bg-emerald-800 px-2 py-1 rounded text-[9px] font-bold text-emerald-400 uppercase">Join</span>}
            </button>

            {/* Task 3: GordonGekko */}
            <button 
              type="button"
              onClick={() => completeTask('twitterGekko', 'https://x.com/GordonGekko')}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${tasks.twitterGekko ? 'border-lime-500 bg-lime-500/10' : 'border-emerald-700 bg-emerald-900 hover:border-emerald-500'}`}
            >
              <span className="text-xs font-bold text-white">Follow @GordonGekko</span>
              {tasks.twitterGekko ? <span className="text-lime-400 font-bold">✓</span> : <span className="bg-emerald-800 px-2 py-1 rounded text-[9px] font-bold text-emerald-400 uppercase">Follow</span>}
            </button>

            {/* Task 4: Cryptokasogon */}
            <button 
              type="button"
              onClick={() => completeTask('twitterKasogon', 'https://x.com/Cryptokasogon')}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${tasks.twitterKasogon ? 'border-lime-500 bg-lime-500/10' : 'border-emerald-700 bg-emerald-900 hover:border-emerald-500'}`}
            >
              <span className="text-xs font-bold text-white">Follow @Cryptokasogon</span>
              {tasks.twitterKasogon ? <span className="text-lime-400 font-bold">✓</span> : <span className="bg-emerald-800 px-2 py-1 rounded text-[9px] font-bold text-emerald-400 uppercase">Follow</span>}
            </button>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-[10px] font-black text-emerald-500 mb-1 ml-1 uppercase">Solana Wallet Address</label>
              <input 
                required
                className="w-full bg-emerald-950 border border-emerald-800 p-4 rounded-xl text-white focus:border-lime-400 outline-none text-sm transition-all"
                placeholder="0x... or Solana Address"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-emerald-500 mb-1 ml-1 uppercase">Contact Email</label>
              <input 
                required
                type="email"
                className="w-full bg-emerald-950 border border-emerald-800 p-4 rounded-xl text-white focus:border-lime-400 outline-none text-sm transition-all"
                placeholder="hunter@forest.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={loading || !allTasksDone}
            className="w-full bg-lime-400 text-emerald-950 font-black py-4 rounded-xl hover:bg-lime-300 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale shadow-[0_0_20px_rgba(163,230,53,0.3)] uppercase tracking-tighter"
          >
            {loading ? "REGISTERING..." : allTasksDone ? "CLAIM 50M AIRDROP" : "FINISH TASKS TO UNLOCK"}
          </button>

          {status && (
            <p className="text-center text-xs font-bold text-lime-400 uppercase animate-pulse italic">{status}</p>
          )}
        </form>
      ) : (
        <ReferralBox link={refLink} />
      )}
    </div>
  );
}