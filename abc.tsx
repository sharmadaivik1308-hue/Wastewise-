"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

/* ─── Fonts & Keyframes ────────────────────────────────────────────────────── */
const FontLink = () => (
<style>
    {
        ` @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cabinet+Grotesk:wght@400;500;700;800;900&display=swap');

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        @keyframes float {

            0%,
            100% {
                transform: translateY(0)
            }

            50% {
                transform: translateY(-8px)
            }
        }

        @keyframes shimmer {
            0% {
                background-position: -200% center
            }

            100% {
                background-position: 200% center
            }
        }

        @keyframes confetti-fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1
            }

            100% {
                transform: translateY(90px) rotate(400deg);
                opacity: 0
            }
        }

        @keyframes bounce-in {
            0% {
                transform: scale(0);
                opacity: 0
            }

            60% {
                transform: scale(1.18)
            }

            80% {
                transform: scale(0.94)
            }

            100% {
                transform: scale(1);
                opacity: 1
            }
        }

        @keyframes pulse-ring {
            0% {
                transform: scale(0.6);
                opacity: 0.9
            }

            100% {
                transform: scale(2);
                opacity: 0
            }
        }

        `
    }
</style>
);

/* ─── Item name mapping ────────────────────────────────────────────────────── */
const ITEM_NAMES: Record<string, string> = {
  plastic: "Plastic Item", glass: "Glass Item", paper: "Paper Item",
  organic: "Organic Waste", metal: "Metal Item", ewaste: "E-Waste",
  cardboard: "Cardboard", trash: "General Waste",
};

/* ─── Waste Config ─────────────────────────────────────────────────────────── */
const W = {
plastic:{ bin:"Blue Recycling Bin", binColor:"#2563EB", light:"#3B82F6", bg:"#EFF6FF", acc:"#BFDBFE", dark:"#1D4ED8",
emoji:"🧴", pts:15,
tip:"Rinse before tossing — food residue contaminates the whole batch. Remove caps.", decompose:"450+ years",
fact:"Recycling one plastic bottle saves enough energy to power a 60-watt bulb for 6 hours.",
impact:"Prevents microplastic pollution that harms marine ecosystems.",
praise:["♻ Fantastic recycling move!","🌊 You're protecting our oceans!","💙 Blue bin hero!"] },
glass:{ bin:"Blue Recycling Bin", binColor:"#2563EB", light:"#3B82F6", bg:"#EFF6FF", acc:"#BFDBFE", dark:"#1D4ED8",
emoji:"🍾", pts:20,
tip:"Wrap broken shards in newspaper. Remove metal lids before disposal.", decompose:"1 million years",
fact:"Glass can be recycled endlessly without losing quality or purity.",
impact:"Reduces demand for sand mining & saves enormous production energy.",
praise:["🍾 Glass act! Brilliant!","✨ Recycling superstar!","💎 Crystal-clear eco-thinking!"] },
paper:{ bin:"Yellow Recycling Bin",binColor:"#CA8A04", light:"#EAB308", bg:"#FEFCE8", acc:"#FDE68A", dark:"#A16207",
emoji:"📄", pts:10,
tip:"Keep paper dry — wet paper cannot be recycled. Remove staples and tape.", decompose:"2–6 weeks",
fact:"Recycling one tonne of paper saves 17 trees and 7,000 gallons of water.",
impact:"Reduces deforestation and prevents methane from paper in landfills.",
praise:["📰 Paper-perfect choice!","🌳 You just saved a tree!","⭐ Eco champion spotted!"], kabadiwala:true },
organic:{ bin:"Green Compost Bin", binColor:"#16A34A", light:"#22C55E", bg:"#F0FDF4", acc:"#BBF7D0", dark:"#15803D",
emoji:"🍌", pts:12,
tip:"Compost at home if possible. No cooking oil, meat, or dairy scraps.", decompose:"1–6 months",
fact:"Composting organic waste can cut your household's carbon footprint by up to 23%.",
impact:"Prevents methane production in landfills & creates rich compost.",
praise:["🌱 Growing a greener world!","🍀 Nature thanks you!","🌍 Earth hero in action!"] },
metal:{ bin:"Yellow Recycling Bin",binColor:"#CA8A04", light:"#EAB308", bg:"#FEFCE8", acc:"#FDE68A", dark:"#A16207",
emoji:"🥫", pts:25,
tip:"Crush cans to save space. Rinse food residue before recycling.", decompose:"80–200 years",
fact:"Recycling aluminium uses 95% less energy than producing it from raw ore.",
impact:"Saves bauxite mining & dramatically cuts industrial CO₂ emissions.",
praise:["🥫 Metallically amazing!","⚡ Energy saver supreme!","🏆 Top-tier eco decision!"], kabadiwala:true },
ewaste:{ bin:"Red E-Waste Bin", binColor:"#DC2626", light:"#EF4444", bg:"#FEF2F2", acc:"#FECACA", dark:"#B91C1C",
emoji:"🔋", pts:30,
tip:"Never bin with regular waste. Find an authorised e-waste drop point near you.", decompose:"Hundreds of years",
fact:"Recycling 1 million laptops saves energy equivalent to powering 3,500 US homes annually.",
impact:"Prevents toxic leaching of lead, mercury & cadmium into soil and groundwater.",
praise:["🔋 Charged with eco-responsibility!","⚡ E-waste warrior!","🚨 You prevented toxic pollution!"] },
};

