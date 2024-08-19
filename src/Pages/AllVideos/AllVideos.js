import React from 'react';
import AllVideo from './AllVideo';
import Sidebar from '../../Shared/Sidebar/Sidebar';

const AllVideos = () => {
    const allVideos = [
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
        {
            "id": "4",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "5",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "6",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "7",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "8",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "9",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "10",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "11",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        },
        {
            "id": "12",
            "img": "https://i.ibb.co/0ynZCm2/download-1.jpg",
            "link": "https://www.youtube.com/"
        }
    ]
    return (
        <div>
            <div className="flex flex-col items-center w-[95%]">
                <div className="flex flex-row items-center gap-4">
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                    <div className="text-[rgb(30,81,153)] text-[64px] font-bold">Videos</div>
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {allVideos.map((video) => <AllVideo key={video.id} video={video}></AllVideo>)}
                </div>

            </div>
            <Sidebar className="w-[5%]" fullHeight={true} />
        </div>

    );
};

export default AllVideos;