import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { useDropdown } from './DropdownContext/DropdownContext';

const DashboardLeft = () => {
    const { isDropdownOpen, toggleDropdown } = useDropdown()
    const dashboardMenu = [
        { id: "1", img: "https://i.ibb.co/JF2QhYc/dashboard.png", title: "Dashboard", link: "/dashboard" },
        { id: "2", img: "https://i.ibb.co/KV6tz41/personal.png", title: "Personal Info", link: "/dashboard" },
        { id: "3", img: "https://i.ibb.co/DVm9vgJ/view.png", title: "View Projects", link: "/dashboard" },
        { id: "4", img: "https://i.ibb.co/jb4qW6P/analytics.png", title: "Analytics", link: "/dashboard" },
        { id: "5", img: "https://i.ibb.co/f9kXx3M/upload.png", title: "Upload Projects", link: `/dashboard/upload?dropdown=${isDropdownOpen}` },
        { id: "6", img: "https://i.ibb.co/xqCSpPj/settings.png", title: "Settings", link: "/dashboard" },
        { id: "7", img: "https://i.ibb.co/R061XFx/logout.png", title: "Logout", link: "/dashboard" },
    ];

    return (
        <div
            className={`dashboard-left transition-all duration-100 px-6 ${isDropdownOpen ? 'h-[50rem] w-[100%]' : 'h-[4rem] w-[100%]'} ${isDropdownOpen ? 'md:pb-[16.5rem] md:w-[20%] md:h-[100%]' : 'md:pb-[16.5rem] md:w-[6%] md:h-[100%]'} `}
        >
            <div className="mt-4 flex items-center justify-between">
                {isDropdownOpen ? (
                    <>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div>
                            <IoMdMenu className="text-3xl text-white cursor-pointer" onClick={toggleDropdown} />
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center ml-2 cursor-pointer">
                        <IoMdMenu className="text-3xl text-white" onClick={toggleDropdown} />
                    </div>
                )}
            </div>
            <div className="mt-12 text-left">
                <div className="flex flex-col gap-8">
                    {dashboardMenu.slice(0, 5).map((menu) => (
                        <Link to={menu.link} key={menu.id} className="flex items-center gap-8 text-xl font-semibold text-white">
                            {isDropdownOpen ? (
                                <>
                                    <div className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center">
                                        <img src={menu.img} alt={menu.title} className="w-[1.5rem]" />
                                    </div>
                                    <div>{menu.title}</div>
                                </>
                            ) : (
                                <div className="icon w-[3rem] h-[3rem] flex items-center justify-center">
                                    <img src={menu.img} alt={menu.title} className="w-[2rem]" />
                                </div>
                            )}
                        </Link>
                    ))}
                    <div className="flex justify-center mt-8">
                        <div className="w-[14rem] h-[0.2rem] bg-white"></div>
                    </div>
                    {dashboardMenu.slice(5).map((menu) => (
                        <Link to={menu.link} key={menu.id} className="flex items-center gap-8 text-xl font-semibold text-white">
                            {isDropdownOpen ? (
                                <>
                                    <div className="icon w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center">
                                        <img src={menu.img} alt={menu.title} className="w-[1.5rem]" />
                                    </div>
                                    <div>{menu.title}</div>
                                </>
                            ) : (
                                <div className="icon w-[3rem] h-[3rem] flex items-center justify-center">
                                    <img src={menu.img} alt={menu.title} className="w-[2rem]" />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardLeft;
