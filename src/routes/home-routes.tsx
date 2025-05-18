import AccountPage from "../pages/secure-pages/account";
import CourseManagement from "../pages/secure-pages/courses";
import CourseDetails from "../pages/secure-pages/courses/course-details";
import HomePage from "../pages/secure-pages/home/HomePage";
import OverviewPage from "../pages/secure-pages/overview";

const homeRoutes = [
	{
		path: "overview",
		element: <OverviewPage />,
	},
	{
		path: "home",
		element: <HomePage />,
	},
	{
		path: "courses",
		element: <CourseManagement />,
	},
	{
		path: "account",
		element: <AccountPage />,
	},
	{
		path: "courses/:id",
		element: <CourseDetails />,
	},
];

export default homeRoutes;
