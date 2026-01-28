import { Suspense } from 'react'; // Added Suspense import
import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import AirdropForm from '@/components/AirdropForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-950 text-white selection:bg-lime-400">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('/forest-bg.webp')] bg-cover bg-center" />
      
      <Header />

      <main className="relative z-10 flex flex-col items-center px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-block animate-bounce mb-2">
            <span className="text-6xl">👣</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Big Foot <span className="text-lime-400">Airdrop</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-200 font-medium max-w-2xl mx-auto leading-relaxed">
            The legend is real. Join the hunt and claim your share of 
            <span className="text-lime-400 font-bold px-2">50,000,000 $FOOT</span> tokens.
          </p>
        </div>

        {/* Action Section */}
        <section className="w-full mt-12 flex flex-col items-center">
          <Countdown />
          
          {/* Suspense Boundary wrapping AirdropForm to prevent Next.js Build Error */}
          <Suspense fallback={
            <div className="w-full max-w-md bg-emerald-900/50 p-12 rounded-3xl border border-emerald-800 text-center">
              <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lime-400 font-black text-xs tracking-widest uppercase animate-pulse">
                Entering the Forest...
              </p>
            </div>
          }>
            <AirdropForm />
          </Suspense>
        </section>

        {/* Information Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-24">
          <InfoCard 
            title="Refer & Earn" 
            desc="Every friend you refer increases your multiplier in the 50000 Big Foot Tokens."
          />
          <InfoCard 
            title="Wallet Based" 
            desc="No passwords. Use your Solana address to track your hunt."
          />
          <InfoCard 
            title="Fair Launch" 
            desc="Top hunters and active participants get the largest allocations at TGE."
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Simple internal helper component
function InfoCard({ title, desc }) {
  return (
    <div className="bg-emerald-900/30 border border-emerald-800 p-8 rounded-2xl hover:border-lime-500/50 transition-colors">
      <h3 className="text-lime-400 font-black text-xl mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-emerald-100/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}