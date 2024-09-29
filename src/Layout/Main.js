import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    return (
        <div>
            {location.pathname !== '/signUp' && location.pathname !== '/signIn' && location.pathname !== '/dashboard' && location.pathname !== '/dashboard/upload' && location.pathname !== '/dashboard/personalInfo' && location.pathname !== '/dashboard/settings' && location.pathname !== '/dashboard/myProject' && location.pathname !== '/dashboard/analytics' && <Navbar />}

            <Outlet />
        </div>
    );
};

export default Main;