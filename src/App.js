import { Route, Routes } from "react-router-dom";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import init from "./accounts";
import ErrorPage from "./pages/ErrorPage";

function App() {
	init();

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/channel/:id/" element={<Channel />} />
			<Route path="/error" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
