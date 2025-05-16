import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../pages/secure-pages/home/HomePage";
import LoginPage from "../pages/auth-pages/LoginPage";
import AppLayout from "../layout/AppLayout";
import homeRoutes from "./home-routes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello world, H</div>,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/",
		element: (
			<AppLayout>
				<Outlet />
			</AppLayout>
		),
		children: homeRoutes,
	},
]);

export default router;
