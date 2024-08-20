import React from 'react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
const Navbar = () => {
    const menuItems = [
        {
            id: 1,
            title: "Home",
            link: "/"
        },
        {
            id: 2,
            title: "About",
            link: "/"
        },
        {
            id: 3,
            title: "Education",
            link: "/"
        },
        {
            id: 4,
            title: "Gallery",
            link: "/photo"
        },
        {
            id: 5,
            title: "Video",
            link: "/video"
        },
        {
            id: 6,
            title: "News",
            link: "/news"
        },
        {
            id: 7,
            title: "Testimonials",
            link: "/"
        },
        {
            id: 8,
            title: "Blog",
            link: "/allBlog"
        },
        {
            id: 9,
            title: "Contact",
            link: "/"
        }
    ]
    return (
        <div className="navbar shadow-md bg-white py-4">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="navbar-center">
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
        </div >
    );
};

export default Navbar;