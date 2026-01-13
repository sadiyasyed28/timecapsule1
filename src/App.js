import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Entry from "./pages/Entry";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Month from "./pages/Month";
import End from "./pages/End";

export default function App() {
  const [month, setMonth] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/calendar"
          element={
            <Calendar
              onSelect={(m) => setMonth(m)}
              onFinal={() => setMonth("end")}
            />
          }
        />

        <Route
          path="/month"
          element={<Month month={month} onBack={() => setMonth(null)} />}
        />

        <Route path="/end" element={<End />} />
      </Routes>
    </BrowserRouter>
  );
}