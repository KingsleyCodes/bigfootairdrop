"use client";
import { useState } from 'react';

export default function ReferralBox({ link }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-emerald-900 border-2 border-lime-400 p-6 rounded-3xl text-center">
      <h3 className="text-xl font-bold mb-2">Welcome to the Pack! 👣</h3>
      <p className="text-sm text-emerald-300 mb-4">Share your link to earn a bigger share of the 50M pool:</p>
      <div className="relative group">
        <input 
          readOnly 
          value={link} 
          className="w-full bg-emerald-950 p-4 rounded-xl text-xs font-mono text-lime-400 border border-emerald-700"
        />
        <button 
          onClick={copy}
          className="mt-4 w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition-colors"
        >
          {copied ? "COPIED!" : "COPY LINK"}
        </button>
      </div>
      <p className="text-[10px] mt-4 text-emerald-500 italic">Refer more = Earn more.</p>
    </div>
  );
}