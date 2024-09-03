import React, { useState } from 'react';
import DashboardLeft from './DashboardLeft';
import { IoIosSearch } from 'react-icons/io';

const Settings = () => {
    const settings = [
        { id: "1", img: "https://i.ibb.co/hLv67Nx/analytics.png" },
        { id: "2", img: "https://i.ibb.co/F3rtmB5/notification.png" },
        { id: "3", img: "https://i.ibb.co/W5ZqJ39/profile.png" }
    ];
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleImageUpload = () => {
        if (!selectedImage) {
            alert("Please select an image to upload");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        fetch('https://your-upload-url.com/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div className="flex w-[100%] flex-col md:flex-row">
            <DashboardLeft paddingBottom="16.5rem" />
            <div className={"mx-8 my-4 w-[100%] md:w-[80%]"}>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[48px] font-[700] text-left">Settings</h2>
                        <p className="text-[rgb(125,225,248)] text-left text-[24px] font-[700]">Manage your account settings</p>
                    </div>
                    <div className="bg-[rgb(27,66,124)] w-[16rem] md:w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-8 md:mr-4">
                        <div className="flex justify-end">
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div>
                    <div className="flex gap-8 mt-8 justify-center">
                        {settings.map((menu) => (
                            <div key={menu.id} className="flex items-center gap-8 text-xl font-semibold text-white">
                                <div className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center bg-[rgb(27,66,124)]">
                                    <img src={menu.img} alt="" className="w-[1.5rem]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[rgba(144,202,215,0.61)] px-4 rounded-xl flex justify-between py-8">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[36px] font-[700] text-left">Your Logo</h2>
                        <p className="text-[rgb(102,145,214)] text-left text-[24px] font-[700]">Update your page logo</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <input type="file" onChange={handleImageChange} />
                        {preview && <img src={preview} alt="Preview" width="200" />}
                        <div className="flex justify-center w-full">
                            <button onClick={handleImageUpload} className="bg-[rgb(102,145,214)] text-white px-2 py-2 rounded-xl">Replace Logo</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Settings;