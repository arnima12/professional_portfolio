import React from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllVideo = ({ video }) => {
    const { img, link } = video;
    return (
        <div>
            <div>
                <img className="w-[28rem]" src={img} alt="" />
            </div>
            <div className="relative top-[-50%] left-[35%]">
                <Link to={link}><FaYoutube className="text-[5rem] text-red-600" /></Link>
            </div>
        </div>
    );
};

export default AllVideo;