import React from 'react';
import { Link } from 'react-router-dom';
import './AllBlogs.css'
const AllBlog = ({ latestBlog, allBlog, email }) => {
    const blog = latestBlog || allBlog;
    const { title, image, date, id, desc } = blog;

    if (latestBlog) {
        return (
            <div className="latestBlog flex flex-col-reverse lg:flex-row gap-8 mb-8 w-[93%] py-8">
                <div className="w-[20rem] lg:w-[40rem] text-left pb-8 ml-12">
                    <h2 className="font-[500] text-[48px] text-[rgb(47,94,163)]">{title}</h2>
                    <h3 className="text-[rgb(42,193,235)] font-[800] mb-4">{date}</h3>
                    <p className="font-[600]">{desc?.slice(0, 600)}</p>
                    <div>
                        <Link to={`/${email}/blog/${id}`} state={{ blog }}>
                            <button className="text-[rgb(30,81,153)] blogs-btn font-[600] text-[26px] px-2 mt-4">
                                Read More
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center mr-6 justify-end w-full lg:w-[50%]">
                    <img src={image} alt="blog" className="w-full lg:w-[30rem] px-4" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-[18rem] border-2 shadow-md border-gray-200">
            <div className="px-4">
                <div className="flex flex-col items-center mt-2">
                    <img src={image} alt="blog" className="w-[16rem] h-[10rem]" />
                </div>
                <h4 className="text-left text-[rgb(22,29,203)] font-bold mt-2">{date}</h4>
                <h3 className="text-left font-bold mt-2">{title}</h3>
                <p className="text-left mt-2">{desc}</p>
            </div>
            <div className="flex ml-4 py-4">
                <Link to={`/${email}/blog/${id}`} state={{ blog }}>
                    <button className="readBtn text-white py-2 px-4 mt-4">Read More</button>
                </Link>
            </div>
        </div>
    );
};

export default AllBlog;
