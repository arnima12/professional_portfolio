import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Education from '../Education/Education';
import Gallery from '../Gallery/Gallery';
import Videos from '../Videos/Videos';
import News from '../News/News';
import './Home.css';
import Blogs from '../Blogs/Blogs';
import Testimonials from '../Testimonials/Testimonials';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
const Home = () => {
    const { email } = useParams();
    const [viewCount, setViewCount] = useState(0);
    const [viewsLastWeek, setViewsLastWeek] = useState(0);
    const [reachHistory, setReachHistory] = useState([]);
    useEffect(() => {
        const hasViewed = sessionStorage.getItem(`viewed-${email}`);
        const fetchViewCount = async () => {
            try {
                const response = await fetch('https://innova-portfolio-server.vercel.app/view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                console.log("data", data)
                if (response.ok) {
                    setViewCount(data.viewCount);
                    setViewsLastWeek(data.viewsLastWeek);
                    setReachHistory(data.reachHistory);;
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching view count:', error);
            }
        };
        if (!hasViewed) {
            fetchViewCount();
            sessionStorage.setItem(`viewed-${email}`, 'true');
        }
    }, [email]);
    useEffect(() => {
        console.log(reachHistory)
    }, [reachHistory])
    return (
        <div>
            <Banner />
            <About />
            <Education />
            <Gallery />
            <Videos />
            <News />
            <Blogs />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;