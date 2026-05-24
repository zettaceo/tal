"use client";
import { GuardSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

const STARS = Array.from({ length: 55 }, (_, i) => ({
  x: (i * 137.5) % 100,
  y: (i * 83.7) % 55,
  size: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
  dur: 1.2 + (i % 5) * 0.5,
}));

export default function Scene1({ onDone }: { onDone: () => void }) {
  return (
    <div className="animate-scene" style={{ width: 1280, height: 720, position: "relative", overflow: "hidden", imageRendering: "pixelated" }}>

      {/* SKY gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#080428 0%,#150840 28%,#220D60 55%,#1A1545 75%,#2A2060 100%)" }} />

      {/* Stars */}
      {STARS.map((s, i) => (
        <div key={i} className="animate-twinkle" style={{
          position: "absolute",
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          background: i % 6 === 0 ? "#FFEEAA" : i % 5 === 0 ? "#AADDFF" : "#FFFFFF",
          imageRendering: "pixelated",
          "--dur": `${s.dur}s`,
        } as React.CSSProperties} />
      ))}

      {/* Moon */}
      <div className="animate-moon" style={{
        position: "absolute",
        top: 40,
        right: 180,
        width: 80,
        height: 80,
        background: "radial-gradient(circle at 38% 38%,#FFFFF0,#FFF8C0 60%,#E8D880)",
        borderRadius: "50%",
        imageRendering: "pixelated",
        boxShadow: "0 0 25px 12px rgba(255,240,180,0.4),0 0 60px 30px rgba(255,240,180,0.18)",
      }}>
        {/* Moon craters */}
        <div style={{ position:"absolute", top:20, left:16, width:12, height:10, borderRadius:"50%", border:"2px solid rgba(200,190,100,0.4)" }} />
        <div style={{ position:"absolute", top:46, left:38, width:8, height:7, borderRadius:"50%", border:"2px solid rgba(200,190,100,0.3)" }} />
      </div>

      {/* Cloud wisps */}
      <div className="animate-clouds" style={{ position:"absolute", top:90, left:0, width:"140%", height:30, opacity:0.15 }}>
        {[60,200,380,550,720].map((x,i)=>(
          <div key={i} style={{
            position:"absolute", left:x, top: i%2===0?0:8,
            width:80+(i*20), height:12,
            background:"#8866CC", borderRadius:8, opacity:0.6,
          }}/>
        ))}
      </div>

      {/* Distant mountains */}
      {[
        { left:0, w:260, h:160, color:"#1A1040" },
        { left:180, w:220, h:130, color:"#20184C" },
        { left:380, w:300, h:180, color:"#181038" },
        { left:620, w:250, h:145, color:"#1E1448" },
        { left:840, w:280, h:165, color:"#16103A" },
        { left:1050, w:240, h:140, color:"#1A1040" },
      ].map((m, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: 200,
          left: m.left,
          width: m.w,
          height: m.h,
          background: m.color,
          clipPath: "polygon(0% 100%,50% 0%,100% 100%)",
        }} />
      ))}

      {/* Mid hills */}
      {[
        { left:-20, w:320, h:110, color:"#1C2A48" },
        { left:220, w:280, h:90, color:"#182240" },
        { left:460, w:350, h:120, color:"#1A2848" },
        { left:760, w:300, h:100, color:"#162038" },
        { left:1020, w:320, h:115, color:"#1C2A48" },
      ].map((h2, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: 192,
          left: h2.left,
          width: h2.w,
          height: h2.h,
          background: h2.color,
          borderRadius: "50% 50% 0 0",
        }} />
      ))}

      {/* Ground */}
      <div style={{ position:"absolute", bottom:0, left:0, width:"100%", height:220, background:"linear-gradient(180deg,#1A3A18 0%,#162E14 40%,#3A2A10 100%)" }} />
      {/* Ground highlight */}
      <div style={{ position:"absolute", bottom:195, left:0, width:"100%", height:6, background:"#2A5022", opacity:0.8 }} />

      {/* Dirt path */}
      <div style={{ position:"absolute", bottom:0, left:160, width:200, height:210,
        background:"linear-gradient(180deg,#5A3A18 0%,#6A4A22 100%)",
        clipPath:"polygon(20% 0%,80% 0%,100% 100%,0% 100%)",
      }} />

      {/* Ground flowers */}
      {[90,240,320,420,550,680,820,960,1100].map((x,i)=>(
        <div key={i} style={{ position:"absolute", bottom: 190+((i%3)*4), left:x }}>
          <div style={{ width:4, height:6, background:"#2A6020" }} />
          <div style={{ width:4, height:4, background: i%3===0?"#FF6688":i%3===1?"#FFFF44":"#FF88BB", borderRadius:"50%", marginTop:-2 }} />
        </div>
      ))}

      {/* Trees left */}
      {[20, 80].map((x,i)=>(
        <div key={i} style={{ position:"absolute", bottom:190, left:x }}>
          <div style={{ width:12, height:60+(i*10), background:"#4A2A10", position:"absolute", bottom:0, left:14 }} />
          <div style={{ width:40+(i*8), height:55+(i*10), background:"#1E5A18", borderRadius:"50% 50% 30% 30%", position:"absolute", bottom:40 }} />
          <div style={{ width:28+(i*6), height:38+(i*6), background:"#2A7020", borderRadius:"50%", position:"absolute", bottom:60, left:6 }} />
        </div>
      ))}

      {/* CASTLE (right side) */}
      <Castle />

      {/* Guard sprite left side */}
      <div style={{ position:"absolute", bottom:195, left:190, imageRendering:"pixelated" }}>
        <GuardSprite scale={3} />
      </div>

      {/* Dialog */}
      <DialogBox
        speaker="SEGURANÇA"
        text={"Nossa… a Princesa Tal tem tantas responsabilidades...\nEla está sobrecarregada física e emocionalmente...\nVou até a sala do trono animá-la."}
        onDone={onDone}
        speed={42}
      />
    </div>
  );
}

