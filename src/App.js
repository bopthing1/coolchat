import { Route, Routes } from "react-router-dom";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import init from "./accounts";
import ErrorPage from "./pages/ErrorPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/channel/:id/" element={<Channel />} />
			<Route path="/error/:err/" element={<ErrorPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
