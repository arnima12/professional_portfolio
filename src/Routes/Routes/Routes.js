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
import MyProject from "../../Admin/Dashboard/MyProject";
import RecycleBin from "../../Admin/Dashboard/RecycleBin";
import Drafts from "../../Admin/Dashboard/Drafts";
import Analytics from "../../Admin/Dashboard/Analytics";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: ":email/",
                element: <Home />,
            },
            {
                path: ":email/photo",
                element: <AllPhotos />,
            },
            {
                path: ":email/allBlog",
                element: <AllBlogs />,
            },
            {
                path: ":email/blog/:id",
                element: <LatestBlogPage />,
            },
            {
                path: ":email/news",
                element: <AllNews />,
            },
            {
                path: ":email/news/:id",
                element: <NewsPage />,
            },
            {
                path: ":email/video",
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
                path: "/dashboard/recycle",
                element: <AdminRoute><RecycleBin /></AdminRoute>,
            },
            {
                path: "/dashboard/draft",
                element: <AdminRoute><Drafts /></AdminRoute>,
            },
            {
                path: "/dashboard/myProject",
                element: <AdminRoute><MyProject /></AdminRoute>,
            },
            {
                path: "/dashboard/personalInfo",
                element: <AdminRoute><PersonalInfo /></AdminRoute>,
            },
            {
                path: "/dashboard/analytics",
                element: <AdminRoute><Analytics /></AdminRoute>,
            },
            {
                path: "/dashboard/settings",
                element: <AdminRoute><Settings /></AdminRoute>,
            }
        ]
    }
])
export default router;