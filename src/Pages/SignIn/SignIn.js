import React from 'react';
import SignUpLeft from '../SignUp/SignUpLeft';
import SignUpRight from '../SignUp/SignUpRight';
import './SignIn.css'
const SignIn = () => {
    return (
        <div className="bg-[rgb(122,173,255)] signUp py-20">
            <div className="flex flex-col lg:flex-row w-full lg:justify-center items-center">
                <div className="w-[80%] lg:w-[40%] signUp-left h-[60rem] pt-8 pb-16 rounded-tl-[20px] rounded-tr-[20px] lg:rounded-bl-[20px] lg:rounded-tr-[0px] lg:rounded-br-[0px]">
                    <SignUpLeft />
                    <form className="mt-10">
                        <input type="text"
                            id="username"
                            name="username"
                            class="input-with-icon3 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                            placeholder="Username/Email"
                        /><br />
                        <input type="password"
                            id="confirmPassword"
                            name="password"
                            class="input-with-icon4 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                            placeholder="Confirm Password"
                        /><br />
                        <div>
                            <button className="text-white px-16 py-2 text-2xl font-[700] mt-8 bg-transparent">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                <SignUpRight />

            </div>
        </div>
    );
};

export default SignIn;