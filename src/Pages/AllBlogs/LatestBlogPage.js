import React from 'react';
import { useLocation } from 'react-router-dom';
import './AllBlogs.css'
const LatestBlogPage = () => {
    const location = useLocation();
    const { blog } = location.state || {};

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-center">
                <img src={blog.img} alt={blog.title} className="w-full h-[40rem] mb-8" />
            </div>
            <div className="latestBlog text-left pt-4 pb-8 px-8">
                <h2 className="font-[500] text-[48px] text-[rgb(47,94,163)]">{blog.title}</h2>
                <h3 className="text-[rgb(42,193,235)] font-[800] mb-4">{blog.year}</h3>
                <p className="font-[600]">{blog.des}</p>
            </div>
        </div>
    );
};

export default LatestBlogPage;