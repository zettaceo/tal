"use client";
import { useState, useEffect, useCallback } from "react";
import { PrincessSprite, SwordSprite, PixelHeart } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

const STARS_F = Array.from({length:50},(_, i)=>({
  x:(i*121.1)%100, y:(i*71.7)%100,
  size:i%4===0?3:1,
  dur:1.3+(i%5)*0.4,
}));

export default function SceneFinal({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"princess1"|"sword"|"headfly"|"princess2"|"freeze">("princess1");
  const [laugh, setLaugh] = useState(false);

  useEffect(() => {
    if (phase === "sword") {
      setTimeout(() => setPhase("headfly"), 800);
    }
    if (phase === "headfly") {
      setTimeout(() => { setPhase("princess2"); setLaugh(true); }, 1200);
    }
  }, [phase]);

  const handlePrincess1Done = useCallback(() => setPhase("sword"), []);
  const handlePrincess2Done = useCallback(() => setPhase("freeze"), []);

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated",
      filter: phase === "freeze" ? "sepia(0.5) saturate(0.8) brightness(0.9)" : "none",
      transition:"filter 0.6s",
    }}>

      {/* BG */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#0A0428 0%,#180C40 50%,#1A0838 100%)" }} />

      {STARS_F.map((s,i)=>(
        <div key={i} className="animate-twinkle" style={{
          position:"absolute",
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size,
          background:"#FFFFFF",
          imageRendering:"pixelated",
          "--dur":`${s.dur}s`,
        } as React.CSSProperties} />
      ))}

      {/* Moon */}
      <div style={{
        position:"absolute", top:40, right:160,
        width:80, height:80,
        background:"radial-gradient(circle at 38% 38%,#FFFFF0,#FFF8C0 55%,#E8D880)",
        borderRadius:"50%",
        boxShadow:"0 0 25px 12px rgba(255,240,180,0.38)",
      }} />

      {/* Platform */}
      <div style={{ position:"absolute", bottom:130, left:"50%", transform:"translateX(-50%)", width:600, height:28, background:"#505060" }} />
      <div style={{ position:"absolute", bottom:118, left:"50%", transform:"translateX(-50%)", width:640, height:14, background:"#606070" }} />
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:640, height:130, background:"linear-gradient(180deg,#484858,#3A3848)" }} />
      {Array.from({length:12},(_,i)=>(
        <div key={i} style={{ position:"absolute", bottom:155, left:`calc(50% - 300px + ${i*52}px)`, width:36, height:30, background:"#505060" }} />
      ))}

      {/* Background fireworks */}
      {[10,30,50,70,90].map((x,i)=>(
        <div key={i} style={{
          position:"absolute",
          left:`${x}%`, top:`${8+i*8}%`,
          width:50, height:50,
          borderRadius:"50%",
          background:`radial-gradient(circle,${["#FF4444","#FFDD00","#44AAFF","#FF44CC","#44FF88"][i]}44 0%,transparent 70%)`,
          animation:`firework ${1.1+i*0.25}s ease-out ${i*0.45}s infinite`,
        }} />
      ))}

      {/* Guard body (headless when head flying) */}
      {phase !== "sword" && phase !== "headfly" && phase !== "princess2" && phase !== "freeze" && (
        <div style={{ position:"absolute", bottom:190, left:"50%", transform:"translateX(-220px)", imageRendering:"pixelated" }}>
          <svg width={60} height={96} viewBox="0 0 20 32" style={{ imageRendering:"pixelated" }}>
            {/* head */}
            <rect x="6" y="0" width="8" height="8" fill="#F4C48A" />
            <rect x="5" y="0" width="10" height="4" fill="#888" />
            <rect x="7" y="5" width="2" height="1" fill="#6B4226" />
            <rect x="11" y="5" width="2" height="1" fill="#6B4226" />
            <rect x="8" y="7" width="4" height="1" fill="#C07060" />
            {/* body */}
            <rect x="5" y="8" width="10" height="12" fill="#8A8A8A" />
            <rect x="3" y="9" width="2" height="10" fill="#2A2050" />
            <rect x="15" y="9" width="2" height="10" fill="#2A2050" />
            <rect x="5" y="19" width="10" height="2" fill="#5A4A30" />
            <rect x="9" y="19" width="2" height="2" fill="#C8A020" />
            <rect x="5" y="21" width="4" height="8" fill="#8A8A8A" />
            <rect x="11" y="21" width="4" height="8" fill="#8A8A8A" />
            <rect x="5" y="29" width="4" height="2" fill="#504030" />
            <rect x="11" y="29" width="4" height="2" fill="#504030" />
          </svg>
        </div>
      )}

      {/* Flying head */}
      {phase === "headfly" && (
        <div style={{
          position:"absolute",
          bottom:280,
          left:"calc(50% - 200px)",
          imageRendering:"pixelated",
          animation:"head-fly 1.2s ease-out forwards",
        }}>
          <svg width={36} height={36} viewBox="0 0 12 12" style={{ imageRendering:"pixelated" }}>
            <rect x="2" y="0" width="8" height="8" fill="#F4C48A" />
            <rect x="2" y="0" width="8" height="3" fill="#888" />
            <rect x="3" y="4" width="2" height="1" fill="#6B4226" />
            <rect x="7" y="4" width="2" height="1" fill="#6B4226" />
            <rect x="4" y="6" width="4" height="1" fill="#E07060" />
          </svg>
        </div>
      )}

      {/* Headless body + gush */}
      {(phase === "headfly" || phase === "princess2" || phase === "freeze") && (
        <div style={{ position:"absolute", bottom:190, left:"50%", transform:"translateX(-220px)", imageRendering:"pixelated" }}>
          <svg width={60} height={72} viewBox="0 0 20 24" style={{ imageRendering:"pixelated" }}>
            {/* blood gush (comic) */}
            <rect x="6" y="0" width="8" height="3" fill="#FF2222" />
            <rect x="7" y="3" width="3" height="2" fill="#FF2222" />
            <rect x="11" y="2" width="3" height="3" fill="#FF2222" />
            {/* body */}
            <rect x="5" y="0" width="10" height="12" fill="#8A8A8A" />
            <rect x="3" y="1" width="2" height="10" fill="#2A2050" />
            <rect x="15" y="1" width="2" height="10" fill="#2A2050" />
            <rect x="5" y="11" width="10" height="2" fill="#5A4A30" />
            <rect x="5" y="13" width="4" height="8" fill="#8A8A8A" />
            <rect x="11" y="13" width="4" height="8" fill="#8A8A8A" />
            <rect x="5" y="21" width="4" height="2" fill="#504030" />
            <rect x="11" y="21" width="4" height="2" fill="#504030" />
          </svg>
        </div>
      )}

      {/* Princess (sword raised during sword phase) */}
      <div style={{ position:"absolute", bottom:190, left:"50%", transform:"translateX(50px)", imageRendering:"pixelated" }}>
        <PrincessSprite scale={3} happy={phase==="princess2"||phase==="freeze"} />
        {phase === "sword" && (
          <div style={{
            position:"absolute",
            top:-120, left:30,
            transform:"rotate(-30deg)",
            imageRendering:"pixelated",
            animation:"shake 0.5s ease-in-out",
          }}>
            <SwordSprite scale={3} />
          </div>
        )}
      </div>

      {/* Laugh effect */}
      {laugh && phase !== "freeze" && (
        <div style={{
          position:"absolute", top:40, left:"50%", transform:"translateX(-50%)",
          fontFamily:"'Press Start 2P',monospace",
          fontSize:22,
          color:"#FFD700",
          textShadow:"3px 3px 0 #AA0000,0 0 20px rgba(255,200,0,0.6)",
          animation:"number-pop 0.4s ease-out both",
          letterSpacing:4,
        }}>
          KKKKKK
        </div>
      )}

      {/* Dialog */}
      {phase === "princess1" && (
        <DialogBox
          speaker="PRINCESA TAL"
          text={"Que lindo…"}
          onDone={handlePrincess1Done}
          speed={55}
        />
      )}
      {(phase === "princess2" || phase === "freeze") && (
        <DialogBox
          speaker="PRINCESA TAL"
          text={"Que dramático. Kkkkk."}
          onDone={handlePrincess2Done}
          speed={50}
        />
      )}

      {/* FREEZE FRAME */}
      {phase === "freeze" && (
        <>
          {/* "FIM" text */}
          <div style={{
            position:"absolute",
            top:"50%", left:"50%",
            transform:"translate(-50%,-50%) translateY(-80px)",
            fontFamily:"'Press Start 2P',monospace",
            fontSize:48,
            color:"#FFD700",
            textShadow:"5px 5px 0 #AA0000,0 0 40px rgba(255,200,0,0.7)",
            letterSpacing:8,
            zIndex:50,
            animation:"number-pop 0.5s ease-out both",
          }}>
            FIM
          </div>

          {/* Score line */}
          <div style={{
            position:"absolute",
            top:"50%", left:"50%",
            transform:"translate(-50%,-50%) translateY(10px)",
            fontFamily:"'Press Start 2P',monospace",
            fontSize:10,
            color:"rgba(255,255,255,0.6)",
            letterSpacing:2,
            textAlign:"center",
            zIndex:50,
            animation:"scene-fade 1s ease-out 0.5s both",
          }}>
            obrigado por jogar :)
          </div>

          {/* Laugh text bottom */}
          <div style={{
            position:"absolute", top:30, left:"50%", transform:"translateX(-50%)",
            fontFamily:"'Press Start 2P',monospace",
            fontSize:20,
            color:"#FFD700",
            textShadow:"3px 3px 0 #AA0000",
            letterSpacing:4,
            zIndex:50,
          }}>
            KKKKKK
          </div>

          {/* Extra fireworks on freeze */}
          {[15,35,55,75,90].map((x,i)=>(
            <div key={i} style={{
              position:"absolute",
              left:`${x}%`, top:`${5+i*10}%`,
              width:60, height:60,
              borderRadius:"50%",
              background:`radial-gradient(circle,${["#FF4444","#FFDD00","#44AAFF","#FF44CC","#44FF88"][i]}66 0%,transparent 70%)`,
              animation:`firework 0.9s ease-out ${i*0.2}s infinite`,
            }} />
          ))}
        </>
      )}
    </div>
  );
}
