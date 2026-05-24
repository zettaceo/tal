"use client";
import { useState, useEffect } from "react";
import { GuardSprite, PrincessSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

export default function Scene4({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [guardX, setGuardX] = useState(-100);

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;
    const target = 380;
    function tick() {
      const t = Math.min((Date.now() - start) / duration, 1);
      setGuardX(-100 + t * (target + 100));
      if (t < 1) requestAnimationFrame(tick);
      else setStep(1);
    }
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>
      {/* Reuse throne room bg */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#1A0C30 0%,#2A1848 40%,#1E1038 100%)" }} />

      {/* Columns */}
      {[60, 220, 1020, 1180].map((x,i)=>(
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

      {/* Throne platform */}
      <div style={{ position:"absolute", bottom:140, left:"50%", transform:"translateX(-50%)", width:260, height:24, background:"#C09020" }} />
      <div style={{ position:"absolute", bottom:160, left:"50%", transform:"translateX(-50%)", width:230, height:16, background:"#E0B030" }} />

      {/* Throne SVG */}
      <div style={{ position:"absolute", bottom:164, left:"50%", transform:"translateX(-50%)" }}>
        <svg width={160} height={200} viewBox="0 0 160 200" style={{ imageRendering:"pixelated" }}>
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

      {/* Princess */}
      <div style={{ position:"absolute", bottom:258, left:"50%", transform:"translateX(-50%) translateX(-10px)", imageRendering:"pixelated" }}>
        <PrincessSprite scale={3} />
      </div>

      {/* Walking guard */}
      <div style={{ position:"absolute", bottom:195, left: guardX, imageRendering:"pixelated" }}>
        <GuardSprite scale={3} walking={guardX < 360} kneeling={step===1} />
      </div>

      {step === 0 && (
        <DialogBox speaker="SEGURANÇA" text={"Com sua licença, princesa."} speed={55} />
      )}
      {step === 1 && (
        <DialogBox
          speaker="PRINCESA TAL"
          text={"Erga-se e diga o que deseja."}
          onDone={onDone}
          speed={50}
        />
      )}
    </div>
  );
}
