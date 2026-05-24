"use client";
import { useState, useCallback } from "react";
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

const SCENE_NAMES: Record<number|string, string> = {
  1:"Exterior do Castelo",2:"Corredor do Castelo",3:"Sala do Trono",
  4:"A Entrada",5:"A Contagem",6:"Momento Emocional",
  7:"A Caixa",8:"Continue?",9:"Topo do Castelo",
  10:"O Discurso",11:"Final",
};

export default function Game() {
  const [scene, setScene] = useState<SceneId>(1);
  const [transitioning, setTransitioning] = useState(false);

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
    }, 400);
  }, []);

  const goTo = useCallback((s: SceneId) => next(s), [next]);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      overflow: "hidden",
    }}>
      {/* 16:9 container scaled to fit screen */}
      <div style={{
        position: "relative",
        width: 1280,
        height: 720,
        transformOrigin: "center center",
        transform: `scale(var(--game-scale, 1))`,
        overflow: "hidden",
        imageRendering: "pixelated",
      }}>
        {/* Scene fade overlay */}
        {transitioning && (
          <div style={{
            position:"absolute",inset:0,background:"#000",
            zIndex:999, opacity:1,
            animation:"scene-fade 0.4s ease-in reverse forwards",
          }}/>
        )}

        {/* HUD - scene indicator */}
        {scene !== "end" && (
          <div style={{
            position:"absolute",top:8,left:12,
            fontFamily:"'Press Start 2P',monospace",
            fontSize:7,
            color:"rgba(255,255,255,0.5)",
            zIndex:200,
            letterSpacing:1,
            textShadow:"1px 1px 0 #000",
          }}>
            CENA {typeof scene==="number"?scene:"∞"} — {SCENE_NAMES[scene] ?? ""}
          </div>
        )}

        {!transitioning && (
          <>
            {scene===1 && <Scene1 onDone={()=>next()} />}
            {scene===2 && <Scene2 onDone={()=>next()} />}
            {scene===3 && <Scene3 onDone={()=>next()} />}
            {scene===4 && <Scene4 onDone={()=>next()} />}
            {scene===5 && <Scene5 onDone={()=>next()} />}
            {scene===6 && <Scene6 onDone={()=>next()} />}
            {scene===7 && <Scene7 onDone={()=>next()} />}
            {scene===8 && <Scene8 onDone={()=>next()} />}
            {scene===9 && <Scene9 onDone={()=>next()} />}
            {scene===10 && <Scene10 onDone={()=>next()} />}
            {scene===11 && <SceneFinal onDone={()=>next()} />}
            {scene==="end" && <EndScreen onRestart={()=>goTo(1)} />}
          </>
        )}
      </div>

      {/* Scale style */}
      <style>{`
        :root { --game-scale: 1; }
        @media (max-width: 1280px) {
          :root { --game-scale: ${typeof window!=="undefined" ? Math.min(window.innerWidth/1280, window.innerHeight/720) : 1}; }
        }
        @font-face {
          font-family: 'Press Start 2P';
          src: url('https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2') format('woff2');
        }
        @keyframes cursor-blink {
          0%,49%{opacity:1}50%,100%{opacity:0}
        }
        @keyframes number-pop {
          0%{transform:scale(0) rotate(-15deg);opacity:0}
          60%{transform:scale(1.4) rotate(5deg);opacity:1}
          100%{transform:scale(1) rotate(0);opacity:1}
        }
        @keyframes firework {
          0%{transform:scale(0);opacity:1}
          80%{transform:scale(1);opacity:1}
          100%{transform:scale(1.3);opacity:0}
        }
        @keyframes head-fly {
          0%{transform:translate(0,0) rotate(0);opacity:1}
          100%{transform:translate(150px,-200px) rotate(900deg);opacity:0}
        }
        @keyframes particle-fly {
          0%{transform:translate(0,0);opacity:1}
          100%{transform:translate(var(--dx),var(--dy));opacity:0}
        }
        @keyframes scene-fade {
          0%{opacity:0}100%{opacity:1}
        }
      `}</style>
    </div>
  );
}

function EndScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div style={{
      width:1280, height:720, position:"relative", overflow:"hidden",
      background:"radial-gradient(ellipse at 50% 40%,#1A0848 0%,#0A0420 70%,#04020E 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32,
    }}>
      {Array.from({length:50},(_,i)=>(
        <div key={i} className="animate-twinkle" style={{
          position:"absolute",
          left:`${(i*127.3)%100}%`, top:`${(i*71.1)%100}%`,
          width:i%4===0?3:1, height:i%4===0?3:1,
          background:"#FFFFFF", imageRendering:"pixelated",
          "--dur":`${1.2+(i%5)*0.4}s`,
        } as React.CSSProperties}/>
      ))}
      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:40, color:"#FFD700", textShadow:"4px 4px 0 #AA0000,0 0 40px rgba(255,200,0,0.6)", letterSpacing:8 }}>
        FIM
      </div>
      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:10, color:"rgba(255,255,255,0.7)", textAlign:"center", lineHeight:2.2, letterSpacing:1 }}>
        obrigado por jogar :)
      </div>
      <button
        onClick={onRestart}
        style={{
          marginTop:24,
          fontFamily:"'Press Start 2P',monospace",
          fontSize:9,
          color:"#FFD700",
          background:"#1A0848",
          border:"3px solid #4488FF",
          padding:"12px 24px",
          cursor:"pointer",
          letterSpacing:1,
          boxShadow:"0 4px 0 #002288",
          animation:"button-pulse 1.4s ease-in-out infinite",
        }}
      >
        JOGAR NOVAMENTE
      </button>
    </div>
  );
}