function Castle() {
  return (
    <div style={{ position:"absolute", bottom:195, right:30, width:520, imageRendering:"pixelated" }}>
      <svg width={520} height={420} viewBox="0 0 520 420" style={{ imageRendering:"pixelated" }}>
        {/* Main wall */}
        <rect x="60" y="140" width="400" height="280" fill="#686878" />
        <rect x="60" y="140" width="400" height="8" fill="#8888A0" />

        {/* Wall stones */}
        {Array.from({length:8},(_,row)=>Array.from({length:12},(_,col)=>(
          <rect key={`${row}-${col}`}
            x={60+col*34+(row%2===0?0:17)} y={150+row*30}
            width={32} height={22}
            fill="none" stroke="#505060" strokeWidth={1}
          />
        )))}

        {/* Gate */}
        <rect x="205" y="280" width="110" height="140" fill="#1A1228" />
        <rect x="205" y="280" width="110" height="60" rx="55" ry="55" fill="#1A1228" />
        <rect x="215" y="290" width="90" height="130" fill="#120C1E" />
        {/* Gate bars */}
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x={220+i*18} y={290} width={4} height={120} fill="#3A3A50" />
        ))}
        <rect x="215" y="340" width="90" height="4" fill="#3A3A50" />

        {/* Center tower */}
        <rect x="170" y="60" width="180" height="200" fill="#707082" />
        <rect x="170" y="60" width="180" height="8" fill="#9090A8" />
        {/* Center tower battlements */}
        {[0,1,2,3,4,5].map(i=>(
          <rect key={i} x={170+i*30} y={40} width={20} height={24} fill="#707082" />
        ))}

        {/* Left tower */}
        <rect x="40" y="100" width="110" height="180" fill="#686878" />
        <rect x="40" y="100" width="110" height="8" fill="#8888A0" />
        {[0,1,2].map(i=>(<rect key={i} x={40+i*38} y={82} width={26} height={22} fill="#686878" />))}

        {/* Right tower */}
        <rect x="370" y="100" width="110" height="180" fill="#686878" />
        <rect x="370" y="100" width="110" height="8" fill="#8888A0" />
        {[0,1,2].map(i=>(<rect key={i} x={370+i*38} y={82} width={26} height={22} fill="#686878" />))}

        {/* Small left tower */}
        <rect x="0" y="160" width="70" height="160" fill="#606070" />
        {[0,1].map(i=>(<rect key={i} x={i*35} y={145} width={24} height={18} fill="#606070" />))}

        {/* Small right tower */}
        <rect x="450" y="160" width="70" height="160" fill="#606070" />
        {[0,1].map(i=>(<rect key={i} x={450+i*35} y={145} width={24} height={18} fill="#606070" />))}

        {/* Roofs (red) */}
        <polygon points="170,60 260,0 350,60" fill="#C02020" />
        <polygon points="170,62 260,2 350,62" fill="none" stroke="#E03030" strokeWidth={2} />
        <polygon points="40,100 95,55 150,100" fill="#C02020" />
        <polygon points="370,100 425,55 480,100" fill="#C02020" />
        <polygon points="0,165 35,130 70,165" fill="#A01818" />
        <polygon points="450,165 485,130 520,165" fill="#A01818" />

        {/* Flags */}
        <line x1="260" y1="2" x2="260" y2="-15" stroke="#604030" strokeWidth={2} />
        <rect x="260" y="-15" width="22" height="12" fill="#CC2020" className="animate-flag" />
        <line x1="95" y1="56" x2="95" y2="38" stroke="#604030" strokeWidth={2} />
        <rect x="95" y="38" width="16" height="9" fill="#CC2020" className="animate-flag" style={{ animationDelay:"0.4s" }} />
        <line x1="425" y1="56" x2="425" y2="38" stroke="#604030" strokeWidth={2} />
        <rect x="425" y="38" width="16" height="9" fill="#CC2020" className="animate-flag" style={{ animationDelay:"0.8s" }} />

        {/* Windows */}
        <rect x="210" y="90" width="30" height="40" rx="14" ry="14" fill="#FFA030" opacity="0.85" />
        <rect x="280" y="90" width="30" height="40" rx="14" ry="14" fill="#FFA030" opacity="0.85" />
        <rect x="65" y="130" width="22" height="30" rx="10" ry="10" fill="#FFA030" opacity="0.75" />
        <rect x="390" y="130" width="22" height="30" rx="10" ry="10" fill="#FFA030" opacity="0.75" />
        <rect x="100" y="180" width="18" height="26" rx="8" ry="8" fill="#FF8820" opacity="0.7" />
        <rect x="400" y="180" width="18" height="26" rx="8" ry="8" fill="#FF8820" opacity="0.7" />

        {/* Torches */}
        <rect x="198" y="268" width="6" height="14" fill="#8A6030" />
        <rect x="196" y="258" width="10" height="12" fill="#FF8800" className="animate-torch" />
        <rect x="198" y="256" width="6" height="6" fill="#FFDD00" className="animate-torch" />

        <rect x="316" y="268" width="6" height="14" fill="#8A6030" />
        <rect x="314" y="258" width="10" height="12" fill="#FF8800" className="animate-torch" style={{animationDelay:"0.3s"}} />
        <rect x="316" y="256" width="6" height="6" fill="#FFDD00" className="animate-torch" style={{animationDelay:"0.3s"}} />

        {/* Castle wall shadow */}
        <rect x="60" y="380" width="400" height="8" fill="#1A1228" opacity="0.5" />
      </svg>
    </div>
  );
}
