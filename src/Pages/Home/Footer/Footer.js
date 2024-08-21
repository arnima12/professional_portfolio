import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { MdEmail, MdPhoneInTalk } from 'react-icons/md';

const Footer = () => {
    return (
        <div className=" bg-[rgb(42,51,68)]">
            <div className="flex flex-col lg:flex-row gap-10 justify-around w-full px-8 py-6">
                <div className="w-[30rem]">
                    <div className="flex items-center text-white">
                        <CiLocationOn className=" text-6xl " />
                        <span className="text-2xl ml-2 font-semibold">Address</span>
                    </div>
                    <p className="font-semibold text-white text-xl mt-4 w-[18rem] text-left">IFIC Tower, 61 Purana Paltan GPO Box: 2229, Dhaka - 1000</p>
                </div>
                <div className="w-[30rem]">
                    <div className="flex items-center text-white">
                        <MdEmail className=" text-6xl " />
                        <span className="text-2xl ml-2 font-semibold">Email</span>
                    </div>
                    <p className="font-semibold text-white text-xl mt-4 w-[18rem] text-left">abc@gmail.com</p>
                </div>
                <div className="w-[30rem]">
                    <div className="flex items-center text-white">
                        <MdPhoneInTalk className=" text-6xl " />
                        <span className="text-2xl ml-2 font-semibold">Mobile</span>
                    </div>
                    <p className="font-semibold text-white text-xl mt-4 w-[18rem] text-left">+8801234567891</p>
                </div>
            </div>
            <footer className="footer footer-center bg-base-300 p-4">
                <aside>
                    <p className="text-xl font-[500]"> © Copyright Nex Innova Tech All Rights Reserved</p>
                </aside>
            </footer>
        </div >
    );
};

export default Footer;