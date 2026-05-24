"use client";
import DialogBox from "../components/DialogBox";

// ── Static star data ──────────────────────────────────────────────────────────
const STARS = Array.from({length:70},(_,i)=>({
  x:(i*137.508)%100, y:(i*83.721)%65,
  sz: i%8===0?4:i%5===0?3:i%3===0?2:1,
  cross: i%7===0,
  dur: 1.0+(i%6)*0.45,
}));

export default function Scene1({ onDone }: { onDone: () => void }) {
  return (
    <div className="scene-in" style={{width:1280,height:720,position:"relative",overflow:"hidden",imageRendering:"pixelated"}}>

      {/* ── SKY ──────────────────────────────────────────────────────── */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#050118 0%,#0D0838 30%,#1A1260 55%,#241A7A 75%,#1C1860 100%)"}}/>

      {/* Stars */}
      {STARS.map((s,i)=>(
        s.cross ? (
          <div key={i} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.sz*3,height:s.sz*3}}>
            <div className="anim-twinkle" style={{
              position:"absolute",top:0,left:"33%",width:"34%",height:"100%",
              background:"#FFFDE8",imageRendering:"pixelated","--dur":`${s.dur}s`,
            } as React.CSSProperties}/>
            <div className="anim-twinkle" style={{
              position:"absolute",left:0,top:"33%",width:"100%",height:"34%",
              background:"#FFFDE8",imageRendering:"pixelated","--dur":`${s.dur}s`,
            } as React.CSSProperties}/>
          </div>
        ) : (
          <div key={i} className="anim-twinkle" style={{
            position:"absolute",left:`${s.x}%`,top:`${s.y}%`,
            width:s.sz,height:s.sz,
            background:i%5===0?"#FFEEAA":i%4===0?"#AADDFF":"#FFFFFF",
            imageRendering:"pixelated","--dur":`${s.dur}s`,
          } as React.CSSProperties}/>
        )
      ))}

      {/* ── MOON ──────────────────────────────────────────────────────── */}
      <div className="anim-moon" style={{
        position:"absolute",top:42,left:148,
        width:96,height:96,borderRadius:"50%",
        background:"radial-gradient(circle at 35% 32%,#FFFFF4,#FFF9C0 50%,#F0E048 85%,#D4C030)",
        boxShadow:"0 0 40px 18px rgba(255,240,120,0.5),0 0 90px 45px rgba(255,240,120,0.18)",
      }}>
        <div style={{position:"absolute",top:22,left:18,width:18,height:14,borderRadius:"50%",border:"2px solid rgba(180,160,20,0.4)"}}/>
        <div style={{position:"absolute",top:52,left:52,width:12,height:10,borderRadius:"50%",border:"2px solid rgba(180,160,20,0.3)"}}/>
        <div style={{position:"absolute",top:36,left:12,width:8,height:7,borderRadius:"50%",border:"2px solid rgba(180,160,20,0.3)"}}/>
      </div>

      {/* Moon glow halo */}
      <div style={{position:"absolute",top:14,left:120,width:152,height:152,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(255,240,120,0.12) 30%,transparent 70%)",pointerEvents:"none"}}/>

      {/* ── BACKGROUND — Crystal/Bubble mountains ─────────────────────── */}
      <CrystalMountains />

      {/* ── MID — Dark green hills ───────────────────────────────────── */}
      <MidHills />

      {/* ── GROUND ───────────────────────────────────────────────────── */}
      {/* Soil */}
      <div style={{position:"absolute",bottom:0,left:0,width:"100%",height:230,
        background:"linear-gradient(180deg,#2A1A08 0%,#3E2810 40%,#4A3018 100%)"}}/>
      {/* Grass top */}
      <div style={{position:"absolute",bottom:200,left:0,width:"100%",height:36,
        background:"linear-gradient(180deg,#38C018 0%,#2CA010 60%,#208010 100%)"}}/>
      {/* Grass highlight */}
      <div style={{position:"absolute",bottom:228,left:0,width:"100%",height:10,
        background:"rgba(80,220,50,0.5)"}}/>
      {/* Grass detail notches */}
      {Array.from({length:64},(_,i)=>(
        <div key={i} style={{position:"absolute",bottom:229,left:i*20,width:10,height:i%3===0?8:i%2===0?6:5,
          background:"#40D020",imageRendering:"pixelated"}}/>
      ))}

      {/* ── PATH ─────────────────────────────────────────────────────── */}
      {/* Path from guard toward castle hill */}
      <div style={{position:"absolute",bottom:0,
        left:260,width:340,height:230,
        background:"linear-gradient(160deg,#8A6830 0%,#7A5820 50%,#6A4A18 100%)",
        clipPath:"polygon(10% 0%,90% 0%,100% 100%,0% 100%)",
      }}/>
      <div style={{position:"absolute",bottom:0,left:262,width:336,height:8,
        background:"#A07840",opacity:0.6}}/>

      {/* ── TREES (left) ──────────────────────────────────────────────── */}
      <PixelTree x={55}  h={140} w={34} canopyH={90} canopyW={70} shadow />
      <PixelTree x={130} h={110} w={28} canopyH={72} canopyW={56} />
      <PixelTree x={188} h={125} w={30} canopyH={82} canopyW={62} shadow />

      {/* Bushes near path */}
      <Bush x={255} />
      <Bush x={600} />
      <Bush x={650} />

      {/* ── CASTLE ───────────────────────────────────────────────────── */}
      <Castle />

      {/* ── GUARD ────────────────────────────────────────────────────── */}
      <GuardPixel x={300} />

      {/* ── SMALL FLOWERS ────────────────────────────────────────────── */}
      {[680,720,750,800,850,1050,1080].map((x,i)=>(
        <Flower key={i} x={x} y={208} color={i%2===0?"#FF88AA":"#FFFF66"}/>
      ))}

      {/* ── DIALOG ───────────────────────────────────────────────────── */}
      <DialogBox
        speaker="SEGURANÇA"
        text={"Nossa… a Princesa Tal tem tantas responsabilidades...\nEla está sobrecarregada física e emocionalmente...\nVou até a sala do trono animá-la."}
        onDone={onDone}
        speed={38}
      />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CrystalMountains() {
  const shapes = [
    {x:320,w:80,h:220,color:"#1050A8"},
    {x:380,w:100,h:280,color:"#0E48A0"},
    {x:460,w:75,h:200,color:"#1460B8"},
    {x:520,w:110,h:300,color:"#0C4090"},
    {x:610,w:90,h:250,color:"#1252A8"},
    {x:685,w:70,h:190,color:"#0E48A0"},
    {x:740,w:95,h:260,color:"#1058B0"},
    {x:820,w:80,h:220,color:"#0C4490"},
    {x:880,w:60,h:170,color:"#124AAA"},
    {x:500,w:55,h:150,color:"#1868C0"},
    {x:650,w:50,h:140,color:"#1460B8"},
  ];
  return (
    <>
      {shapes.map((s,i)=>(
        <div key={i} style={{
          position:"absolute",
          bottom:198,
          left:s.x,
          width:s.w,
          height:s.h,
          background:`linear-gradient(180deg,${lighten(s.color,30)} 0%,${s.color} 60%,${darken(s.color,20)} 100%)`,
          borderRadius:`${s.w*0.48}px ${s.w*0.48}px ${s.w*0.3}px ${s.w*0.3}px`,
          opacity:0.85,
          imageRendering:"pixelated",
        }}>
          {/* Highlight streak */}
          <div style={{position:"absolute",top:"10%",left:"20%",width:"15%",height:"55%",
            background:"rgba(255,255,255,0.12)",borderRadius:"50%"}}/>
        </div>
      ))}
    </>
  );
}

function MidHills() {
  const hills = [
    {left:-60,w:340,h:130,color:"#1A4010"},
    {left:240,w:300,h:110,color:"#183A0E"},
    {left:480,w:280,h:120,color:"#1C4612"},
    {left:700,w:320,h:115,color:"#163A0C"},
    {left:960,w:340,h:125,color:"#1A4010"},
    {left:1150,w:200,h:105,color:"#183A0E"},
  ];
  return (
    <>
      {hills.map((h,i)=>(
        <div key={i} style={{
          position:"absolute",
          bottom:196,
          left:h.left,
          width:h.w,
          height:h.h,
          background:h.color,
          borderRadius:"50% 50% 0 0",
          imageRendering:"pixelated",
        }}>
          <div style={{position:"absolute",top:18,left:"30%",width:"20%",height:"30%",
            background:"rgba(255,255,255,0.04)",borderRadius:"50%"}}/>
        </div>
      ))}
    </>
  );
}

function PixelTree({x,h,w,canopyH,canopyW,shadow}:{x:number,h:number,w:number,canopyH:number,canopyW:number,shadow?:boolean}) {
  return (
    <div style={{position:"absolute",bottom:200,left:x}}>
      {/* Trunk */}
      <div style={{position:"absolute",bottom:0,left:(canopyW-w)/2,width:w,height:h,
        background:"linear-gradient(90deg,#5A3010,#7A4820,#5A3010)",imageRendering:"pixelated"}}/>
      {/* Canopy layers */}
      <div style={{position:"absolute",bottom:h-20,left:0,width:canopyW,height:canopyH,
        background:"#1E6814",borderRadius:"50% 50% 35% 35%",imageRendering:"pixelated"}}/>
      <div style={{position:"absolute",bottom:h+canopyH*0.3,left:canopyW*0.12,width:canopyW*0.76,height:canopyH*0.55,
        background:"#256E1A",borderRadius:"50% 50% 30% 30%",imageRendering:"pixelated"}}/>
      <div style={{position:"absolute",bottom:h+canopyH*0.55,left:canopyW*0.24,width:canopyW*0.52,height:canopyH*0.38,
        background:"#2E7820",borderRadius:"50% 50% 30% 30%",imageRendering:"pixelated"}}/>
      {/* Highlight */}
      <div style={{position:"absolute",bottom:h+canopyH*0.2,left:canopyW*0.18,width:canopyW*0.25,height:canopyH*0.3,
        background:"rgba(80,200,50,0.25)",borderRadius:"50%"}}/>
      {/* Shadow */}
      {shadow && <div style={{position:"absolute",bottom:-6,left:canopyW*0.1,width:canopyW*0.8,height:8,
        background:"rgba(0,0,0,0.2)",borderRadius:"50%"}}/>}
    </div>
  );
}

function Bush({x}:{x:number}) {
  return (
    <div style={{position:"absolute",bottom:200,left:x}}>
      <div style={{width:32,height:20,background:"#1C5E14",borderRadius:"50% 50% 30% 30%"}}/>
      <div style={{position:"absolute",top:-8,left:4,width:24,height:18,background:"#248018",borderRadius:"50%"}}/>
    </div>
  );
}

function Flower({x,y,color}:{x:number,y:number,color:string}) {
  return (
    <div style={{position:"absolute",bottom:y,left:x}}>
      <div style={{width:4,height:8,background:"#38A030"}}/>
      <div style={{position:"absolute",top:-4,left:-2,width:8,height:8,background:color,borderRadius:"50%"}}/>
    </div>
  );
}

// ── Castle ────────────────────────────────────────────────────────────────────
function Castle() {
  return (
    <div style={{position:"absolute",bottom:198,right:20,imageRendering:"pixelated"}}>
      {/* Hill under castle */}
      <div style={{position:"absolute",bottom:-2,right:-20,width:540,height:140,
        background:"linear-gradient(180deg,#2A8020 0%,#206018 50%,#184A10 100%)",
        borderRadius:"50% 50% 0 0"}}/>
      <div style={{position:"absolute",bottom:60,right:10,width:480,height:100,
        background:"#245A1A",borderRadius:"50% 50% 0 0"}}/>

      <svg width={480} height={380} viewBox="0 0 480 380" style={{imageRendering:"pixelated",display:"block"}}>
        <defs>
          <pattern id="stone" x="0" y="0" width="32" height="20" patternUnits="userSpaceOnUse">
            <rect width="32" height="20" fill="#686878"/>
            <rect width="15" height="9" fill="#707082" rx="0"/>
            <rect x="17" y="10" width="15" height="9" fill="#707082"/>
            <rect width="32" height="1" fill="#505060" opacity="0.5"/>
            <rect y="10" width="32" height="1" fill="#505060" opacity="0.5"/>
          </pattern>
          <pattern id="stone2" x="0" y="0" width="32" height="20" patternUnits="userSpaceOnUse">
            <rect width="32" height="20" fill="#606072"/>
            <rect width="14" height="9" fill="#686878"/>
            <rect x="16" y="10" width="14" height="9" fill="#686878"/>
            <rect width="32" height="1" fill="#484858" opacity="0.6"/>
            <rect y="10" width="32" height="1" fill="#484858" opacity="0.6"/>
          </pattern>
        </defs>

        {/* ── Small right tower ── */}
        <rect x="400" y="150" width="80" height="180" fill="url(#stone2)"/>
        {/* battlements */}
        {[0,1,2].map(i=><rect key={i} x={400+i*28} y={133} width={20} height={20} fill="#606072"/>)}
        {/* Roof */}
        <polygon points="400,152 440,110 480,152" fill="#B82020"/>
        <polygon points="402,152 440,114 478,152" fill="none" stroke="#D83030" strokeWidth={2}/>

        {/* ── Left side tower ── */}
        <rect x="0" y="140" width="90" height="200" fill="url(#stone2)"/>
        {[0,1,2].map(i=><rect key={i} x={i*30} y={122} width={22} height={22} fill="#606072"/>)}
        <polygon points="0,142 45,95 90,142" fill="#C02828"/>
        <polygon points="2,142 45,99 88,142" fill="none" stroke="#E03030" strokeWidth={2}/>
        {/* left tower flag */}
        <line x1="45" x2="45" y1="96" y2="72" stroke="#5A3A10" strokeWidth={3}/>
        <rect x="45" y="72" width="28" height="16" fill="#CC2020" className="anim-flag"/>
        <rect x="45" y="72" width="28" height="4" fill="#EE3030" className="anim-flag"/>

        {/* ── Main center wall ── */}
        <rect x="58" y="100" width="364" height="250" fill="url(#stone)"/>

        {/* Wall top battlements */}
        {Array.from({length:11},(_,i)=>(
          <rect key={i} x={58+i*34} y={83} width={24} height={20} fill="#686878"/>
        ))}

        {/* ── Center main tower ── */}
        <rect x="150" y="40" width="180" height="280" fill="url(#stone)"/>
        {/* Center tower battlements */}
        {[0,1,2,3,4,5].map(i=>(
          <rect key={i} x={150+i*32} y={22} width={22} height={22} fill="#686878"/>
        ))}
        {/* Center tower windows */}
        <rect x="216" y="65" width="48" height="60" rx="22" ry="22" fill="#0A0818" opacity="0.9"/>
        <rect x="216" y="65" width="48" height="60" rx="22" ry="22" fill="none" stroke="#8870A0" strokeWidth={2}/>
        {/* Window glow */}
        <rect x="222" y="70" width="36" height="50" rx="18" ry="18" fill="#FF9A20" opacity="0.35"/>
        <rect x="224" y="72" width="16" height="28" rx="8" ry="8" fill="#FFB040" opacity="0.4"/>

        {/* Left window */}
        <rect x="72" y="150" width="32" height="42" rx="14" ry="14" fill="#0A0818" opacity="0.85"/>
        <rect x="77" y="155" width="22" height="32" rx="10" ry="10" fill="#FF9020" opacity="0.3"/>

        {/* Right window */}
        <rect x="376" y="150" width="32" height="42" rx="14" ry="14" fill="#0A0818" opacity="0.85"/>
        <rect x="381" y="155" width="22" height="32" rx="10" ry="10" fill="#FF9020" opacity="0.3"/>

        {/* ── Gate ── */}
        <rect x="190" y="230" width="100" height="120" fill="#08060E"/>
        <rect x="190" y="230" width="100" height="60" rx="48" ry="48" fill="#08060E"/>
        {/* Portcullis */}
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x={196+i*18} y={232} width={4} height={115} fill="#2A2838" opacity="0.9}"/>
        ))}
        <rect x="192" y="270" width="96" height="4" fill="#2A2838" opacity="0.8"/>
        <rect x="192" y="300" width="96" height="4" fill="#2A2838" opacity="0.7"/>
        {/* Gate arch stones */}
        <rect x="188" y="228" width="6" height="120" fill="#606070"/>
        <rect x="286" y="228" width="6" height="120" fill="#606070"/>

        {/* ── Roof (center tower) ── */}
        <polygon points="150,42 240,0 330,42" fill="#CC2828"/>
        <polygon points="152,42 240,4 328,42" fill="none" stroke="#EE3838" strokeWidth={2}/>
        {/* Roof shading */}
        <polygon points="240,0 240,42 150,42" fill="rgba(0,0,0,0.15)"/>

        {/* ── Center tower flag ── */}
        <line x1="240" x2="240" y1="2" y2="-22" stroke="#6A4020" strokeWidth={3}/>
        <rect x="240" y="-22" width="34" height="18" fill="#CC2020" className="anim-flag"/>
        <rect x="240" y="-22" width="34" height="5" fill="#EE3030" className="anim-flag"/>

        {/* ── Torches ── */}
        <TorchSVG x={182} y={218}/>
        <TorchSVG x={300} y={218}/>

        {/* Wall top shading */}
        <rect x="58" y="100" width="364" height="8" fill="rgba(255,255,255,0.06)"/>
        {/* Wall bottom shadow */}
        <rect x="58" y="342" width="364" height="8" fill="rgba(0,0,0,0.3)"/>
      </svg>
    </div>
  );
}

