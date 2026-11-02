"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 md:px-16 py-2 border-b border-line bg-ink/80 backdrop-blur-sm font-mono text-[10px] md:text-[11px] text-paper-dim">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          available for work
        </span>
        <span className="hidden md:block opacity-40">|</span>
        <span className="hidden md:block">hardik77.aman@gmail.com</span>
        <span className="hidden md:block">mob: 9548415772</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block">IST {time}</span>
        <span className="opacity-40">Dehradun, IN</span>
      </div>
    </div>
  );
}