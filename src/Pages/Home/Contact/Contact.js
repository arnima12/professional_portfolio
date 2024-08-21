import React from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import ScrollIntoView from 'react-scroll-into-view';
const Contact = () => {
    return (
        <div className="px-8 mt-16 mb-4">
            <div className="flex flex-row items-center gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[50px] md:text-[64px] font-bold">Contact</div>
            </div>
            <p className="text-left text-black font-[700] text-[24px] mb-10 w-[16rem] md:w-[24rem] ml-16">Let's grab a coffee and jump on conversation <span className="text-[rgb(42,193,235)]">chat with me.</span></p>
            <div>
                <form>
                    <div className="lg:px-14 w-[18rem] md:w-[25rem] lg:w-[74rem] flex flex-col gap-10">
                        <div className="block lg:flex gap-10 w-[18rem] md:w-[25rem] lg:w-[74rem]">
                            <div className="relative p-[1px] box-border bg-white shadow-lg mb-10 lg:mb-0">
                                <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-[rgb(42,193,235)] to-[rgb(24,77,150)] pointer-events-none"></div>
                                <div className="relative z-10 bg-white rounded-[inherit]">
                                    <input
                                        className="w-full lg:w-[32.5rem] h-[3rem] text-left pl-2"
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                    />
                                </div>
                            </div>
                            <div className="relative p-[1px] box-border bg-white shadow-lg">
                                <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-[rgb(42,193,235)] to-[rgb(24,77,150)] pointer-events-none"></div>
                                <div className="relative z-10 bg-white rounded-[inherit]">
                                    <input
                                        className="w-full lg:w-[32.5rem] h-[3rem] text-left pl-2"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your email"
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
                                    id="subject"
                                    name="subject"
                                    placeholder="Subject"
                                />
                            </div>
                        </div>
                        <div className="relative p-[1px] box-border bg-white shadow-lg">
                            <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-[rgb(42,193,235)] to-[rgb(24,77,150)] pointer-events-none"></div>
                            <div className="relative z-10 bg-white rounded-[inherit]">
                                <textarea
                                    className="w-full h-[10rem] text-left pl-2 pt-2"
                                    id="message"
                                    name="message"
                                    placeholder="Message"
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