import React, { useState } from 'react';
import DashboardLeft from "./DashboardLeft";
import { IoIosSearch } from 'react-icons/io';
import { FaUpload } from 'react-icons/fa';
import upload from "../../assets/uploadImg.png";
import './Dashboard.css';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
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
            <DashboardLeft paddingBottom="48rem" />
            <div className={"mx-8 my-4 w-[100%] md:w-[80%]"}>
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
                    <div className="w-[30%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4">
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
                                <input type="text" placeholder="Enter your name" className="bg-[rgb(210,227,255)] rounded-lg py-2 w-[20rem] nameInput" />
                                <br />
                                <input type="text" placeholder="Write a short bio about yourself" className="rounded-lg py-1 px-4 w-[20rem] h-[18rem] mt-4 bioInput border-[rgb(210,227,255)] border-2" />

                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4">
                        <div className="flex justify-around mx-4">
                            <div className="form-group">
                                <label for="gender" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Gender</label>
                                <select type="text" id="gender" name="gender" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem] rounded-lg">
                                    <option className="text-[rgb(102,145,214)]">Select your gender</option>
                                    <option>Female</option>
                                    <option>Male</option>
                                </select>
                            </div>
                            <div className="form-group ml-4">
                                <label for="dob" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Date of Birth</label>
                                <input type="date" id="dob" name="dob" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" />
                            </div>

                            <div className="form-group ml-4">
                                <label for="gender" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Gender</label>
                                <select type="text" id="gender" name="gender" className="border-[rgb(210,227,255)] h-[3rem] border-2 w-[18rem] rounded-lg">
                                    <option disabled selected className="text-[rgb(102,145,214)]">Select your gender</option>
                                    <option>Female</option>
                                    <option>Male</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-around mx-4">
                            <div className="form-group">
                                <label for="profession" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Profession</label>
                                <select type="text" id="profession" name="profession" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem] rounded-lg">
                                    <option disabled selected>Select your profession</option>
                                    <option value="accountant">Accountant</option>
                                    <option value="architect">Architect</option>
                                    <option value="artist">Artist</option>
                                    <option value="banker">Banker</option>
                                    <option value="chef">Chef</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="engineer">Engineer</option>
                                    <option value="fashion-designer">Fashion Designer</option>
                                    <option value="graphic-designer">Graphic Designer</option>
                                    <option value="lawyer">Lawyer</option>
                                    <option value="nurse">Nurse</option>
                                    <option value="pharmacist">Pharmacist</option>
                                    <option value="pilot">Pilot</option>
                                    <option value="programmer">Programmer</option>
                                    <option value="scientist">Scientist</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="writer">Writer</option>
                                    <option value="web developer">Web Developer</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group ml-4">
                                <label for="email" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Email</label>
                                <input type="email" id="email" name="email" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your email" />
                            </div>
                            <div className="form-group ml-4">
                                <label for="linkedin" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Linkedin</label>
                                <input type="linkedin" id="linkedin" name="linkedin" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your linkedin" />
                            </div>

                        </div>
                        <div className="flex gap-[0.2rem] w-[36rem]">
                            <div className="form-group ml-4">
                                <label for="facebook" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Facebook</label>
                                <input type="facebook" id="facebook" name="facebook" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your facebook" />
                            </div>
                            <div className="form-group ml-4">
                                <label for="youtube" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Youtube</label>
                                <input type="youtube" id="youtube" name="youtube" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your youtube" />
                            </div>
                        </div>
                        <div className="mx-4">
                            <label for="address" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Address</label>
                            <textarea id="address" name="address" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[8rem] border-2 w-[100%]" placeholder="Enter your address" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-[40%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4 mt-8 mb-8">
                        <div className="mx-3 text-left text-[rgb(17,72,153)] text-[32px] mb-4 font-semibold">Education</div>
                        <div className="flex flex-col items-center mx-4">
                            <div className="form-group">
                                <label for="degree" className="bg-[rgb(210,227,255)] w-[12rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Course/Degree</label>
                                <input type="text" id="degree" name="degree" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2" placeholder="Enter your course details" />
                            </div>
                            <div className="form-group">
                                <label for="school" className="bg-[rgb(210,227,255)] w-[12rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">School/University</label>
                                <input type="text" id="school" name="school" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2" placeholder="Enter your school details" />
                            </div>
                            <div className="form-group">
                                <label for="grades" className="bg-[rgb(210,227,255)] w-[12rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Grades</label>
                                <input type="text" id="grades" name="grades" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2" placeholder="Enter your grades" />
                            </div>
                            <div className="form-group">
                                <label for="year" className="bg-[rgb(210,227,255)] w-[12rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Year</label>
                                <input type="text" id="year" name="year" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2" placeholder="Enter your starting 7 passing year" />
                            </div>
                            <div className="w-full">
                                <div className="flex justify-between mx-2">
                                    <div className="bg-[rgb(48,58,107)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between">
                                        <button>
                                            Remove
                                        </button>
                                        <CiCircleMinus className="text-[1rem]" />
                                    </div>
                                    <div className="bg-[rgb(122,173,255)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between">
                                        <button>
                                            Add
                                        </button>
                                        <CiCirclePlus />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[60%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4 mt-8 mb-8">
                        <div className="mx-3 text-left text-[rgb(17,72,153)] text-[32px] mb-4 font-semibold">Experience</div>
                        <div className="flex mx-4 justify-around">
                            <div className="form-group">
                                <label for="company" className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Company Name</label>
                                <input type="text" id="company" name="company" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2" placeholder="Enter your company name" />
                            </div>
                            <div className="form-group">
                                <label for="job" className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Job Title</label>
                                <input type="text" id="job" name="job" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2" placeholder="Enter your designation" />
                            </div>
                        </div>
                        <div className="flex mx-4 justify-around">
                            <div className="form-group">
                                <label for="start" className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Start Date</label>
                                <input type="text" id="start" name="start" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2" placeholder="Enter your joining date" />
                            </div>
                            <div className="form-group">
                                <label for="end" className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">End Date/Ongoing</label>
                                <input type="text" id="end" name="end" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2" placeholder="Enter your job status" />
                            </div>
                        </div>
                        <div className="form-group mx-6">
                            <label for="details" className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Details</label>
                            <input type="text" id="details" name="details" className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[8rem] border-2 w-full rounded-lg px-2" placeholder="Write in detail about your work and experience in the company......" />
                        </div>
                        <div className="mx-2">
                            <div className="w-full">
                                <div className="flex justify-between mx-4">
                                    <div className="bg-[rgb(48,58,107)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between">
                                        <button>
                                            Remove
                                        </button>
                                        <CiCircleMinus className="text-[1rem]" />
                                    </div>
                                    <div className="bg-[rgb(122,173,255)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between">
                                        <button>
                                            Add
                                        </button>
                                        <CiCirclePlus />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-end mr-2">
                        <button className="bg-[rgb(125,225,248)] text-[rgb(13,16,89)] text-[36px] font-[500] py-2 border-2 rounded-lg border-[rgb(17,72,153)] px-6">Update</button>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default PersonalInfo;
