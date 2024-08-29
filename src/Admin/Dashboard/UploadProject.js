import React from 'react';
import DashboardLeft from './DashboardLeft';
import { IoIosSearch } from 'react-icons/io';
import DashboardRight from './DashboardRight';
import browse from "../../assets/browse.png";
const UploadProject = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <DashboardLeft />
            <div className="center ml-8 mt-4 w-[90%] md:w-[60%]">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[48px] font-[700]">Upload Projects</h2>
                        <p className="text-[rgb(125,225,248)] text-left text-[24px] font-[700]">Add your latest achievements</p>
                    </div>
                    <div className="bg-[rgb(27,66,124)] w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-4">
                        <div className="flex justify-end" >
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-8 mt-16 md:mx-32">
                    <div className="w-[10rem] h-[2rem] border-2 border-[rgb(17,72,153)] text-[rgb(17,72,153)] text-xl font-bold rounded-lg px-2">
                        Add Image
                    </div>
                    <div className="w-[10rem] h-[2rem] bg-[rgb(128,234,227)] text-white text-xl font-bold rounded-lg px-2">
                        Add Video
                    </div>
                    <div className="w-[10rem] h-[2rem] bg-[rgb(102,145,214)] text-white text-xl font-bold rounded-lg px-2">
                        Add Blog
                    </div>
                    <div className="w-[10rem] h-[2rem] bg-[rgb(17,72,153)] text-white text-xl font-bold rounded-lg px-2">
                        Add News
                    </div>
                </div>
                <div className="w-full mt-12 ">
                    <div className="flex items-center flex-col">
                        <div className="border-dashed border-2 w-[20rem] md:w-[32rem] flex flex-col items-center border-[rgb(122,173,255)]">
                            <img src={browse} alt="browse" className="w-[12rem]" />
                            <button className="bg-[rgb(122,173,255)] text-2xl text-white font-bold px-14 rounded-lg">Browse</button>
                            <div className="w-full border-2 text-left px-8 text-[rgb(122,173,255)] border-[rgb(122,173,255)] mt-6">Add Title for your content</div>
                            <div className="w-full text-center px-8 text-[rgb(122,173,255)] py-12">Describe your content up to 3000 words</div>

                        </div>
                    </div>
                    <div className="flex justify-center mt-6 gap-6">
                        <button className="border-2 border-[rgb(122,173,255)] px-6 rounded-lg text-xl text-[rgb(122,173,255)] py-1">
                            Cancel
                        </button>
                        <button className="border-2 bg-[rgb(122,173,255)] px-6 rounded-lg text-xl text-white py-1">
                            Upload
                        </button>
                    </div>
                </div>
            </div>
            <DashboardRight />
        </div>
    );
};

export default UploadProject;