"use client";
import { useState, useEffect, useCallback } from "react";
import { GuardSprite, PrincessSprite, PixelHeart } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

interface FloatingHeart { id: number; x: number; delay: number; size: number }

export default function Scene6({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"guard" | "princess">("guard");
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const handleGuardDone = useCallback(() => setPhase("princess"), []);

  useEffect(() => {
    if (phase !== "princess") return;
    const spawnHearts = () => {
      setHearts(prev => [
        ...prev.slice(-12),
        { id: Date.now(), x: 30 + Math.random() * 60, delay: Math.random() * 0.3, size: 12 + Math.random() * 16 },
      ]);
    };
    const interval = setInterval(spawnHearts, 380);
    return () => clearInterval(interval);
  }, [phase]);

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
      <div style={{ position:"absolute", bottom:0, left:"35%", width:8, height:"100%", background:"#C09020" }} />
      <div style={{ position:"absolute", bottom:0, right:"35%", width:8, height:"100%", background:"#C09020" }} />

      {/* Floor */}
      {Array.from({length:10},(_,col)=>Array.from({length:5},(_,row)=>(
        <div key={`${col}-${row}`} style={{
          position:"absolute", left:col*128, top:560+row*40,
          width:127, height:39,
          border:"1px solid #2A1848",
          background:(col+row)%2===0?"#3A2858":"#2E2050",
        }} />
      )))}

      {/* Guard left */}
      <div style={{ position:"absolute", bottom:195, left:280, imageRendering:"pixelated" }}>
        <GuardSprite scale={3} />
      </div>

      {/* Princess right - hearts floating above */}
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", bottom:195, right:200, imageRendering:"pixelated" }}>
          <PrincessSprite scale={3} happy={phase==="princess"} />
        </div>

        {/* Hearts */}
        {phase === "princess" && hearts.map(h => (
          <div key={h.id} style={{
            position:"absolute",
            bottom: 360,
            right: h.x + 180,
            animation:`float-heart 1.6s ease-out ${h.delay}s forwards`,
            imageRendering:"pixelated",
          }}>
            <PixelHeart size={h.size} color={["#FF4488","#FF88AA","#FF2266"][Math.floor(h.x)%3]} />
          </div>
        ))}
      </div>

      {phase === "guard" && (
        <DialogBox
          speaker="SEGURANÇA"
          text={"Viu? Isso significa que você sempre pode contar comigo."}
          onDone={handleGuardDone}
          speed={42}
        />
      )}
      {phase === "princess" && (
        <DialogBox
          speaker="PRINCESA TAL"
          text={"Tudo bem… muito obrigada.\nEra só isso?"}
          onDone={onDone}
          speed={45}
        />
      )}
    </div>
  );
}
