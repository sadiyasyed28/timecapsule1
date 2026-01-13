import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entry from "./pages/Entry";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Month from "./pages/Month";
import End from "./pages/End";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/month/:name" element={<Month />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </BrowserRouter>
  );
}