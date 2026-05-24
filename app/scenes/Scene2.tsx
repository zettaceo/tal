"use client";
import { useState, useEffect } from "react";
import { GuardSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

const TORCHES = [120, 340, 560, 780, 1000, 1180];

export default function Scene2({ onDone }: { onDone: () => void }) {
  const [guardX, setGuardX] = useState(-80);

  useEffect(() => {
    const start = Date.now();
    const duration = 3200;
    const target = 560;
    function tick() {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      setGuardX(-80 + t * (target + 80));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>

      {/* Floor */}
      <div style={{ position:"absolute", inset:0, background:"#2A2030" }} />

      {/* Stone floor tiles */}
      {Array.from({length:20},(_,col)=>Array.from({length:6},(_,row)=>(
        <div key={`${col}-${row}`} style={{
          position:"absolute",
          left: col*64, top: 480+row*50,
          width:63, height:49,
          border:"1px solid #1A1020",
          background: (col+row)%2===0?"#2E2438":"#262032",
        }} />
      )))}

      {/* Ceiling */}
      <div style={{ position:"absolute", top:0, left:0, width:"100%", height:120, background:"linear-gradient(180deg,#1A1228 0%,#221830 100%)" }} />

      {/* Stone arch perspective left wall */}
      <div style={{ position:"absolute", top:0, left:0, width:60, height:"100%", background:"linear-gradient(90deg,#1A1228,#2A2038)" }} />
      {/* Right wall */}
      <div style={{ position:"absolute", top:0, right:0, width:60, height:"100%", background:"linear-gradient(270deg,#1A1228,#2A2038)" }} />

      {/* Banners on wall */}
      {[160,420,680,940,1160].map((x,i)=>(
        <div key={i} style={{ position:"absolute", top:80, left:x }}>
          <div style={{ width:6, height:30, background:"#6A5030" }} />
          <div className="animate-flag" style={{ width:36, height:55, background: i%2===0?"#8030B0":"#B03030", marginTop:-2 }}>
            <div style={{ position:"absolute", top:12, left:6, width:24, height:14, background:"rgba(255,200,0,0.4)", borderRadius:2 }} />
          </div>
        </div>
      ))}

      {/* Torches with glow */}
      {TORCHES.map((x,i)=>(
        <div key={i} style={{ position:"absolute", top:200, left:x }}>
          {/* Glow */}
          <div className="animate-torch" style={{
            position:"absolute", top:-20, left:-25,
            width:60, height:80,
            background:"radial-gradient(circle,rgba(255,160,50,0.35) 0%,transparent 70%)",
          }} />
          {/* Bracket */}
          <div style={{ width:4, height:20, background:"#706050" }} />
          {/* Torch body */}
          <div style={{ width:10, height:16, background:"#8A6030", marginLeft:-3 }} />
          {/* Flame */}
          <div className="animate-torch" style={{ position:"absolute", top:-16, left:-2, width:14, height:20, background:"#FF8800", borderRadius:"60% 60% 40% 40%", opacity:0.9 }} />
          <div className="animate-torch" style={{ position:"absolute", top:-22, left:1, width:8, height:14, background:"#FFDD00", borderRadius:"50%", opacity:0.8, animationDelay:"0.15s" }} />

          {/* Floor light pool */}
          <div style={{
            position:"absolute", top:480, left:-30,
            width:80, height:30,
            background:"radial-gradient(ellipse,rgba(255,140,40,0.25) 0%,transparent 70%)",
          }} />
        </div>
      ))}

      {/* Corridor depth lines (perspective) */}
      {[1,2,3,4].map(i=>(
        <div key={i} style={{
          position:"absolute",
          top:0, left:`${i*20}%`,
          width:1, height:"100%",
          background:`rgba(0,0,0,${0.1+i*0.04})`,
        }} />
      ))}

      {/* Walking Guard */}
      <div style={{
        position:"absolute",
        bottom:230,
        left: guardX,
        transition:"none",
        imageRendering:"pixelated",
      }}>
        <GuardSprite scale={3} walking={true} />
      </div>

      {/* Ambient floor glow from torches */}
      <div style={{
        position:"absolute", bottom:0, left:0, width:"100%", height:260,
        background:"linear-gradient(0deg,rgba(30,15,50,0.9),transparent)",
        pointerEvents:"none",
      }} />

      <DialogBox
        speaker="SEGURANÇA"
        text={"Devo chegar logo à sala do trono..."}
        onDone={onDone}
        speed={50}
      />
    </div>
  );
}
