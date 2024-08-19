import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import AllVideos from "../../Pages/AllVideos/AllVideos";
import AllPhotos from "../../Pages/AllPhotos/AllPhotos";

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
                path: "/video",
                element: <AllVideos />,
            },

        ]
    }
])
export default router;