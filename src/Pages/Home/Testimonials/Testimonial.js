import React from 'react';

const Testimonial = ({ testimonial }) => {
    const { name, img, des } = testimonial;
    return (
        <div className="w-[16rem]">
            <h3 className="text-white font-bold mb-6">{name}</h3>
            <div className='flex flex-col items-center gap-4'>
                <img src={img} alt="test" />
                <p className="text-justify text-white font-bold">{des}</p>
            </div>

        </div>
    );
};

export default Testimonial;