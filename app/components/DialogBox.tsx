"use client";
import { useState, useEffect, useRef } from "react";

interface DialogBoxProps {
  speaker?: string;
  text: string;
  onDone?: () => void;
  speed?: number;
}

export default function DialogBox({ speaker, text, onDone, speed = 38 }: DialogBoxProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    setDone(false);

    function type() {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
        timer.current = setTimeout(type, speed);
      } else {
        setDone(true);
        if (onDone) setTimeout(onDone, 1400);
      }
    }

    timer.current = setTimeout(type, speed);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, speed, onDone]);

  const handleClick = () => {
    if (!done) {
      if (timer.current) clearTimeout(timer.current);
      setDisplayed(text);
      setDone(true);
      if (onDone) setTimeout(onDone, 800);
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div
      className="animate-dialog"
      onClick={handleClick}
      style={{
        position: "absolute",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: 700,
        background: "linear-gradient(180deg,#0a1a4a 0%,#06103a 100%)",
        border: "3px solid #4488FF",
        boxShadow: "0 0 0 1px #002288, inset 0 0 0 1px #2255AA",
        borderRadius: 0,
        padding: "10px 14px 10px 14px",
        cursor: "pointer",
        zIndex: 100,
        imageRendering: "pixelated",
      }}
    >
      {speaker && (
        <div style={{
          position: "absolute",
          top: -14,
          left: 12,
          background: "#0a1a4a",
          border: "2px solid #4488FF",
          padding: "1px 8px",
          color: "#FFD700",
          fontSize: 9,
          fontFamily: "'Press Start 2P', monospace",
          letterSpacing: 1,
        }}>
          {speaker}
        </div>
      )}
      <div style={{
        color: "#FFFFFF",
        fontSize: 8,
        fontFamily: "'Press Start 2P', monospace",
        lineHeight: "1.9",
        minHeight: 48,
        whiteSpace: "pre-wrap",
        letterSpacing: 0.5,
      }}>
        {displayed}
        {done && (
          <span style={{
            display: "inline-block",
            width: 7,
            height: 7,
            background: "#FFD700",
            marginLeft: 3,
            animation: "cursor-blink 0.7s step-end infinite",
          }} />
        )}
      </div>
    </div>
  );
}
