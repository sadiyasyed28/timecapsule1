import { useState } from "react";

import january from "../assets/january.jpg";
import february from "../assets/february.jpg";
import march from "../assets/march.jpg";
import april from "../assets/april.jpg";
import may from "../assets/may.jpg";
import june from "../assets/june.jpg";
import july from "../assets/july.jpg";
import august from "../assets/august.jpg";
import september from "../assets/september.jpg";
import october from "../assets/october.jpg";
import november from "../assets/november.jpg";
import december from "../assets/december.jpg";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const monthTheme = {
  January:   { bg:january,   color:"#cfe8f5" },
  February: { bg:february,  color:"#f5d6e8" },
  March:    { bg:march,     color:"#e0f3d3" },
  April:    { bg:april,     color:"#fce4d8" },
  May:      { bg:may,       color:"#e5f7f0" },
  June:     { bg:june,      color:"#e6ecff" },
  July:     { bg:july,      color:"#fff0d9" },
  August:   { bg:august,    color:"#f7e8ff" },
  September:{ bg:september,color:"#e9f0f4" },
  October:  { bg:october,  color:"#fde6e0" },
  November: { bg:november, color:"#e6e1f7" },
  December: { bg:december, color:"#e0f7f3" }
};

export default function Calendar() {
  const [month, setMonth] = useState(null);
  const [memories, setMemories] = useState({});
  const [photos, setPhotos] = useState({});

  const upload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(p => ({
      ...p,
      [month]: [
        ...(p[month] || []),
        ...files.map(f => ({
          url: URL.createObjectURL(f),
          x: 100, y: 100, size: 150, rotate: 0
        }))
      ]
    }));
  };

  const startDrag = (e,i) => {
    e.preventDefault();
    const startX = e.touches ? e.touches[0].clientX : e.clientX;
    const startY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = e.target.getBoundingClientRect();
    const offX = startX - rect.left;
    const offY = startY - rect.top;

    const move = ev => {
      const x = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
      setPhotos(p => {
        const arr = [...p[month]];
        arr[i] = { ...arr[i], x:x-offX, y:y-offY };
        return { ...p, [month]:arr };
      });
    };

    document.addEventListener("mousemove",move);
    document.addEventListener("touchmove",move);
    document.addEventListener("mouseup",()=>cleanup(move),{once:true});
    document.addEventListener("touchend",()=>cleanup(move),{once:true});
  };

  const cleanup = (move) => {
    document.removeEventListener("mousemove",move);
    document.removeEventListener("touchmove",move);
  };

  const update = (i,data)=>{
    setPhotos(p=>{
      const arr=[...p[month]];
      arr[i]={...arr[i],...data};
      return {...p,[month]:arr};
    });
  };

  if(!month){
    return(
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px",padding:"40px"}}>
        {months.map(m=>(
          <div key={m} onClick={()=>setMonth(m)}
            style={{background:"#7b001c",color:"white",padding:"50px",borderRadius:"20px",textAlign:"center",fontSize:"24px",cursor:"pointer"}}>
            {m}
          </div>
        ))}

        <div style={{gridColumn:"1/-1",display:"flex",justifyContent:"center"}}>
          <div onClick={()=>window.location.href="/end"}
            style={{padding:"40px 80px",background:"#2c0010",color:"white",borderRadius:"30px",fontSize:"26px",cursor:"pointer"}}>
            Description
          </div>
        </div>
      </div>
    );
  }

  const theme = monthTheme[month];

  return(
    <div style={{
      backgroundImage:`url(${theme.bg})`,
      backgroundSize:"contain",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      backgroundColor:theme.color,
      width:"100vw",
      height:"100vh",
      position:"relative"
    }}>

      <button onClick={()=>setMonth(null)} style={{position:"absolute",top:20,left:20}}>←</button>
      <input type="file" multiple onChange={upload} style={{position:"absolute",top:20,right:20}}/>

      {(photos[month]||[]).map((p,i)=>(
        <div key={i} style={{position:"absolute",left:p.x,top:p.y}}>
          <img
            src={p.url}
            onMouseDown={e=>startDrag(e,i)}
            onTouchStart={e=>startDrag(e,i)}
            style={{width:p.size,transform:`rotate(${p.rotate}deg)`,borderRadius:"12px"}}
            alt=""
          />
          <div style={{textAlign:"center"}}>
            <button onClick={()=>update(i,{rotate:p.rotate+15})}>🔄</button>
            <button onClick={()=>update(i,{size:p.size+20})}>➕</button>
            <button onClick={()=>update(i,{size:Math.max(p.size-20,50)})}>➖</button>
            <button onClick={()=>setPhotos(p=>({...p,[month]:p[month].filter((_,x)=>x!==i)}))}>🗑</button>
          </div>
        </div>
      ))}

      <input
        value={memories[month]||""}
        onChange={e=>setMemories({...memories,[month]:e.target.value})}
        placeholder="Write your memory..."
        style={{
          position:"absolute",
          bottom:20,left:"50%",transform:"translateX(-50%)",
          width:"80%",padding:"15px",borderRadius:"30px",
          boxShadow:`0 0 20px ${theme.color}`
        }}
      />
    </div>
  );
}