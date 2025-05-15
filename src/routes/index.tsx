import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/secure-pages/home/HomePage";
import LoginPage from "../pages/auth-pages/LoginPage";
import AppLayout from "../layout/AppLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world, H</div>
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/home",
        element: <AppLayout>
            <HomePage />
        </AppLayout>,
        children: [
            {
                path: "/courses",
                element: <div>Hello</div>
            }
        ]
    }
])

export default router