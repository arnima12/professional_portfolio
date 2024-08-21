import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const menuItems = [
        { id: 1, title: "Home", link: "/" },
        { id: 2, title: "About", link: "/about" },
        { id: 3, title: "Education", link: "/education" },
        { id: 4, title: "Gallery", link: "/photo" },
        { id: 5, title: "Video", link: "/video" },
        { id: 6, title: "News", link: "/news" },
        { id: 7, title: "Testimonials", link: "/testimonials" },
        { id: 8, title: "Blog", link: "/allBlog" },
        { id: 9, title: "Contact", link: "/contact" }
    ];

    return (
        <div className="navbar shadow-md bg-white py-4">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={logo} alt="logo" />
                </Link>
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden"
                        onClick={toggleDropdown}
                    >
                        {isDropdownOpen ? (
                            <FaTimes className="h-5 w-5" />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        )}
                    </label>
                    {isDropdownOpen && (
                        <ul
                            tabIndex={1}
                            className="menu menu-compact dropdown-content mt-3 p-4 shadow rounded-box glow-btn bg-white w-[30rem] bg-opacity-70"
                        >
                            {menuItems.map((item) => (
                                <li className="font-bold text-3xl mb-4" key={item.id}>
                                    <Link
                                        to={item.link}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems.map(item => (
                        <li className="font-bold text-2xl" key={item.id}>
                            <Link to={item.link}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">

            </div>
        </div>
    );
};

export default Navbar;
