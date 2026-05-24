"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  speaker?: string;
  text: string;
  onDone?: () => void;
  speed?: number;
}

export default function DialogBox({ speaker, text, onDone, speed = 36 }: Props) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    idx.current = 0;
    setShown("");
    setDone(false);
    function type() {
      if (idx.current < text.length) {
        setShown(text.slice(0, idx.current + 1));
        idx.current++;
        timer.current = setTimeout(type, speed);
      } else {
        setDone(true);
        if (onDone) setTimeout(onDone, 1600);
      }
    }
    timer.current = setTimeout(type, speed);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, speed, onDone]);

  function skip() {
    if (!done) {
      if (timer.current) clearTimeout(timer.current);
      setShown(text);
      setDone(true);
      if (onDone) setTimeout(onDone, 800);
    } else {
      if (onDone) onDone();
    }
  }

  return (
    <div
      className="dialog-in"
      onClick={skip}
      style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: "0 20px 18px 20px",
        cursor: "pointer",
        zIndex: 100,
        userSelect: "none",
      }}
    >
      <div style={{
        background: "rgba(4,6,28,0.97)",
        border: "3px solid #3366EE",
        outline: "1px solid #1133AA",
        borderRadius: 4,
        padding: "10px 16px 12px 16px",
        position: "relative",
        boxShadow: "0 0 0 1px #0A0A3A, inset 0 0 40px rgba(10,10,80,0.6)",
      }}>
        {/* Speaker name tab */}
        {speaker && (
          <div style={{
            position: "absolute",
            top: -17, left: 14,
            background: "#1133BB",
            border: "3px solid #3366EE",
            borderBottom: "none",
            borderRadius: "3px 3px 0 0",
            padding: "2px 10px 0 10px",
            fontFamily: "var(--font-pixel, monospace)",
            fontSize: 9,
            color: "#FFFFFF",
            letterSpacing: 1,
            lineHeight: 1.8,
          }}>
            {speaker}
          </div>
        )}

        {/* Text */}
        <div style={{
          fontFamily: "var(--font-pixel, monospace)",
          fontSize: 11,
          color: "#FFFFFF",
          lineHeight: 2.0,
          minHeight: 56,
          whiteSpace: "pre-wrap",
          letterSpacing: 0.3,
          textShadow: "1px 1px 0 rgba(0,0,0,0.8)",
        }}>
          {shown}
        </div>

        {/* Arrow */}
        {done && (
          <div style={{
            position: "absolute",
            bottom: 8, right: 12,
            fontFamily: "var(--font-pixel, monospace)",
            fontSize: 10, color: "#AACCFF",
            animation: "cursor-blink 0.8s step-end infinite",
          }}>
            ▼
          </div>
        )}
      </div>
    </div>
  );
}
