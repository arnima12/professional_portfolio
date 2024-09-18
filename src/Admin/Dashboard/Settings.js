import React, { useContext, useEffect, useState } from 'react';
import DashboardLeft from './DashboardLeft';
import { IoIosSearch } from 'react-icons/io';
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import upload from "../../assets/green-upload.jpg";
import './Dashboard.css';
import { AuthContext } from '../../context/AuthProvider';
const Settings = () => {
    const settings = [
        { id: "1", img: "https://i.ibb.co/hLv67Nx/analytics.png" },
        { id: "2", img: "https://i.ibb.co/F3rtmB5/notification.png" },
        { id: "3", img: "https://i.ibb.co/W5ZqJ39/profile.png" }
    ];
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${currentUser.email}`);
                const result = await response.json();
                if (response.ok) {
                    setPreview(result.logo || upload); // Assuming result.logoUrl contains the URL of the existing logo
                } else {
                    console.error('Failed to fetch logo:', result.message);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        fetchLogo();
    }, [currentUser.email]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);  // Store the actual File object
            const previewUrl = URL.createObjectURL(file);  // Local preview
            setPreview(previewUrl);
            console.log("File selected:", file);
            console.log("Preview URL:", previewUrl);
        } else {
            console.error("No file selected");
        }
        e.target.value = ''; // Clear the input value
    };
    const handleReplaceLogo = async () => {
        if (!image) {
            console.error("No image selected for upload");
            return;
        }

        const formData = new FormData();
        formData.append('logo', image);

        try {
            const response = await fetch(`http://localhost:8000/users/${currentUser.email}/update-logo`, {
                method: 'PATCH',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Logo updated successfully:', result);
            } else {
                console.error('Failed to update logo:', result.message);
            }
        } catch (error) {
            console.error('Error updating logo:', error);
        }
    };

    const triggerFileInput = () => {
        setImage(null);
        setPreview(null);
        document.getElementById('hiddenFileInput').click();
    };
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must be at least 8 characters long and include at least one letter and one number."
            );
        } else {
            setPasswordError("");
        }
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
                <div className="bg-[rgba(144,202,215,0.61)] px-4 rounded-2xl flex justify-between py-8 mt-8 h-[15rem]">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[36px] font-[700] text-left">Your Logo</h2>
                        <p className="text-[rgb(102,145,214)] text-left text-[24px] font-[700]">Update your page logo</p>
                    </div>
                    <div className="flex gap-12 items-center">
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
                                    className={`icon-button w-24 h-24 rounded-lg flex justify-center items-center text-white overflow-hidden cursor-pointer mt-4`}
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
                        </div>
                        <button className="bg-[rgb(102,145,214)] px-4 py-2 text-white rounded-lg" onClick={handleReplaceLogo}>
                            Replace Logo
                        </button>
                    </div>
                </div>
                <div className="bg-[rgba(144,202,215,0.61)] px-4 rounded-2xl flex justify-between py-8 mt-8 h-[15rem]">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[36px] font-[700] text-left">Change Password</h2>
                        <p className="text-[rgb(102,145,214)] text-left text-[24px] font-[700]">Add Letters , digits and icons for strong password </p>
                    </div>
                    <div className="grid grid-cols-2 gap-[0.2rem]">
                        <div className="form-group ml-4 bg-transparent">
                            <label for="password" className="bg-[rgb(210,227,255)] w-[10rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Current Password</label>
                            <input
                                className="w-[12rem] md:w-[18rem] mb-2 text-black rounded-lg h-[2.5rem] px-2 bg-transparent border-4 border-white"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Enter your current password"
                                onChange={handlePasswordChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-1 top-8"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FaEye className="text-[rgb(102,145,214)]" />
                                ) : (
                                    <FaEyeSlash className="text-[rgb(102,145,214)]" />
                                )}
                            </button>
                        </div>
                        <div className="form-group ml-4 bg-transparent">
                            <label for="password" className="bg-[rgb(210,227,255)] w-[10rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Confirm Password</label>
                            <input
                                className="w-[12rem] md:w-[18rem] mb-2 text-black rounded-lg h-[2.5rem] px-2 bg-transparent border-4 border-white"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Enter your current password"
                                onChange={handlePasswordChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-1 top-8"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FaEye className="text-[rgb(102,145,214)]" />
                                ) : (
                                    <FaEyeSlash className="text-[rgb(102,145,214)]" />
                                )}
                            </button>
                        </div>
                        <div className="form-group ml-4 bg-transparent">
                            <label for="password" className="bg-[rgb(210,227,255)] w-[10rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">New Password</label>
                            <input
                                className="w-[12rem] md:w-[18rem] mb-2 text-black rounded-lg h-[2.5rem] px-2 bg-transparent border-4 border-white"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Enter your new password"
                                onChange={handlePasswordChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-1 top-8"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FaEye className="text-[rgb(102,145,214)]" />
                                ) : (
                                    <FaEyeSlash className="text-[rgb(102,145,214)]" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-[rgb(27,66,124)] text-[36px] font-[700] text-left">Notification settings</h2>
                    <div className="flex justify-between border-[rgb(102,145,214)] border-2 px-2 py-2 mt-4 rounded-lg">
                        <div className="text-[rgb(102,145,214)] text-xl ">
                            Pop up notification on desktop
                        </div>
                        <div>
                            <input type="checkbox" className="toggle toggle-info" defaultChecked />
                        </div>

                    </div>
                    <div className="flex justify-between border-[rgb(102,145,214)] border-2 px-2 py-2 mt-4 rounded-lg">
                        <div className="text-[rgb(102,145,214)] text-xl ">
                            Upcoming Events
                        </div>
                        <div>
                            <input type="checkbox" className="toggle toggle-info" defaultChecked />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Settings;