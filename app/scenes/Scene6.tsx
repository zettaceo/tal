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
      <div style={{ position:"absolute", bottom:160, left:320, imageRendering:"pixelated" }}>
        <GuardSprite scale={4} />
      </div>

      {/* Princess on throne (right) */}
      <ThroneStructure6 />
      <div style={{ position:"absolute", bottom:268, right:340, imageRendering:"pixelated" }}>
        <PrincessSprite scale={3.5} happy={phase==="princess"} />
      </div>

      {/* Hearts floating up from princess */}
      {phase === "princess" && hearts.map(h => (
        <div key={h.id} style={{
          position:"absolute",
          bottom: 380,
          right: 340 + (h.x % 60),
          animation:`float-heart 1.8s ease-out ${h.delay}s forwards`,
          imageRendering:"pixelated",
          zIndex: 50,
        }}>
          <PixelHeart size={h.size} color={["#FF4488","#FF88AA","#FF2266"][Math.floor(h.x)%3]} />
        </div>
      ))}

      {phase === "guard" && (
        <DialogBox
          speaker="SEGURANÇA"
          text={"Viu? Isso significa que você sempre pode contar comigo."}
          onDone={handleGuardDone}
          speed={65}
        />
      )}
      {phase === "princess" && (
        <DialogBox
          speaker="PRINCESA TAL"
          text={"Tudo bem… muito obrigada.\nEra só isso?"}
          onDone={onDone}
          speed={68}
        />
      )}
    </div>
  );
}

function ThroneStructure6() {
  return (
    <>
      <div style={{ position:"absolute", bottom:160, right:280, width:280, height:16, background:"#C09020" }} />
      <div style={{ position:"absolute", bottom:160, right:295, width:250, height:8, background:"#E0B030" }} />
      <div style={{ position:"absolute", bottom:176, right:320 }}>
        <svg width={200} height={250} viewBox="0 0 160 200" style={{ imageRendering:"pixelated" }}>
          <rect x="20" y="120" width="120" height="24" fill="#8A5010" />
          <rect x="18" y="118" width="124" height="6" fill="#C07020" />
          <rect x="20" y="20" width="120" height="102" fill="#6A3808" />
          <rect x="18" y="18" width="124" height="104" fill="none" stroke="#C07020" strokeWidth={3} />
          <rect x="10" y="8" width="140" height="16" fill="#8A5010" rx="4" />
          <rect x="40" y="0" width="80" height="16" fill="#C07020" rx="4" />
          <rect x="60" y="28" width="40" height="30" fill="#C09020" rx="2" />
          <rect x="28" y="122" width="104" height="18" fill="#9B1A3A" />
          <rect x="30" y="124" width="100" height="14" fill="#C02048" />
          <rect x="16" y="100" width="20" height="44" fill="#7A4008" />
          <rect x="124" y="100" width="20" height="44" fill="#7A4008" />
          <rect x="22" y="144" width="14" height="40" fill="#5A3006" />
          <rect x="124" y="144" width="14" height="40" fill="#5A3006" />
        </svg>
      </div>
    </>
  );
}
