"use client";
import { useState, useCallback } from "react";
import { GuardSprite, PrincessSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

const SPEECH = `Veja, princesa...
O brilho das estrelas está em seus olhos...
E a beleza do luar está em seu sorriso.

Eu trouxe você até este lugar porque queria
dizer que você é uma mulher incrível.

Mesmo sendo frágil e chorona às vezes... rsrs...
Você é extremamente forte.

Você suporta dores e responsabilidades que
fariam qualquer pessoa desistir...
Mas continua seguindo em frente.

Eu admiro muito você. Sou seu fã.

Olhar nos seus olhos é como observar o
pôr do sol refletindo no oceano.

Ver seu sorriso é como contemplar a lua cheia:
algo suave e lindo, mas poderoso o suficiente
para mover mares inteiros.

Seu coração é bonito.
Sua presença traz paz.

Se eu tivesse que sofrer tudo novamente...
Perder tudo outra vez...
E atravessar o inferno apenas para estar aqui...

Eu faria tudo de novo sem hesitar.

Em tão pouco tempo...
Você se tornou alguém muito importante para mim.

Então nunca se esqueça da sua força.
E nunca se esqueça de que jamais estará sozinha.

Estarei ao seu lado...
Mesmo quando eu já não estiver mais aqui.`;

const STARS10 = Array.from({length:60},(_, i)=>({
  x:(i*127.3)%100, y:(i*73.1)%80,
  size:i%4===0?3:i%3===0?2:1,
  dur:1.5+(i%5)*0.4,
}));

interface Firework10 { id:number; x:number; y:number; color:string }
const FW10 = ["#FF4444","#FF8800","#FFDD00","#44FF44","#44AAFF","#FF44CC","#FFFFFF"];

export default function Scene10({ onDone }: { onDone: () => void }) {
  const [fwList] = useState<Firework10[]>(
    Array.from({length:8},(_,i)=>({
      id:i,
      x:10+i*11,
      y:8+((i%3)*15),
      color:FW10[i%FW10.length],
    }))
  );

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>
      {/* Sky */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#040214 0%,#0A0428 40%,#100838 100%)" }} />

      {STARS10.map((s,i)=>(
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
        position:"absolute", top:30, right:140,
        width:80, height:80,
        background:"radial-gradient(circle at 38% 38%,#FFFFF0,#FFF8C0 55%,#E8D880)",
        borderRadius:"50%",
        boxShadow:"0 0 28px 14px rgba(255,240,180,0.42),0 0 65px 32px rgba(255,240,180,0.18)",
      }} />

      {/* Background fireworks (ambient) */}
      {fwList.map(fw=>(
        <div key={fw.id} style={{
          position:"absolute",
          left:`${fw.x}%`, top:`${fw.y}%`,
          width:60, height:60,
          borderRadius:"50%",
          background:`radial-gradient(circle,${fw.color}44 0%,transparent 70%)`,
          animation:`firework ${1.2+fw.id*0.3}s ease-out ${fw.id*0.5}s infinite`,
          boxShadow:`0 0 20px 10px ${fw.color}33`,
        }} />
      ))}

      {/* Platform */}
      <div style={{ position:"absolute", bottom:130, left:"50%", transform:"translateX(-50%)", width:600, height:28, background:"#505060" }} />
      <div style={{ position:"absolute", bottom:118, left:"50%", transform:"translateX(-50%)", width:640, height:14, background:"#606070" }} />
      {Array.from({length:12},(_,i)=>(
        <div key={i} style={{ position:"absolute", bottom:155, left:`calc(50% - 300px + ${i*52}px)`, width:36, height:30, background:"#505060" }} />
      ))}

      {/* Wall */}
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:640, height:130, background:"linear-gradient(180deg,#484858,#3A3848)" }} />

      {/* Distant hills */}
      {[
        {left:-40,w:200,h:90,color:"#1A1A2A"},
        {left:150,w:250,h:72,color:"#151525"},
        {left:380,w:300,h:100,color:"#1E1E30"},
        {left:700,w:260,h:82,color:"#161626"},
        {left:950,w:280,h:95,color:"#1A1A2A"},
        {left:1150,w:200,h:72,color:"#151525"},
      ].map((h2,i)=>(
        <div key={i} style={{ position:"absolute", bottom:130, left:h2.left, width:h2.w, height:h2.h, background:h2.color, borderRadius:"40% 40% 0 0" }} />
      ))}

      {/* Characters side by side */}
      <div style={{ position:"absolute", bottom:190, left:"50%", transform:"translateX(-200px)", imageRendering:"pixelated" }}>
        <GuardSprite scale={3} />
      </div>
      <div style={{ position:"absolute", bottom:190, left:"50%", transform:"translateX(50px)", imageRendering:"pixelated" }}>
        <PrincessSprite scale={3} happy />
      </div>

      {/* Firework reflections */}
      <div style={{
        position:"absolute", bottom:160, left:"50%", transform:"translateX(-50%)",
        width:350, height:220,
        background:"radial-gradient(ellipse,rgba(255,180,80,0.08) 0%,transparent 70%)",
        animation:"torch-flicker 1.2s ease-in-out infinite",
        pointerEvents:"none",
      }} />

      <DialogBox
        speaker="SEGURANÇA"
        text={SPEECH}
        onDone={onDone}
        speed={28}
      />
    </div>
  );
}
