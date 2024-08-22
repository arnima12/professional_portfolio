import React from 'react';
import './SignUp.css';
import logo from "../../assets/logo.png";
import signUp from '../../assets/signupImg.png';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import { AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const SignUp = () => {
    return (
        <div className="bg-[rgb(122,173,255)] signUp py-20">
            <div className="flex w-full justify-center">
                <div className="w-[40%] signUp-left pt-8 pb-16">
                    <div className="ml-8 mt-4">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="flex justify-center">
                        <img src={signUp} alt="signUp" className="w-[12rem]" />
                    </div>
                    <div className="">
                        <h1 className="text-animate text-3xl md:text-[64px] font-bold mt-8 text-white ">Welcome Back!</h1>
                        <div className="flex justify-center">
                            <p className="text-[rgb(125,225,248)] mt-6 font-semibold w-[20rem]">
                                "Get started by taking the first steps to edit and enhance your portfolio, showcasing your skills and accomplishments."
                            </p>
                        </div>
                        <button className="text-white px-10 py-2 text-2xl mt-4">
                            Sign In
                        </button>
                    </div>
                </div>
                <div className="w-[40%] signUp-right pt-10">
                    <h1 className="text-[rgb(122,173,255)] text-[50px] font-[700]">Create Account</h1>
                    <div className="flex justify-center mt-8">
                        <Link to="https://www.linkedin.com/in/tasnimanzum/"><AiFillLinkedin className="text-3xl text-[rgb(27,66,124)] rounded-[50%]" /></Link>
                        <div>
                            <CiMail className="text-white" />
                        </div>
                        <div>
                            <FaFacebookF />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;