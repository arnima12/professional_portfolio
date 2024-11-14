import React, { useContext, useEffect, useState } from 'react';
import { BiRadioCircleMarked } from 'react-icons/bi';
import { MdArrowRight, MdDelete } from 'react-icons/md';
import { useDropdown } from './DropdownContext/DropdownContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Event from './Event';
import Calendar from 'react-calendar';

const DashboardRight = () => {
    const { logOut, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { isDropdownOpen } = useDropdown();
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [events, setEvents] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [deletedItems, setDeletedItems] = useState({
        images: [],
        videos: [],
        blogs: [],
        news: []
    });
    const [error, setError] = useState(null)
    const { currentUser } = useContext(AuthContext);
    const email = currentUser.email;
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${email}/notifications`);
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data.notifications);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (email) {
            fetchNotifications();
        }
    }, [email]);


    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (email) {
                    const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${email}/store-deleted-item`);
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
            const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${email}/delete-item/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            setDeletedItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleNotificationClick = (notification) => {
        alert(`${notification.senderName} (${notification.senderEmail}) sends you subject: ${notification.subject} & the message: ${notification.message}`);
    };
    const handleAddEvent = async (e) => {
        e.preventDefault();
        const newEvent = { title, date, description };
        try {
            const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${email}/events`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            console.log("res", response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents([...events, data]); // Assuming the API returns the created event
            setTitle('');
            setDescription('');
            setDate(new Date());
            setShowCalendar(false); // Hide calendar after adding event
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    const handleSignOut = () => {
        logOut()
            .then(() => {
                setCurrentUser(null);
                navigate('/signIn');
            }).catch((error) => {
                // An error happened.
            });
    }
    return (
        <div className={`dashboard-right h-full pb-[5.5rem] transition-all duration-100 relative w-full mt-8 md:mt-0 md:w-[20%] ${isDropdownOpen ? 'md:right-0' : 'md:right-[-100%]'}`}>
            {/* Dashboard Menu */}
            <div className={`flex gap-8 mt-8 justify-center`}>
                <div className="flex items-center gap-8 text-xl font-semibold text-white">
                    <button className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center" onClick={() => setShowCalendar(true)}>
                        <img src={"https://i.ibb.co/hLv67Nx/analytics.png"} alt="" className="w-[1.5rem]" />
                    </button>
                    {showCalendar && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-gray-800 p-4 rounded">
                                <h3 className="text-white text-xl mb-2">Add Event</h3>
                                <form onSubmit={handleAddEvent}>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Event Title"
                                        className="w-full p-2 mb-2 rounded text-black"
                                        required
                                    />
                                    <Calendar
                                        onChange={setDate}
                                        value={date}
                                        className="mb-4 text-black"
                                    />
                                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                        Add Event
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCalendar(false)}
                                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded ml-2"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-8 text-xl font-semibold text-white dropdown dropdown-end">
                    <button className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center" tabIndex="0">
                        <img src={"https://i.ibb.co/F3rtmB5/notification.png"} alt="" className="w-[1.5rem]" />
                    </button>
                    <ul className="menu dropdown-content bg-white rounded-box z-[1] w-[20rem] px-4 py-4 shadow mt-36 text-[rgb(27,66,124)]" tabIndex="0">
                        {notifications.map((item) => (
                            <li
                                key={item.id}
                                className="text-wrap cursor-pointer"
                                onClick={() => handleNotificationClick(item)}
                            >
                                {item.senderName} ({item.senderEmail}) sends you a message
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-8 text-xl font-semibold text-white dropdown dropdown-end">
                    <button className="w-[3rem] h-[3rem] rounded-full border-[rgba(218,211,211,0.718)] border-[3px] blur-[0.8px] flex items-center justify-center" tabIndex="0">
                        <img src={"https://i.ibb.co/W5ZqJ39/profile.png"} alt="" className="w-[1.5rem]" />
                    </button>
                    <ul className="menu dropdown-content bg-white rounded-box z-[1] w-[8rem] px-4 py-4 shadow mt-28 text-[rgb(27,66,124)]" tabIndex="0">
                        <button onClick={handleSignOut}>LogOut</button>
                    </ul>
                </div>
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
            <Event />
        </div>
    );

};

export default DashboardRight;
