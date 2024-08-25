import React from 'react';
import './SignUp.css';
import SignUpRight from './SignUpRight';
import SignUpLeft from './SignUpLeft';
import { Link } from 'react-router-dom';
const SignUp = () => {
    return (
        <div className="bg-[rgb(122,173,255)] signUp py-20">
            <div className="flex flex-col lg:flex-row w-full lg:justify-center items-center">
                <div className="w-[80%] lg:w-[40%] signUp-left h-[60rem] pt-8 pb-16 rounded-tl-[20px] rounded-tr-[20px] lg:rounded-bl-[20px] lg:rounded-tr-[0px] lg:rounded-br-[0px]">
                    <SignUpLeft />
                    <Link to="/signIn">
                        <button className="text-white px-16 py-2 text-2xl mt-4">Sign In</button>
                    </Link>
                </div>
                <SignUpRight />
            </div>
        </div>
    );
};

export default SignUp;