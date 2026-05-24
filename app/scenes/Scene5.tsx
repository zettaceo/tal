"use client";
import { useState, useEffect, useCallback } from "react";
import { GuardSprite, PrincessSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

const NUMBERS = ["1...","2...","3...","4...","5...","6...","7...","8...","9...","10..."];

export default function Scene5({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"counting" | "ask" | "princess">("counting");
  const [shownNums, setShownNums] = useState<number[]>([]);
  const [askDone, setAskDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setShownNums(prev => [...prev, i]);
      i++;
      if (i >= NUMBERS.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("ask"), 600);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleAskDone = useCallback(() => setPhase("princess"), []);
  const handlePrincessDone = useCallback(() => onDone(), [onDone]);

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>
      {/* BG */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#1A0C30 0%,#2A1848 40%,#1E1038 100%)" }} />

      {/* Columns */}
      {[60,220,1020,1180].map((x,i)=>(
        <div key={i} style={{ position:"absolute", bottom:0, left:x }}>
          <div style={{ width:50, height:20, background:"#8070A0", borderRadius:"4px 4px 0 0" }} />
          <div style={{ width:36, height:480, background:"linear-gradient(90deg,#4A3870,#6A5898,#4A3870)", marginLeft:7 }} />
          <div style={{ width:54, height:16, background:"#5A4888", marginLeft:-2 }} />
        </div>
      ))}

      {/* Carpet */}
      <div style={{ position:"absolute", bottom:0, left:"35%", width:"30%", height:"100%", background:"linear-gradient(90deg,transparent,#8A1020 8%,#A01828 50%,#8A1020 92%,transparent)" }} />

      {/* Floor */}
      {Array.from({length:10},(_,col)=>Array.from({length:5},(_,row)=>(
        <div key={`${col}-${row}`} style={{
          position:"absolute", left:col*128, top:560+row*40,
          width:127, height:39,
          border:"1px solid #2A1848",
          background:(col+row)%2===0?"#3A2858":"#2E2050",
        }} />
      )))}

      {/* Guard */}
      <div style={{ position:"absolute", bottom:195, left:300, imageRendering:"pixelated" }}>
        <GuardSprite scale={3} />
      </div>

      {/* Princess (right side) */}
      <div style={{ position:"absolute", bottom:260, right:220, imageRendering:"pixelated" }}>
        <PrincessSprite scale={3} happy={askDone} />
      </div>

      {/* Floating numbers */}
      <div style={{ position:"absolute", top:80, left:"50%", transform:"translateX(-50%)", width:600, display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
        {shownNums.map(n => (
          <div key={n} style={{
            fontFamily:"'Press Start 2P', monospace",
            fontSize: 28,
            color: ["#FF4444","#FF8800","#FFDD00","#44FF44","#44AAFF","#AA44FF","#FF44AA","#FF6644","#44FFCC","#FFFFFF"][n],
            textShadow:"3px 3px 0 #000, -1px -1px 0 #000",
            animation:"number-pop 0.35s ease-out both",
            animationDelay:`${n*0.05}s`,
          }}>
            {NUMBERS[n]}
          </div>
        ))}
      </div>

      {/* Dialog */}
      {phase === "ask" && (
        <DialogBox
          speaker="SEGURANÇA"
          text={"Até que número eu contei, princesa?"}
          onDone={handleAskDone}
          speed={45}
        />
      )}
      {phase === "princess" && (
        <DialogBox
          speaker="PRINCESA TAL"
          text={"Até 10, seu bobo."}
          onDone={handlePrincessDone}
          speed={50}
        />
      )}
    </div>
  );
}
