import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";

export default function Entry() {
  const nav = useNavigate();

  return (
    <div style={{
      background: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <button
        onClick={() => nav("/login")}
        style={{
          fontSize: "36px",
          padding: "22px 80px",
          borderRadius: "60px",
          border: "none",
          background: "#6b0015",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}
      >
        Enter
      </button>
    </div>
  );
}