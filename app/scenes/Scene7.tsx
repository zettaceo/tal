"use client";
import { useState, useCallback } from "react";
import { GuardSprite, PrincessSprite } from "../components/Sprites";
import DialogBox from "../components/DialogBox";

export default function Scene7({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"dialog" | "box" | "zoom">("dialog");
  const [zoomBtn, setZoomBtn] = useState(false);

  const handleDialogDone = useCallback(() => setPhase("box"), []);

  return (
    <div className="animate-scene" style={{ width:1280, height:720, position:"relative", overflow:"hidden", imageRendering:"pixelated" }}>
      {/* BG */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,#1A0C30 0%,#2A1848 40%,#1E1038 100%)" }} />

      {/* Columns */}
      {[60,220,1020,1180].map((x,i)=>(
        <div key={i} style={{ position:"absolute", bottom:0, left:x }}>
          <div style={{ width:50, height:20, background:"#8070A0", borderRadius:"4px 4px 0 0" }} />
          <div style={{ width:36, height:480, background:"linear-gradient(90deg,#4A3870,#6A5898,#4A3870)", marginLeft:7 }} />
          <div style={{ width:54, height:16, background:"#5A4888", marginLeft:-2 }} />
        </div>
      ))}

      {/* Carpet */}
      <div style={{ position:"absolute", bottom:0, left:"35%", width:"30%", height:"100%", background:"linear-gradient(90deg,transparent,#8A1020 8%,#A01828 50%,#8A1020 92%,transparent)" }} />

      {/* Floor */}
      {Array.from({length:10},(_,col)=>Array.from({length:5},(_,row)=>(
        <div key={`${col}-${row}`} style={{
          position:"absolute", left:col*128, top:560+row*40,
          width:127, height:39,
          border:"1px solid #2A1848",
          background:(col+row)%2===0?"#3A2858":"#2E2050",
        }} />
      )))}

      {/* Guard center-left */}
      <div style={{ position:"absolute", bottom:195, left:420, imageRendering:"pixelated" }}>
        <GuardSprite scale={3} />
      </div>

      {/* Princess right */}
      <div style={{ position:"absolute", bottom:260, right:220, imageRendering:"pixelated" }}>
        <PrincessSprite scale={3} />
      </div>

      {/* Box with big red button */}
      {(phase === "box" || phase === "zoom") && (
        <div style={{
          position:"absolute",
          bottom:220,
          left: phase === "zoom" ? "50%" : 540,
          transform: phase === "zoom" ? "translateX(-50%) scale(3)" : "none",
          transition:"all 0.8s cubic-bezier(0.34,1.56,0.64,1)",
          zIndex:50,
          imageRendering:"pixelated",
        }}>
          {/* Box */}
          <div style={{
            width:80, height:60,
            background:"#1A1A1A",
            border:"3px solid #444",
            boxShadow:"4px 4px 0 #000",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            gap:8,
            padding:8,
          }}>
            {/* Red button */}
            <div
              className="animate-btn"
              onClick={() => { setZoomBtn(true); setTimeout(onDone, 1000); }}
              style={{
                width:36, height:36,
                background:"radial-gradient(circle at 38% 35%,#FF6666,#CC1111)",
                borderRadius:"50%",
                border:"3px solid #880000",
                boxShadow:"0 4px 0 #550000,0 0 12px rgba(220,50,50,0.7)",
                cursor:"pointer",
                position:"relative",
              }}
            >
              <div style={{ position:"absolute", top:7, left:7, width:10, height:6, background:"rgba(255,255,255,0.4)", borderRadius:4 }} />
            </div>
            <div style={{ color:"#FFFFFF", fontSize:4, fontFamily:"'Press Start 2P',monospace", textAlign:"center", letterSpacing:0.5 }}>CLIQUE</div>
          </div>
        </div>
      )}

      {phase === "dialog" && (
        <DialogBox
          speaker="SEGURANÇA"
          text={"Existem algumas coisas que quero que você saiba...\nAperte este botão se quiser continuar."}
          onDone={handleDialogDone}
          speed={42}
        />
      )}
    </div>
  );
}
