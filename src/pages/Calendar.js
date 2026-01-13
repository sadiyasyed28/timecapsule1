import { useState, useEffect } from "react";

const months = [
  { name: "January", color: "#ff4b5c" },
  { name: "February", color: "#ff6f91" },
  { name: "March", color: "#ff9671" },
  { name: "April", color: "#ffc75f" },
  { name: "May", color: "#f9f871" },
  { name: "June", color: "#d5cabd" },
  { name: "July", color: "#c34a36" },
  { name: "August", color: "#845ec2" },
  { name: "September", color: "#4d8076" },
  { name: "October", color: "#ff8066" },
  { name: "November", color: "#2c73d2" },
  { name: "December", color: "#0089ba" },
];

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [images, setImages] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("timecapsuleImages");
    if (saved) setImages(JSON.parse(saved));
  }, []);

  const saveImages = (newImages) => {
    setImages(newImages);
    localStorage.setItem("timecapsuleImages", JSON.stringify(newImages));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      const updated = { ...images };
      if (!updated[selectedMonth]) updated[selectedMonth] = [];
      updated[selectedMonth].push(base64);
      saveImages(updated);
    };
    reader.readAsDataURL(file);
  };

  if (selectedMonth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: months.find(m => m.name === selectedMonth).color,
          padding: "30px",
        }}
      >
        <button onClick={() => setSelectedMonth(null)}>← Back</button>
        <h1>{selectedMonth}</h1>

        <input type="file" onChange={handleUpload} />

        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {(images[selectedMonth] || []).map((img, i) => (
            <img
              key={i}
              src={img}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                margin: "10px",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#8B0000", minHeight: "100vh", padding: "30px" }}>
      <h1 style={{ color: "white" }}>Your Time Capsule</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {months.map(m => (
          <div
            key={m.name}
            onClick={() => setSelectedMonth(m.name)}
            style={{
              background: m.color,
              height: "150px",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              color: "white",
              cursor: "pointer",
            }}
          >
            {m.name}
          </div>
        ))}
      </div>
    </div>
  );
}