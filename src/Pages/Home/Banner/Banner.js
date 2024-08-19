import React from 'react';
import "./Banner.css";
import logo from "../../../assets/logo.png";
import clientPhoto from "../../../assets/banner.png"
import { FaPlayCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../../../Shared/Sidebar/Sidebar';
const Banner = () => {
    return (
        <div className="flex shadow-md bg-white h-[50rem]" id="banner">
            <div className="w-[38%]">
                <div className="bg-[url('/src/assets/banner-bg.png')] bg-cover bg-center px-6 lg:px-20 py-6 h-[50rem]">
                    <div>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="text-left w-[42rem] absolute z-1 flex flex-col justify-center h-[70%]">
                        <h4 className="text-[rgb(54,121,215)] text-4xl font-bold">Hello! I am</h4>
                        <h1 className="text-7xl text-white mt-2">Sanjida Alam</h1>
                        <h2 className="text-[rgb(42,193,235)] text-6xl mt-2">Financial Expert and Cultural Enthusiast</h2>
                        <div className="mt-10">
                            <button className="bg-white p-2 text-[rgb(30,81,153)] text-5xl font-semibold">View More</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-sky-500 w-[58%] h-[50rem]">
                <div className="client-photo  ">
                    <img src={clientPhoto} alt="" className="h-[40rem] w-[50rem]" />
                </div>
                <div className="font-bold text-6xl text-start flex gap-4 items-end h-full relative z-1">
                    <div className="bg-white flex w-full py-6">
                        <div className="font-bolder text-7xl flex justify-start text-[rgb(30,81,153)] mt-4">-</div>
                        <div className="mt-4">
                            CHIEF EXECUTIVE OFFICER <br /> IFIC BANK LIMITED</div>
                    </div>
                </div>
            </div>
            <Sidebar fullHeight={false} />
            <div className="play-btn">
                <Link to="https://youtu.be/5O0YDHiosD0?si=WXnnE4GiA12Vu9KA"><FaPlayCircle className="text-7xl text-white" /></Link>
            </div>
        </div >
    );
};

export default Banner;