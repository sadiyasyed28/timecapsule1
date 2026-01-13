import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  return (
    <div style={{
      background: "#6b0015",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px"
    }}>
      <input placeholder="Email" style={{ padding: 15, fontSize: 20, width: 300 }} />
      <input placeholder="Password" type="password" style={{ padding: 15, fontSize: 20, width: 300 }} />
      <button onClick={() => nav("/calendar")}
        style={{ padding: "15px 60px", fontSize: 20 }}>
        Login
      </button>
    </div>
  );
}