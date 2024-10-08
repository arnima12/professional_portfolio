import React, { useContext, useEffect, useState } from 'react';
import AllVideo from './AllVideo';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import { AuthContext } from '../../context/AuthProvider';
import { useParams } from 'react-router-dom';

const AllVideos = () => {
    const [allVideos, setAllVideos] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext)
    const userEmail = currentUser?.email;
    const { email } = useParams();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (email && email !== 'undefined') {
                    const response = await fetch(`https://innova-portfolio-server.vercel.app/users/${email}/video`);
                    console.log("response", response);
                    const contentType = response.headers.get('content-type');
                    console.log("headers", contentType);
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[4rem] mt-12 mb-8">
                    {
                        allVideos.map((videos) => <AllVideo key={videos.id} videos={videos}></AllVideo>)
                    }
                </div>
            </div>
            <Sidebar fullHeight={true} />
        </div>

    );
};

export default AllVideos;