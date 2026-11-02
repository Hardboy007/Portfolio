"use client";

import { useEffect, useState } from "react";

const SHORTCUTS = [
  {
    key: "G",
    label: "GitHub",
    action: () => window.open("https://github.com/Hardboy007", "_blank"),
  },
  {
    key: "L",
    label: "LinkedIn",
    action: () =>
      window.open(
        "https://www.linkedin.com/in/hardik-srivastava033/",
        "_blank",
      ),
  },
  {
    key: "R",
    label: "Resume",
    action: () =>
      window.open(
        "https://drive.google.com/file/d/1cnMchFarxvXxXSopvSlNlnfznB8lBmW9/view?usp=drive_link",
        "_blank",
      ),
  },
  {
    key: "E",
    label: "Email",
    action: () => (window.location.href = "mailto:hardik77.aman@gmail.com"),
  },
];

export default function KeyboardShortcuts() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "?") {
        setVisible((v) => !v);
        return;
      }

      SHORTCUTS.forEach(({ key, action }) => {
        if (e.key.toUpperCase() === key) action();
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* hint */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40 font-mono text-[11px] text-paper-dim border border-line bg-ink-soft/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
        press <span className="text-signal">?</span> for shortcuts
      </div>

      {/* modal */}
      {visible && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-ink/80 backdrop-blur-md"
          onClick={() => setVisible(false)}
        >
          <div className="rounded-2xl border border-line bg-ink-soft p-8 w-full max-w-sm shadow-2xl">
            <p className="font-mono text-xs tracking-widest text-signal mb-6">
              KEYBOARD SHORTCUTS
            </p>
            <div className="space-y-4">
              {SHORTCUTS.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="font-mono text-sm text-paper-dim">
                    {label}
                  </span>
                  <kbd className="font-mono text-xs text-signal border border-signal/40 bg-ink px-3 py-1 rounded-lg">
                    {key}
                  </kbd>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-line">
                <span className="font-mono text-sm text-paper-dim">
                  Toggle this
                </span>
                <kbd className="font-mono text-xs text-signal border border-signal/40 bg-ink px-3 py-1 rounded-lg">
                  ?
                </kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
