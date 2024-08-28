import React from 'react';
import logo from '../../assets/logo.png';
import dashboard from '../../assets/dashboard.png';
import personal from '../../assets/personal.png';
import view from '../../assets/view.png';
import analytics from '../../assets/analytics.png';
import upload from '../../assets/upload.png';
import settings from '../../assets/settings.png';
import logout from '../../assets/logout.png';
import { Link } from 'react-router-dom';
const DashboardLeft = () => {
    return (
        <div className="dashboard-left h-full w-[20%] px-8 pb-[16rem]">
            <div className="mt-4">
                <img src={logo} alt="logo" />
            </div>
            <div className="mt-12 text-left">
                <div className="flex flex-col gap-8">
                    <Link to="/dashboard" className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="icon">
                            <img src={dashboard} alt="" className="w-[1.5rem]" /></div>
                        <div>Dashboard</div>
                    </Link>
                    <div className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="icon">
                            <img src={personal} alt="" className="w-[1.5rem]" /></div>
                        <div>Personal Info</div>
                    </div>
                    <div className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="icon">
                            <img src={view} alt="" className="w-[1.5rem]" /></div>
                        <div>View Projects</div>
                    </div>
                    <div className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="icon">
                            <img src={analytics} alt="" className="w-[1.5rem]" /></div>
                        <div>Analytics</div>
                    </div>
                    <Link to="/dashboard/upload" className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="icon">
                            <img src={upload} alt="" className="w-[1.5rem]" /></div>
                        <div>Upload Projects</div>
                    </Link>
                    <div className="flex justify-center mt-8">
                        <div className=" w-[14rem] h-[0.2rem] bg-white ">
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="icon">
                            <img src={settings} alt="" className="w-[1.5rem]" /></div>
                        <div>Settings</div>
                    </div>
                    <div className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="icon">
                            <img src={logout} alt="" className="w-[1.5rem]" /></div>
                        <div>Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLeft;