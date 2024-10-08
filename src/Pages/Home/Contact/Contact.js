import React from 'react';
import { useParams } from 'react-router-dom';
import { FaAngleDoubleUp } from 'react-icons/fa';
import ScrollIntoView from 'react-scroll-into-view';

const Contact = () => {
    const { email } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);


        const data = {
            senderName: formData.get('name'),
            senderEmail: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            toEmail: email
        };

        console.log('Form data:', data);

        try {
            const response = await fetch(`https://innova-portfolio-server.vercel.app/users/${email}/notifications`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(errorResponse || 'Failed to update user');
            }

            const result = await response.json();
            console.log('User updated successfully:', result);
            e.target.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div className="px-8 mt-16 mb-4">
            <div className="flex flex-row items-center gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[50px] md:text-[64px] font-bold">Contact</div>
            </div>
            <p className="text-left text-black font-[700] text-[24px] mb-10 w-[16rem] md:w-[24rem] ml-16">Let's grab a coffee and jump on conversation <span className="text-[rgb(42,193,235)]">chat with me.</span></p>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="lg:px-14 w-[18rem] md:w-[25rem] lg:w-[74rem] flex flex-col gap-10">
                        <div className="block lg:flex gap-10 w-[18rem] md:w-[25rem] lg:w-[74rem]">
                            <div className="relative p-[1px] box-border bg-white shadow-lg mb-10 lg:mb-0">
                                <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-[rgb(42,193,235)] to-[rgb(24,77,150)] pointer-events-none"></div>
                                <div className="relative z-10 bg-white rounded-[inherit]">
                                    <input
                                        className="w-full lg:w-[32.5rem] h-[3rem] text-left pl-2"
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="relative p-[1px] box-border bg-white shadow-lg">
                                <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-[rgb(42,193,235)] to-[rgb(24,77,150)] pointer-events-none"></div>
                                <div className="relative z-10 bg-white rounded-[inherit]">
                                    <input
                                        className="w-full lg:w-[32.5rem] h-[3rem] text-left pl-2"
                                        type="email"
                                        name="email"
                                        placeholder="Your email"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative p-[1px] box-border bg-white shadow-lg">
                            <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-[rgb(42,193,235)] to-[rgb(24,77,150)] pointer-events-none"></div>
                            <div className="relative z-10 bg-white rounded-[inherit]">
                                <input
                                    className="w-full h-[3rem] text-left pl-2"
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    required
                                />
                            </div>
                        </div>
                        <div className="relative p-[1px] box-border bg-white shadow-lg">
                            <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-[rgb(42,193,235)] to-[rgb(24,77,150)] pointer-events-none"></div>
                            <div className="relative z-10 bg-white rounded-[inherit]">
                                <textarea
                                    className="w-full h-[10rem] text-left pl-2 pt-2"
                                    name="message"
                                    placeholder="Message"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button className="readBtn text-white py-2 px-4 mt-4">Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
            <ScrollIntoView selector="#banner">
                <div className="w-full flex justify-end mt-4">
                    <button className="bg-[rgb(24,77,150)] w-8 p-2">
                        <FaAngleDoubleUp className="text-white" />
                    </button>
                </div>
            </ScrollIntoView>
        </div>
    );
};

export default Contact;
