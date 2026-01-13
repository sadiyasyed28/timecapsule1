import { useNavigate } from "react-router-dom";

const months = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

export default function Calendar() {
  const nav = useNavigate();

  return (
    <div style={{
      background:"#6b0015",
      minHeight:"100vh",
      padding:40,
      display:"grid",
      gridTemplateColumns:"repeat(3,1fr)",
      gap:30
    }}>
      {months.map(m => (
        <div
          key={m}
          onClick={() => nav(`/month/${m}`)}
          style={{
            background:"rgba(255,255,255,0.1)",
            backdropFilter:"blur(6px)",
            border:"2px solid rgba(255,255,255,0.2)",
            color:"white",
            fontSize:26,
            textAlign:"center",
            padding:60,
            cursor:"pointer",
            transition:"0.3s",
          }}
          onMouseEnter={e=>{
            e.currentTarget.style.transform="scale(1.05)";
            e.currentTarget.style.boxShadow="0 0 25px rgba(255,255,255,0.4)";
          }}
          onMouseLeave={e=>{
            e.currentTarget.style.transform="scale(1)";
            e.currentTarget.style.boxShadow="none";
          }}
        >
          {m.toUpperCase()}
        </div>
      ))}

      <div
        onClick={()=>nav("/end")}
        style={{
          gridColumn:"span 3",
          background:"rgba(255,255,255,0.1)",
          backdropFilter:"blur(6px)",
          textAlign:"center",
          padding:40,
          cursor:"pointer",
          fontSize:24
        }}
      >
        Final Page
      </div>
    </div>
  );
}