import { useEffect, useState } from 'react';

const useToken = (email) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const getToken = async () => {
            if (email) {
                try {
                    const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/jwt?email=${email}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch token');
                    }
                    const data = await response.json();
                    setToken(data.token);
                } catch (error) {
                    console.error('Error fetching token:', error);
                }
            }
        };

        getToken();
    }, [email]);

    return [token];
};

export default useToken;
