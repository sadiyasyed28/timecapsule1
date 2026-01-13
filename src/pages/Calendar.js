import { useState, useRef, useEffect } from "react"
import { useGesture } from "@use-gesture/react"

import january from "../assets/january.jpg"
import february from "../assets/february.jpg"
import march from "../assets/march.jpg"
import april from "../assets/april.jpg"
import may from "../assets/may.jpg"
import june from "../assets/june.jpg"
import july from "../assets/july.jpg"
import august from "../assets/august.jpg"
import september from "../assets/september.jpg"
import october from "../assets/october.jpg"
import november from "../assets/november.jpg"
import december from "../assets/december.jpg"

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const monthTheme = {
  January:{bg:january,color:"#cfe8f5"}, February:{bg:february,color:"#f5d6e8"},
  March:{bg:march,color:"#e0f3d3"}, April:{bg:april,color:"#fce4d8"},
  May:{bg:may,color:"#e5f7f0"}, June:{bg:june,color:"#e6ecff"},
  July:{bg:july,color:"#fff0d9"}, August:{bg:august,color:"#f7e8ff"},
  September:{bg:september,color:"#e9f0f4"}, October:{bg:october,color:"#fde6e0"},
  November:{bg:november,color:"#e6e1f7"}, December:{bg:december,color:"#e0f7f3"}
}

export default function Calendar(){
  const [month,setMonth]=useState(null)

  const [photos,setPhotos]=useState(() => {
    return JSON.parse(localStorage.getItem("photos")) || {}
  })

  const [memories,setMemories]=useState(() => {
    return JSON.parse(localStorage.getItem("memories")) || {}
  })

  const [selected,setSelected]=useState(null)

  // autosave
  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos))
  }, [photos])

  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories))
  }, [memories])

  const upload=e=>{
    const files=[...e.target.files]
    setPhotos(p=>({
      ...p,
      [month]:[
        ...(p[month]||[]),
        ...files.map(f=>({
          id:crypto.randomUUID(),
          url:URL.createObjectURL(f),
          type:f.type.startsWith("video")?"video":"image",
          x:120,y:120,scale:1
        }))
      ]
    }))
  }

  if(!month){
    return(
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,padding:40}}>
        {months.map(m=>(
          <div key={m} onClick={()=>setMonth(m)}
            style={{background:"#7b001c",color:"white",padding:50,borderRadius:20,textAlign:"center",fontSize:24}}>
            {m}
          </div>
        ))}
      </div>
    )
  }

  const theme=monthTheme[month]

  return(
    <div
      onPointerDown={()=>setSelected(null)}
      style={{
        backgroundImage:`url(${theme.bg})`,
        backgroundSize:"contain",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundColor:theme.color,
        width:"100vw",
        height:"100vh",
        position:"relative",
        overflow:"hidden",
        touchAction:"none"
      }}
    >
      <button onClick={()=>setMonth(null)} style={{position:"absolute",top:20,left:20}}>←</button>

      <input type="file" multiple accept="image/*,video/*" onChange={upload}
        style={{position:"absolute",top:20,right:20,zIndex:10}}/>

      {(photos[month]||[]).map(p=>(
        <Draggable
          key={p.id}
          data={p}
          selected={selected===p.id}
          onSelect={()=>setSelected(p.id)}
          onUpdate={(d)=>{
            setPhotos(x=>{
              const arr=[...x[month]]
              const i=arr.findIndex(v=>v.id===p.id)
              arr[i]={...arr[i],...d}
              return {...x,[month]:arr}
            })
          }}
          onDelete={()=>{
            setPhotos(x=>({...x,[month]:x[month].filter(a=>a.id!==p.id)}))
            setSelected(null)
          }}
        />
      ))}

      <input
        value={memories[month]||""}
        onChange={e=>setMemories({...memories,[month]:e.target.value})}
        placeholder="Write your memory..."
        style={{
          position:"absolute",
          bottom:20,left:"50%",transform:"translateX(-50%)",
          width:"80%",padding:15,borderRadius:30
        }}
      />
    </div>
  )
}

function Draggable({data,selected,onSelect,onUpdate,onDelete}){
  const ref = useRef()

  useGesture({
    onDrag: ({offset:[x,y]})=>{
      onUpdate({x,y})
      onSelect()
    },
    onPinch: ({offset:[d]})=>{
      const scale=Math.max(0.3,Math.min(1+d/250,4))
      onUpdate({scale})
      onSelect()
    },
    onPointerDown:()=>onSelect()
  },{target:ref,eventOptions:{passive:false}})

  return(
    <div
      ref={ref}
      onPointerDown={e=>e.stopPropagation()}
      style={{
        position:"absolute",
        transform:`translate(${data.x}px,${data.y}px) scale(${data.scale})`,
        touchAction:"none",
        zIndex:selected?10:1
      }}
    >
      {data.type==="image"?
        <img src={data.url} style={{width:200,borderRadius:12}}/>:
        <video src={data.url} style={{width:200,borderRadius:12}} controls/>
      }

      {selected && (
        <div
          onClick={onDelete}
          style={{
            position:"absolute",top:-10,right:-10,
            background:"red",color:"white",
            borderRadius:"50%",width:28,height:28,
            display:"flex",justifyContent:"center",alignItems:"center"
          }}>✕</div>
      )}
    </div>
  )
}