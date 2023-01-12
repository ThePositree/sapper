import Start from "./Components/Start/Start";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Play from "./Components/Play/Play";
function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='*' element={<Start />} />
          <Route path='/play' element={<Play />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
