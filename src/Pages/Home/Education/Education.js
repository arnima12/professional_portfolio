import React, { useEffect, useState } from 'react';
import Institution from './Institution';
import './Education.css';
import { useParams } from 'react-router-dom';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [error, setError] = useState(null);
    const { email } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Email from URL params:", email);
                if (email) {
                    const response = await fetch(`https://innova-portfolio-server.vercel.app/users/${email}`);
                    const contentType = response.headers.get('content-type');

                    if (response.status === 404) {
                        console.log('User not found, displaying demo education data');
                        const demoEducation = [
                            {
                                id: 1,
                                degree: "Bsc",
                                school: "BUP",
                                grades: "3.50",
                                startYear: "2020",
                                endYear: "2023",
                                logo: "https://innova-portfolio-server.vercel.app/uploads/1726658196668.png",
                                border: true
                            },
                            {
                                id: 2,
                                degree: "Bsc",
                                school: "BUP",
                                grades: "3.50",
                                startYear: "2020",
                                endYear: "2023",
                                logo: "https://innova-portfolio-server.vercel.app/uploads/1726658196668.png",
                                border: true
                            },
                        ];
                        setEducation(demoEducation);
                        return;
                    }

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        setEducation(data.education || []);
                    } else {
                        throw new Error('Received non-JSON response');
                    }
                } else {
                    const demoEducation = [
                        {
                            id: 1,
                            degree: "Bsc",
                            school: "BUP",
                            grades: "3.50",
                            startYear: "2020",
                            endYear: "2023",
                            logo: "https://innova-portfolio-server.vercel.app/uploads/1726658196668.png",
                            border: true
                        },
                        {
                            id: 2,
                            degree: "Bsc",
                            school: "BUP",
                            grades: "3.50",
                            startYear: "2020",
                            endYear: "2023",
                            logo: "https://innova-portfolio-server.vercel.app/uploads/1726658196668.png",
                            border: true
                        },
                    ];
                    setEducation(demoEducation);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error.message);
            }
        };

        fetchUserData();
    }, [email]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="education px-8 my-24">
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[50px] md:text-[64px] font-bold">My Education</div>
            </div>
            <div className="education-container grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 gap-8 mt-16 justify-items-center">
                {education.length > 0 ? (
                    education.map((institution) => (
                        <Institution key={institution.id} institution={institution} className="institution" />
                    ))
                ) : (
                    <div>No education data available</div>
                )}
            </div>
        </div>
    );
};

export default Education;
