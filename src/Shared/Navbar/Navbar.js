import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { AuthContext } from '../../context/AuthProvider';
import logo from "../../assets/logo.png";
const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { email } = useParams();
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://innova-portfolio-server.vercel.app/users');
                const users = await response.json();
                const currentUserData = users.find(user => user.email === email);
                setUserData(currentUserData);
                console.log("userData", userData)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    const menuItems = [
        { id: 1, title: "Home", link: `${email}/` },
        { id: 4, title: "Gallery", link: `${email}/photo` },
        { id: 5, title: "Video", link: `${email}/video` },
        { id: 6, title: "News", link: `${email}/news` },
        { id: 8, title: "Blog", link: `${email}/allBlog` }
    ];

    return (
        <div className="navbar shadow-md bg-white py-4">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    {userData && userData.logo ? (
                        <img src={userData.logo} alt="User Logo" className="w-10 h-10 rounded-full" />
                    ) : (
                        <img src={logo} alt="User Logo" className="w-10 h-10 rounded-full" />
                    )}
                </Link>
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost xl:hidden"
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
                                <li className="mb-4 font-bold text-2xl hover:bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200 hover:text-white rounded-lg" key={item.id}>
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
            <div className="navbar-center hidden xl:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems.map(item => (
                        <li className="font-bold text-2xl hover:bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200 hover:text-white rounded-lg ml-8" key={item.id}>
                            <Link to={item.link}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end mr-10">
                {!currentUser ? (
                    <Link to="/signUp" className="font-bold text-2xl hover:bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200 hover:text-white rounded-lg px-4 py-2 mr-20">
                        Sign Up
                    </Link>
                ) : (
                    <Link to="/dashboard" className="font-bold text-2xl hover:bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200 hover:text-white rounded-lg px-4 py-2 mr-20">
                        Dashboard
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
