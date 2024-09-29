import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Drafts = () => {
    const [drafts, setDrafts] = useState([]); // State to hold drafts
    const [title, setTitle] = useState(''); // State for draft title
    const [description, setDescription] = useState('');
    const [currentDraft, setCurrentDraft] = useState(null);
    const [editIndex, setEditIndex] = useState(null); // Index for editing draft
    const { currentUser } = useContext(AuthContext);
    const userEmail = currentUser.email
    useEffect(() => {
        fetchDrafts(); // Fetch drafts when component mounts
    }, [userEmail]);

    // Function to fetch drafts from the server
    const fetchDrafts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userEmail}/draft`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDrafts(data.drafts);
        } catch (error) {
            console.error('Failed to fetch drafts:', error);
        }
    };
    useEffect(() => {
        console.log(drafts)
    }, [drafts])


    const handleEdit = (index) => {
        const draftToEdit = drafts[index];
        setTitle(draftToEdit.title); // Populate the title field
        setDescription(draftToEdit.description); // Populate the description field
    };

    return (
        <div>
            <div className="grid grid-cols-5 gap-12 mt-12">
                {Array.isArray(drafts) ? (
                    drafts.map((draft, index) => (

                        <div key={draft.id} className="flex flex-col items-center">
                            <img src={draft.image} alt="draft" className="w-[10rem]" />
                            <h2 className="text-center">{draft.title}</h2>
                            <p>{draft.description}</p>
                            <button className="border-2 bg-[rgb(122,173,255)] px-6 rounded-lg text-xl text-white py-1 mt-4" onClick={() => handleEdit(index)}>Edit</button>
                        </div>

                    ))
                ) : (
                    <p>No drafts available</p>
                )}
            </div>
        </div>
    );
};

export default Drafts;
