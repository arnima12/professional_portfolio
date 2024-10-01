import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Drafts = () => {
    const [drafts, setDrafts] = useState([]);
    const [currentDraft, setCurrentDraft] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imagesWithTitles, setImagesWithTitles] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const userEmail = currentUser.email;

    useEffect(() => {
        fetchDrafts();
    }, [userEmail]);

    const fetchDrafts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userEmail}/updatedDraft`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDrafts(data);
        } catch (error) {
            console.error('Failed to fetch drafts:', error);
        }
    };

    const handleEdit = (index) => {
        const draftToEdit = drafts[index];
        setCurrentDraft(index);
        setTitle(draftToEdit.draftData.files[0]?.title || '');
        setDescription(draftToEdit.draftData.files[0]?.description || '');

        // Initialize imagesWithTitles correctly
        const existingFileUrl = draftToEdit.draftData.files[0]?.url;
        if (existingFileUrl) {
            // Ensure imagesWithTitles is reset and created properly
            setImagesWithTitles([{ url: existingFileUrl, title: draftToEdit.draftData.files[0]?.title || 'Untitled' }]);
        } else {
            setImagesWithTitles([]); // Reset if no existing file
        }
    };

    // Add useEffect to log the updated imagesWithTitles and title
    useEffect(() => {
        console.log("title", title);
        console.log("imagesWithTitles", imagesWithTitles);
    }, [title, imagesWithTitles]); // This effect will run whenever title or imagesWithTitles change
    const handleSave = async () => {
        if (drafts[currentDraft]) {
            const activeSection = drafts[currentDraft].draftData.files[0]?.activeSection;

            if (activeSection === "gallery") {
                // Prepare FormData
                const formData = new FormData();
                const existingFileUrl = drafts[currentDraft].draftData.files[0]?.url;

                // Update imagesWithTitles using the latest title state
                const updatedImagesWithTitles = existingFileUrl
                    ? [{ url: existingFileUrl, title: title || 'Untitled' }]
                    : [];

                // Append images with titles to FormData
                updatedImagesWithTitles.forEach((imageWithTitle, index) => {
                    formData.append(`gallery[${index}]`, imageWithTitle.url);
                    formData.append(`titles[${index}]`, imageWithTitle.title || '');
                });

                try {
                    const response = await fetch(`http://localhost:8000/users/${currentUser.email}/gallery`, {
                        method: 'PATCH',
                        body: formData,
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Upload failed: ${errorData.message}`);
                    }

                    const responseData = await response.json();
                    alert("Upload successful!");

                } catch (error) {
                    console.error("Error uploading:", error);
                    alert(`Error uploading: ${error.message}`);
                }
            } else {
                // Update non-gallery section
                const updatedDraft = {
                    ...drafts[currentDraft],
                    draftData: {
                        ...drafts[currentDraft].draftData,
                        files: [
                            {
                                ...drafts[currentDraft].draftData.files[0],
                                title: title, // Use the current title state
                                description: description,
                            },
                        ],
                    },
                };

                const updatedDrafts = [...drafts];
                updatedDrafts[currentDraft] = updatedDraft;
                setDrafts(updatedDrafts);
                setCurrentDraft(null);
                setTitle(''); // Reset title
                setDescription(''); // Reset description
                setImagesWithTitles([]); // Clear images with titles after saving
            }
        }
    };


    return (
        <div>
            <div className="grid grid-cols-5 gap-12 mt-12">
                {Array.isArray(drafts) && drafts.length > 0 ? (
                    drafts.map((draft, index) => (
                        <div key={draft.id} className="flex flex-col items-center">
                            {draft.draftData.files.length > 0 && (
                                <img
                                    src={draft.draftData.files[0]?.url}
                                    alt="draft"
                                    className="w-[10rem]"
                                />
                            )}
                            <h2 className="text-center">{draft.draftData.files[0]?.title || 'Untitled'}</h2>
                            <p>{draft.draftData.files[0]?.description || 'No description available'}</p>
                            <button
                                className="border-2 bg-[rgb(122,173,255)] px-6 rounded-lg text-xl text-white py-1 mt-4"
                                onClick={() => handleEdit(index)}
                            >
                                Edit
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No drafts available</p>
                )}
            </div>

            {currentDraft !== null && (
                <div className="edit-form mt-6">
                    <h2>Edit Draft</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="border-2 p-2 mb-2 w-[8rem] h-[3rem] mr-4"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="border-2 p-2 mb-2 w-[8rem] h-[3rem] mr-4"
                    />
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
                        Save Changes
                    </button>
                    <button onClick={() => { setCurrentDraft(null); setTitle(''); setDescription(''); setImagesWithTitles([]); }} className="bg-red-500 text-white px-4 py-2 rounded ml-2 mr-4">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default Drafts;
