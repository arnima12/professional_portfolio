import React from 'react';
import './Gallery.css'
const GalleryDes = ({ galleryDes }) => {
    const { title, image } = galleryDes;
    return (
        <div className="flex flex-col lg:flex-row border-[1px] border-l-[1rem] shadow-md border-[rgb(42,193,235)] mx-8 gap-8">
            <div className="flex justify-center">
                <img className="h-[28rem] lg:h-[18rem] w-full lg:w-[20rem]" src={image} alt="" />
            </div>
            <div className="p-6">
                <div className="text-[rgb(54,121,215)] text-[40px] font-[700] text-left">
                    {title}
                </div>
                <div className="flex">
                    <button className="viewBtn text-white p-2 mt-4">View More</button>
                </div>

            </div>
        </div>
    );
};

export default GalleryDes;