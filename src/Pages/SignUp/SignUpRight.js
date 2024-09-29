import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import linkedin from "../../assets/linkedin.png";
import mail from "../../assets/mail.png";
import facebookLogo from "../../assets/facebook.png";
import { AuthContext } from '../../context/AuthProvider';
import { FacebookAuthProvider } from 'firebase/auth/web-extension';
import { sendEmailVerification } from 'firebase/auth'; // Import the function

const SignUpRight = () => {
    const { signup, updateUser, facebook } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        signup(formData.email, formData.password)
            .then(async (result) => {
                const user = result.user;
                console.log("user", user);
                const userInfo = {
                    displayName: formData.name
                };

                console.log("userInfo", userInfo);
                await updateUser(userInfo);
                await sendEmailVerification(user); // Send verification email

                saveUser(formData.name, formData.email);
                setSuccess("Sign-up successful! Please verify your email.");
                setError('');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            })
            .catch(error => {
                console.log(error.message);
                setError("Failed to sign up. Please try again.");
                setSuccess('');
            });
    };

    const saveUser = (name, email) => {
        const user = { name, email };
        console.log("user", user);
        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('User saved:', data);
                setCreatedUserEmail(email);
            })
            .catch(error => console.error('Error saving user:', error));
    };

    const facebookSignUp = (e) => {
        console.log("facebook", e);
        facebook()
            .then((result) => {
                if (result && result.user) {
                    const user = result.user;
                    const credential = FacebookAuthProvider.credentialFromResult(result);
                    const accessToken = credential?.accessToken;

                    console.log("user", user);
                } else {
                    console.error("No user information found in result.");
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                const email = error?.customData?.email;
                const credential = FacebookAuthProvider.credentialFromError(error);

                console.error(`Error ${errorCode}: ${errorMessage}`);
            });
    };

    return (
        <div className="w-[80%] lg:w-[40%] signUp-right h-[60rem] pt-10 lg:rounded-tl-[0px] lg:rounded-bl-[0px] lg:rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]">
            <h1 className="text-[rgb(122,173,255)] text-[50px] font-[700]">Create Account</h1>
            <div className="flex justify-center mt-8 gap-4">
                <div>
                    <Link to="/">
                        <img src={linkedin} alt="linkedin" className="w-12 blur-[0.8px]" />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <img src={mail} alt="mail" className="w-12 rounded-full box-border border shadow-lg blur-[0.8px]" />
                    </Link>
                </div>
                <div>
                    <button onClick={facebookSignUp}>
                        <img src={facebookLogo} alt="facebook" className="w-12 rounded-full box-border border shadow-lg blur-[1px]" />
                    </button>
                </div>
            </div>
            <p className="text-[rgb(27,66,124)] text-[20px] mt-4">Or manually enter your email</p>
            <div>
                <form className="mt-10" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-with-icon px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                        placeholder="Name"
                    /><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-with-icon1 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                        placeholder="Email"
                    /><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="input-with-icon2 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                        placeholder="Password"
                    /><br />
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="input-with-icon2 px-[1rem] py-[0.7rem] lg:px-[6rem] lg:py-[1rem]"
                        placeholder="Confirm Password"
                    /><br />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {success && <p className="text-green-500 mt-2">{success}</p>}
                    <div>
                        <button className="text-[rgb(17,72,153)] px-16 py-2 text-2xl font-[700] mt-8 bg-[rgb(125,225,248)]">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpRight;
