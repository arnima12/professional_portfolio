import React from 'react';
import './Dashboard.css';
import { IoIosSearch } from 'react-icons/io';
import { MdArrowRight } from 'react-icons/md';
import draft from '../../assets/draft.png';
import recycle from '../../assets/recycle.png';

import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';
const Dashboard = () => {
    return (
        <div className="flex w-[100%] flex-col md:flex-row">
            <DashboardLeft paddingBottom="16.5rem" />
            <div className={`dashboard-center ml-8 mt-4 w-[90%]  md:w-[60%]`}>
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[48px] font-[700]">Hello User</h2>
                        <p className="text-[rgb(125,225,248)] text-left text-[24px] font-[700]">Manage Your account</p>
                    </div>
                    <div className="bg-[rgb(27,66,124)] w-[16rem] md:w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-8 md:mr-4">
                        <div className="flex justify-end" >
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:flex-row mt-16 gap-8 ">
                    <div className="dashboard-border lg:w-[16rem] lg:h-[18rem]">
                        <div className="flex justify-between items-center p-4 text-[rgb(13,16,89)] text-2xl font-bold">
                            <div>Progress</div>
                            <MdArrowRight />
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="percentage flex items-center justify-center text-6xl text-[rgb(201,49,226)] font-bold w-[9rem] h-[9rem]">
                                65%
                            </div>

                        </div>
                        <p className="text-[rgb(17,72,153)] mt-2 pb-2 font-bold text-xl w-[10rem] text-left mx-6">Reach Increased past week</p>
                    </div>
                    <div className="dashboard-border lg:w-[16rem] lg:h-[18rem]">
                        <div className="flex justify-between items-center p-4 text-[rgb(13,16,89)] text-2xl font-bold">
                            <div>Drafts</div>
                            <MdArrowRight />
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="flex items-center h-[9rem]">
                                <img src={draft} alt="draft" />
                            </div>

                        </div>
                        <p className="text-[rgb(17,72,153)] mt-2 pb-2 font-bold text-xl w-[10rem] text-left mx-6">10 items on drafts</p>
                    </div>
                    <div className="dashboard-border lg:w-[16rem] lg:h-[18rem]">
                        <div className="flex justify-between items-center p-4 text-[rgb(13,16,89)] text-2xl font-bold">
                            <div>Recycle Bin</div>
                            <MdArrowRight />
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="flex items-center h-[9rem]">
                                <img src={recycle} alt="recycle" />
                            </div>

                        </div>
                        <p className="text-[rgb(17,72,153)] mt-2 pb-2 font-bold text-xl w-[10rem] text-left mx-6">Recently deleted items</p>
                    </div>
                </div>
            </div>
            <DashboardRight />
        </div>
    );
};

export default Dashboard;