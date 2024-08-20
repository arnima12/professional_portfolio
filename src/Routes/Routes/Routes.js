import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import AllVideos from "../../Pages/AllVideos/AllVideos";
import AllPhotos from "../../Pages/AllPhotos/AllPhotos";
import AllBlogs from "../../Pages/AllBlogs/AllBlogs";
import LatestBlogPage from "../../Pages/AllBlogs/LatestBlogPage";
import AllNews from "../../Pages/AllNews/AllNews";
import NewsPage from "../../Pages/AllNews/NewsPage";

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

        ]
    }
])
export default router;