import React from 'react';
import './Gallery.css'
const GalleryDes = ({ galleryDes }) => {
    const { name, des, img } = galleryDes;
    return (
        <div className="flex border-[1px] border-l-[1rem] shadow-md border-[rgb(42,193,235)] mx-8 gap-8">
            <div>
                <img className="h-[18rem] w-[20rem]" src={img} alt="" />
            </div>
            <div className="p-6">
                <div className="text-[rgb(54,121,215)] text-[40px] font-[700] text-left">
                    {name}
                </div>
                <div className="font-[600] text-[24px] text-left">
                    {des}
                </div>
                <div className="flex">
                    <button className="viewBtn text-white p-2 mt-4">View More</button>
                </div>

            </div>
        </div>
    );
};

export default GalleryDes;