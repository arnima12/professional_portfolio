import React, { useEffect, useState } from 'react';
import './AllPhotos.css';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import PhotoGallery from './PhotoGallery';
import { useParams } from 'react-router-dom';

const AllPhotos = () => {
    const [photo, setPhoto] = useState([]);
    const [error, setError] = useState(null);
    const { email } = useParams();
    useEffect(() => {
        const fetchUserData = async () => {
            if (email && email !== 'undefined') {
                try {

                    const response = await fetch(`http://localhost:8000/users/${email}/gallery`);
                    const contentType = response.headers.get('content-type');

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        setPhoto(data.gallery);
                    } else {
                        throw new Error('Received non-JSON response');
                    }

                } catch (error) {
                    setError(error.message);
                }
            } else {
                const demoGallery = [
                    {
                        "id": "1",
                        "title": "Cadet Life",
                        "image": "https://i.ibb.co/4gzMbXD/images.jpg"
                    },
                    {
                        "id": "2",
                        "title": "Cadet Life",
                        "image": "https://i.ibb.co/4gzMbXD/images.jpg"
                    },
                    {
                        "id": "3",
                        "title": "Cadet Life",
                        "image": "https://i.ibb.co/4gzMbXD/images.jpg"
                    }
                ];
                setPhoto(demoGallery);
            }
        };
        fetchUserData();
    }, [email]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="flex flex-col items-center px-12">
                <div className="flex flex-row items-center gap-4">
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                    <div className="text-[rgb(30,81,153)] text-[64px] font-bold">All Photos</div>
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[4rem] mt-8 mb-8">
                    {
                        photo.map((image) => <PhotoGallery key={image.id} image={image}></PhotoGallery>)
                    }
                </div>
            </div>
            <Sidebar fullHeight={true} />
        </div>
    );
};

export default AllPhotos;
