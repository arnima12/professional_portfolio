import React from 'react';
import './SignUp.css';
import logo from "../../assets/logo.png";
import signUp from '../../assets/signupImg.png';
import { Link } from 'react-router-dom';
import linkedin from "../../assets/linkedin.png";
import mail from "../../assets/mail.png";
import facebook from "../../assets/facebook.png";
const SignUp = () => {
    return (
        <div className="bg-[rgb(122,173,255)] signUp py-20">
            <div className="flex flex-col lg:flex-row w-full lg:justify-center items-center">
                <div className="w-[80%] lg:w-[40%] signUp-left h-[60rem] pt-8 pb-16 rounded-tl-[20px] rounded-tr-[20px] lg:rounded-bl-[20px] lg:rounded-tr-[0px] lg:rounded-br-[0px]">
                    <div className="ml-8 mt-4">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="flex justify-center">
                        <img src={signUp} alt="signUp" className="w-[12rem]" />
                    </div>
                    <div className="">
                        <h1 className="text-animate text-3xl lg:text-[64px] font-bold mt-8 text-white ">Welcome Back!</h1>
                        <div className="flex justify-center">
                            <p className="text-[rgb(125,225,248)] mt-6 font-semibold w-[20rem]">
                                "Get started by taking the first steps to edit and enhance your portfolio, showcasing your skills and accomplishments."
                            </p>
                        </div>
                        <button className="text-white px-16 py-2 text-2xl mt-4">
                            Sign In
                        </button>
                    </div>
                </div>
                <div className="w-[80%] lg:w-[40%] signUp-right h-[60rem] pt-10 lg:rounded-tl-[0px] lg:rounded-bl-[0px] lg:rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]">
                    <h1 className="text-[rgb(122,173,255)] text-[50px] font-[700]">Create Account</h1>
                    <div className="flex justify-center mt-8 gap-4">
                        <div>
                            <Link to="/">
                                <img src={linkedin} alt="linkedin" className="w-12  blur-[0.8px]" />
                            </Link>
                        </div>
                        <div>
                            <Link to="/">
                                <img src={mail} alt="mail" className="w-12 rounded-full box-border border shadow-lg blur-[0.8px]" />
                            </Link>
                        </div>
                        <div>
                            <Link to="/">
                                <img src={facebook} alt="facebook" className="w-12 rounded-full box-border border shadow-lg blur-[1px]" />
                            </Link>
                        </div>
                    </div>
                    <p className="text-[rgb(27,66,124)] text-[20px] mt-4">Or manually enter your email</p>
                    <div>
                        <form className="mt-10">
                            <input type="text"
                                id="fname"
                                name="fname"
                                class="input-with-icon px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                                placeholder="Name"
                            /><br />
                            <input type="email"
                                id="email"
                                name="email"
                                class="input-with-icon1 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                                placeholder="Email"
                            /><br />
                            <input type="password"
                                id="password"
                                name="password"
                                class="input-with-icon2 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                                placeholder="Password"
                            /><br />
                            <input type="password"
                                id="confirmPassword"
                                name="password"
                                class="input-with-icon2 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                                placeholder="Confirm Password"
                            /><br />
                            <div>
                                <button className="text-[rgb(17,72,153)] px-16 py-2 text-2xl font-[700] mt-8 bg-[rgb(125,225,248)]">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;