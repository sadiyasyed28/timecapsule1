import { useParams } from "react-router-dom";

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

const images = { january, february, march, april, may, june, july, august, september, october, november, december };

const colors = {
  january:"#cfe9f5",
  february:"#7b1b1b",
  march:"#f7c7dc",
  april:"#f1e8d6",
  may:"#7a9bb8",
  june:"#cfe3c1",
  july:"#ffffff",
  august:"#b59ad0",
  september:"#f6d4b0",
  october:"#7b4a2e",
  november:"#d6b8a9",
  december:"#f6c1d8"
};

export default function Month(){
  const { name } = useParams();

  return(
    <div style={{
      background: colors[name],
      minHeight:"100vh",
      padding:40
    }}>
      <h1 style={{ color:"#6b0015" }}>{name.toUpperCase()}</h1>

      <img
        src={images[name]}
        style={{
          maxWidth:"90%",
          height:"auto",
          display:"block",
          margin:"40px auto",
          boxShadow:"0 0 30px rgba(0,0,0,0.4)"
        }}
      />

      <textarea placeholder="Write your memory…" style={{ width:"80%", height:120, padding:15 }} />
      <br/><br/>
      <input type="file" multiple />
    </div>
  )
}