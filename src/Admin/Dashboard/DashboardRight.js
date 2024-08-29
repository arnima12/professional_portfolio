import React from 'react';
import { BiRadioCircleMarked } from 'react-icons/bi';
import { MdArrowRight, MdDelete } from 'react-icons/md';
import { useDropdown } from './DropdownContext/DropdownContext';

const DashboardRight = () => {
    const { isDropdownOpen } = useDropdown()
    const dashboardMenu = [
        { id: "1", img: "https://i.ibb.co/hLv67Nx/analytics.png" },
        { id: "2", img: "https://i.ibb.co/F3rtmB5/notification.png" },
        { id: "3", img: "https://i.ibb.co/W5ZqJ39/profile.png" }
    ]
    return (
        <div
            className={`dashboard-right h-full pb-[5.5rem] transition-all duration-100 relative w-full mt-8 md:mt-0 md:w-[20%] ${isDropdownOpen ? 'md:right-0' : 'md:right-[-100%]'}`}
        >
            <div className={`flex gap-8 mt-8 justify-center`}>
                {dashboardMenu.map((menu) => (
                    <div className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center">
                            <img src={menu.img} alt="" className="w-[1.5rem]" />
                        </div>
                    </div>
                ))}
            </div>
            <div className={`flex justify-between items-center text-white text-3xl font-bold mt-12 px-4`}>
                <div>History</div>
                <MdArrowRight className="flex items-center text-5xl pt-4" />
            </div>
            <div className="flex items-center mx-4 mt-6">
                <div className="dashboard-box h-[18rem] w-full">
                    <div className="flex items-center justify-between text-xl font-semibold mt-4 px-2">
                        <div>
                            <BiRadioCircleMarked className="text-white" />
                        </div>
                        <div>
                            <MdDelete className="text-red-700" />
                        </div>
                        <div className="text-white ">Deleted Item</div>
                        <div className="text-green-500">17 Aug</div>
                    </div>
                </div>
            </div>
            <div className={`flex justify-between items-center text-white text-3xl font-bold mt-12 px-4`}>
                <div>Upcoming Events</div>
                <MdArrowRight className="flex items-center text-5xl pt-2" />
            </div>
            <div className="flex items-center mx-4 mt-6">
                <div className="dashboard-box h-[18rem] w-full">
                    <div className="flex items-center justify-between md:gap-4 mx-2 text-xl font-semibold mt-4">
                        <div>
                            <BiRadioCircleMarked className="text-white" />
                        </div>
                        <div className="text-white text-left">Holidays Coming soon</div>
                        <div className="text-green-500">17 Aug</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardRight;
