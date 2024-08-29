import React from 'react';
import "./Banner.css";
import logo from "../../../assets/logo.png";
import clientPhoto from "../../../assets/banner.png"
import { FaPlayCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../../../Shared/Sidebar/Sidebar';
import 'animate.css';
const Banner = () => {
    return (
        <div className="flex gap-0">
            <div className="flex shadow-md bg-white h-[50rem] w-full lg:w-[98%]" id="banner">
                <div className=" w-[60%] md:w-[40%]">
                    <div className="bg-[url('/src/assets/banner-bg.png')] bg-cover bg-center px-6 lg:px-20 py-6 h-[50rem]">
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="text-left w-[16rem] md:w-[24rem] lg:w-[42rem] absolute z-1 flex flex-col justify-center h-[70%]">
                            <h4 className="text-[rgb(54,121,215)] text-2xl md:text-4xl font-bold">Hello! I am</h4>
                            <h1 className="text-3xl md:text-5xl lg:text-7xl text-white mt-2">Sanjida Alam</h1>
                            <h2 className="text-[rgb(42,193,235)] text-3xl md:text-4xl lg:text-6xl mt-2">Financial Expert and Cultural Enthusiast</h2>
                            <div className="mt-10">
                                <button className="banner-btn bg-white p-2 text-[rgb(30,81,153)] text-3xl lg:text-5xl font-semibold">View More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-sky-500 w-[40%] md:w-[60%] h-[50rem]">
                    <div className="client-photo">
                        <img src={clientPhoto} alt="" className="h-[30rem] lg:h-[40rem] w-[15rem] md:w-[40rem] lg:w-[50rem] lg:bottom-[1rem] bottom-[5rem]" />
                    </div>
                    <div className="font-bold text-2xl md:text-4xl lg:text-6xl text-start flex gap-4 items-end h-full relative z-1">
                        <div className="bg-white flex w-full py-6">
                            <div className="font-bolder text-7xl flex justify-start text-[rgb(30,81,153)] mt-4">-</div>
                            <div className="mt-4">
                                CHIEF EXECUTIVE OFFICER <br /> IFIC BANK LIMITED</div>
                        </div>
                    </div>
                </div>

                <div className="play-btn absolute top-[58%] md:left-[36%] left-[52%]">
                    <Link to="https://youtu.be/5O0YDHiosD0?si=WXnnE4GiA12Vu9KA"><FaPlayCircle className="text-7xl text-white" /></Link>
                </div>

            </div >
            <Sidebar className="w-[2%]" fullHeight={false} />

        </div>
    );
};

export default Banner;