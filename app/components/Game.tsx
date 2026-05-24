"use client";
import { useState, useEffect, useCallback } from "react";
import Scene1 from "../scenes/Scene1";
import Scene2 from "../scenes/Scene2";
import Scene3 from "../scenes/Scene3";
import Scene4 from "../scenes/Scene4";
import Scene5 from "../scenes/Scene5";
import Scene6 from "../scenes/Scene6";
import Scene7 from "../scenes/Scene7";
import Scene8 from "../scenes/Scene8";
import Scene9 from "../scenes/Scene9";
import Scene10 from "../scenes/Scene10";
import SceneFinal from "../scenes/SceneFinal";

type SceneId = 1|2|3|4|5|6|7|8|9|10|11|"end";

const SCENE_LABELS: Record<string, string> = {
  "1":"Exterior do Castelo","2":"Corredor","3":"Sala do Trono",
  "4":"A Entrada","5":"A Contagem","6":"Momento Emocional",
  "7":"A Caixa","8":"Continue?","9":"Topo do Castelo",
  "10":"O Discurso","11":"Final","end":"Fim",
};

const W = 1280, H = 720;

export default function Game() {
  const [scene, setScene] = useState<SceneId>(1);
  const [scale, setScale] = useState(0.5);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const calc = () => {
      const s = Math.min(window.innerWidth / W, window.innerHeight / H);
      setScale(s);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const next = useCallback((to?: SceneId) => {
    setTransitioning(true);
    setTimeout(() => {
      setScene(prev => {
        if (to) return to;
        if (typeof prev === "string") return "end";
        const n = prev + 1;
        return (n > 11 ? "end" : n) as SceneId;
      });
      setTransitioning(false);
    }, 350);
  }, []);

  const sceneKey = String(scene);

  return (
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#000", overflow: "hidden",
    }}>
      <div style={{
        width: W, height: H,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        imageRendering: "pixelated",
      }}>
        {/* Transition overlay */}
        {transitioning && (
          <div style={{ position:"absolute",inset:0,background:"#000",zIndex:999,opacity:1 }} />
        )}

        {/* HUD */}
        {scene !== "end" && (
          <div style={{
            position:"absolute", top:8, left:10, zIndex:200,
            fontFamily:"var(--font-pixel, monospace)",
            fontSize:7, color:"rgba(255,255,255,0.45)",
            textShadow:"1px 1px 0 #000", letterSpacing:1, pointerEvents:"none",
          }}>
            CENA {sceneKey !== "end" ? sceneKey : "—"} — {SCENE_LABELS[sceneKey]}
          </div>
        )}

        {!transitioning && (
          <>
            {scene===1  && <Scene1 onDone={()=>next()} />}
            {scene===2  && <Scene2 onDone={()=>next()} />}
            {scene===3  && <Scene3 onDone={()=>next()} />}
            {scene===4  && <Scene4 onDone={()=>next()} />}
            {scene===5  && <Scene5 onDone={()=>next()} />}
            {scene===6  && <Scene6 onDone={()=>next()} />}
            {scene===7  && <Scene7 onDone={()=>next()} />}
            {scene===8  && <Scene8 onDone={()=>next()} />}
            {scene===9  && <Scene9 onDone={()=>next()} />}
            {scene===10 && <Scene10 onDone={()=>next()} />}
            {scene===11 && <SceneFinal onDone={()=>next()} />}
            {scene==="end" && <EndScreen onRestart={()=>next(1)} />}
          </>
        )}
      </div>
    </div>
  );
}

function EndScreen({ onRestart }: { onRestart: () => void }) {
  const [dots] = useState(() => Array.from({length:60},(_,i)=>({
    x:(i*131)%100, y:(i*73)%100, s:i%4===0?3:1, d:1.2+(i%5)*0.4,
  })));
  return (
    <div className="scene-in" style={{
      width:W, height:H, position:"relative", overflow:"hidden",
      background:"radial-gradient(ellipse at 50% 40%,#1A0848 0%,#080218 70%,#020108 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
    }}>
      {dots.map((d,i)=>(
        <div key={i} className="anim-twinkle" style={{
          position:"absolute", left:`${d.x}%`, top:`${d.y}%`,
          width:d.s, height:d.s, background:"#fff", imageRendering:"pixelated",
          "--dur":`${d.d}s`,
        } as React.CSSProperties}/>
      ))}
      <div style={{fontFamily:"var(--font-pixel,monospace)",fontSize:52,color:"#FFD700",
        textShadow:"5px 5px 0 #880000,0 0 50px rgba(255,200,0,0.7)",letterSpacing:10}}>
        FIM
      </div>
      <div style={{fontFamily:"var(--font-pixel,monospace)",fontSize:9,color:"rgba(255,255,255,0.65)",
        textAlign:"center",lineHeight:2.4,letterSpacing:1}}>
        obrigado por jogar :)
      </div>
      <button onClick={onRestart} className="anim-btn" style={{
        marginTop:20, fontFamily:"var(--font-pixel,monospace)", fontSize:9,
        color:"#FFD700", background:"#0A0830", border:"3px solid #4466FF",
        padding:"14px 28px", cursor:"pointer", letterSpacing:1,
        boxShadow:"0 4px 0 #001188", imageRendering:"pixelated",
      }}>
        ▶ JOGAR NOVAMENTE
      </button>
    </div>
  );
}
