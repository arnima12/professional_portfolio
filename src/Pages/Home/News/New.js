import React from 'react';
import './News.css'
const New = ({ info }) => {
    const { title, img, des } = info;
    return (
        <div>
            <div className="title w-[28rem]">
                <img src={img} alt="news_img" className="h-[10rem] w-[28rem]" />
                <h2 className="text-left w-[28rem] font-semibold text-2xl text-[rgb(47,94,163)] p-4">{title}</h2>
            </div>
            <div className="des w-[28rem] p-4">
                <h3 className="font-[600] text-xl text-left text-[rgb(50,48,48)]">What article says:</h3>
                <p className="text-left text-sm mt-4">{des}</p>
                <div className="flex">
                    <button className="readBtn text-white py-2 px-4 mt-4">Read More</button>
                </div>
            </div>


        </div>
    );
};

export default New;