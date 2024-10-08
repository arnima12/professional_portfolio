import React, { useContext, useEffect, useState } from 'react';
import AllNew from './AllNew';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './AllNews.css';
import { AuthContext } from '../../context/AuthProvider';
import { useParams } from 'react-router-dom';
const AllNews = () => {
    const [allNews, setAllNews] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext)
    const { email } = useParams();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (email && email !== 'undefined') {
                    const response = await fetch(`https://innova-portfolio-server.vercel.app/users/${email}/news`);
                    console.log("response", response);
                    const contentType = response.headers.get('content-type');
                    console.log("headers", contentType);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        setAllNews(data.news);
                    } else {
                        throw new Error('Received non-JSON response');
                    }
                } else {
                    const demoNews = [
                        {
                            id: "1",
                            title: "Lorem ipsum dolor sit amet, adipiscing elit",
                            date: "2015-08-13",
                            image: "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
                            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
                        },
                        {
                            id: "2",
                            title: "Lorem ipsum dolor sit amet, adipiscing elit",
                            date: "2016-08-13",
                            image: "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
                            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
                        },
                    ]
                    setAllNews(demoNews);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUserData();
    }, [email]);

    if (error) {
        return console.log("error: ", error);
    }
    const latestNews = allNews.reduce((latest, current) =>
        new Date(latest.year) > new Date(current.year) ? latest : current,
        allNews[0] || {}
    );

    const sortedNews = allNews.length > 0 ? allNews.sort((a, b) => new Date(b.year) - new Date(a.year)) : [];

    return (
        <div className="flex flex-col items-center w-[95%]">
            <div className="flex flex-col items-center w-full mb-8">
                <div className="flex flex-row items-center gap-4 my-8">
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                    <div className="text-[rgb(30,81,153)] text-[64px] font-bold">News</div>
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                </div>
                {allNews.length > 0 ? (
                    <AllNew latestNew={latestNews} email={email} />
                ) : (
                    <div>No news available</div>
                )}
            </div>
            <button className='articleHead mb-12 px-4 py-2 w-[93%] text-left text-white text-xl'>
                Print News Media
            </button>
            <div className="flex flex-col w-[93%] mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-items-center">
                    {sortedNews.map((news) => (
                        <AllNew key={news.id} allNew={news} email={email} />
                    ))}
                </div>
            </div>
            <Sidebar fullHeight="true" />
        </div>
    );
};

export default AllNews;