"use client";
import { useState, useEffect, useCallback, useRef } from "react";
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
import { music, CASTLE_NIGHT, THRONE_ROOM, PLAYFUL, MYSTERY, EMOTIONAL, COMEDY } from "../lib/music";

type SceneId = 1|2|3|4|5|6|7|8|9|10|11|"end";

const LABELS: Record<string, string> = {
  "1":"Exterior do Castelo","2":"Corredor","3":"Sala do Trono",
  "4":"A Entrada","5":"A Contagem","6":"Momento Emocional",
  "7":"A Caixa","8":"Continue?","9":"Topo do Castelo",
  "10":"O Discurso","11":"Final","end":"Fim",
};

const W = 1280, H = 720;
const DIALOG_RESERVE = 150;

export default function Game() {
  const [scene, setScene] = useState<SceneId>(1);
  const [scale, setScale] = useState(0.5);
  const [trans, setTrans] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const playedSong = useRef<string>("");

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight - DIALOG_RESERVE;
      setScale(Math.min(w / W, h / H));
    };
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  // Music routing per scene
  useEffect(() => {
    if (!started || muted) return;
    let song;
    let name;
    if (scene === 1 || scene === 2) { song = CASTLE_NIGHT; name = "castle_night"; }
    else if (scene === 3 || scene === 4) { song = THRONE_ROOM; name = "throne_room"; }
    else if (scene === 5 || scene === 6) { song = PLAYFUL; name = "playful"; }
    else if (scene === 7 || scene === 8) { song = MYSTERY; name = "mystery"; }
    else if (scene === 9 || scene === 10) { song = EMOTIONAL; name = "emotional"; }
    else if (scene === 11) { song = COMEDY; name = "comedy"; }
    else if (scene === "end") { song = EMOTIONAL; name = "emotional"; }
    else return;
    if (playedSong.current !== name) {
      playedSong.current = name;
      music.play(name, song);
    }
  }, [scene, started, muted]);

  const next = useCallback((to?: SceneId) => {
    setTrans(true);
    setTimeout(() => {
      setScene(prev => {
        if (to) return to;
        if (typeof prev === "string") return "end";
        const n = prev + 1;
        return (n > 11 ? "end" : n) as SceneId;
      });
      setTrans(false);
    }, 650);
  }, []);

  function startGame() {
    music.unlock();
    setStarted(true);
  }

  function toggleMute() {
    const m = !muted;
    setMuted(m);
    music.setMuted(m);
    if (!m && started) {
      // re-trigger to restart music
      playedSong.current = "";
      setScene(s => s);
    }
  }

  const sceneKey = String(scene);

  if (!started) return <TitleScreen onStart={startGame} />;

  return (
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex", flexDirection: "column",
      background: "#000", overflow: "hidden",
      position: "relative",
    }}>
      {/* Scene area */}
      <div style={{
        flex: "1 1 auto",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}>
        <div style={{
          width: W, height: H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          imageRendering: "pixelated",
          background: "#000",
        }}>
          {trans && (
            <div style={{position:"absolute",inset:0,background:"#000",zIndex:9998,opacity:1}}/>
          )}

          {scene !== "end" && (
            <div style={{
              position:"absolute", top:10, left:14, zIndex:200,
              fontFamily:"var(--font-pixel,monospace)",
              fontSize:8, color:"rgba(255,255,255,0.55)",
              textShadow:"2px 2px 0 #000", letterSpacing:1, pointerEvents:"none",
            }}>
              CENA {sceneKey !== "end" ? sceneKey : "—"} ✦ {LABELS[sceneKey]}
            </div>
          )}

          {!trans && (
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

      {/* Dialog reserve area (just black space; dialog is rendered via portal) */}
      <div style={{
        flex: `0 0 ${DIALOG_RESERVE}px`,
        background: "#000",
        position: "relative",
      }}/>

      {/* Mute button */}
      <button onClick={toggleMute} style={{
        position:"fixed", top:8, right:8,
        zIndex: 10000,
        background:"rgba(0,0,0,0.6)",
        border:"2px solid #3F66E8",
        borderRadius:4,
        padding:"6px 10px",
        cursor:"pointer",
        fontFamily:"var(--font-pixel,monospace)",
        fontSize:10, color:"#FFFFFF",
        WebkitTapHighlightColor:"transparent",
      }}>
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}

// ── TITLE SCREEN ──────────────────────────────────────────────────────────────
function TitleScreen({ onStart }: { onStart: () => void }) {
  const [dots] = useState(() => Array.from({length:80},(_,i)=>({
    x:(i*131.7)%100, y:(i*73.3)%100, s:i%5===0?3:i%3===0?2:1, d:1.0+(i%6)*0.4,
  })));
  return (
    <div onClick={onStart} onTouchStart={onStart} style={{
      width:"100vw", height:"100vh", overflow:"hidden",
      background:"radial-gradient(ellipse at 50% 45%,#1A0848 0%,#080218 65%,#020108 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      cursor:"pointer", position:"relative",
      WebkitTapHighlightColor:"transparent",
    }}>
      {dots.map((d,i)=>(
        <div key={i} className="anim-twinkle" style={{
          position:"absolute", left:`${d.x}%`, top:`${d.y}%`,
          width:d.s, height:d.s, background:i%4===0?"#FFE":"#FFF",
          imageRendering:"pixelated",
          "--dur":`${d.d}s`,
        } as React.CSSProperties}/>
      ))}

      {/* Moon */}
      <div className="anim-moon" style={{
        position:"absolute", top:"15%", left:"50%", transform:"translateX(-50%)",
        width:120, height:120, borderRadius:"50%",
        background:"radial-gradient(circle at 35% 32%,#FFFFF4,#FFF9C0 50%,#F0E048)",
        boxShadow:"0 0 50px 24px rgba(255,240,120,0.5)",
      }}/>

      <div style={{
        fontFamily:"var(--font-pixel,monospace)",
        fontSize:"clamp(20px,5vw,42px)",
        color:"#FFD700",
        textShadow:"4px 4px 0 #880000, 0 0 40px rgba(255,200,0,0.6)",
        letterSpacing:"clamp(3px,1vw,8px)",
        textAlign:"center",
        marginTop:"15vh",
        padding:"0 20px",
      }}>
        A HISTÓRIA DA<br/>PRINCESA TAL
      </div>

      <div style={{
        marginTop:"clamp(20px,4vh,40px)",
        fontFamily:"var(--font-pixel,monospace)",
        fontSize:"clamp(8px,2vw,12px)",
        color:"#AACCFF",
        letterSpacing:2,
        textAlign:"center",
        animation:"cursor-blink 1.2s ease-in-out infinite",
      }}>
        ▶ TOQUE PARA COMEÇAR
      </div>

      <div style={{
        position:"absolute", bottom:20, left:0, right:0,
        textAlign:"center",
        fontFamily:"var(--font-pixel,monospace)",
        fontSize:8, color:"rgba(255,255,255,0.35)",
        letterSpacing:1,
      }}>
        pixel art 16-bit ✦ estilo super nintendo
      </div>
    </div>
  );
}

// ── END SCREEN ────────────────────────────────────────────────────────────────
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
      <div style={{fontFamily:"var(--font-pixel,monospace)",fontSize:60,color:"#FFD700",
        textShadow:"6px 6px 0 #880000,0 0 60px rgba(255,200,0,0.7)",letterSpacing:12}}>
        FIM
      </div>
      <div style={{fontFamily:"var(--font-pixel,monospace)",fontSize:10,color:"rgba(255,255,255,0.7)",
        textAlign:"center",lineHeight:2.4,letterSpacing:1}}>
        obrigado por jogar
      </div>
      <button onClick={onRestart} className="anim-btn" style={{
        marginTop:28, fontFamily:"var(--font-pixel,monospace)", fontSize:10,
        color:"#FFD700", background:"#0A0830", border:"3px solid #4466FF",
        padding:"16px 32px", cursor:"pointer", letterSpacing:1,
        boxShadow:"0 4px 0 #001188",
      }}>
        ▶ JOGAR NOVAMENTE
      </button>
    </div>
  );
}
