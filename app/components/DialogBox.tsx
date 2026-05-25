"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { music } from "../lib/music";

interface Props {
  speaker?: string;
  text: string;
  onDone?: () => void;
  speed?: number;
  blipEvery?: number;
}

export default function DialogBox({ speaker, text, onDone, speed = 60, blipEvery = 3 }: Props) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const idx = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    idx.current = 0;
    setShown("");
    setDone(false);
    function type() {
      if (idx.current < text.length) {
        const ch = text[idx.current];
        setShown(text.slice(0, idx.current + 1));
        if (ch && ch !== " " && ch !== "\n" && idx.current % blipEvery === 0) {
          music.blip(420 + (idx.current % 6) * 40, 0.04, "square", 0.12);
        }
        idx.current++;
        timer.current = setTimeout(type, speed);
      } else {
        setDone(true);
      }
    }
    timer.current = setTimeout(type, speed);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, speed, blipEvery]);

  function advance() {
    music.unlock();
    if (!done) {
      if (timer.current) clearTimeout(timer.current);
      setShown(text);
      setDone(true);
      music.blip(520, 0.06, "square", 0.18);
    } else {
      music.blip(660, 0.08, "square", 0.18);
      if (onDone) onDone();
    }
  }

  if (!mounted) return null;

  const content = (
    <div
      onClick={advance}
      onTouchStart={advance}
      style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        padding: "0 12px 12px 12px",
        zIndex: 9999,
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div className="dialog-in" style={{
        margin: "0 auto",
        maxWidth: 900,
        background: "linear-gradient(180deg,#05083C 0%,#020526 100%)",
        border: "4px solid #3F66E8",
        outline: "2px solid #0A1366",
        outlineOffset: -8,
        borderRadius: 6,
        padding: "16px 20px 18px 20px",
        position: "relative",
        boxShadow: "0 0 0 2px #000, 0 -4px 24px rgba(0,0,0,0.7)",
      }}>
        {/* Speaker tab */}
        {speaker && (
          <div style={{
            position: "absolute",
            top: -22, left: 18,
            background: "#1A33CC",
            border: "3px solid #3F66E8",
            borderBottom: "none",
            borderRadius: "4px 4px 0 0",
            padding: "4px 14px 2px 14px",
            fontFamily: "var(--font-pixel,monospace)",
            fontSize: 12,
            color: "#FFFFFF",
            letterSpacing: 2,
            textShadow: "2px 2px 0 #000",
          }}>
            {speaker}
          </div>
        )}

        {/* Text */}
        <div style={{
          fontFamily: "var(--font-pixel,monospace)",
          fontSize: 14,
          color: "#FFFFFF",
          lineHeight: 1.9,
          minHeight: 72,
          whiteSpace: "pre-wrap",
          letterSpacing: 0.4,
          textShadow: "2px 2px 0 rgba(0,0,0,0.85)",
        }}>
          {shown}
        </div>

        {/* Arrow indicator */}
        {done && (
          <div style={{
            position: "absolute",
            bottom: 8, right: 16,
            fontFamily: "var(--font-pixel,monospace)",
            fontSize: 14, color: "#7FB3FF",
            animation: "cursor-blink 0.7s step-end infinite",
            textShadow: "1px 1px 0 #000",
          }}>
            ▼
          </div>
        )}

        {/* Hint */}
        {!done && (
          <div style={{
            position: "absolute",
            bottom: 6, right: 16,
            fontFamily: "var(--font-pixel,monospace)",
            fontSize: 7, color: "rgba(150,180,255,0.5)",
            letterSpacing: 1,
          }}>
            TOQUE
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
