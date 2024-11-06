import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Play } from "./components/play/Play";
import { Start } from "./components/start/Start";

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
