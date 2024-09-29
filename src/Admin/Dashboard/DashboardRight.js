import React, { useContext, useEffect, useState } from 'react';
import { BiRadioCircleMarked } from 'react-icons/bi';
import { MdArrowRight, MdDelete } from 'react-icons/md';
import { useDropdown } from './DropdownContext/DropdownContext';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const DashboardRight = () => {
    const { isDropdownOpen } = useDropdown();
    const [loading, setLoading] = useState(false);
    const [deletedItems, setDeletedItems] = useState({
        images: [],
        videos: [],
        blogs: [],
        news: []
    });
    const [error, setError] = useState(null)
    const { currentUser } = useContext(AuthContext);
    const email = currentUser.email;
    const dashboardMenu = [
        { id: "1", img: "https://i.ibb.co/hLv67Nx/analytics.png" },
        { id: "2", img: "https://i.ibb.co/F3rtmB5/notification.png" },
        { id: "3", img: "https://i.ibb.co/W5ZqJ39/profile.png" }
    ]

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (email) {
                    const response = await fetch(`http://localhost:8000/users/${email}/store-deleted-item`);
                    const contentType = response.headers.get('content-type');
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        console.log("data", data)
                        setDeletedItems(data.deletedItems);
                    } else {
                        throw new Error('Received non-JSON response');
                    }
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [email]);
    const handleDelete = async (itemId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/users/${email}/delete-item/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            // Remove the deleted item from the local state
            setDeletedItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={`dashboard-right h-full pb-[5.5rem] transition-all duration-100 relative w-full mt-8 md:mt-0 md:w-[20%] ${isDropdownOpen ? 'md:right-0' : 'md:right-[-100%]'}`}>
            {/* Dashboard Menu */}
            <div className={`flex gap-8 mt-8 justify-center`}>
                {dashboardMenu.map((menu) => (
                    <div key={menu.id} className="flex items-center gap-8 text-xl font-semibold text-white">
                        <div className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center">
                            <img src={menu.img} alt="" className="w-[1.5rem]" />
                        </div>
                    </div>
                ))}
            </div>

            {/* History Section */}
            <div className={`flex justify-between items-center text-white text-3xl font-bold mt-12 px-4`}>
                <div>History</div>
                <MdArrowRight className="flex items-center text-5xl pt-4" />
            </div>

            <div className="dashboard-box py-4 w-[20rem] mx-2">
                {deletedItems.length > 0 ? (
                    deletedItems.map((item, index) => (
                        <div key={index} className="flex items-center mx-4 mt-6 w-full">
                            <div className="flex items-center justify-between text-xl font-semibold mt-4 px-2">
                                <div className="text-white w-[12rem] text-left">{item.title || 'Untitled'}</div>
                                <button
                                    className=" text-red-500 px-4 py-2 rounded ml-4" onCLick={() => handleDelete(item.id)}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-white mx-4 mt-6">No deleted items found.</div>
                )}

            </div>




            {/* Upcoming Events Section */}
            <div className={`flex justify-between items-center text-white text-3xl font-bold mt-12 px-4`}>
                <div>Upcoming Events</div>
                <MdArrowRight className="flex items-center text-5xl pt-2" />
            </div>
            <div className="flex items-center mx-4 mt-6">
                <div className="dashboard-box h-[18rem] w-full">
                    <div className="flex items-center justify-between md:gap-4 mx-2 text-xl font-semibold mt-4">
                        <div>
                            <BiRadioCircleMarked className="text-white" />
                        </div>
                        <div className="text-white text-left">Holidays Coming soon</div>
                        <div className="text-green-500">17 Aug</div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DashboardRight;
