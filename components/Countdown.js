"use client";
import { useState, useEffect } from 'react';

export default function Countdown() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    // Set a target date 30 days from now for demo
    setDays(30);
  }, []);

  const Card = ({ label, value }) => (
    <div className="flex flex-col items-center bg-emerald-900/40 border border-emerald-800 p-4 rounded-xl min-w-[80px]">
      <span className="text-3xl font-black text-lime-400">{value}</span>
      <span className="text-[10px] uppercase text-emerald-500 font-bold">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-4 justify-center my-8">
      <Card label="Days" value={days} />
      <Card label="Hours" value="23" />
      <Card label="Mins" value="59" />
    </div>
  );
}