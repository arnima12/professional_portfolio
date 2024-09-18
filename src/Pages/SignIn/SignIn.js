import React, { useContext, useState } from 'react';
import axios from 'axios';
import SignUpLeft from '../SignUp/SignUpLeft';
import SignUpRight from '../SignUp/SignUpRight';
import './SignIn.css';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        setLoginError('');
        signIn(formData.email, formData.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(formData.email);
                setSuccess("Login Successful")
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }
    return (
        <div className="bg-[rgb(122,173,255)] signUp py-20">
            <div className="flex flex-col lg:flex-row w-full lg:justify-center items-center">
                <div className="w-[80%] lg:w-[40%] signUp-left h-[60rem] pt-8 pb-16 rounded-tl-[20px] rounded-tr-[20px] lg:rounded-bl-[20px] lg:rounded-tr-[0px] lg:rounded-br-[0px]">
                    <SignUpLeft />
                    <form onSubmit={handleSubmit} className="mt-10">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="input-with-icon3 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        /><br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="input-with-icon4 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        /><br />
                        {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
                        {success && <p className="text-green-500 mt-4">{success}</p>}
                        <div>
                            <button
                                type="submit"
                                className="text-white px-16 py-2 text-2xl font-[700] mt-8 bg-blue-600 hover:bg-blue-700 transition rounded"
                            >
                                Sign In
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
