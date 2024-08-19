import React from 'react';
import './Blogs.css'
import Blog from './Blog';
const Blogs = () => {
    const blogs = [
        {
            "id": "1",
            "year": "2013-10-28",
            "title": "Technology a business driver, right vehicle for banks",
            "img": "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg"
        },
        {
            "id": "2",
            "year": "2013-10-28",
            "title": "Technology a business driver, right vehicle for banks",
            "img": "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg"
        },
        {
            "id": "3",
            "year": "2013-10-28",
            "title": "Technology a business driver, right vehicle for banks",
            "img": "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg"
        },
    ]
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="blog-left-line  hidden lg:block"></div>
                <div className="content text-[64px] text-[rgb(30,81,153)] font-bold">My Blogs</div>
                <div className="blog-right-line  hidden lg:flex items-center"></div>
            </div>
            <div className="flex justify-evenly mt-16">
                {blogs.map((blog) => <Blog key={blog.id} blog={blog}></Blog>)}
            </div>
        </div>
    );
};

export default Blogs;