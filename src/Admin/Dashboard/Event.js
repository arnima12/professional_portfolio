import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS
import { BiRadioCircleMarked } from 'react-icons/bi';
import { MdArrowRight } from 'react-icons/md';
import { AuthContext } from '../../context/AuthProvider';

// Add the following code to your existing DashboardRight component
const Event = () => {
    const [events, setEvents] = useState([]);
    const [eventLoading, setEventLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const email = currentUser.email
    useEffect(() => {
        const fetchEvents = async () => {
            setEventLoading(true);
            try {
                const response = await axios.get(`https://innova-portfolio-server.vercel.app/users/${email}/events`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setEventLoading(false);
            }
        };
        fetchEvents();
    }, []);
    useEffect(() => {
        console.log(events)
    })


    return (
        <div className="flex items-center mx-4 mt-6">
            <div className="dashboard-box h-[18rem] w-full">
                {eventLoading ? (
                    <div className="text-white">Loading events...</div>
                ) : (
                    <div className="mt-4">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <div key={index} className="flex items-center justify-between mx-4 mt-4 text-white">
                                    <div className="flex items-center">
                                        <BiRadioCircleMarked className="text-white mr-2" />
                                        <div>{event.title} - <span className="text-green-500">{new Date(event.date).toLocaleDateString()}</span></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-white mx-4 mt-6">No upcoming events found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>

    );
};

export default Event;
