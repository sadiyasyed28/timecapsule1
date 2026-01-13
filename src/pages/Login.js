import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const nav = useNavigate();

  return (
    <div className="login-bg">
      <div className="login-card">
        <input className="login-input" placeholder="Email" />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
        />
        <button className="login-btn" onClick={() => nav("/calendar")}>
          Login
        </button>
      </div>
    </div>
  );
}