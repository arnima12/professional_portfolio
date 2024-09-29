import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

const Analytics = () => {
    const { currentUser } = useContext(AuthContext);
    const email = currentUser.email;
    const [reachData, setReachData] = useState([]);
    useEffect(() => {
        const fetchReachHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/view/${email}`);
                const data = await response.json();
                console.log("reach", data)
                if (response.ok) {
                    setReachData(data.reachHistory);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching reach data:', error);
            }
        }
        fetchReachHistory();
    }, [email])
    const reach = reachData.map((entry) => ({
        date: new Date(entry.date).toLocaleDateString(),
        viewCount: entry.viewCount,
    }));
    return (
        <div className="flex w-[100%]">
            <DashboardLeft paddingBottom="16.5rem" />
            <div className="mt-20 w-[90%]" >
                <h1 className="text-left text-4xl font-bold ml-4 mb-8">Total Reach in 2024</h1>
                <div className="mt-10 mr-8">
                    {
                        reach.length > 0 ? (
                            <ResponsiveContainer width="100%" height={600}>
                                <LineChart data={reach}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="viewCount"
                                        stroke="#FFDE21"
                                        strokeWidth={3}
                                        dot={{ fill: 'red', stroke: 'red', r: 5 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p>Loading chart...</p>
                        )
                    }
                </div>
            </div>
        </div >

    );
};

export default Analytics;