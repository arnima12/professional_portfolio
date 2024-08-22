import React from 'react';
import Institution from './Institution';
import './Education.css';
const Education = () => {
    const education = [
        {
            "id": "1",
            "name": "Chittagong Collegiate School",
            "year": "1972",
            "img": "https://i.ibb.co/0KdqMS4/scl-logo-removebg-preview.png",
            "cls": "class six to eight",
            "border": "rgb(47,94,163)"
        },
        {
            "id": "2",
            "name": "Chittagong Collegiate School",
            "year": "1972",
            "img": "https://i.ibb.co/0KdqMS4/scl-logo-removebg-preview.png",
            "cls": "class six to eight",
            "border": "rgb(83,203,95)"
        },
        {
            "id": "3",
            "name": "Chittagong Collegiate School",
            "year": "1972",
            "img": "https://i.ibb.co/0KdqMS4/scl-logo-removebg-preview.png",
            "cls": "class six to eight",
            "border": "rgb(44,193,235)"
        },
        {
            "id": "4",
            "name": "Chittagong Collegiate School",
            "year": "1972",
            "img": "https://i.ibb.co/0KdqMS4/scl-logo-removebg-preview.png",
            "cls": "class six to eight",
            "border": "rgb(80,22,203)"
        },
        {
            "id": "5",
            "name": "Chittagong Collegiate School",
            "year": "1972",
            "img": "https://i.ibb.co/0KdqMS4/scl-logo-removebg-preview.png",
            "cls": "class six to eight",
            "border": "rgb(217,211,72)"
        }
    ]
    return (
        <div className="education px-8 my-24">
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[50px] md:text-[64px] font-bold">My Education</div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 gap-8 mt-16 justify-items-center">
                {
                    education.map((institution) => <Institution key={institution.id} institution={institution}></Institution>)
                }
            </div>
        </div>
    );
};

export default Education;