import React, { useState } from 'react';
import DashboardLeft from "./DashboardLeft";
import { IoIosSearch } from 'react-icons/io';
import { FaUpload } from 'react-icons/fa';
import upload from "../../assets/uploadImg.png";
import './Dashboard.css';
const PersonalInfo = () => {
    const personalMenu = [
        { id: "1", img: "https://i.ibb.co/hLv67Nx/analytics.png" },
        { id: "2", img: "https://i.ibb.co/F3rtmB5/notification.png" },
        { id: "3", img: "https://i.ibb.co/W5ZqJ39/profile.png" }
    ];

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

        e.target.value = '';
    };

    const triggerFileInput = () => {
        setImage(null);
        setPreview(null);
        document.getElementById('hiddenFileInput').click();
    };

    return (
        <div className="flex w-[100%] flex-col md:flex-row">
            <DashboardLeft />
            <div className={"mx-8 mt-4 w-[100%] md:w-[90%]"}>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[48px] font-[700]">Personal Info</h2>
                        <p className="text-[rgb(125,225,248)] text-left text-[24px] font-[700]">Write your profile details</p>
                    </div>
                    <div className="bg-[rgb(27,66,124)] w-[16rem] md:w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-8 md:mr-4">
                        <div className="flex justify-end">
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div>
                    <div className="flex gap-8 mt-8 justify-center">
                        {personalMenu.map((menu) => (
                            <div key={menu.id} className="flex items-center gap-8 text-xl font-semibold text-white">
                                <div className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center bg-[rgb(27,66,124)]">
                                    <img src={menu.img} alt="" className="w-[1.5rem]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex gap-8">
                    <div className="w-[40%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4">
                        <div>
                            <input
                                id="hiddenFileInput"
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <div className="flex justify-center">
                                <div
                                    onClick={triggerFileInput}
                                    className={`icon-button w-24 h-24 rounded-full flex justify-center items-center text-white overflow-hidden cursor-pointer mt-4`}
                                    style={{
                                        backgroundImage: preview ? `url(${preview})` : `url(${upload})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: preview ? 'transparent' : 'rgb(243,244,246)',
                                    }}
                                >
                                    {preview ? (
                                        <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <FaUpload />
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 mb-2">
                                <input type="text" placeholder="Enter your name" className="bg-[rgb(210,227,255)] rounded-lg py-2 w-[24rem] nameInput" />
                                <br />
                                <input type="text" placeholder="Write a short bio about yourself" className="rounded-lg py-1 px-4 w-[24rem] h-[10rem] mt-4 bioInput border-[rgb(210,227,255)] border-2" />

                            </div>
                        </div>
                    </div>
                    <div className="w-[60%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4">

                    </div>
                </div>
            </div>
        </div >
    );
};

export default PersonalInfo;
