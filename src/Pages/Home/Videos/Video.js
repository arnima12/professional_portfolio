import React from 'react';
import { FaYoutube } from 'react-icons/fa';

const Video = ({ videos }) => {
    const { video, title } = videos;

    return (
        <div>
            <div className="relative group">
                <video
                    src={video}
                    controls
                    className="w-full h-auto rounded-lg shadow-lg"
                />
                {/* Play Button Overlay */}
                <a href={video} target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <FaYoutube className="text-[5rem] text-red-600" />
                    </div>
                </a>
            </div>
            <div className="text-2xl mt-2">{title}</div>
        </div>
    );
};

export default Video;
