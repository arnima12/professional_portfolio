import React, { useState } from 'react';
import './AllPhotos.css'
const AllPhotos = () => {
    const [activeCategory, setActiveCategory] = useState('singlePhotoShot');
    const photos = {
        singlePhotoShot: [
            "https://i.ibb.co/4gzMbXD/images.jpg",
            "https://i.ibb.co/4gzMbXD/images.jpg",
            "https://i.ibb.co/4gzMbXD/images.jpg",
            "https://i.ibb.co/4gzMbXD/images.jpg",
        ],
        roamingAroundWorld: [
            "https://i.ibb.co/wNcFdCv/istockphoto-1329031407-612x612.jpg",
            "https://i.ibb.co/wNcFdCv/istockphoto-1329031407-612x612.jpg",
            "https://i.ibb.co/wNcFdCv/istockphoto-1329031407-612x612.jpg",
            "https://i.ibb.co/wNcFdCv/istockphoto-1329031407-612x612.jpg",
        ],
        professionalLife: [
            "https://i.ibb.co/r0d7DmT/prof.jpg",
            "https://i.ibb.co/r0d7DmT/prof.jpg",
            "https://i.ibb.co/r0d7DmT/prof.jpg",
            "https://i.ibb.co/r0d7DmT/prof.jpg",
        ],
        personalOld: [
            "https://i.ibb.co/T2qJm72/personal.jpg",
            "https://i.ibb.co/T2qJm72/personal.jpg",
            "https://i.ibb.co/T2qJm72/personal.jpg",
            "https://i.ibb.co/T2qJm72/personal.jpg",
        ],
    }
    const photoGallery = (photosArray) => (
        <div className="mx-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photosArray.map((photo, index) => (
                <img
                    key={index}
                    src={photo}
                    alt="gallery"
                    className="w-[25rem] h-[24rem] object-cover rounded shadow-lg"
                />
            ))}
        </div>)
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row items-center gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[64px] font-bold">All Photos</div>
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
            </div>
            <div className="flex gap-4 mb-8 mt-8">
                <button
                    className={`px-4 py-2 rounded ${activeCategory === 'singlePhotoShot' ? 'active' : 'notActive'}`}
                    onClick={() => setActiveCategory('singlePhotoShot')}
                >
                    Single Photo Shot
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeCategory === 'roamingAroundWorld' ? 'active' : 'notActive'}`}
                    onClick={() => setActiveCategory('roamingAroundWorld')}
                >
                    Roaming Around the World
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeCategory === 'professionalLife' ? 'active' : 'notActive'}`}
                    onClick={() => setActiveCategory('professionalLife')}
                >
                    Professional Life
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeCategory === 'personalOld' ? 'active' : 'notActive'}`}
                    onClick={() => setActiveCategory('personalOld')}
                >
                    Personal Old Photos
                </button>
            </div>
            {activeCategory === 'roamingAroundWorld' && photoGallery(photos.roamingAroundWorld)}
            {activeCategory === 'professionalLife' && photoGallery(photos.professionalLife)}
            {activeCategory === 'personalOld' && photoGallery(photos.personalOld)}
            {activeCategory === 'singlePhotoShot' && photoGallery(photos.singlePhotoShot)}
        </div>
    );
};

export default AllPhotos;