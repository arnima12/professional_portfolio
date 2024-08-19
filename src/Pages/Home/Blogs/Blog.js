import React from 'react';

const Blog = ({ blog }) => {
    const { title, img, year } = blog;
    return (
        <div className="w-[18rem] border-2 shadow-md border-gray-300">
            <div className="px-4">
                <div className="flex flex-col items-center mt-2">
                    <img src={img} alt="blog" className="w-[16rem]" />
                </div>
                <h4 className="text-left text-[rgb(22,29,203)] font-bold mt-2">{year}</h4>
                <h3 className="text-left font-bold mt-2">{title}</h3>
            </div>
            <div className="flex ml-4 py-4">
                <button className="readBtn text-white py-2 px-4 mt-4">Read More</button>
            </div>
        </div>
    );
};

export default Blog;