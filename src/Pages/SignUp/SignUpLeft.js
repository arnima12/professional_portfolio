import React from 'react';
import logo from "../../assets/logo.png";
import signUp from '../../assets/signupImg.png';
const SignUpLeft = () => {
    return (
        <div className="">
            <div className="ml-8 mt-4">
                <img src={logo} alt="logo" />
            </div>
            <div className="flex justify-center">
                <img src={signUp} alt="signUp" className="w-[12rem]" />
            </div>
            <div>
                <h1 className="text-animate text-3xl lg:text-[64px] font-bold mt-8 text-white ">Welcome Back!</h1>
                <div className="flex justify-center">
                    <p className="text-[rgb(125,225,248)] mt-6 font-semibold w-[20rem]">
                        "Get started by taking the first steps to edit and enhance your portfolio, showcasing your skills and accomplishments."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpLeft;