"use client";
import { useState, useEffect, useCallback } from "react";
import { GuardSprite, PrincessSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";
import { music } from "../lib/music";

const NUMBERS = ["1","2","3","4","5","6","7","8","9","10"];

const COUNT_INTERVAL = 950;
const COUNT_PAUSE = 1100;

export default function Scene5({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"counting" | "ask" | "princess">("counting");
  const [shownNums, setShownNums] = useState<number[]>([]);
  const [askDone, setAskDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setShownNums(prev => [...prev, i]);
      music.blip(440 + i * 50, 0.12, "square", 0.22);
      i++;
      if (i >= NUMBERS.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("ask"), COUNT_PAUSE);
      }
    }, COUNT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleAskDone = useCallback(() => setPhase("princess"), []);
  const handlePrincessDone = useCallback(() => onDone(), [onDone]);

  return (
    <div className="scene-in" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>
      <ThroneRoomBG />

      {/* Throne (right) */}
      <ThroneStructure />

      {/* Guard standing on floor */}
      <div style={{ position:"absolute", bottom:160, left:320, imageRendering:"pixelated" }}>
        <GuardSprite scale={4} />
      </div>

      {/* Princess on throne */}
      <div style={{ position:"absolute", bottom:268, right:340, imageRendering:"pixelated" }}>
        <PrincessSprite scale={3.5} happy={askDone} />
      </div>

      {/* Floating numbers */}
      <div style={{
        position:"absolute", top:60, left:0, right:0,
        display:"flex", flexWrap:"wrap", gap:18, justifyContent:"center",
        padding:"0 60px",
      }}>
        {shownNums.map(n => (
          <div key={n} style={{
            fontFamily:"var(--font-pixel,monospace)",
            fontSize:38,
            color: ["#FF4466","#FF8800","#FFDD00","#44FF44","#44CCFF","#AA66FF","#FF66CC","#FF6644","#44FFCC","#FFFFFF"][n],
            textShadow:"4px 4px 0 #000, -1px -1px 0 #000",
            animation:"number-pop 0.45s ease-out both",
          }}>
            {NUMBERS[n]}
          </div>
        ))}
      </div>

      {phase === "ask" && (
        <DialogBox
          speaker="SEGURANÇA"
          text={"Até que número eu contei, princesa?"}
          onDone={handleAskDone}
          speed={62}
        />
      )}
      {phase === "princess" && (
        <DialogBox
          speaker="PRINCESA TAL"
          text={"Até 10, seu bobo."}
          onDone={handlePrincessDone}
          speed={68}
        />
      )}
    </div>
  );
}

function ThroneRoomBG() {
  return (
    <>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#1A0C30 0%,#2A1848 40%,#1E1038 100%)" }} />

      {/* Stained glass windows */}
      {[140,440,780,1080].map((x,i)=>(
        <div key={i} style={{ position:"absolute", top:30, left:x, width:90, height:220, background:"#1A0838", border:"4px solid #5030A0", borderRadius:"45px 45px 0 0", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, width:"50%", height:"50%", background:"rgba(255,80,80,0.4)" }} />
          <div style={{ position:"absolute", top:0, left:"50%", width:"50%", height:"50%", background:"rgba(80,80,255,0.4)" }} />
          <div style={{ position:"absolute", top:"50%", left:0, width:"50%", height:"50%", background:"rgba(80,255,80,0.4)" }} />
          <div style={{ position:"absolute", top:"50%", left:"50%", width:"50%", height:"50%", background:"rgba(255,200,80,0.4)" }} />
          <div style={{ position:"absolute", top:0, left:"49%", width:2, height:"100%", background:"#2A1848" }} />
          <div style={{ position:"absolute", top:"49%", left:0, width:"100%", height:2, background:"#2A1848" }} />
        </div>
      ))}

      {/* Columns */}
      {[40,210,1030,1200].map((x,i)=>(
        <div key={i} style={{ position:"absolute", bottom:0, left:x }}>
          <div style={{ width:60, height:24, background:"#8070A0", borderRadius:"5px 5px 0 0" }} />
          <div style={{ width:42, height:480, background:"linear-gradient(90deg,#3A2860,#5A4888 50%,#3A2860)", marginLeft:9 }} />
          <div style={{ width:64, height:18, background:"#5A4888", marginLeft:-2 }} />
        </div>
      ))}

      {/* Carpet */}
      <div style={{ position:"absolute", bottom:0, left:"35%", width:"30%", height:520, background:"linear-gradient(90deg,transparent,#8A1020 8%,#A01828 50%,#8A1020 92%,transparent)" }} />
      <div style={{ position:"absolute", bottom:0, left:"35%", width:8, height:520, background:"#C09020" }} />
      <div style={{ position:"absolute", bottom:0, right:"35%", width:8, height:520, background:"#C09020" }} />

      {/* Marble floor */}
      {Array.from({length:10},(_,col)=>Array.from({length:5},(_,row)=>(
        <div key={`${col}-${row}`} style={{
          position:"absolute", left:col*128, top:560+row*40,
          width:127, height:39,
          border:"1px solid #2A1848",
          background:(col+row)%2===0?"#3A2858":"#2E2050",
        }} />
      )))}

      {/* Chandeliers */}
      {[320,640,960].map((x,i)=>(
        <div key={i} style={{ position:"absolute", top:0, left:x }}>
          <div style={{ width:4, height:60, background:"#8A6020", marginLeft:28 }} />
          <div style={{ width:60, height:16, background:"#C09020", borderRadius:4 }} />
          {[0,1,2].map(j=>(
            <div key={j} style={{ position:"absolute", top:18, left:j*20+2 }}>
              <div style={{ width:4, height:12, background:"#A07010" }} />
              <div className="anim-torch" style={{ width:10, height:14, background:"#FF9900", borderRadius:"50% 50% 40% 40%", marginLeft:-3, opacity:0.95 }} />
            </div>
          ))}
          <div style={{
            position:"absolute", top:30, left:-40,
            width:140, height:80,
            background:"radial-gradient(ellipse,rgba(255,180,80,0.18) 0%,transparent 70%)",
          }} />
        </div>
      ))}
    </>
  );
}

function ThroneStructure() {
  return (
    <>
      {/* Throne platform */}
      <div style={{ position:"absolute", bottom:160, right:280, width:280, height:16, background:"#C09020", boxShadow:"0 2px 0 #8A6010" }} />
      <div style={{ position:"absolute", bottom:160, right:295, width:250, height:8, background:"#E0B030" }} />

      {/* Throne itself */}
      <div style={{ position:"absolute", bottom:176, right:320 }}>
        <svg width={200} height={250} viewBox="0 0 160 200" style={{ imageRendering:"pixelated" }}>
          <rect x="20" y="120" width="120" height="24" fill="#8A5010" />
          <rect x="18" y="118" width="124" height="6" fill="#C07020" />
          <rect x="20" y="20" width="120" height="102" fill="#6A3808" />
          <rect x="18" y="18" width="124" height="104" fill="none" stroke="#C07020" strokeWidth={3} />
          <rect x="10" y="8" width="140" height="16" fill="#8A5010" rx="4" />
          <rect x="40" y="0" width="80" height="16" fill="#C07020" rx="4" />
          <rect x="60" y="28" width="40" height="30" fill="#C09020" rx="2" />
          <rect x="63" y="32" width="4" height="4" fill="#FF4444" />
          <rect x="78" y="28" width="4" height="4" fill="#4488FF" />
          <rect x="93" y="32" width="4" height="4" fill="#44CC44" />
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
