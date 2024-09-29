import React, { useEffect, useState } from 'react';
import './Blogs.css'
import Blog from './Blog';
import { useParams } from 'react-router-dom';
const Blogs = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [error, setError] = useState(null);
    const { email } = useParams();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (email && email !== 'undefined') {
                    const response = await fetch(`http://localhost:8000/users/${email}/blog`);
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
                            title: "Technology a business driver, right vehicle for banks",
                            image: "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg",
                            desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum erat, condimentum id justo nec, commodo fermentum lorem. In hac habitasse platea dictumst. Vestibulum pellentesque faucibus mauris, aliquet sagittis velit placerat sollicitudin. Nulla aliquam, mi quis maximus convallis, purus massa laoreet sem, eu interdum lacus neque vitae leo. Proin vel leo sit amet libero mollis condimentum at convallis augue. Suspendisse potenti. Maecenas quis sem vestibulum, hendrerit erat et, porta lacus. Nullam non neque ut risus vehicula feugiat vel a ligula. Morbi posuere nec neque id venenatis. Suspendisse facilisis tincidunt scelerisque. Etiam porttitor, odio sagittis gravida bibendum, lorem lorem finibus augue, vel pulvinar tellus nibh vitae nisi. Suspendisse lectus velit, porta vel sem ut, luctus lacinia est.`
                        },
                        {
                            id: "2",
                            title: "The Future of Banking Technology",
                            image: "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg",
                            desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum erat, condimentum id justo nec, commodo fermentum lorem. In hac habitasse platea dictumst. Vestibulum pellentesque faucibus mauris, aliquet sagittis velit placerat sollicitudin. Nulla aliquam, mi quis maximus convallis, purus massa laoreet sem, eu interdum lacus neque vitae leo. Proin vel leo sit amet libero mollis condimentum at convallis augue. Suspendisse potenti. Maecenas quis sem vestibulum, hendrerit erat et, porta lacus. Nullam non neque ut risus vehicula feugiat vel a ligula. Morbi posuere nec neque id venenatis. Suspendisse facilisis tincidunt scelerisque. Etiam porttitor, odio sagittis gravida bibendum, lorem lorem finibus augue, vel pulvinar tellus nibh vitae nisi. Suspendisse lectus velit, porta vel sem ut, luctus lacinia est.`
                        },
                        {
                            id: "3",
                            title: "Innovations in FinTech",
                            image: "https://i.ibb.co/VLkMkbg/istockphoto-1396644902-612x612.jpg",
                            desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ipsum erat, condimentum id justo nec, commodo fermentum lorem. In hac habitasse platea dictumst. Vestibulum pellentesque faucibus mauris, aliquet sagittis velit placerat sollicitudin. Nulla aliquam, mi quis maximus convallis, purus massa laoreet sem, eu interdum lacus neque vitae leo. Proin vel leo sit amet libero mollis condimentum at convallis augue. Suspendisse potenti. Maecenas quis sem vestibulum, hendrerit erat et, porta lacus. Nullam non neque ut risus vehicula feugiat vel a ligula. Morbi posuere nec neque id venenatis. Suspendisse facilisis tincidunt scelerisque. Etiam porttitor, odio sagittis gravida bibendum, lorem lorem finibus augue, vel pulvinar tellus nibh vitae nisi. Suspendisse lectus velit, porta vel sem ut, luctus lacinia est.`
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
    const sortedBlogs = allBlogs.length > 0 ? allBlogs.sort((a, b) => new Date(b.year) - new Date(a.year)) : [];
    if (error) {
        return console.log("error: ", error);
    }
    return (
        <div className="blogs-section ">
            <div className="flex items-center justify-center">
                <div className="blog-left-line  hidden lg:block"></div>
                <div className="content text-[50px] md:text-[64px] text-[rgb(30,81,153)] font-bold">My Blogs</div>
                <div className="blog-right-line  hidden lg:flex items-center"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center mt-16">
                {sortedBlogs.slice(0, 3).map((blog) => <Blog key={blog.id} blog={blog}></Blog>)}
            </div>
        </div>
    );
};

export default Blogs;