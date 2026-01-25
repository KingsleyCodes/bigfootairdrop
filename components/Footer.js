export default function Footer() {
  return (
    <footer className="w-full py-10 px-4 mt-10 border-t border-emerald-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-emerald-500 text-sm">© 2026 Big Foot Crypto. All rights reserved.</p>
          <p className="text-xs text-emerald-700 mt-1">Total Pool: 50,000,000 $FOOT</p>
        </div>
        <div className="flex gap-6 text-sm font-bold text-emerald-500">
          <a href="#" className="hover:text-lime-400 transition-colors">TOKENOMICS</a>
          <a href="#" className="hover:text-lime-400 transition-colors">RULES</a>
          <a href="#" className="hover:text-lime-400 transition-colors">CONTACT</a>
        </div>
      </div>
    </footer>
  );
}