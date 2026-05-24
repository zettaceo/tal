"use client";
import { useState } from "react";

const STARS8 = Array.from({length:80},(_, i)=>({
  x:(i*113.7)%100, y:(i*71.3)%100,
  size:i%5===0?3:i%3===0?2:1,
  dur:1.2+(i%6)*0.4,
}));

export default function Scene8({ onDone }: { onDone: () => void }) {
  const [pressed, setPressed] = useState(false);
  const [flash, setFlash] = useState(false);

  function handlePress() {
    if (pressed) return;
    setPressed(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
    setTimeout(onDone, 900);
  }

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>

      {/* Starfield bg */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 40%,#1A0848 0%,#0A0420 60%,#04020E 100%)" }} />

      {STARS8.map((s,i)=>(
        <div key={i} className="animate-twinkle" style={{
          position:"absolute",
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size,
          background:i%7===0?"#FFEEAA":i%5===0?"#AADDFF":"#FFFFFF",
          imageRendering:"pixelated",
          "--dur":`${s.dur}s`,
        } as React.CSSProperties} />
      ))}

      {/* Ornate frame */}
      <div style={{
        position:"absolute", inset:0,
        border:"12px solid transparent",
        borderImage:"none",
        pointerEvents:"none",
        zIndex:10,
      }}>
        {/* Corner decorations */}
        {[{t:0,l:0},{t:0,r:0},{b:0,l:0},{b:0,r:0}].map((pos,i)=>(
          <div key={i} style={{
            position:"absolute",...pos,
            width:60, height:60,
            background:"radial-gradient(circle,#C09020 0%,transparent 70%)",
            opacity:0.5,
          }} />
        ))}
      </div>

      {/* Center glow */}
      <div style={{
        position:"absolute",
        top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        width:400, height:400,
        background:"radial-gradient(circle,rgba(180,80,80,0.15) 0%,transparent 70%)",
        pointerEvents:"none",
      }} />

      {/* Main content */}
      <div style={{
        position:"absolute",
        top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:40,
      }}>
        {/* Title */}
        <div style={{
          fontFamily:"'Press Start 2P',monospace",
          fontSize:14,
          color:"#FFD700",
          textShadow:"3px 3px 0 #880000,0 0 20px rgba(255,200,0,0.5)",
          letterSpacing:2,
          textAlign:"center",
          lineHeight:2,
        }}>
          APERTE SE QUISER<br/>CONTINUAR
        </div>

        {/* Big red button */}
        <div
          onClick={handlePress}
          className={pressed ? "" : "animate-btn"}
          style={{
            width:120, height:120,
            background: pressed
              ? "radial-gradient(circle at 42% 38%,#993322,#660A0A)"
              : "radial-gradient(circle at 38% 34%,#FF7777,#DD1111)",
            borderRadius:"50%",
            border:"6px solid #880000",
            boxShadow: pressed
              ? "0 2px 0 #330000,0 0 20px rgba(180,30,30,0.4)"
              : "0 8px 0 #550000,0 0 40px rgba(220,50,50,0.8),0 0 80px rgba(220,50,50,0.3)",
            cursor: pressed ? "default" : "pointer",
            position:"relative",
            transition:"all 0.12s ease",
            transform: pressed ? "translateY(6px)" : "translateY(0)",
          }}
        >
          {/* Button shine */}
          <div style={{
            position:"absolute", top:18, left:18,
            width:36, height:22,
            background:"rgba(255,255,255,0.35)",
            borderRadius:12,
          }} />
          {/* Button center mark */}
          <div style={{
            position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            width:30, height:30,
            border:"3px solid rgba(255,150,150,0.5)",
            borderRadius:"50%",
          }} />
        </div>

        {!pressed && (
          <div style={{
            fontFamily:"'Press Start 2P',monospace",
            fontSize:8,
            color:"rgba(255,255,255,0.6)",
            textAlign:"center",
            animation:"cursor-blink 1s step-end infinite",
          }}>
            clique para continuar
          </div>
        )}
      </div>

      {/* Flash overlay */}
      {flash && (
        <div style={{
          position:"absolute", inset:0,
          background:"#FFFFFF",
          animation:"screen-flash 0.6s ease-out forwards",
          pointerEvents:"none",
          zIndex:200,
        }} />
      )}
    </div>
  );
}
