import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<div className="container mx-auto px-2 sm:px-4 md:px-8">
			<Outlet />
		</div>
	);
}

export default App;
