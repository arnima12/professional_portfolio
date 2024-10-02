import React, { useContext, useEffect, useState } from 'react';
import DashboardLeft from "./DashboardLeft";
import { IoIosSearch } from 'react-icons/io';
import { FaUpload } from 'react-icons/fa';
import upload from "../../assets/uploadImg.png";
import './Dashboard.css';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { AuthContext } from '../../context/AuthProvider';
const PersonalInfo = () => {
    const personalMenu = [
        { id: "1", img: "https://i.ibb.co/hLv67Nx/analytics.png" },
        { id: "2", img: "https://i.ibb.co/F3rtmB5/notification.png" },
        { id: "3", img: "https://i.ibb.co/W5ZqJ39/profile.png" }
    ];
    const [image, setImage] = useState(null);
    const [logoFiles, setLogoFiles] = useState({});
    const [preview, setPreview] = useState(null);
    const { currentUser } = useContext(AuthContext);
    console.log("cur", currentUser)
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        gender: '',
        dob: '',
        phone: '',
        profession: '',
        email: '',
        linkedin: '',
        facebook: '',
        youtube: '',
        address: '',
        education: [{ degree: '', school: '', grades: '', startYear: '', endYear: '', logo: null }],
        experience: [{ companyName: '', jobTitle: '', startDate: '', endDate: '', details: '' }],
        image: null
    });
    console.log("formData---", formData)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("user", userData)
    const fetchUserData = async (userEmail) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userEmail}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API response data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    };


    useEffect(() => {
        const userEmail = currentUser?.email;
        if (userEmail) {
            fetchUserData(userEmail)
                .then(data => {
                    if (data) {
                        setUserData(data);
                        console.log("data", data)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                });
        } else {
            setError(new Error("User email is not defined."));
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        if (userData) {
            console.log("User data received from API:", userData);
            setFormData({
                name: userData.name || '',
                bio: userData.bio || '',
                gender: userData.gender || '',
                dob: userData.dob || '',
                phone: userData.phone || '',
                profession: userData.profession || '',
                email: userData.email || '',
                linkedin: userData.linkedin || '',
                facebook: userData.facebook || '',
                youtube: userData.youtube || '',
                address: userData.address || '',
                education: userData.education.length > 0 ? userData.education : [{ degree: '', school: '', grades: '', startYear: '', endYear: '', logo: null }],
                experience: userData.experience.length > 0 ? userData.experience : [{ companyName: '', jobTitle: '', startDate: '', endDate: '', details: '' }],
                image: userData.image || null
            });
            console.log("formData after setting:", formData);
        }
    }, [userData]);

    console.log("formdata", formData)
    const handleLogoChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            console.log("file", fileURL)
            setFormData((prevFormData) => {
                const updatedEducation = [...prevFormData.education];
                console.log("updatedEducation", updatedEducation)
                updatedEducation[index] = {
                    ...updatedEducation[index],
                    logo: fileURL
                };
                console.log("Updated Education Array:", updatedEducation);
                return {
                    ...prevFormData,
                    education: updatedEducation,

                };

            });
            setLogoFiles((prevLogoFiles) => ({
                ...prevLogoFiles,
                [`education[${index}][logo]`]: file
            }));

            return () => {
                URL.revokeObjectURL(fileURL);
            };
        }
    };

    const handleInputChange = (index, e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (["degree", "school", "grades", "startYear", "endYear", "logo"].includes(name)) {
            setFormData(prevData => {
                const updatedEducation = [...prevData.education];
                updatedEducation[index] = {
                    ...updatedEducation[index],
                    [name]: value,

                };
                return {
                    ...prevData,
                    education: updatedEducation,

                };
            });
        } else if (["companyName", "jobTitle", "startDate", "endDate", "details"].includes(name)) {
            setFormData(prevData => {
                const updatedExperience = [...prevData.experience];
                updatedExperience[index] = {
                    ...updatedExperience[index],
                    [name]: value,
                };
                return {
                    ...prevData,
                    experience: updatedExperience,
                };
            });
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
            setPreview(previewUrl);
        } else {
            console.error("No file selected");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userEmail = currentUser?.email;
        if (!userEmail) {
            console.error("User email is not defined.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name || "");
        formDataToSend.append("bio", formData.bio || "");
        formDataToSend.append("gender", formData.gender || "");
        formDataToSend.append("dob", formData.dob || "");
        formDataToSend.append("phone", formData.phone ? formData.phone.toString() : "");
        formDataToSend.append("profession", formData.profession || "");
        formDataToSend.append("email", userEmail);
        formDataToSend.append("linkedin", formData.linkedin || "");
        formDataToSend.append("facebook", formData.facebook || "");
        formDataToSend.append("youtube", formData.youtube || "");
        formDataToSend.append("address", formData.address || "");

        formData.education.forEach((edu, index) => {
            formDataToSend.append(`education[${index}][degree]`, edu.degree);
            formDataToSend.append(`education[${index}][school]`, edu.school);
            formDataToSend.append(`education[${index}][grades]`, edu.grades);
            formDataToSend.append(`education[${index}][startYear]`, edu.startYear);
            formDataToSend.append(`education[${index}][endYear]`, edu.endYear);
            formDataToSend.append(`education[${index}][logo]`, logoFiles[`education[${index}][logo]`]);

        });

        formData.experience.forEach((exp, index) => {
            formDataToSend.append(`experience[${index}][companyName]`, exp.companyName);
            formDataToSend.append(`experience[${index}][jobTitle]`, exp.jobTitle);
            formDataToSend.append(`experience[${index}][startDate]`, exp.startDate);
            formDataToSend.append(`experience[${index}][endDate]`, exp.endDate);
            formDataToSend.append(`experience[${index}][details]`, exp.details);
        });

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        } else {
            console.warn("No image file provided.");
        }
        console.log("newForm", formData)
        try {
            console.log("Sending request to backend...");

            const response = await fetch(`http://localhost:8000/users/${userEmail}`, {
                method: "PATCH",
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log("Response Data:", data);
            } else {
                const text = await response.text();
                console.log("Response Text:", text);
            }

            console.log("User updated successfully.", formData);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const handleAddEducation = async () => {
        console.log("added");
        const newEducation = { degree: '', school: '', grades: '', startYear: '', endYear: '', logo: null };
        setFormData((prevData) => ({
            ...prevData,
            education: [...prevData.education, newEducation],
        }))
        console.log("Updated education array:", formData.education);
        const userEmail = currentUser.email;
        const url = `http://localhost:8000/users/${userEmail}`;
        console.log("url", url)
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newEducation }),
            });
            if (response.headers.get('content-type')?.includes('text/html')) {
                const text = await response.text();
                console.error('Error response from server:', text);
                return;
            }
            const data = await response.json();
            console.log('Education added:', data);
        } catch (error) {
            console.error('Error adding education:', error);
        }
    }
    const handleRemoveEducation = async (educationIndex) => {
        try {
            setFormData((prevData) => ({
                ...prevData,
                education: prevData.education.filter((_, index) => index !== educationIndex),
            }));
            const userEmail = currentUser.email;
            const url = `http://localhost:8000/users/${userEmail}/remove-education`

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ removeEducationIndex: educationIndex }),
            });

            if (response.headers.get('content-type')?.includes('text/html')) {
                const text = await response.text();
                console.error('Error response from server:', text);
                return;
            }

            const result = await response.json();
            if (response.ok) {
                console.log('Removed education from backend:', result.message);
            } else {
                console.error('Failed to remove education:', result.message);
            }
        } catch (error) {
            console.error('Error removing education:', error);
        }
    };
    const handleAddExperience = async () => {
        const newExperience = { companyName: '', jobTitle: '', startDate: '', endDate: '', details: '' };

        setFormData((prevData) => ({
            ...prevData,
            experience: [...prevData.experience, newExperience],
        }));
        try {
            const response = await fetch(`http://localhost:8000/users/${currentUser.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newExperience }),
            });
            if (response.headers.get('content-type')?.includes('text/html')) {
                const text = await response.text();
                console.error('Error response from server:', text);
                return;
            }
            const data = await response.json();
            console.log('Experience added:', data);
        } catch (error) {
            console.error('Error adding experience:', error);
        }
    };

    const handleRemoveExperience = async (experienceIndex) => {
        try {
            setFormData((prevData) => ({
                ...prevData,
                experience: prevData.experience.filter((_, index) => index !== experienceIndex),
            }));
            const userEmail = currentUser.email;
            const url = `http://localhost:8000/users/${userEmail}/remove-experience`

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ removeExperienceIndex: experienceIndex }),
            });

            if (response.headers.get('content-type')?.includes('text/html')) {
                const text = await response.text();
                console.error('Error response from server:', text);
                return;
            }

            const result = await response.json();
            if (response.ok) {
                console.log('Removed experience from backend:', result.message);
            } else {
                console.error('Failed to remove experience:', result.message);
            }
        } catch (error) {
            console.error('Error removing experience:', error);
        }
    };

    const triggerFileInput = () => {
        setImage(null);
        setPreview(null);
        document.getElementById('hiddenFileInput').click();
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className="flex w-[100%] flex-col md:flex-row">
            <DashboardLeft paddingBottom="48rem" />
            <div className={"mx-8 my-4 w-[100%] md:w-[80%]"}>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[48px] font-[700]">Personal Info</h2>
                        <p className="text-[rgb(125,225,248)] text-left text-[24px] font-[700]">Write your profile details</p>
                    </div>
                    {/* <div className="bg-[rgb(27,66,124)] w-[16rem] md:w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-8 md:mr-4">
                        <div className="flex justify-end">
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div> */}
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
                <form onSubmit={handleSubmit}>
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
                                        {preview || formData.image ? (
                                            <img
                                                src={preview || formData.image}
                                                alt="User profile"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <FaUpload />
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 mb-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        placeholder={currentUser?.name || 'Name'}
                                        onChange={(e) => handleInputChange(null, e)}
                                        className="bg-[rgb(210,227,255)] rounded-lg py-2 w-[20rem] nameInput px-4"
                                    />
                                    <br />
                                    <input
                                        id="bio"
                                        name="bio"
                                        type="text"
                                        placeholder="Write a short bio about yourself"
                                        value={formData.bio}
                                        onChange={(e) => handleInputChange(null, e)}
                                        className="rounded-lg py-1 px-4 w-[20rem] h-[18rem] mt-4 bioInput border-[rgb(210,227,255)] border-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[70%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4">
                            <div className="flex justify-around mx-4">
                                <div className="form-group">
                                    <label htmlFor="gender" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Gender</label>
                                    <select type="text" id="gender" name="gender" value={formData.gender} onChange={(e) => handleInputChange(null, e)} className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem] rounded-lg">
                                        <option value="" disabled className="text-[rgb(102,145,214)]">Select your gender</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                    </select>
                                </div>
                                <div className="form-group ml-4">
                                    <label htmlFor="dob" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Date of Birth</label>
                                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={(e) => handleInputChange(null, e)} className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" />
                                </div>

                                <div className="form-group ml-4">
                                    <label htmlFor="phone" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Mobile No.</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={(e) => handleInputChange(null, e)} className="border-[rgb(210,227,255)] h-[3rem] border-2 w-[18rem] rounded-lg" placeholder="Enter your mobile no." />
                                </div>
                            </div>
                            <div className="flex justify-around mx-4">
                                <div className="form-group">
                                    <label htmlFor="profession" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Profession</label>
                                    <select type="text" id="profession" name="profession" value={formData.profession} className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem] rounded-lg" onChange={(e) => handleInputChange(null, e)}>
                                        <option value="" disabled selected>Select your profession</option>
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
                                    <label htmlFor="email" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Email</label>
                                    <input type="email" id="email" name="email" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your email" value={currentUser.email} readOnly />
                                </div>
                                <div className="form-group ml-4">
                                    <label htmlFor="linkedin" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Linkedin</label>
                                    <input type="linkedin" id="linkedin" name="linkedin" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your linkedin" value={formData.linkedin} onChange={(e) => handleInputChange(null, e)} />
                                </div>

                            </div>
                            <div className="flex gap-[0.2rem] w-[36rem]">
                                <div className="form-group ml-4">
                                    <label htmlFor="facebook" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Facebook</label>
                                    <input type="facebook" id="facebook" name="facebook" value={formData.facebook} className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your facebook" onChange={(e) => handleInputChange(null, e)} />
                                </div>
                                <div className="form-group ml-4">
                                    <label for="youtube" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Youtube</label>
                                    <input type="youtube" id="youtube" name="youtube" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[3rem] border-2 w-[18rem]" placeholder="Enter your youtube" value={formData.youtube} onChange={(e) => handleInputChange(null, e)} />
                                </div>
                            </div>
                            <div className="mx-4">
                                <label htmlFor="address" className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Address</label>
                                <textarea id="address" name="address" className="border-[rgb(210,227,255)] p-2 rounded-lg text-[rgb(17,72,153)] h-[8rem] border-2 w-[100%]" placeholder="Enter your address" value={formData.address} onChange={(e) => handleInputChange(null, e)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-[40%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4 mt-8 mb-8">
                            <div className="mx-3 text-left text-[rgb(17,72,153)] text-[32px] mb-4 font-semibold">Education</div>
                            {formData.education.map((edu, index) => (
                                <div className="flex flex-col items-center mx-4" key={index} >
                                    <div className="mb-4">
                                        <div className="form-group">
                                            <div className="w-full mb-4">
                                                <div className="flex justify-center">
                                                    <img src={edu.logo} alt="Upload the logo of your institute" className="w-[6rem] h-[6rem] rounded-full" />
                                                </div>
                                            </div>
                                            <label htmlFor={`logo-${index}`}></label>
                                            <input
                                                type="file"
                                                id={`logo-${index}`}
                                                name={`logo-${index}`}
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2 py-2"
                                                onChange={(e) => handleLogoChange(index, e)}
                                            />

                                        </div>
                                        <div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`degree-${index}`} className="bg-[rgb(210,227,255)] w-[12rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Course/Degree</label>
                                            <input
                                                type="text"
                                                id={`degree-${index}`}
                                                name="degree"
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2"
                                                placeholder="Enter your course details"
                                                value={edu.degree || ''}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`school-${index}`} className="bg-[rgb(210,227,255)] w-[12rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">School/University</label>
                                            <input
                                                type="text"
                                                id={`school-${index}`}
                                                name="school"
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2"
                                                placeholder="Enter your school details"
                                                value={edu.school || ''}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`grades-${index}`} className="bg-[rgb(210,227,255)] w-[12rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Grades</label>
                                            <input
                                                type="text"
                                                id={`grades-${index}`}
                                                name="grades"
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[30rem] rounded-lg px-2"
                                                placeholder="Enter your grades"
                                                value={edu.grades || ''}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className="w-[30rem] flex gap-4">
                                            <div className="form-group">
                                                <label htmlFor={`startYear-${index}`} className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Start Year</label>
                                                <input
                                                    type="text"
                                                    id={`startYear-${index}`}
                                                    name="startYear"
                                                    className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[14.5rem] rounded-lg px-2"
                                                    placeholder="Enter your starting year"
                                                    value={edu.startYear || ''}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor={`endYear-${index}`} className="bg-[rgb(210,227,255)] w-[7rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">End Year</label>
                                                <input
                                                    type="text"
                                                    id={`endYear-${index}`}
                                                    name="endYear"
                                                    className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[14.5rem] rounded-lg px-2"
                                                    placeholder="Enter your passing year"
                                                    value={edu.endYear || ''}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between mx-2 mt-4">
                                            <div className="bg-[rgb(48,58,107)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between cursor-pointer" onClick={() => handleRemoveEducation(index)}>
                                                <button>Remove</button>
                                                <CiCircleMinus className="text-[1rem]" />
                                            </div>
                                            <div className="bg-[rgb(48,58,107)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between cursor-pointer" onClick={() => handleAddEducation(index)}>
                                                <button>Add</button>
                                                <CiCirclePlus className="text-[1rem]" />
                                            </div>
                                        </div>
                                    </div>

                                </div>))}
                        </div>
                        <div className="w-[60%] border-2 border-[rgb(27,66,124)] rounded-[1rem] py-4 mt-8 mb-8">
                            <div className="mx-3 text-left text-[rgb(17,72,153)] text-[32px] mb-4 font-semibold">Experience</div>
                            {formData.experience.map((exp, index) => (
                                <div key={index} className="mb-4 px-4">
                                    <div className="flex gap-4 mx-4">
                                        <div className="form-group">
                                            <label htmlFor={`companyName-${index}`} className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Company Name</label>
                                            <input
                                                type="text"
                                                id={`companyName-${index}`}
                                                name="companyName"
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2"
                                                placeholder="Enter your company name"
                                                value={exp.companyName || ''}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`jobTitle-${index}`} className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Job Title</label>
                                            <input
                                                type="text"
                                                id={`jobTitle-${index}`}
                                                name="jobTitle"
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2"
                                                placeholder="Enter your designation"
                                                value={exp.jobTitle || ''}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mx-4 gap-4">
                                        <div className="form-group">
                                            <label htmlFor={`startDate-${index}`} className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Start Date</label>
                                            <input
                                                type="text"
                                                id={`startDate-${index}`}
                                                name="startDate"
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2"
                                                placeholder="Enter your joining date"
                                                value={exp.startDate || ''}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`endDate-${index}`} className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">End Date/Ongoing</label>
                                            <input
                                                type="text"
                                                id={`endDate-${index}`}
                                                name="endDate"
                                                className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[3rem] border-2 w-[23rem] rounded-lg px-2"
                                                placeholder="Enter your job status"
                                                value={exp.endDate || ''}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mx-4">
                                        <label htmlFor={`details-${index}`} className="bg-[rgb(210,227,255)] w-[9rem] py-2 rounded-lg text-[rgb(17,72,153)] font-semibold">Details</label>
                                        <input
                                            type="text"
                                            id={`details-${index}`}
                                            name="details"
                                            className="border-[rgb(210,227,255)] text-[rgb(17,72,153)] h-[8rem] border-2 w-full rounded-lg px-2"
                                            placeholder="Write in detail about your work and experience in the company......"
                                            value={exp.details || ''}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </div>
                                    <div className="flex justify-between mx-4 mt-4">
                                        <div className="bg-[rgb(48,58,107)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between cursor-pointer" onClick={() => handleRemoveExperience(index)}>
                                            <button>Remove</button>
                                            <CiCircleMinus className="text-[1rem]" />
                                        </div>
                                        <div className="bg-[rgb(122,173,255)] px-2 text-white rounded-lg w-[6rem] flex items-center justify-between cursor-pointer" onClick={handleAddExperience}>
                                            <button>Add</button>
                                            <CiCirclePlus className="text-[1rem]" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-end mr-2">
                            <button type="submit" className="bg-[rgb(125,225,248)] text-[rgb(13,16,89)] text-[36px] font-[500] py-2 border-2 rounded-lg border-[rgb(17,72,153)] px-6">Update</button>
                        </div>

                    </div>
                </form>
            </div>
        </div >
    );
};

export default PersonalInfo;
