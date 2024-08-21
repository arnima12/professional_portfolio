import React from 'react';
import './Gallery.css'
import GalleryDes from './GalleryDes';
const Gallery = () => {
    const gallery = [
        {
            "id": "1",
            "name": "Cadet Life",
            "img": "https://i.ibb.co/4gzMbXD/images.jpg",
            "des": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, iure itaque incidunt vero laborum sequi quam saepe quas dicta consequatur`
        },
        {
            "id": "2",
            "name": "Personal Life",
            "img": "https://i.ibb.co/4gzMbXD/images.jpg",
            "des": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, iure itaque incidunt vero laborum sequi quam saepe quas dicta consequatur`
        },
        {
            "id": "3",
            "name": "Professional Life",
            "img": "https://i.ibb.co/4gzMbXD/images.jpg",
            "des": `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, iure itaque incidunt vero laborum sequi quam saepe quas dicta consequatur`
        }
    ]
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="gallery-left-line  hidden lg:block"></div>
                <div className="content text-[50px] md:text-[64px] text-[rgb(30,81,153)] font-bold">Gallery</div>
                <div className="gallery-horizontal-line gallery-right-line  hidden lg:flex items-center"></div>
            </div>
            <div className="text-center text-[rgb(50,48,48)] text-[28px] font-[500]">My memories and moments captured here.</div>
            <div className="flex flex-col gap-8 mt-4 mb-4">
                {
                    gallery.map((galleryDes) => <GalleryDes key={galleryDes.id} galleryDes={galleryDes}></GalleryDes>)
                }
            </div>
        </div>
    );
};

export default Gallery;