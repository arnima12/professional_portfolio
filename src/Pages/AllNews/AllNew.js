import React from 'react';
import { Link } from 'react-router-dom';

const AllNew = ({ latestNew, allNew }) => {
    const news = latestNew || allNew;
    const { title, img, year, id, des } = news;
    console.log("news", title)
    if (latestNew) {
        return (
            <div className="latestBlog flex gap-8 mb-8 w-[93%] py-8">
                <div className="w-[40rem] text-left pb-8 ml-12">
                    <h2 className="font-[500] text-[48px] text-[rgb(47,94,163)]">{title}</h2>
                    <h3 className="text-[rgb(42,193,235)] font-[800] mb-4">{year}</h3>
                    <p className="font-[600]">{des?.slice(0, 600)}</p>
                    <div>
                        <Link to={`/news/${id}`} state={{ news }}>
                            <button className="text-[rgb(30,81,153)] font-[600] text-[26px] px-2 mt-4">
                                Read More
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center mr-6 justify-end w-[50%]">
                    <img src={img} alt="blog" className="w-[30rem]" />
                </div>
            </div>
        );
    }
    return (
        <div className="w-[18rem] border-2 shadow-md border-gray-200">
            <div className="px-4">
                <div className="flex flex-col items-center mt-2">
                    <img src={img} alt="blog" className="w-[16rem]" />
                </div>
                <h4 className="text-left text-[rgb(22,29,203)] font-bold mt-2">{year}</h4>
                <h3 className="text-left font-bold mt-2">{title}</h3>
            </div>
            <div className="flex ml-4 py-4">
                <Link to={`/news/${id}`} state={{ news }}>
                    <button className="readBtn text-white py-2 px-4 mt-4">Read More</button>
                </Link>
            </div>
        </div>
    );
};

export default AllNew;