import Link from 'next/link';

export default function Header() {
  return (
    <nav className="w-full py-6 px-4 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-6">
      
      {/* Brand / Logo Only */}
      <Link href="/" className="hover:scale-105 transition-transform duration-300">
        <img 
          src="/logo.png" 
          alt="Big Foot Official Logo" 
          // h-14 for mobile, md:h-20 for desktop (approx 80px)
          className="h-14 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]" 
        />
      </Link>

      {/* Social Links Section */}
      <div className="flex gap-8 items-center">
        {/* X (Twitter) Link */}
        <a 
          href="https://x.com/FootBig92126" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-lime-400 transition-colors font-bold text-xs md:text-sm tracking-widest uppercase border-b-2 border-transparent hover:border-lime-400 pb-1"
        >
          Follow X
        </a>

        {/* Telegram Link */}
        <a 
          href="https://t.me/bigfoothunterai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-lime-400 text-emerald-950 px-6 py-2.5 rounded-full font-black text-xs md:text-sm hover:bg-lime-300 hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transition-all active:scale-95 uppercase"
        >
          Join Telegram
        </a>
      </div>
    </nav>
  );
}