import { useState } from "react";

/* Month Images */
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

const monthImages = {
  january,
  february,
  march,
  april,
  may,
  june,
  july,
  august,
  september,
  october,
  november,
  december
};

/* Pastel backgrounds */
const colors = {
  january: "#cfe9f5",
  february: "#f7b1bb",
  march: "#f7c7dc",
  april: "#f1e8d6",
  may: "#7a9bb8",
  june: "#cfecf1",
  july: "#ffffff",
  august: "#b59ade",
  september: "#f6d4be",
  october: "#7b4a2e",
  november: "#d6b8a9",
  december: "#f6c1d8"
};

export default function Month({ month, onBack }) {
  const [photos, setPhotos] = useState([]);
  const [dragged, setDragged] = useState(null);

  const addPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotos([...photos, { src: reader.result, x: 150, y: 150 }]);
    };
    reader.readAsDataURL(file);
  };

  const startDrag = (i) => setDragged(i);

  const movePhoto = (e) => {
    if (dragged === null) return;
    const copy = [...photos];
    copy[dragged] = {
      ...copy[dragged],
      x: e.clientX - 80,
      y: e.clientY - 80
    };
    setPhotos(copy);
  };

  const stopDrag = () => setDragged(null);

  return (
    <div
      onMouseMove={movePhoto}
      onMouseUp={stopDrag}
      style={{
        background: colors[month],
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "140px"
      }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "rgba(120,0,0,.6)",
          border: "none",
          color: "white",
          padding: "10px 18px",
          borderRadius: "12px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      {/* Month Image */}
      <img
        src={monthImages[month]}
        alt={month}
        style={{
          maxWidth: "90%",
          display: "block",
          margin: "40px auto",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,.25)"
        }}
      />

      {/* Upload */}
      <input
        type="file"
        onChange={addPhoto}
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          background: "#7b001c",
          color: "white",
          padding: "10px",
          borderRadius: "10px"
        }}
      />

      {/* Photos */}
      {photos.map((p, i) => (
        <img
          key={i}
          src={p.src}
          onMouseDown={() => startDrag(i)}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: "160px",
            cursor: "grab",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,.35)"
          }}
        />
      ))}

      {/* Memory box */}
      <textarea
        placeholder="Write your memory here..."
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "80px",
          background: "rgba(255,255,255,.6)",
          border: "none",
          borderRadius: "18px",
          padding: "20px",
          fontSize: "18px",
          fontFamily: "cursive",
          backdropFilter: "blur(10px)"
        }}
      />
    </div>
  );
}