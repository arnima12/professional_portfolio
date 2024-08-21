import React from 'react';
import Testimonial from './Testimonial';

const Testimonials = () => {
    const testimonials = [
        {
            "id": "1",
            "img": "https://i.ibb.co/zXYRRqX/Ellipse-1.png",
            "name": "Sanjida Islam",
            "des": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, iure itaque incidunt vero laborum sequi quam saepe quas dicta consequatur. "
        },
        {
            "id": "2",
            "img": "https://i.ibb.co/zXYRRqX/Ellipse-1.png",
            "name": "Sanjida Islam",
            "des": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, iure itaque incidunt vero laborum sequi quam saepe quas dicta consequatur. "
        },
        {
            "id": "3",
            "img": "https://i.ibb.co/zXYRRqX/Ellipse-1.png",
            "name": "Sanjida Islam",
            "des": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, iure itaque incidunt vero laborum sequi quam saepe quas dicta consequatur. "
        },
        {
            "id": "4",
            "img": "https://i.ibb.co/zXYRRqX/Ellipse-1.png",
            "name": "Sanjida Islam",
            "des": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, iure itaque incidunt vero laborum sequi quam saepe quas dicta consequatur."
        }
    ]
    return (
        <div className="mt-12 bg-[rgb(24,77,150)] py-8">
            <div className="flex items-center justify-center">
                <div className="blog-left-line  hidden lg:block"></div>
                <div className="content text-[64px] text-[rgb(68,111,223)] font-bold">Testimonials</div>
                <div className="blog-right-line  hidden lg:flex items-center"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 justify-items-center mt-10">
                {testimonials.map((testimonial) => <Testimonial key={testimonial.id} testimonial={testimonial}></Testimonial>)}
            </div>

        </div>
    );
};

export default Testimonials;