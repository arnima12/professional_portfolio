import React from 'react';

const PhotoGallery = ({ image }) => {
    const { image: imgSrc, title } = image;
    return (
        <div>
            <img src={imgSrc} alt={title} className="w-[18rem] h-auto"
            />
            <h1 className="text-2xl">{title}</h1>
        </div>
    );
};

export default PhotoGallery;