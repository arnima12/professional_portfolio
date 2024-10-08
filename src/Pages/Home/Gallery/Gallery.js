import React, { useEffect, useState } from 'react';
import './Gallery.css';
import GalleryDes from './GalleryDes';
import { useParams } from 'react-router-dom';

const Gallery = () => {
    const [photo, setPhoto] = useState([]);
    const [error, setError] = useState(null);
    const { email } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            if (email && email !== 'undefined') {

                try {
                    const response = await fetch(`https://innova-portfolio-server.vercel.app/users/${email}/gallery`);
                    const contentType = response.headers.get('content-type');

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        setPhoto(data.gallery);
                    } else {
                        const responseText = await response.text();
                        console.log('Non-JSON response:', responseText);
                        throw new Error('Received non-JSON response');
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
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
        <div className="gallery-section mt-16">
            <div className="flex items-center justify-center">
                <div className="gallery-left-line hidden lg:block"></div>
                <div className="content text-[50px] md:text-[64px] text-[rgb(30,81,153)] font-bold">Gallery</div>
                <div className="gallery-horizontal-line gallery-right-line hidden lg:flex items-center"></div>
            </div>
            <div className="text-center text-[rgb(50,48,48)] text-[28px] font-[500]">My memories and moments captured here.</div>
            <div className="flex flex-col gap-8 mt-12 mb-4">
                {
                    photo.slice(0, 3).map((galleryDes) => (
                        <GalleryDes key={galleryDes.id} galleryDes={galleryDes} />
                    ))
                }
            </div>
        </div>
    );
};

export default Gallery;
