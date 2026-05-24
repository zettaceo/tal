"use client";
import { useState, useEffect } from "react";
import { GuardSprite, PrincessSprite } from "../components/Sprites";

const STARS9 = Array.from({length:70},(_, i)=>({
  x:(i*131.3)%100, y:(i*67.7)%85,
  size:i%4===0?3:i%3===0?2:1,
  dur:1.4+(i%5)*0.4,
}));

interface Firework { id:number; x:number; y:number; color:string; particles:number }
const FW_COLORS = ["#FF4444","#FF8800","#FFDD00","#44FF44","#44AAFF","#FF44CC","#FFFFFF","#AA44FF"];

export default function Scene9({ onDone }: { onDone: () => void }) {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let count = 0;
    function spawnFW() {
      const fw: Firework = {
        id: Date.now() + Math.random(),
        x: 15 + Math.random() * 70,
        y: 10 + Math.random() * 40,
        color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
        particles: 8 + Math.floor(Math.random() * 6),
      };
      setFireworks(prev => [...prev.slice(-10), fw]);
      count++;
    }
    spawnFW();
    const interval = setInterval(spawnFW, 700);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setFade(true);
      setTimeout(onDone, 1200);
    }, 7000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [onDone]);

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>

      {/* Night sky */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#040214 0%,#0A0428 35%,#100838 65%,#1A0C40 100%)" }} />

      {STARS9.map((s,i)=>(
        <div key={i} className="animate-twinkle" style={{
          position:"absolute",
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size,
          background:i%6===0?"#FFEEAA":i%5===0?"#AADDFF":"#FFFFFF",
          imageRendering:"pixelated",
          "--dur":`${s.dur}s`,
        } as React.CSSProperties} />
      ))}

      {/* Moon */}
      <div className="animate-moon" style={{
        position:"absolute", top:30, right:120,
        width:90, height:90,
        background:"radial-gradient(circle at 38% 38%,#FFFFF0,#FFF8C0 55%,#E8D880)",
        borderRadius:"50%",
        boxShadow:"0 0 30px 15px rgba(255,240,180,0.45),0 0 70px 35px rgba(255,240,180,0.2)",
      }} />

      {/* Horizon glow */}
      <div style={{ position:"absolute", bottom:160, left:0, width:"100%", height:80, background:"linear-gradient(0deg,rgba(30,60,120,0.4),transparent)" }} />

      {/* Castle rooftop platform */}
      <div style={{ position:"absolute", bottom:140, left:"50%", transform:"translateX(-50%)", width:600, height:30, background:"#505060" }} />
      <div style={{ position:"absolute", bottom:130, left:"50%", transform:"translateX(-50%)", width:640, height:12, background:"#606070" }} />
      {/* battlements */}
      {Array.from({length:12},(_,i)=>(
        <div key={i} style={{ position:"absolute", bottom:168, left:`calc(50% - 300px + ${i*52}px)`, width:36, height:32, background:"#505060" }} />
      ))}

      {/* Stone wall below platform */}
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:640, height:142, background:"linear-gradient(180deg,#484858 0%,#3A3848 100%)" }} />
      {/* Wall stones */}
      {Array.from({length:6},(_,row)=>Array.from({length:8},(_,col)=>(
        <div key={`${row}-${col}`} style={{
          position:"absolute",
          bottom:row*24, left:`calc(50% - 320px + ${col*80 + (row%2===0?0:40)}px)`,
          width:78, height:22,
          border:"1px solid #2A2838",
        }} />
      )))}

      {/* Distant cityscape / hills */}
      {[
        {left:-40,w:200,h:100,color:"#1A1A2A"},
        {left:150,w:250,h:80,color:"#151525"},
        {left:380,w:300,h:110,color:"#1E1E30"},
        {left:700,w:260,h:90,color:"#161626"},
        {left:950,w:280,h:105,color:"#1A1A2A"},
        {left:1150,w:200,h:80,color:"#151525"},
      ].map((h2,i)=>(
        <div key={i} style={{
          position:"absolute", bottom:140,
          left:h2.left, width:h2.w, height:h2.h,
          background:h2.color,
          borderRadius:"40% 40% 0 0",
        }} />
      ))}

      {/* Fireworks */}
      {fireworks.map(fw=>(
        <FireworkBurst key={fw.id} fw={fw} />
      ))}

      {/* Characters on battlement */}
      {/* Guard */}
      <div style={{ position:"absolute", bottom:200, left:"50%", transform:"translateX(-160px)", imageRendering:"pixelated" }}>
        <GuardSprite scale={3} />
      </div>
      {/* Princess */}
      <div style={{ position:"absolute", bottom:200, left:"50%", transform:"translateX(40px)", imageRendering:"pixelated" }}>
        <PrincessSprite scale={3} happy />
      </div>

      {/* Firework light reflection on characters */}
      <div style={{
        position:"absolute", bottom:160, left:"50%", transform:"translateX(-50%)",
        width:300, height:200,
        background:"radial-gradient(ellipse,rgba(255,200,100,0.06) 0%,transparent 70%)",
        animation:"torch-flicker 0.8s ease-in-out infinite",
        pointerEvents:"none",
      }} />

      {fade && (
        <div style={{ position:"absolute", inset:0, background:"#000", opacity:1, animation:"scene-fade 1.2s ease-in reverse forwards", pointerEvents:"none", zIndex:100 }} />
      )}
    </div>
  );
}

function FireworkBurst({ fw }: { fw: Firework }) {
  const particles = Array.from({length:fw.particles});
  return (
    <div style={{
      position:"absolute",
      left:`${fw.x}%`,
      top:`${fw.y}%`,
      width:0, height:0,
    }}>
      {particles.map((_,i)=>{
        const angle = (i / fw.particles) * Math.PI * 2;
        const dist = 40 + Math.random() * 40;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        return (
          <div key={i} style={{
            position:"absolute",
            width: 4, height: 4,
            background:fw.color,
            boxShadow:`0 0 4px 2px ${fw.color}`,
            imageRendering:"pixelated",
            animation:`particle-fly 0.9s ease-out forwards`,
            "--dx":`${dx}px`,
            "--dy":`${dy}px`,
          } as React.CSSProperties} />
        );
      })}
      {/* Center burst */}
      <div style={{
        position:"absolute", left:-8, top:-8,
        width:16, height:16,
        background:fw.color,
        borderRadius:"50%",
        boxShadow:`0 0 16px 8px ${fw.color}`,
        animation:"firework 0.6s ease-out forwards",
      }} />
    </div>
  );
}
