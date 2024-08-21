import React from 'react';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Sidebar = ({ fullHeight }) => {
    return (
        <div className={`bg-[rgb(42,51,68)] z-50  lg:w-[4%] flex lg:flex-col items-center lg:py-28 gap-12 lg:top-0 lg:right-0 bottom-[-6rem] h-[4rem] px-4 py-4 w-full ${fullHeight ? 'fixed lg:h-full ' : 'absolute lg:h-[56rem]'}`}>
            <div>
                <Link to="/">
                    <FaLinkedin className="text-[rgb(68,111,223)] text-[2.5rem]" /></Link>
            </div>
            <div>
                <Link to="/">
                    <FaYoutube className="text-[rgb(207,19,19)] text-[2.5rem]" /></Link>
            </div>
            <div>
                <Link to="/">
                    <FaFacebook className="text-[rgb(22,29,203)] text-[2.5rem]" /></Link>
            </div>
        </div>
    );
};

export default Sidebar;