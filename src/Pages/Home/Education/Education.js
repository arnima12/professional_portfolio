import React, { useContext, useEffect, useState } from 'react';
import Institution from './Institution';
import './Education.css';
import { AuthContext } from '../../../context/AuthProvider';
const Education = () => {
    const [education, setEducation] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext)
    const userEmail = currentUser?.email;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userEmail) {
                    const response = await fetch(`http://localhost:8000/users/${userEmail}`);
                    console.log("response", response);
                    const contentType = response.headers.get('content-type');
                    console.log("headers", contentType);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        setEducation(data.education);
                    } else {
                        throw new Error('Received non-JSON response');
                    }
                } else {
                    const demoEducation = [
                        {
                            id: 1,
                            name: "Demo University",
                            year: "2015 - 2019",
                            img: "demo-university.png",
                            className: "demo-institution",
                            border: true
                        },
                        {
                            id: 2,
                            name: "Sample College",
                            year: "2013 - 2015",
                            img: "sample-college.png",
                            className: "demo-institution",
                            border: true
                        },
                        {
                            id: 3,
                            name: "Sample College",
                            year: "2013 - 2015",
                            img: "sample-college.png",
                            className: "demo-institution",
                            border: true
                        },
                        {
                            id: 4,
                            name: "Sample College",
                            year: "2013 - 2015",
                            img: "sample-college.png",
                            className: "demo-institution",
                            border: true
                        },
                        {
                            id: 5,
                            name: "Sample College",
                            year: "2013 - 2015",
                            img: "sample-college.png",
                            className: "demo-institution",
                            border: true
                        },
                    ];
                    setEducation(demoEducation);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUserData();
    }, [userEmail]);

    if (error) {
        return console.log("error: ", error);
    }
    return (
        <div className="education px-8 my-24">
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[50px] md:text-[64px] font-bold">My Education</div>
            </div>
            <div className="education-container grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 gap-8 mt-16 justify-items-center">
                {
                    education.map((institution) => <Institution key={institution.id} institution={institution} className="institution"></Institution>)
                }
            </div>
        </div>
    );
};

export default Education;