/* ─── Tiers ────────────────────────────────────────────────────────────────── */
const TIERS = [
{min:0, max:49, name:"Seedling", icon:"🌱", color:"#16A34A", bg:"#F0FDF4"},
{min:50, max:149, name:"Sprout", icon:"🌿", color:"#0891B2", bg:"#ECFEFF"},
{min:150,max:299, name:"Eco-Warrior",icon:"⚡", color:"#7C3AED", bg:"#F5F3FF"},
{min:300,max:499, name:"Guardian", icon:"🛡️", color:"#D97706", bg:"#FFFBEB"},
{min:500,max:9999,name:"Planet Hero",icon:"🌍", color:"#DC2626", bg:"#FEF2F2"},
];
const getTier = pts => TIERS.find(t => pts>=t.min && pts<=t.max) || TIERS[0]; /* ─── Confetti
    ─────────────────────────────────────────────────────────────── */ const
    CC=["#22C55E","#3B82F6","#EAB308","#EF4444","#8B5CF6","#EC4899","#F97316"]; function Confetti({active}){ if(!active)
    return null; return( <div
    style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",pointerEvents:"none",zIndex:50}}>
    {Array.from({length:28}).map((_,i)=>(
    <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:0, width: i%3===0?8:10,
        height:i%3===0?8:6, borderRadius: i%3===0?"50%":2, background:CC[i%CC.length], animation:`confetti-fall
        ${0.7+Math.random()*0.7}s ease-in ${Math.random()*0.5}s forwards`, }} />
    ))}
    </div>
    );
    }

    /* ─── Animated Counter ─────────────────────────────────────────────────────── */
    function AnimCount({value}){
    const [d,setD]=useState(0);
    useEffect(()=>{
    let cur=d, target=value;
    if(cur===target) return;
    const step=Math.max(1,Math.ceil(Math.abs(target-cur)/20));
    const t=setInterval(()=>{
    cur=cur<target?Math.min(cur+step,target):Math.max(cur-step,target); setD(cur); if(cur===target) clearInterval(t);
        },28); return ()=>clearInterval(t);
        },[value]);
        return <>{d}</>;
        }

        /* ─── Realistic Bin SVG ────────────────────────────────────────────────────── */
        function Bin({color,acc,dark,open}){
        return(
        <svg width="130" height="160" viewBox="0 0 130 160" fill="none">
            <ellipse cx="65" cy="156" rx="44" ry="6" fill="rgba(0,0,0,0.09)" />
            <path d="M20 58 Q18 152 22 156 Q65 160 108 156 Q112 152 110 58 Z" fill={acc} stroke={color}
                strokeWidth="2.5" />
            <path d="M28 62 Q26 138 30 148 Q38 151 44 148 Q42 138 40 62 Z" fill="white" opacity="0.16" />
            <line x1="46" y1="70" x2="44" y2="144" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <line x1="65" y1="70" x2="65" y2="144" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <line x1="84" y1="70" x2="86" y2="144" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <text x="65" y="118" textAnchor="middle" fontSize="28" fill={color} opacity="0.2">♻</text>
            <rect x="16" y="50" width="98" height="14" rx="7" fill={color} />
            <rect x="20" y="50" width="90" height="7" rx="3.5" fill={dark} opacity="0.25" />
            <motion.g animate={open?{rotate:-42,y:-14,x:-22}:{rotate:0,y:0,x:0}}
                transition={{type:"spring",stiffness:300,damping:22}} style={{originX:"16px",originY:"50px"}}>
                <rect x="12" y="36" width="106" height="18" rx="9" fill={color} />
                <rect x="16" y="36" width="98" height="8" rx="4" fill={dark} opacity="0.18" />
                <rect x="50" y="22" width="30" height="18" rx="9" fill={color} />
                <rect x="55" y="27" width="20" height="8" rx="4" fill={dark} opacity="0.22" />
            </motion.g>
        </svg>
        );
        }

        /* ─── Physics Drop Animation ───────────────────────────────────────────────── */
        function DropAnimation({cfg,itemName,animKey}){
        const [phase,setPhase]=useState("idle");
        const [splash,setSplash]=useState(false);
        const [confetti,setConfetti]=useState(false);

        useEffect(()=>{
        setPhase("idle"); setSplash(false); setConfetti(false);
        const t1=setTimeout(()=>setPhase("drop"),350);
        const t2=setTimeout(()=>{setPhase("open");setSplash(true);},1380);
        const t3=setTimeout(()=>setPhase("close"),1950);
        const t4=setTimeout(()=>{setPhase("done");setConfetti(true);},2420);
        const t5=setTimeout(()=>setConfetti(false),3300);
        return ()=>[t1,t2,t3,t4,t5].forEach(clearTimeout);
        },[animKey]);

        const dropping=phase==="drop";
        const open=phase==="open";

        return(
        <div
            style={{position:"relative",height:370,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",paddingBottom:8}}>
            <Confetti active={confetti} />

            {/* Floating tag */}
            <motion.div animate={{opacity:phase==="idle" ?1:0,y:phase==="idle" ?0:-8}} transition={{duration:0.3}}
                style={{ position:"absolute",top:10, background:cfg.bg,border:`1.5px solid ${cfg.acc}`,
                borderRadius:24,padding:"5px 16px", fontSize:13,fontWeight:700,color:cfg.binColor, fontFamily:"'Plus
                Jakarta Sans',sans-serif", animation:"float 2.2s ease-in-out infinite",zIndex:10, }}>{cfg.emoji}
                {itemName}</motion.div>

            {/* Falling item */}
            <AnimatePresence>
                {phase!=="done" && (
                <motion.div key="item" initial={{y:-20,scale:1,opacity:1,rotate:0}} animate={dropping
                    ?{y:[0,25,55,110,168,185,178], scale:[1,1.06,1.02,0.96,0.7,0.38,0.2], rotate:[0,-6,4,-10,14,-5,0],
                    opacity:[1,1,1,1,1,0.5,0]} :{y:-20,scale:1,rotate:0,opacity:1}}
                    transition={{duration:1.08,ease:[0.25,0.46,0.45,0.94],times:[0,0.12,0.28,0.52,0.78,0.9,1]}}
                    style={{position:"absolute",top:30,fontSize:64,zIndex:8, filter:"drop-shadow(0 8px 14px
                    rgba(0,0,0,0.18))"}}>{cfg.emoji}</motion.div>
                )}
            </AnimatePresence>

            {/* Tumble blur streaks */}
            {dropping && [0.18,0.32,0.46,0.60].map((d,i)=>(
            <motion.div key={i} initial={{opacity:0,scaleY:0}} animate={{opacity:[0,0.5,0],scaleY:[0,1,0]}}
                transition={{delay:d,duration:0.38}} style={{position:"absolute",top:82+i*32,width:4,height:24,
                borderRadius:2,background:cfg.binColor,opacity:0,zIndex:6}} />
            ))}

            {/* Impact ring */}
            <AnimatePresence>
                {splash && (
                <motion.div key="ring" initial={{scale:0,opacity:0.9}} animate={{scale:2.1,opacity:0}}
                    exit={{opacity:0}} transition={{duration:0.55,ease:"easeOut"}}
                    style={{position:"absolute",bottom:148, width:52,height:52,borderRadius:"50%", border:`3px solid
                    ${cfg.binColor}`,zIndex:7}} />
                )}
            </AnimatePresence>

            {/* Bin */}
            <motion.div animate={open?{y:[-4,0],rotate:[-2,2,-1,0]}:{y:0}} transition={{duration:0.4,delay:0.05}}
                style={{zIndex:5}}>
                <Bin color={cfg.light} acc={cfg.acc} dark={cfg.dark} open={open} />
            </motion.div>

            {/* Bin label */}
            <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.25}} style={{
                marginTop:8,background:cfg.bg, border:`2px solid ${cfg.acc}`,borderRadius:99, padding:"6px
                20px",fontSize:13,fontWeight:800, color:cfg.binColor,fontFamily:"'Plus Jakarta Sans',sans-serif", }}>
                {cfg.bin}</motion.div>

            {/* Settle glow */}
            <AnimatePresence>
                {phase==="done" && (
                <motion.div key="glow" initial={{scale:0.5,opacity:0.7}} animate={{scale:1.9,opacity:0}}
                    exit={{opacity:0}} transition={{duration:0.75}}
                    style={{position:"absolute",bottom:118,width:70,height:70,
                    borderRadius:"50%",background:cfg.binColor,zIndex:3}} />
                )}
            </AnimatePresence>
        </div>
        );
        }

        /* ─── Confidence Bar ───────────────────────────────────────────────────────── */
        function ConfBar({value,color}){
        const pct=Math.round(value*100);
        return(
        <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,color:"#6B7280",fontWeight:500}}>AI Confidence</span>
                <span style={{fontSize:12,fontWeight:800,color}}>{pct}%</span>
            </div>
            <div style={{background:"#F3F4F6",borderRadius:99,height:10,overflow:"hidden"}}>
                <motion.div initial={{width:0}} animate={{width:`${pct}%`}}
                    transition={{duration:1,ease:"easeOut",delay:0.2}} style={{height:"100%",borderRadius:99,
                    background:`linear-gradient(90deg,${color}cc,${color})`}} />
            </div>
        </div>
        );
        }

        /* ─── Appreciation Banner ──────────────────────────────────────────────────── */
        function Appreciation({cfg}){
        const msg=cfg.praise[Math.floor(Math.random()*cfg.praise.length)];
        return(
        <motion.div initial={{opacity:0,scale:0.85,y:20}} animate={{opacity:1,scale:1,y:0}}
            transition={{delay:2.6,type:"spring",stiffness:280,damping:20}} style={{
            background:`linear-gradient(135deg,${cfg.bg},white)`, border:`2px solid ${cfg.acc}`,borderRadius:22,
            padding:"18px 22px",textAlign:"center", marginBottom:16, boxShadow:`0 8px 32px ${cfg.binColor}20`,
            position:"relative",overflow:"hidden", }}>
            <div style={{ position:"absolute",inset:0,
                background:`linear-gradient(90deg,transparent,${cfg.binColor}12,transparent)`, backgroundSize:"200%
                100%", animation:"shimmer 2.5s linear infinite",pointerEvents:"none", }} />
            <motion.p initial={{scale:0}} animate={{scale:1}} transition={{delay:2.8,type:"spring",stiffness:400}}
                style={{fontSize:30,marginBottom:6}}>🎉</motion.p>
            <p style={{fontSize:18,fontWeight:900,color:cfg.binColor, fontFamily:"'Cabinet Grotesk','Plus Jakarta
                Sans',sans-serif",marginBottom:4}}>
                {msg}
            </p>
            <p style={{fontSize:13,color:"#6B7280",lineHeight:1.6}}>
                Every responsible scan makes a real difference to our planet. Keep it up!
            </p>
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
                transition={{delay:3.0,type:"spring"}} style={{ display:"inline-flex",alignItems:"center",gap:6,
                background:cfg.binColor,color:"white", borderRadius:99,padding:"6px 18px",
                fontSize:13,fontWeight:800,marginTop:12, }}>⭐ +{cfg.pts} eco points earned!</motion.div>
        </motion.div>
        );
        }

        /* ─── Waste Info Card ──────────────────────────────────────────────────────── */
        function InfoCard({cfg}){
        const rows=[
        {icon:"⏱",label:"Decomposition Time",val:cfg.decompose,valColor:cfg.binColor},
        {icon:"💡",label:"Did You Know?",val:cfg.fact,valColor:"#374151"},
        {icon:"🌍",label:"Environmental Impact",val:cfg.impact,valColor:"#374151"},
        ];
        return(
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:2.9,duration:0.5}} style={{
            background:"white",borderRadius:22, border:"1.5px solid #E5E7EB", overflow:"hidden",marginBottom:16,
            boxShadow:"0 4px 24px rgba(0,0,0,0.06)", }}>
            <div style={{ background:`linear-gradient(135deg,${cfg.bg},white)`, padding:"14px 20px",borderBottom:"1px
                solid #F3F4F6", }}>
                <p style={{fontSize:11,fontWeight:700,color:cfg.binColor,
                    textTransform:"uppercase",letterSpacing:1.2,marginBottom:2}}>
                    About This Waste
                </p>
                <p style={{fontSize:16,fontWeight:800,color:"#111827", fontFamily:"'Cabinet Grotesk','Plus Jakarta
                    Sans',sans-serif"}}>
                    {cfg.bin} Category
                </p>
            </div>
            <div style={{padding:"16px 20px",display:"grid",gap:14}}>
                {rows.map(({icon,label,val,valColor})=>(
                <div key={label} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{ width:36,height:36,background:cfg.bg,borderRadius:10,
                        display:"flex",alignItems:"center",justifyContent:"center", fontSize:18,flexShrink:0, }}>{icon}
                    </div>
                    <div>
                        <p style={{fontSize:11,color:"#9CA3AF",fontWeight:700,
                            textTransform:"uppercase",letterSpacing:0.8,marginBottom:3}}>
                            {label}
                        </p>
                        <p
                            style={{fontSize:13,color:valColor,lineHeight:1.6,fontWeight:valColor===cfg.binColor?800:400}}>
                            {val}
                        </p>
                    </div>
                </div>
                ))}
                <div style={{ background:cfg.bg,borderRadius:14, padding:"11px 14px",border:`1px solid ${cfg.acc}`,
                    display:"flex",gap:10,alignItems:"flex-start", }}>
                    <span style={{fontSize:16}}>💬</span>
                    <p style={{fontSize:13,color:cfg.dark,lineHeight:1.6,fontWeight:500}}>
                        <strong>Quick tip:</strong> {cfg.tip}
                    </p>
                </div>
            </div>
        </motion.div>
        );
        }

        /* ─── Kabadiwala Card ──────────────────────────────────────────────────────── */
        function KabadiCard(){
        return(
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
            transition={{delay:3.0,type:"spring",stiffness:240}} style={{
            background:"linear-gradient(135deg,#FFFBEB,#FEF9C3)", border:"2px solid #FDE047",borderRadius:22,
            padding:"18px 20px",marginBottom:16, boxShadow:"0 6px 28px #FDE04728", }}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{ width:46,height:46,background:"#FEF08A", borderRadius:14,display:"flex",
                    alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0, }}>🛒</div>
                <div>
                    <p style={{fontWeight:900,fontSize:15,color:"#92400E", fontFamily:"'Cabinet Grotesk','Plus Jakarta
                        Sans',sans-serif",marginBottom:5}}>
                        💰 Sell to Kabadiwala — Earn Real Money!
                    </p>
                    <p style={{fontSize:13,color:"#78350F",lineHeight:1.65}}>
                        This waste has real <strong>resale & recycling value</strong>. Rather than binning it,
                        sell to your local Kabadiwala. You earn cash while boosting recycling rates — a true win for you
                        and Earth.
                    </p>
                    <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                        {["💵 Earn money","♻ Higher recycling","🌱 Zero landfill"].map(t=>(
                        <span key={t} style={{background:"#FEF08A",border:"1px solid #FDE047",
                            borderRadius:99,padding:"3px 10px", fontSize:11,fontWeight:700,color:"#92400E"}}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
        );
        }

        /* ─── Points Dashboard ─────────────────────────────────────────────────────── */
        function PointsDash({history,total}){
        const tier=getTier(total);
        const next=TIERS[TIERS.indexOf(tier)+1];
        const pct=next?Math.min(100,Math.round(((total-tier.min)/(next.min-tier.min))*100)):100;
        const best=Math.max(0,...history.map(h=>h.pts));

        return(
        <div style={{display:"grid",gap:16}}>
            {/* Main card */}
            <div style={{ background:"white",borderRadius:24, border:"1.5px solid #E5E7EB",
                overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,0.07)", }}>
                {/* Dark header */}
                <div style={{background:"linear-gradient(135deg,#0F172A,#1E293B)",padding:"22px 22px 20px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div>
                            <p style={{fontSize:11,color:"#94A3B8",fontWeight:700,
                                textTransform:"uppercase",letterSpacing:1.2,marginBottom:4}}>
                                Your Eco Points
                            </p>
                            <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                                <span style={{fontSize:44,fontWeight:900,color:"white", fontFamily:"'Cabinet
                                    Grotesk','Plus Jakarta Sans',sans-serif"}}>
                                    <AnimCount value={total} />
                                </span>
                                <span style={{fontSize:16,color:"#94A3B8"}}>pts</span>
                            </div>
                        </div>
                        <motion.div animate={{scale:[1,1.06,1]}} transition={{duration:2,repeat:Infinity}}
                            style={{background:tier.bg,borderRadius:18,padding:"10px 16px",
                            textAlign:"center",border:`2px solid ${tier.color}40`}}>
                            <div style={{fontSize:26}}>{tier.icon}</div>
                            <p style={{fontSize:11,fontWeight:900,color:tier.color,marginTop:2}}>
                                {tier.name}
                            </p>
                        </motion.div>
                    </div>
                    {next && (
                    <div style={{marginTop:16}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                            <span style={{fontSize:11,color:"#94A3B8"}}>Progress to {next.name}</span>
                            <span style={{fontSize:11,color:"#94A3B8",fontWeight:600}}>{total}/{next.min} pts</span>
                        </div>
                        <div style={{background:"#334155",borderRadius:99,height:8,overflow:"hidden"}}>
                            <motion.div initial={{width:0}} animate={{width:`${pct}%`}}
                                transition={{duration:1,ease:"easeOut",delay:0.3}}
                                style={{height:"100%",borderRadius:99,
                                background:"linear-gradient(90deg,#22C55E,#3B82F6)"}} />
                        </div>
                    </div>
                    )}
                </div>

                {/* Stats row */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderBottom:"1px solid #F3F4F6"}}>
                    {[
                    {label:"Scans", val:history.length, icon:"📷"},
                    {label:"Best", val:`${best}pts`, icon:"🏆"},
                    {label:"Streak", val:`${Math.min(history.length,7)}d`, icon:"🔥"},
                    ].map(({label,val,icon})=>(
                    <div key={label} style={{padding:"14px 8px",textAlign:"center",borderRight:"1px solid #F3F4F6"}}>
                        <p style={{fontSize:20,marginBottom:3}}>{icon}</p>
                        <p style={{fontSize:16,fontWeight:900,color:"#111827", fontFamily:"'Cabinet Grotesk','Plus
                            Jakarta Sans',sans-serif"}}>{val}</p>
                        <p style={{fontSize:11,color:"#9CA3AF",fontWeight:500}}>{label}</p>
                    </div>
                    ))}
                </div>

                {/* Points per category */}
                <div style={{padding:"16px 20px"}}>
                    <p style={{fontSize:12,fontWeight:700,color:"#9CA3AF",
                        textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>
                        Points Per Category
                    </p>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                        {Object.entries(W).map(([type,c])=>(
                        <div key={type} style={{ display:"flex",alignItems:"center",gap:8,
                            background:c.bg,borderRadius:12, padding:"8px 12px",border:`1px solid ${c.acc}`, }}>
                            <span style={{fontSize:18}}>{c.emoji}</span>
                            <div>
                                <p style={{fontSize:12,fontWeight:700,color:c.binColor,textTransform:"capitalize"}}>
                                    {type}</p>
                                <p style={{fontSize:11,color:"#6B7280"}}>+{c.pts} pts</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* History */}
                {history.length>0 && (
                <div style={{padding:"0 20px 20px"}}>
                    <p style={{fontSize:12,fontWeight:700,color:"#9CA3AF",
                        textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>
                        Recent Scans
                    </p>
                    <div style={{display:"grid",gap:6}}>
                        {[...history].reverse().slice(0,5).map((h,i)=>(
                        <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
                            transition={{delay:i*0.05}} style={{display:"flex",alignItems:"center",gap:10,
                            background:"#F9FAFB",borderRadius:12,padding:"9px 12px"}}>
                            <span style={{fontSize:20}}>{h.emoji}</span>
                            <div style={{flex:1}}>
                                <p style={{fontSize:13,fontWeight:600,color:"#111827"}}>{h.item}</p>
                                <p style={{fontSize:11,color:"#9CA3AF"}}>{h.time}</p>
                            </div>
                            <span style={{ background:W[h.type]?.bg,color:W[h.type]?.binColor, border:`1px solid
                                ${W[h.type]?.acc}`, borderRadius:99,padding:"3px 10px", fontSize:12,fontWeight:800,
                                }}>+{h.pts}</span>
                        </motion.div>
                        ))}
                    </div>
                </div>
                )}
            </div>

            {/* Tier showcase */}
            <div style={{ background:"white",borderRadius:22, border:"1.5px solid #E5E7EB",padding:"18px 20px",
                boxShadow:"0 4px 20px rgba(0,0,0,0.05)", }}>
                <p style={{fontSize:12,fontWeight:700,color:"#9CA3AF",
                    textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>
                    Eco Tiers — Unlock Them All
                </p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {TIERS.map(t=>{
                    const unlocked=total>=t.min;
                    return(
                    <motion.div key={t.name} whileHover={{scale:1.06}} style={{ flex:"1 1
                        75px",background:unlocked?t.bg:"#F9FAFB", border:`2px solid ${unlocked?t.color+"50":"#E5E7EB"}`,
                        borderRadius:18,padding:"12px 6px", textAlign:"center",opacity:unlocked?1:0.4, transition:"all
                        0.3s",cursor:"default", }}>
                        <p style={{fontSize:24,marginBottom:4,filter:unlocked?"none":"grayscale(1)"}}>
                            {t.icon}
                        </p>
                        <p style={{fontSize:11,fontWeight:900,color:unlocked?t.color:"#9CA3AF"}}>
                            {t.name}
                        </p>
                        <p style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>{t.min}+ pts</p>
                    </motion.div>
                    );
                    })}
                </div>
            </div>

            {/* Redeem */}
            <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A5F)", borderRadius:22,padding:"20px 22px", }}>
                <p style={{fontSize:11,color:"#94A3B8",fontWeight:700,
                    textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>
                    Redeem Points
                </p>
                <p style={{fontSize:18,fontWeight:900,color:"white", fontFamily:"'Cabinet Grotesk','Plus Jakarta
                    Sans',sans-serif",marginBottom:14}}>
                    🎁 Your Rewards
                </p>
                <div style={{display:"grid",gap:10}}>
                    {[
                    {pts:50, reward:"🌱 Plant a tree in your name", color:"#22C55E"},
                    {pts:150,reward:"☕ Eco-café free drink voucher", color:"#F59E0B"},
                    {pts:300,reward:"🛍 Sustainable store 20% off", color:"#3B82F6"},
                    {pts:500,reward:"🌍 Carbon offset certificate", color:"#8B5CF6"},
                    ].map(({pts,reward,color})=>{
                    const unlocked=total>=pts;
                    return(
                    <div key={pts} style={{ display:"flex",alignItems:"center",gap:12,
                        background:unlocked?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)", border:`1px solid
                        ${unlocked?color+"60":"rgba(255,255,255,0.08)"}`, borderRadius:14,padding:"11px 14px",
                        opacity:unlocked?1:0.5,transition:"all 0.3s", }}>
                        <div style={{ background:unlocked?color+"30":"rgba(255,255,255,0.06)",
                            borderRadius:10,padding:"6px 10px", fontSize:12,fontWeight:800,
                            color:unlocked?color:"#64748B", whiteSpace:"nowrap",flexShrink:0, }}>{pts} pts</div>
                        <p style={{fontSize:14,fontWeight:600,flex:1, color:unlocked?"white":"#475569"}}>{reward}</p>
                        {unlocked && (
                        <span style={{ background:color,borderRadius:99, padding:"3px 10px",fontSize:11,
                            fontWeight:800,color:"white",whiteSpace:"nowrap", }}>Claim ↗</span>
                        )}
                    </div>
                    );
                    })}
                </div>
            </div>
        </div>
        );
        }

        /* ─── Tab Button ───────────────────────────────────────────────────────────── */
        function Tab({active,onClick,children}){
        return(
        <button onClick={onClick} style={{ flex:1,padding:"10px 4px", background:active?"white":"transparent",
            border:"none",borderRadius:12, fontSize:13,fontWeight:active?800:500, color:active?"#111827":"#6B7280",
            cursor:"pointer", boxShadow:active?"0 2px 8px rgba(0,0,0,0.08)":"none", transition:"all 0.2s",
            fontFamily:"'Plus Jakarta Sans',sans-serif", }}>{children}</button>
        );
        }

        /* ─── MAIN APP ─────────────────────────────────────────────────────────────── */
        export default function WasteWise(){
        const searchParams = useSearchParams();
        const router = useRouter();
        const [result,setResult] = useState<any>(null);
        const [loading,setLoading] = useState(true);
        const [animKey,setAnimKey] = useState(0);
        const [total,setTotal] = useState(0);
        const [history,setHistory] = useState<any[]>([]);
        const [tab,setTab] = useState("scan");
        const [newPts,setNewPts] = useState<number|null>(null);

        /* Read real scan data from URL params (sent by scanner page) */
        useEffect(()=>{
          const wasteType  = searchParams.get('type');
          const confidence = parseFloat(searchParams.get('confidence') || '0');
          const item       = searchParams.get('item') || wasteType || 'trash';
          const urlPts     = parseInt(searchParams.get('points') || '0');

          if(!wasteType) {
            // No URL params — show loading briefly then go to scanner
            setTimeout(()=>router.push('/scanner'), 1500);
            return;
          }

          /* Map the waste type, falling back to "trash" if unknown */
          const mappedType = W[wasteType] ? wasteType :
                             W[wasteType.toLowerCase()] ? wasteType.toLowerCase() : 'trash';
          const cfg = W[mappedType];
          const pts = urlPts || cfg?.pts || 10;

          const r = {
            waste_type: mappedType,
            item_name: ITEM_NAMES[mappedType] || item,
            confidence: confidence,
          };

          setResult(r);
          setLoading(false);
          setAnimKey(k=>k+1);
          setNewPts(pts);
          setTotal(t=>t+pts);
          setHistory(h=>[...h,{
            item: r.item_name, type: r.waste_type,
            emoji: cfg?.emoji || '🗑️', pts,
            time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
          }]);
        },[searchParams]);

        const scan = () => {
          /* Navigate to scanner page for a new scan */
          router.push('/scanner');
        };

        const cfg = result ? W[result.waste_type] : null;

        return(
        <div style={{minHeight:"100vh",background:"#F8FAFC",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            <FontLink />

            {/* Header */}
            <header style={{ background:"rgba(255,255,255,0.94)",backdropFilter:"blur(16px)", borderBottom:"1px solid
                #E5E7EB", padding:"14px 20px",position:"sticky",top:0,zIndex:100,
                display:"flex",alignItems:"center",justifyContent:"space-between", }}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{ width:40,height:40, background:"linear-gradient(135deg,#16A34A,#2563EB)",
                        borderRadius:12,display:"flex",alignItems:"center", justifyContent:"center",fontSize:20, }}>♻
                    </div>
                    <div>
                        <p style={{fontSize:18,fontWeight:900,color:"#111827", fontFamily:"'Cabinet Grotesk','Plus
                            Jakarta Sans',sans-serif",lineHeight:1}}>
                            WasteWise
                        </p>
                        <p style={{fontSize:11,color:"#6B7280"}}>Disposal Assistant</p>
                    </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <motion.div animate={newPts?{scale:[1,1.25,1]}:{scale:1}} transition={{duration:0.4}} style={{
                        background:"#0F172A",borderRadius:99, padding:"6px 14px",display:"flex",
                        alignItems:"center",gap:6, }}>
                        <span style={{fontSize:14}}>⭐</span>
                        <span style={{fontSize:13,fontWeight:900,color:"white", fontFamily:"'Cabinet Grotesk','Plus
                            Jakarta Sans',sans-serif"}}>
                            <AnimCount value={total} />
                        </span>
                    </motion.div>
                    <button onClick={scan} disabled={loading} style={{
                        background:loading?"#E5E7EB":"linear-gradient(135deg,#16A34A,#2563EB)",
                        color:loading?"#9CA3AF":"white", border:"none",borderRadius:12,padding:"9px 16px",
                        fontSize:13,fontWeight:700,cursor:loading?"not-allowed":"pointer", fontFamily:"'Plus Jakarta
                        Sans',sans-serif",transition:"all 0.2s", }}>
                        {loading?"🔍 Scanning…":"📷 Scan"}
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div style={{background:"white",borderBottom:"1px solid #E5E7EB",padding:"8px 20px"}}>
                <div style={{display:"flex",background:"#F3F4F6",borderRadius:14,padding:4,gap:4}}>
                    <Tab active={tab==="scan" } onClick={()=>setTab("scan")}>🔍 Scan Result</Tab>
                    <Tab active={tab==="points" } onClick={()=>setTab("points")}>⭐ My Points</Tab>
                </div>
            </div>

            {/* Page title */}
            {tab==="scan" && (
            <div style={{textAlign:"center",padding:"22px 20px 6px"}}>
                <motion.h1 initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
                    style={{fontSize:"clamp(20px,5vw,30px)",fontWeight:900,color:"#111827", fontFamily:"'Cabinet
                    Grotesk','Plus Jakarta Sans',sans-serif",marginBottom:4}}>
                    🌿 Smart Waste Disposal
                </motion.h1>
                <p style={{fontSize:14,color:"#6B7280"}}>AI-powered waste identification & eco guidance</p>
            </div>
            )}

            <main style={{maxWidth:560,margin:"0 auto",padding:"12px 16px 80px"}}>
                <AnimatePresence mode="wait">

                    {/* ── SCAN TAB ── */}
                    {tab==="scan" && (
                    <motion.div key="scan" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        {loading ? (
                        <div style={{textAlign:"center",padding:"64px 20px"}}>
                            <motion.div animate={{rotate:360}} transition={{duration:1.5,repeat:Infinity,ease:"linear"}}
                                style={{fontSize:52,display:"inline-block",marginBottom:16}}>♻</motion.div>
                            <p style={{color:"#9CA3AF",fontSize:15}}>Analysing waste type…</p>
                        </div>
                        ) : result && cfg ? (
                        <motion.div key={animKey} initial={{opacity:0}} animate={{opacity:1}}>

                            {/* Detected item */}
                            <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} style={{
                                background:"white",border:`1.5px solid ${cfg.acc}`, borderRadius:22,padding:"18px 22px",
                                marginBottom:16,boxShadow:`0 4px 28px ${cfg.binColor}18`, }}>
                                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                                    <div style={{ width:60,height:60,background:cfg.bg,borderRadius:18,
                                        display:"flex",alignItems:"center",justifyContent:"center",
                                        fontSize:34,border:`1.5px solid ${cfg.acc}`, animation:"bounce-in 0.5s ease
                                        both", }}>{cfg.emoji}</div>
                                    <div style={{flex:1}}>
                                        <p style={{fontSize:11,color:"#9CA3AF",fontWeight:700,
                                            textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Detected Waste
                                        </p>
                                        <p style={{fontSize:21,fontWeight:900,color:"#111827", fontFamily:"'Cabinet
                                            Grotesk','Plus Jakarta Sans',sans-serif",marginBottom:5}}>
                                            {result.item_name}
                                        </p>
                                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                                            <span style={{background:cfg.bg,color:cfg.binColor,
                                                borderRadius:99,fontSize:11,fontWeight:800, padding:"2px
                                                10px",border:`1px solid ${cfg.acc}`}}>
                                                {result.waste_type.toUpperCase()}
                                            </span>
                                            <span style={{background:"#F0FDF4",color:"#16A34A",
                                                borderRadius:99,fontSize:11,fontWeight:800, padding:"2px
                                                10px",border:"1px solid #BBF7D0"}}>
                                                +{cfg.pts} pts
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ConfBar value={result.confidence} color={cfg.binColor} />
                            </motion.div>

                            {/* Drop animation */}
                            <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}}
                                transition={{delay:0.12}} style={{ background:"white",borderRadius:24, border:`1.5px
                                solid ${cfg.acc}`, boxShadow:`0 8px 40px ${cfg.binColor}14`, padding:"18px 12px
                                12px",marginBottom:16, overflow:"hidden",position:"relative", }}>
                                <DropAnimation cfg={cfg} itemName={result.item_name} animKey={animKey} />
                            </motion.div>

                            {/* Appreciation */}
                            <Appreciation cfg={cfg} />

                            {/* Kabadiwala */}
                            {cfg.kabadiwala &&
                            <KabadiCard />}

                            {/* Info */}
                            <InfoCard cfg={cfg} />

                            {/* Disposal footer */}
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.2}} style={{
                                textAlign:"center",padding:"13px 16px", background:cfg.bg,borderRadius:16, border:`1.5px
                                solid ${cfg.acc}`,marginBottom:24, }}>
                                <p style={{fontSize:15,color:"#374151",fontWeight:500}}>
                                    Dispose this item in the{" "}
                                    <strong style={{color:cfg.binColor}}>{cfg.bin}</strong>
                                </p>
                            </motion.div>

                            {/* Category chips */}
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.4}}
                                style={{textAlign:"center"}}>
                                <p style={{fontSize:11,color:"#9CA3AF",marginBottom:8}}>All waste categories</p>
                                <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
                                    {Object.entries(W).map(([type,c])=>(
                                    <span key={type} style={{ background:type===result.waste_type?c.bg:"#F3F4F6",
                                        border:`1.5px solid ${type===result.waste_type?c.acc:"#E5E7EB"}`,
                                        color:type===result.waste_type?c.binColor:"#9CA3AF",
                                        borderRadius:99,padding:"4px 12px",
                                        fontSize:12,fontWeight:type===result.waste_type?800:400, }}>{c.emoji}
                                        {type}</span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                        ) : null}
                    </motion.div>
                    )}

                    {/* ── POINTS TAB ── */}
                    {tab==="points" && (
                    <motion.div key="points" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                        <div style={{padding:"8px 0 16px"}}>
                            <h2 style={{fontSize:24,fontWeight:900,color:"#111827", fontFamily:"'Cabinet Grotesk','Plus
                                Jakarta Sans',sans-serif",marginBottom:4}}>
                                ⭐ Eco Points Dashboard
                            </h2>
                            <p style={{fontSize:14,color:"#6B7280"}}>
                                Earn points for every responsible scan you make
                            </p>
                        </div>
                        <PointsDash history={history} total={total} />
                    </motion.div>
                    )}

                </AnimatePresence>
            </main>

            <footer style={{ textAlign:"center",padding:"18px",fontSize:12, color:"#9CA3AF",borderTop:"1px solid
                #E5E7EB", background:"rgba(255,255,255,0.7)", }}>
                🌍 WasteWise · Smart Waste Management · AI-Powered
            </footer>
        </div>
        );
        }