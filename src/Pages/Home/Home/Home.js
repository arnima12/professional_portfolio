import React from 'react';
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
const Home = () => {
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