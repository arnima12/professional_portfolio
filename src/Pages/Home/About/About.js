import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="grid grid-cols-2 gap-4 mt-12 pl-8 mb-8">
            <div className="relative w-[38%]">
                <div className="rectangle2">
                    <div className="rectangle1">
                        <div>
                            <div className="flex justify-end font-bold text-[250px] text-[rgb(54,121,215)]">
                                42
                            </div>
                            <div className="text-[36px] font-bold w-[4rem] tracking-normal leading-none">
                                Years Working Experience
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="self-center w-[52%] text-left">
                <div className="w-[36rem]">
                    <h2 className="text-[90px] text-[rgb(30,81,153)] font-bold ">Who Am I?</h2>
                    <p className="text-[28px] tracking-normal leading-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <Link className="text-red-600">Read More....</Link></p>
                </div>
            </div>
        </div>
    );
};

export default About;