function TorchSVG({x,y}:{x:number,y:number}) {
  return (
    <g>
      {/* glow */}
      <ellipse cx={x+4} cy={y+4} rx={20} ry={28} fill="rgba(255,160,40,0.18)" className="anim-torch"/>
      {/* bracket */}
      <rect x={x} y={y+8} width={5} height={14} fill="#7A6030"/>
      <rect x={x-1} y={y+6} width={10} height={5} fill="#9A7838"/>
      {/* flame */}
      <rect x={x-2} y={y-8} width={12} height={16} rx={4} fill="#FF8800" className="anim-torch"/>
      <rect x={x} y={y-12} width={8} height={12} rx={3} fill="#FFD000" className="anim-torch"/>
      {/* floor light */}
      <ellipse cx={x+4} cy={y+380} rx={30} ry={8} fill="rgba(255,140,40,0.15)"/>
    </g>
  );
}

// ── Guard pixel art ────────────────────────────────────────────────────────────
function GuardPixel({x}:{x:number}) {
  const P = 4; // pixel size
  // Each number = color index, map below
  const C: Record<string,string> = {
    "H":"#F0C080", "A":"#909098", "a":"#A8A8B0", "K":"#1A1840",
    "L":"#6A4820", "G":"#C8A828", "B":"#000000", "S":"#D0D8E8",
    "s":"#E8EEF8", "r":"#C03028", "W":"#F0F0F0", "g":"#2A6020",
    ".":"transparent",
  };
  // 18 cols x 28 rows pixel art of guard (simplified)
  const rows = [
    "......AAAAAA......",
    ".....AAAAAAA......",
    "....AAAHHHHAA.....",
    "....AAHHHHHAA.....",
    "....AAHBBHBHA.....",
    "....AAHHHHHHAA....",
    "....AAHRRHHHA.....",
    "....AAHHHHHHAA....",
    "...KKaaaaaaaKK....",
    "..KKKaaSsaaaKKK...",
    "..KKaaSssaaaKK....",
    "...KaaSssaaK......",
    "....aaGGGGaa......",
    "....aaAaAaaa......",
    "....aAAAAAaa......",
    "....AAAAAaaa......",
    "....LAAAALaa......",
    "....LAAAALaa......",
    "....LAAAALaa......",
    "....LLLLLLaa......",
    "....LLLLLLaa......",
    "...LLAAAALLa......",
    "...LLAAAALLa......",
    "..LLLaaaLLL.......",
    "..LLLaaaLLL.......",
    ".LLLLLaaLLLL......",
    ".LLLLLaaLLLL......",
    "BLLLLLLBLLLLB.....",
  ];
  return (
    <div style={{position:"absolute",bottom:200,left:x,imageRendering:"pixelated"}}>
      {rows.map((row,ri)=>(
        <div key={ri} style={{display:"flex"}}>
          {row.split("").map((c,ci)=>(
            <div key={ci} style={{width:P,height:P,background:C[c]||"transparent",flexShrink:0}}/>
          ))}
        </div>
      ))}
      {/* Spear */}
      <div style={{
        position:"absolute",
        top:-P*6, right:-P*2,
        width:P*2, height:P*34,
        background:"linear-gradient(180deg,#D0D8E8 0%,#B8B8C8 20%,#A07840 30%,#8A6030 100%)",
      }}/>
      <div style={{position:"absolute",top:-P*6,right:-P*3,width:P*4,height:P*5,
        background:"#C8D0E0",clipPath:"polygon(50% 0%,100% 100%,0% 100%)"}}/>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function lighten(hex:string, amt:number):string {
  const n=parseInt(hex.slice(1),16);
  const r=Math.min(255,((n>>16)&0xFF)+amt);
  const g=Math.min(255,((n>>8)&0xFF)+amt);
  const b=Math.min(255,(n&0xFF)+amt);
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
}
function darken(hex:string, amt:number):string { return lighten(hex,-amt); }
