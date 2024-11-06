import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Play } from "./components/Play/Play";
import { Start } from "./components/Start/Start";

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
