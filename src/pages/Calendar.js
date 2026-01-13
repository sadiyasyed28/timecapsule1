import { useState, useRef } from "react";
import Moveable from "react-moveable";

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
  January:{bg:january,color:"#cfe8f5"}, February:{bg:february,color:"#f5d6e8"},
  March:{bg:march,color:"#e0f3d3"}, April:{bg:april,color:"#fce4d8"},
  May:{bg:may,color:"#e5f7f0"}, June:{bg:june,color:"#e6ecff"},
  July:{bg:july,color:"#fff0d9"}, August:{bg:august,color:"#f7e8ff"},
  September:{bg:september,color:"#e9f0f4"}, October:{bg:october,color:"#fde6e0"},
  November:{bg:november,color:"#e6e1f7"}, December:{bg:december,color:"#e0f7f3"}
};

export default function Calendar() {
  const [month, setMonth] = useState(null);
  const [memories, setMemories] = useState({});
  const [photos, setPhotos] = useState({});
  const [selected, setSelected] = useState(null);
  const refs = useRef({});

  const upload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(p => ({
      ...p,
      [month]: [
        ...(p[month] || []),
        ...files.map(f => ({
          id: crypto.randomUUID(),
          url: URL.createObjectURL(f),
          type: f.type.startsWith("video") ? "video" : "image",
          x: 100,
          y: 100,
          scale: 1,
          rotate: 0
        }))
      ]
    }));
  };

  /* ---------- MONTH GRID ---------- */
  if (!month) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", padding: "40px" }}>
        {months.map(m => (
          <div key={m} onClick={() => setMonth(m)}
            style={{ background: "#7b001c", color: "white", padding: "50px", borderRadius: "20px", textAlign: "center", fontSize: "24px", cursor: "pointer" }}>
            {m}
          </div>
        ))}

        <div style={{ gridColumn: "1/-1", display: "flex", justifyContent: "center" }}>
          <div onClick={() => window.location.href = "/end"}
            style={{ padding: "40px 80px", background: "#2c0010", color: "white", borderRadius: "30px", fontSize: "26px", cursor: "pointer" }}>
            Description
          </div>
        </div>
      </div>
    );
  }

  const theme = monthTheme[month];

  /* ---------- MONTH VIEW ---------- */
  return (
    <div style={{
      backgroundImage: `url(${theme.bg})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: theme.color,
      width: "100vw",
      height: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>

      <button onClick={() => setMonth(null)} style={{ position: "absolute", top: 20, left: 20 }}>←</button>
      <input type="file" multiple accept="image/*,video/*" onChange={upload}
        style={{ position: "absolute", top: 20, right: 20 }} />

      {(photos[month] || []).map(p => (
        <div key={p.id}
          ref={el => refs.current[p.id] = el}
          onClick={() => setSelected(p.id)}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            transform: `scale(${p.scale}) rotate(${p.rotate}deg)`,
            touchAction: "none"
          }}>
          {p.type === "image" ?
            <img src={p.url} style={{ width: 200, borderRadius: 12 }} /> :
            <video src={p.url} style={{ width: 200, borderRadius: 12 }} controls />
          }

          {selected === p.id && (
            <div onClick={() => {
              setPhotos(x => ({ ...x, [month]: x[month].filter(a => a.id !== p.id) }));
              setSelected(null);
            }}
              style={{
                position: "absolute", top: -10, right: -10,
                background: "red", color: "white",
                borderRadius: "50%", width: 28, height: 28,
                display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold"
              }}>✕</div>
          )}
        </div>
      ))}

      {selected && (
        <Moveable
          target={refs.current[selected]}
          draggable
          scalable
          rotatable
          pinchable
          origin={false}
          onDrag={e => {
            setPhotos(p => {
              const arr = [...p[month]];
              const i = arr.findIndex(x => x.id === selected);
              arr[i] = { ...arr[i], x: e.left, y: e.top };
              return { ...p, [month]: arr };
            });
          }}
          onScale={e => {
            setPhotos(p => {
              const arr = [...p[month]];
              const i = arr.findIndex(x => x.id === selected);
              arr[i] = { ...arr[i], scale: e.scale[0] };
              return { ...p, [month]: arr };
            });
          }}
          onRotate={e => {
            setPhotos(p => {
              const arr = [...p[month]];
              const i = arr.findIndex(x => x.id === selected);
              arr[i] = { ...arr[i], rotate: e.beforeRotate };
              return { ...p, [month]: arr };
            });
          }}
        />
      )}

      <input
        value={memories[month] || ""}
        onChange={e => setMemories({ ...memories, [month]: e.target.value })}
        placeholder="Write your memory..."
        style={{
          position: "absolute",
          bottom: 20, left: "50%", transform: "translateX(-50%)",
          width: "80%", padding: "15px", borderRadius: "30px",
          boxShadow: `0 0 20px ${theme.color}`
        }}
      />
    </div>
  );
}