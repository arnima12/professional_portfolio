import React from 'react';
import calendar from '../../assets/calendar.png';
import notification from '../../assets/notification.png';
import profile from '../../assets/profile.png';
import { BiRadioCircleMarked } from 'react-icons/bi';
import { MdArrowRight, MdDelete } from 'react-icons/md';
const DashboardRight = () => {
    return (

        <div className="dashboard-right w-[20%] h-full pb-[5.5rem]">
            <div className="flex justify-center gap-8 mt-8">
                <div className="flex items-center gap-8 text-xl font-semibold text-white">
                    <div className="icon">
                        <img src={calendar} alt="" className="w-[1.5rem]" /></div>
                </div>
                <div className="flex items-center gap-8 text-xl font-semibold text-white">
                    <div className="icon">
                        <img src={notification} alt="" className="w-[1.5rem]" /></div>
                </div>
                <div className="flex items-center gap-8 text-xl font-semibold text-white">
                    <div className="icon">
                        <img src={profile} alt="" className="w-[1.5rem]" /></div>
                </div>
            </div>
            <div className="flex justify-between items-center text-white text-3xl font-bold mt-12 px-4">
                <div>
                    History
                </div>
                <MdArrowRight className="flex items-center text-5xl pt-4" />
            </div>
            <div className="flex items-center mx-4 mt-6">
                <div className="dashboard-box h-[18rem] w-[24rem]">
                    <div className="flex items-center justify-between text-xl font-semibold mt-4 px-2">
                        <div>
                            <BiRadioCircleMarked className="text-white" />
                        </div>
                        <div>
                            <MdDelete className="text-red-700" />
                        </div>
                        <div className="text-white ">
                            Deleted Item
                        </div>
                        <div className="text-green-500">
                            17 Aug
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center text-white text-3xl font-bold mt-12 px-4">
                <div>
                    Upcoming Events
                </div>
                <MdArrowRight className="flex items-center text-5xl pt-2" />
            </div>
            <div className="flex items-center mx-4 mt-6">
                <div className="dashboard-box h-[18rem] w-[24rem]">
                    <div className="flex items-center gap-4 mx-2 text-xl font-semibold mt-4">
                        <div>
                            <BiRadioCircleMarked className="text-white" />
                        </div>
                        <div className="text-white text-left">
                            Holidays Coming soon
                        </div>
                        <div className="text-green-500">
                            17 Aug
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardRight;