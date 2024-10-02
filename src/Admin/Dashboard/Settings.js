import React, { useContext, useEffect, useState } from 'react';
import DashboardLeft from './DashboardLeft';
import { IoIosSearch } from 'react-icons/io';
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import upload from "../../assets/green-upload.jpg";
import './Dashboard.css';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
const Settings = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const { currentUser, changePassword, signIn } = useContext(AuthContext);
    const { logOut, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [events, setEvents] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const email = currentUser.email;
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${email}/notifications`);
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data.notifications);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (email) {
            fetchNotifications();
        }
    }, [email]);

    const handleNotificationClick = (notification) => {
        alert(`${notification.senderName} (${notification.senderEmail}) sends you subject: ${notification.subject} & the message: ${notification.message}`);
    };
    const handleAddEvent = async (e) => {
        e.preventDefault();
        const newEvent = { title, date, description };
        try {
            const response = await fetch(`http://localhost:8000/users/${email}/events`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            console.log("res", response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents([...events, data]); // Assuming the API returns the created event
            setTitle('');
            setDescription('');
            setDate(new Date());
            setShowCalendar(false); // Hide calendar after adding event
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    const handleSignOut = () => {
        logOut()
            .then(() => {
                setCurrentUser(null);
                navigate('/signIn');
            }).catch((error) => {
                // An error happened.
            });
    }
    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${currentUser.email}`);
                const result = await response.json();
                if (response.ok) {
                    setPreview(result.logo || upload);
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
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
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
        const { name, value } = e.target;
        if (name === "currentPassword") {
            setCurrentPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
            validatePassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters long and include at least one letter and one number.");
        } else {
            setPasswordError("");
        }
    };
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        try {
            await signIn(currentUser.email, currentPassword);

            await changePassword(newPassword);
            alert("Password changed successfully!");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error('Failed to change password:', error);
            alert(error.message);
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
                    {/* <div className="bg-[rgb(27,66,124)] w-[16rem] md:w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-8 md:mr-4">
                        <div className="flex justify-end">
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div> */}
                    <div className={`flex gap-8 mt-8 justify-center`}>
                        <div className="flex items-center gap-8 text-xl font-semibold text-white  ">
                            <button className="w-[3rem] h-[3rem] rounded-full bg-[rgb(27,66,124)] border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center" onClick={() => setShowCalendar(true)}>
                                <img src={"https://i.ibb.co/hLv67Nx/analytics.png"} alt="" className="w-[1.5rem]" />
                            </button>
                            {showCalendar && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-gray-800 p-4 rounded">
                                        <h3 className="text-white text-xl mb-2">Add Event</h3>
                                        <form onSubmit={handleAddEvent}>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Event Title"
                                                className="w-full p-2 mb-2 rounded text-black"
                                                required
                                            />
                                            <Calendar
                                                onChange={setDate}
                                                value={date}
                                                className="mb-4 text-black"
                                            />
                                            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                                Add Event
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowCalendar(false)}
                                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded ml-2"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-8 text-xl font-semibold text-white dropdown dropdown-end">
                            <button className="w-[3rem] h-[3rem] rounded-full bg-[rgb(27,66,124)] border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center" tabIndex="0">
                                <img src={"https://i.ibb.co/F3rtmB5/notification.png"} alt="" className="w-[1.5rem]" />
                            </button>
                            <ul className="menu dropdown-content bg-[rgb(27,66,124)] rounded-box z-[1] w-[20rem] px-4 py-4 shadow mt-36 text-[rgb(218,211,211)]" tabIndex="0">
                                {notifications.map((item) => (
                                    <li
                                        key={item.id}
                                        className="text-wrap cursor-pointer"
                                        onClick={() => handleNotificationClick(item)}
                                    >
                                        {item.senderName} ({item.senderEmail}) sends you a message
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-8 text-xl font-semibold text-white dropdown dropdown-end">
                            <button className="w-[3rem] h-[3rem] rounded-full bg-[rgb(27,66,124)] border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center" tabIndex="0">
                                <img src={"https://i.ibb.co/W5ZqJ39/profile.png"} alt="" className="w-[1.5rem]" />
                            </button>
                            <ul className="menu dropdown-content bg-[rgb(27,66,124)] rounded-box z-[1] w-[8rem] px-4 py-4 shadow mt-28 text-[rgb(218,211,211)]" tabIndex="0">
                                <button onClick={handleSignOut}>LogOut</button>
                            </ul>
                        </div>
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
                <div className="bg-[rgba(144,202,215,0.61)] px-4 rounded-2xl py-8 mt-8 h-[20rem]">
                    <div className="flex justify-between ">
                        <div>
                            <h2 className="text-[rgb(27,66,124)] text-[36px] font-[700] text-left">Change Password</h2>
                            <p className="text-[rgb(102,145,214)] text-left text-[24px] font-[700]">Add Letters , digits and icons for strong password </p>
                        </div>
                        <div className="grid grid-cols-2 gap-[0.2rem]">
                            <div className="form-group ml-4 bg-transparent">
                                <label for="currentPassword" className="bg-[rgb(210,227,255)] w-[10rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Current Password</label>
                                <input
                                    className="w-[12rem] md:w-[18rem] mb-2 text-black rounded-lg h-[2.5rem] px-2 bg-transparent border-4 border-white"
                                    type={showPassword ? "text" : "password"}
                                    name="currentPassword"
                                    value={currentPassword}
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
                                <label for="newPassword" className="bg-[rgb(210,227,255)] w-[10rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Confirm Password</label>
                                <input
                                    className="w-[12rem] md:w-[18rem] mb-2 text-black rounded-lg h-[2.5rem] px-2 bg-transparent border-4 border-white"
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={newPassword}
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
                                <label for="confirmPassword" className="bg-[rgb(210,227,255)] w-[10rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">New Password</label>
                                <input
                                    className="w-[12rem] md:w-[18rem] mb-2 text-black rounded-lg h-[2.5rem] px-2 bg-transparent border-4 border-white"
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
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
                    <div className="flex justify-end">
                        <button
                            className="bg-[rgb(102,145,214)] px-4 py-2 text-white rounded-lg mt-4"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
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