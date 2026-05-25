"use client";
import { PrincessSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

export default function Scene3({ onDone }: { onDone: () => void }) {
  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>

      {/* Background - deep hall */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#1A0C30 0%,#2A1848 40%,#1E1038 100%)" }} />

      {/* Stained glass windows (back wall) */}
      {[160, 480, 800, 1080].map((x,i)=>(
        <div key={i} style={{ position:"absolute", top:20, left:x, width:80, height:200, background:"#1A0838", border:"4px solid #5030A0", borderRadius:"40px 40px 0 0", overflow:"hidden" }}>
          {/* pane colors */}
          <div style={{ position:"absolute", top:0, left:0, width:"50%", height:"50%", background:"rgba(255,80,80,0.35)" }} />
          <div style={{ position:"absolute", top:0, left:"50%", width:"50%", height:"50%", background:"rgba(80,80,255,0.35)" }} />
          <div style={{ position:"absolute", top:"50%", left:0, width:"50%", height:"50%", background:"rgba(80,255,80,0.35)" }} />
          <div style={{ position:"absolute", top:"50%", left:"50%", width:"50%", height:"50%", background:"rgba(255,200,80,0.35)" }} />
          {/* leading */}
          <div style={{ position:"absolute", top:0, left:"49%", width:2, height:"100%", background:"#2A1848" }} />
          <div style={{ position:"absolute", top:"49%", left:0, width:"100%", height:2, background:"#2A1848" }} />
          {/* glow */}
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle,rgba(${180+i*20},${150+i*15},255,0.12) 0%,transparent 80%)`, mixBlendMode:"screen" }} />
        </div>
      ))}

      {/* Columns */}
      {[60, 220, 1020, 1180].map((x,i)=>(
        <div key={i} style={{ position:"absolute", bottom:0, left:x }}>
          {/* capital */}
          <div style={{ width:50, height:20, background:"#8070A0", borderRadius:"4px 4px 0 0" }} />
          {/* shaft */}
          <div style={{ width:36, height:480, background:"linear-gradient(90deg,#4A3870,#6A5898,#4A3870)", marginLeft:7 }} />
          {/* base */}
          <div style={{ width:54, height:16, background:"#5A4888", marginLeft:-2 }} />
          {/* highlights */}
          <div style={{ position:"absolute", top:20, left:10, width:8, height:460, background:"rgba(255,255,255,0.08)" }} />
        </div>
      ))}

      {/* Red carpet */}
      <div style={{ position:"absolute", bottom:0, left:"35%", width:"30%", height:"100%", background:"linear-gradient(90deg,transparent,#8A1020 8%,#A01828 50%,#8A1020 92%,transparent)", opacity:0.9 }} />
      {/* Carpet border */}
      <div style={{ position:"absolute", bottom:0, left:"35%", width:8, height:"100%", background:"#C09020" }} />
      <div style={{ position:"absolute", bottom:0, right:"35%", width:8, height:"100%", background:"#C09020" }} />

      {/* Marble floor */}
      {Array.from({length:10},(_,col)=>Array.from({length:5},(_,row)=>(
        <div key={`${col}-${row}`} style={{
          position:"absolute",
          left:col*128, top:560+row*40,
          width:127, height:39,
          border:"1px solid #2A1848",
          background:(col+row)%2===0?"#3A2858":"#2E2050",
        }} />
      )))}

      {/* Throne platform */}
      <div style={{ position:"absolute", bottom:140, left:"50%", transform:"translateX(-50%)", width:260, height:24, background:"#C09020" }} />
      <div style={{ position:"absolute", bottom:160, left:"50%", transform:"translateX(-50%)", width:230, height:16, background:"#E0B030" }} />

      {/* Throne */}
      <div style={{ position:"absolute", bottom:164, left:"50%", transform:"translateX(-50%)" }}>
        <svg width={160} height={200} viewBox="0 0 160 200" style={{ imageRendering:"pixelated" }}>
          {/* seat */}
          <rect x="20" y="120" width="120" height="24" fill="#8A5010" />
          <rect x="18" y="118" width="124" height="6" fill="#C07020" />
          {/* back */}
          <rect x="20" y="20" width="120" height="102" fill="#6A3808" />
          <rect x="18" y="18" width="124" height="104" fill="none" stroke="#C07020" strokeWidth={3} />
          {/* back top */}
          <rect x="10" y="8" width="140" height="16" fill="#8A5010" rx="4" ry="4" />
          <rect x="40" y="0" width="80" height="16" fill="#C07020" rx="4" ry="4" />
          {/* crown motif */}
          <rect x="60" y="28" width="40" height="30" fill="#C09020" rx="2" ry="2" />
          <rect x="68" y="22" width="8" height="10" fill="#C09020" />
          <rect x="80" y="18" width="8" height="14" fill="#C09020" />
          <rect x="92" y="22" width="8" height="10" fill="#C09020" />
          <rect x="63" y="32" width="4" height="4" fill="#FF4444" />
          <rect x="78" y="28" width="4" height="4" fill="#4488FF" />
          <rect x="93" y="32" width="4" height="4" fill="#44CC44" />
          {/* cushion */}
          <rect x="28" y="122" width="104" height="18" fill="#9B1A3A" />
          <rect x="30" y="124" width="100" height="14" fill="#C02048" />
          {/* armrests */}
          <rect x="16" y="100" width="20" height="44" fill="#7A4008" />
          <rect x="124" y="100" width="20" height="44" fill="#7A4008" />
          <rect x="14" y="98" width="24" height="6" fill="#9A5010" />
          <rect x="122" y="98" width="24" height="6" fill="#9A5010" />
          {/* legs */}
          <rect x="22" y="144" width="14" height="40" fill="#5A3006" />
          <rect x="124" y="144" width="14" height="40" fill="#5A3006" />
          <rect x="18" y="180" width="22" height="8" fill="#7A4008" />
          <rect x="120" y="180" width="22" height="8" fill="#7A4008" />
        </svg>
      </div>

      {/* Princess on throne */}
      <div style={{ position:"absolute", bottom:268, left:"50%", transform:"translateX(-50%) translateX(-10px)", imageRendering:"pixelated" }}>
        <PrincessSprite scale={3.5} />
      </div>

      {/* Golden chandeliers */}
      {[320, 640, 960].map((x,i)=>(
        <div key={i} style={{ position:"absolute", top:0, left:x }}>
          <div style={{ width:4, height:60, background:"#8A6020", marginLeft:28 }} />
          <div style={{ width:60, height:16, background:"#C09020", borderRadius:4 }} />
          {[0,1,2].map(j=>(
            <div key={j} style={{ position:"absolute", top:18, left:j*20+2 }}>
              <div style={{ width:4, height:12, background:"#A07010" }} />
              <div className="animate-torch" style={{ width:10, height:14, background:"#FF9900", borderRadius:"50% 50% 40% 40%", marginLeft:-3, opacity:0.9 }} />
            </div>
          ))}
          {/* glow */}
          <div style={{
            position:"absolute", top:30, left:-40,
            width:140, height:80,
            background:"radial-gradient(ellipse,rgba(255,180,80,0.2) 0%,transparent 70%)",
          }} />
        </div>
      ))}

      <DialogBox
        speaker="PRINCESA TAL"
        text={"Pode entrar."}
        onDone={onDone}
        speed={75}
      />
    </div>
  );
}
