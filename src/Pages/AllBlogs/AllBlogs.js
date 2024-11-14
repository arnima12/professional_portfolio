import React, { useEffect, useState } from 'react';
import AllBlog from './AllBlog';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';

const AllBlogs = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [error, setError] = useState(null);
    const { email } = useParams();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (email && email !== 'undefined') {
                    const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${email}/blog`);
                    console.log("response", response);
                    const contentType = response.headers.get('content-type');
                    console.log("headers", contentType);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        setAllBlogs(data.blog);
                    } else {
                        throw new Error('Received non-JSON response');
                    }
                } else {
                    const demoBlogs = [
                        {
                            id: "1",
                            year: "2013-10-28",
                            title: "Technology a business driver, right vehicle for banks",
                            img: "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg",
                            des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum erat, condimentum id justo nec, commodo fermentum lorem. In hac habitasse platea dictumst. Vestibulum pellentesque faucibus mauris, aliquet sagittis velit placerat sollicitudin. Nulla aliquam, mi quis maximus convallis, purus massa laoreet sem, eu interdum lacus neque vitae leo. Proin vel leo sit amet libero mollis condimentum at convallis augue. Suspendisse potenti. Maecenas quis sem vestibulum, hendrerit erat et, porta lacus. Nullam non neque ut risus vehicula feugiat vel a ligula. Morbi posuere nec neque id venenatis. Suspendisse facilisis tincidunt scelerisque. Etiam porttitor, odio sagittis gravida bibendum, lorem lorem finibus augue, vel pulvinar tellus nibh vitae nisi. Suspendisse lectus velit, porta vel sem ut, luctus lacinia est.`
                        },
                        {
                            id: "2",
                            year: "2015-06-15",
                            title: "The Future of Banking Technology",
                            img: "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg",
                            des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum erat, condimentum id justo nec, commodo fermentum lorem. In hac habitasse platea dictumst. Vestibulum pellentesque faucibus mauris, aliquet sagittis velit placerat sollicitudin. Nulla aliquam, mi quis maximus convallis, purus massa laoreet sem, eu interdum lacus neque vitae leo. Proin vel leo sit amet libero mollis condimentum at convallis augue. Suspendisse potenti. Maecenas quis sem vestibulum, hendrerit erat et, porta lacus. Nullam non neque ut risus vehicula feugiat vel a ligula. Morbi posuere nec neque id venenatis. Suspendisse facilisis tincidunt scelerisque. Etiam porttitor, odio sagittis gravida bibendum, lorem lorem finibus augue, vel pulvinar tellus nibh vitae nisi. Suspendisse lectus velit, porta vel sem ut, luctus lacinia est.`
                        },
                        {
                            id: "3",
                            year: "2018-01-10",
                            title: "Innovations in FinTech",
                            img: "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg",
                            des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum erat, condimentum id justo nec, commodo fermentum lorem. In hac habitasse platea dictumst. Vestibulum pellentesque faucibus mauris, aliquet sagittis velit placerat sollicitudin. Nulla aliquam, mi quis maximus convallis, purus massa laoreet sem, eu interdum lacus neque vitae leo. Proin vel leo sit amet libero mollis condimentum at convallis augue. Suspendisse potenti. Maecenas quis sem vestibulum, hendrerit erat et, porta lacus. Nullam non neque ut risus vehicula feugiat vel a ligula. Morbi posuere nec neque id venenatis. Suspendisse facilisis tincidunt scelerisque. Etiam porttitor, odio sagittis gravida bibendum, lorem lorem finibus augue, vel pulvinar tellus nibh vitae nisi. Suspendisse lectus velit, porta vel sem ut, luctus lacinia est.`
                        },
                    ];
                    setAllBlogs(demoBlogs);
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
    const latestBlog = allBlogs.reduce((latest, current) =>
        new Date(latest.year) > new Date(current.year) ? latest : current,
        allBlogs[0] || {}
    );

    const sortedBlogs = allBlogs.length > 0 ? allBlogs.sort((a, b) => new Date(b.year) - new Date(a.year)) : [];

    return (
        <div className="flex flex-col items-center w-[95%] mb-8">
            <div className="flex flex-col items-center w-full mb-8">
                <div className="flex flex-row items-center gap-4 my-8">
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                    <div className="text-[rgb(30,81,153)] text-[64px] font-bold">Blogs</div>
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                </div>
                <AllBlog latestBlog={latestBlog} email={email} />
            </div>
            <div className='articleHead mb-12 px-4 py-2 w-[93%] text-left text-white text-xl'>
                All Articls
            </div>
            <div className="flex flex-col w-[93%] mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-8 justify-items-center">
                    {sortedBlogs.map((blog) => (
                        <AllBlog key={blog.id} allBlog={blog} email={email} />
                    ))}
                </div>
            </div>
            <Sidebar fullHeight="true" />
        </div>
    );
};

export default AllBlogs;
