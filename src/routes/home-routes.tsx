import CourseManagement from "../pages/secure-pages/courses";
import CourseDetails from "../pages/secure-pages/courses/course-details";
import HomePage from "../pages/secure-pages/home/HomePage";

const homeRoutes = [
    {
        path: "home",
        element: <HomePage />
    },
    {
        path: "courses",
        element: <CourseManagement />,
    },
    {
                path: "courses/:id",
                element: <CourseDetails />

            }
]

export default homeRoutes