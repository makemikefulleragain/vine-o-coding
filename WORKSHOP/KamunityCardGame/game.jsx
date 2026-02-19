/* -----------------------------------------------------
   Kamunity Card Game – Client (React + Socket.IO)
   ----------------------------------------------------- */
   import React, { useState, useEffect, useRef } from "react";

   export default function KamunityCardGame() {
     const [game, setGame] = useState(null);      // full game state
     const socketRef       = useRef(null);
     const [name, setName] = useState("");
   
     /* Connect to server once */
     useEffect(() => {
       const sock = window.io("ws://localhost:3000");
       socketRef.current = sock;
   
       const playerName = prompt("Enter your name") ||
                          `Player_${Math.floor(Math.random() * 99)}`;
       setName(playerName);
       sock.emit("join", playerName);
   
       sock.on("state", data => setGame({ ...data }));
   
       return () => sock.disconnect();
     }, []);
   
     if (!game) {
       return <p style={{ fontFamily: "system-ui" }}>Connecting…</p>;
     }
   
     /* Helper to emit events */
     const send = ev => socketRef.current.emit(ev);
   
     /* --- Inline styles --- */
     const table = {
       display: "flex", flexDirection: "column",
       alignItems: "center", fontFamily: "system-ui", userSelect: "none"
     };
     const poker = {
       position: "relative", width: 600, height: 400, borderRadius: "50%",
       background: "#064e3b", boxShadow: "0 0 0 8px #065f46 inset"
     };
     const centre = {
       position: "absolute", top: "50%", left: "50%",
       transform: "translate(-50%, -50%)", color: "#fff", textAlign: "center"
     };
     const seat = angle => ({
       position: "absolute", top: "50%", left: "50%",
       transform: `translate(-50%, -50%) rotate(${angle}deg) translate(240px) rotate(-${angle}deg)`,
       textAlign: "center", color: "#fff"
     });
     const card = {
       background: "#fff", padding: "6px 10px", borderRadius: 6,
       margin: 4, boxShadow: "0 2px 4px rgba(0,0,0,.2)", minWidth: 120
     };
     const btn = disabled => ({
       margin: 4, padding: "8px 16px", border: "none", borderRadius: 6,
       cursor: disabled ? "not-allowed" : "pointer",
       background: "#10b981", color: "#fff", opacity: disabled ? 0.5 : 1
     });
   
     /* Player seats (max 6) */
     const seatAngles = [90, 30, -30, -90, 150, -150];
     const playerIds  = Object.keys(game.players);
   
     return (
       <div style={table}>
         <h1>Kamunity Poker‑table</h1>
   
         <div style={poker}>
           {/* Centre project + resources */}
           <div style={centre}>
             {game.project ? (
               <div style={{ ...card, background: "#fef3c7" }}>
                 <strong>{game.project.title}</strong>
                 <div style={{ fontSize: 12 }}>{game.project.description}</div>
               </div>
             ) : (
               <div style={{ color: "#d1d5db" }}>No project yet</div>
             )}
   
             <div style={{ marginTop: 8 }}>
               {game.resources.map((r, i) => (
                 <div key={i} style={card}>{r}</div>
               ))}
             </div>
   
             <p style={{ marginTop: 8 }}>{game.message}</p>
           </div>
   
           {/* Player seats */}
           {playerIds.map((pid, idx) => {
             const p   = game.players[pid];
             const pos = seat(seatAngles[idx] || 0);
             return (
               <div key={pid} style={pos}>
                 <div style={{
                   ...card,
                   background: pid === socketRef.current.id ? "#d1fae5" : "#e5e7eb"
                 }}>
                   {p.name}
                 </div>
               </div>
             );
           })}
         </div>
   
         {/* Control buttons */}
         <div style={{ marginTop: 16 }}>
           {game.phase === "chat"   && <button style={btn(false)} onClick={() => send("newIdea")}>New Idea</button>}
           {game.phase === "plan"   && <button style={btn(false)} onClick={() => send("drawResource")}>Draw Resource</button>}
           {game.phase === "act"    && <button style={btn(false)} onClick={() => send("doAction")}>Do Action</button>}
           {game.phase === "review" && <button style={btn(false)} onClick={() => send("review")}>Review</button>}
           {game.phase === "reward" && <button style={btn(false)} onClick={() => send("reset")}>Play Again</button>}
         </div>
   
         <p style={{ fontSize: 12, color: "#6b7280" }}>
           You are <strong>{name}</strong>
         </p>
       </div>
     );
   }
   