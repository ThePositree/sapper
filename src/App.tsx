import React from "react";
import { Start } from "./components/Start/Start";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Play } from "./components/Play/Play";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Start />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
