import React, { useEffect, useState } from 'react';
import Video from "./Video"
import { useParams } from 'react-router-dom';

const Videos = () => {
    const [allVideos, setAllVideos] = useState([]);
    const [error, setError] = useState(null);
    const { email } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (email && email !== 'undefined') {
                    const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${email}/video`);
                    const contentType = response.headers.get('content-type');
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        setAllVideos(data.videos);
                    } else {
                        throw new Error('Received non-JSON response');
                    }
                } else {
                    const demoVideos = [
                        {
                            "id": "1",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                        {
                            "id": "2",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                        {
                            "id": "3",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                        {
                            "id": "4",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                        {
                            "id": "5",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                        {
                            "id": "6",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                        {
                            "id": "7",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                        {
                            "id": "8",
                            "video": "https://youtu.be/R5LAPvUKGvc?si=XxoIqkgCUYoiJq8_",
                            "title": "Hello demo"
                        },
                    ];
                    setAllVideos(demoVideos);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUserData();
    }, [email]);

    return (
        <div>
            <div className="flex flex-col items-center px-12">
                <div className="flex flex-row items-center gap-4">
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                    <div className="text-[rgb(30,81,153)] text-[64px] font-bold">All Videos</div>
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[4rem] mt-12 mb-8">
                    {
                        allVideos.slice(0, 5).map((videos) => <Video key={videos.id} videos={videos}></Video>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Videos;
