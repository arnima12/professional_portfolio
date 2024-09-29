import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { MdDelete } from 'react-icons/md';

const RecycleBin = () => {
    const [loading, setLoading] = useState(false);
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
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (email) {
                    const response = await fetch(`http://localhost:8000/users/${email}/store-deleted-item`);
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
    const handleDelete = async (index) => {
        setLoading(true);
        const item = deletedItems[index]; // Get the item to delete

        try {
            const response = await fetch(`http://localhost:8000/users/${email}/delete-item`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: item.image, // or item.video depending on the type
                    title: item.title
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            // Remove the deleted item from the local state
            setDeletedItems(prevItems => prevItems.filter((_, i) => i !== index));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {deletedItems.length > 0 ? (
                deletedItems.map((item, index) => (
                    <li key={index} className="flex items-center mx-4 mt-6 w-full">
                        <div className="flex items-center gap-[40rem] text-xl font-semibold mt-4 px-2">
                            <div className="">{index + 1}</div>
                            <div className="text-black text-left w-[16rem]">{item.title || 'Untitled'}</div>
                            <button
                                className=" text-red-500 px-4 py-2 rounded ml-4 w-[8rem] flex items-center" onClick={() => handleDelete(index)}>
                                <MdDelete />
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <div className="text-white mx-4 mt-6">No deleted items found.</div>
            )}
        </div>
    );
};

export default RecycleBin;