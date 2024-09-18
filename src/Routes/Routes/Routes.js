import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import AllVideos from "../../Pages/AllVideos/AllVideos";
import AllPhotos from "../../Pages/AllPhotos/AllPhotos";
import AllBlogs from "../../Pages/AllBlogs/AllBlogs";
import LatestBlogPage from "../../Pages/AllBlogs/LatestBlogPage";
import AllNews from "../../Pages/AllNews/AllNews";
import NewsPage from "../../Pages/AllNews/NewsPage";
import SignUp from "../../Pages/SignUp/SignUp";
import SignIn from "../../Pages/SignIn/SignIn";
import Dashboard from "../../Admin/Dashboard/Dashboard";
import UploadProject from "../../Admin/Dashboard/UploadProject";
import PersonalInfo from "../../Admin/Dashboard/PersonalInfo";
import Settings from "../../Admin/Dashboard/Settings";
import AdminRoute from "../AdminRoute/AdminRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/photo",
                element: <AllPhotos />,
            },
            {
                path: "/allBlog",
                element: <AllBlogs />,
            },
            {
                path: "/blog/:id",
                element: <LatestBlogPage />,
            },
            {
                path: "/news",
                element: <AllNews />,
            },
            {
                path: "/news/:id",
                element: <NewsPage />,
            },
            {
                path: "/video",
                element: <AllVideos />,
            },
            {
                path: "/signUp",
                element: <SignUp />,
            },
            {
                path: "/signIn",
                element: <SignIn />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/dashboard/upload",
                element: <AdminRoute><UploadProject /></AdminRoute>,
            },
            {
                path: "/dashboard/personalInfo",
                element: <AdminRoute><PersonalInfo /></AdminRoute>,
            },
            {
                path: "/dashboard/settings",
                element: <AdminRoute><Settings /></AdminRoute>,
            },
        ]
    }
])
export default router;