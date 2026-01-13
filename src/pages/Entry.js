import React from "react";
import "./Entry.css";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";   // your original entry background

export default function Entry() {
  const navigate = useNavigate();

  return (
    <div
      className="entry-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <button
        className="enter-btn"
        onClick={() => navigate("/login")}
      >
        Enter
      </button>
    </div>
  );
}