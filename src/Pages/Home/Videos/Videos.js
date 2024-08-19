import React from 'react';
import Video from './Video';

const Videos = () => {
    const videos = [
        {
            "id": "1",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "2",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "3",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
    ]
    return (
        <div className="bg-[rgb(42,51,68)] px-8 pt-4 pb-8">
            <div className="flex flex-row items-center gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(80,22,203)] text-[64px] font-bold">Videos</div>

            </div>
            <p className="text-left text-white font-[500] text-[24px]">All of my videos from internet and YouTube.</p>
            <div className="flex justify-evenly gap-4 mt-4">
                {videos.map((video) => <Video key={video.id} video={video}></Video>)}
            </div>
            <div>
                <button className="shadow-md bg-[rgb(47,94,163)] py-2 px-4 text-white font-bold">View More</button>
            </div>
        </div>
    );
};

export default Videos;