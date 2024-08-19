import React from 'react';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Sidebar = ({ fullHeight }) => {
    return (
        <div className={`bg-[rgb(42,51,68)] z-50  w-[4%] flex flex-col items-center py-28 gap-12 ${fullHeight ? 'fixed h-full right-0 top-0' : 'absolute top-0 right-0 h-[56rem]'}`}>
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