import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { initializeBrowserCompatibility } from "./utils/browserCompatibility";

function App() {
	useEffect(() => {
		// Initialize browser compatibility fixes
		initializeBrowserCompatibility();
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
