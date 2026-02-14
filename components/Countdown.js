"use client";
import { useState, useEffect } from 'react';

export default function Countdown() {
  // Initialize with 0s to avoid flickering or "jumping" numbers on initial load
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    /** * FIXED TARGET DATE: February 14th, 2026
     * Note: JavaScript months are 0-indexed (0 = January, 1 = February).
     * This sets the target to Feb 14, 2026, at 00:00:00 (Midnight).
     */
    const targetDate = new Date(2026, 1, 16, 0, 0, 0).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        // If the date has passed, stop the timer at zero
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        // Calculate remaining time based on the fixed target
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    // Clean up interval when the component is destroyed to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  // Internal Helper Component for the stylized countdown boxes
  const Card = ({ label, value }) => (
    <div className="flex flex-col items-center bg-emerald-900/40 border border-emerald-800 p-4 rounded-xl min-w-[80px] backdrop-blur-sm shadow-lg">
      <span className="text-3xl font-black text-lime-400 tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase text-emerald-500 font-bold tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center my-8 scale-90 md:scale-100 relative z-20">
      <Card label="Days" value={timeLeft.days} />
      <Card label="Hours" value={timeLeft.hours} />
      <Card label="Mins" value={timeLeft.minutes} />
      <Card label="Secs" value={timeLeft.seconds} />
    </div>
  );
}