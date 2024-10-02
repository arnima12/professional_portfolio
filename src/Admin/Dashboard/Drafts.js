import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Drafts = () => {
    const [drafts, setDrafts] = useState([]);
    const [currentDraft, setCurrentDraft] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imagesWithTitles, setImagesWithTitles] = useState([]);
    const [videosWithTitles, setVideosWithTitles] = useState([]);
    const [blogsWithTitles, setBlogsWithTitles] = useState([]);
    const [newsWithTitles, setNewsWithTitles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
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
    const handleEdit = async (index) => {
        const draftToEdit = drafts[index];

        if (!draftToEdit || !draftToEdit.draftData || draftToEdit.draftData.files.length === 0) {
            console.error('Draft or draft data is undefined or missing.');
            return;
        }

        setCurrentDraft(index);
        setTitle(draftToEdit.draftData.files[0]?.title || '');
        setDescription(draftToEdit.draftData.files[0]?.description || '');

        const existingFileUrl = draftToEdit.draftData.files[0]?.url;

        if (existingFileUrl) {
            try {
                const response = await fetch(existingFileUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch file from URL');
                }
                const blob = await response.blob();
                console.log("blob", blob.type)
                const file = new File([blob], draftToEdit.draftData.files[0]?.title || 'image', {
                    type: blob.type,
                });
                setSelectedFiles([file]);

                const activeSection = draftToEdit.draftData.files[0]?.activeSection;
                if (activeSection === "gallery") {
                    setImagesWithTitles([{ url: existingFileUrl, title: draftToEdit.draftData.files[0]?.title || 'Untitled' }]);
                } else if (activeSection === "videos") {
                    setVideosWithTitles([{ url: existingFileUrl, title: draftToEdit.draftData.files[0]?.title || 'Untitled' }]);
                }
                else if (activeSection === "blog") {
                    setBlogsWithTitles([{ url: existingFileUrl, title: draftToEdit.draftData.files[0]?.title || 'Untitled', desc: draftToEdit.draftData.files[0]?.desc }]);
                }
                else if (activeSection === "news") {
                    setNewsWithTitles([{ url: existingFileUrl, title: draftToEdit.draftData.files[0]?.title || 'Untitled', desc: draftToEdit.draftData.files[0]?.desc }]);
                }
            } catch (error) {
                console.error('Error fetching file from URL:', error);
            }
        } else {
            setImagesWithTitles([]);
            setSelectedFiles(null);
        }
    };


    useEffect(() => {
        if (imagesWithTitles.length > 0) {
            setImagesWithTitles((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[0].title = title;
                return updatedImages;
            });
        }
        else if (videosWithTitles.length > 0) {
            setVideosWithTitles((prevVideos) => {
                const updatedVideos = [...prevVideos];
                updatedVideos[0].title = title;
                return updatedVideos;
            });
        }
        else if (blogsWithTitles.length > 0) {
            setBlogsWithTitles((prevBlogs) => {
                const updatedBlogs = [...prevBlogs];
                updatedBlogs[0].title = title;
                return updatedBlogs;
            });
        }
        else if (newsWithTitles.length > 0) {
            setNewsWithTitles((prevNews) => {
                const updatedNews = [...prevNews];
                updatedNews[0].title = title;
                return updatedNews;
            });
        }
    }, [title]);
    useEffect(() => {

    }, [title]);
    const handleSave = async () => {
        if (drafts[currentDraft]) {
            const activeSection = drafts[currentDraft].draftData.files[0]?.activeSection;
            const formData = new FormData();
            const clearFormAndDraft = () => {
                // Clear the input fields
                setSelectedFiles([]);
                setImagesWithTitles([]);
                setVideosWithTitles([]);
                setBlogsWithTitles([]);
                setNewsWithTitles([]);

                setCurrentDraft(null);
            };
            if (activeSection === "gallery") {
                selectedFiles.forEach((file, index) => {
                    formData.append(`gallery`, file);
                });
                imagesWithTitles.forEach((imageWithTitle, index) => {
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

                    alert("Gallery upload successful!");
                    clearFormAndDraft();
                } catch (error) {
                    console.error("Error uploading gallery:", error);
                    alert(`Error uploading: ${error.message}`);
                }
            }

            // Saving Video Draft
            else if (activeSection === "video") {
                console.log("videos")
                selectedFiles.forEach((file, index) => formData.append(`videos`, file));
                videosWithTitles.forEach((videoWithTitle, index) => {
                    formData.append(`titles[${index}]`, videoWithTitle.title || '');
                });

                try {
                    const response = await fetch(`http://localhost:8000/users/${currentUser.email}/video`, {
                        method: 'PATCH',
                        body: formData,
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Upload failed: ${errorData.message}`);
                    }

                    alert("Video upload successful!");
                    clearFormAndDraft();
                } catch (error) {
                    console.error("Error uploading video:", error);
                    alert(`Error uploading: ${error.message}`);
                }
            }

            // Saving Blog Draft
            else if (activeSection === "blog") {
                selectedFiles.forEach((file, index) => formData.append(`blog`, file));
                blogsWithTitles.forEach((blogWithTitle, index) => {
                    formData.append(`titles[${index}]`, blogWithTitle.title || '');
                    formData.append(`desc[${index}]`, blogWithTitle.desc || '');
                });

                try {
                    const response = await fetch(`http://localhost:8000/users/${currentUser.email}/blog`, {
                        method: 'PATCH',
                        body: formData,
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Upload failed: ${errorData.message}`);
                    }

                    alert("Blog upload successful!");
                    clearFormAndDraft();
                } catch (error) {
                    console.error("Error uploading blog:", error);
                    alert(`Error uploading: ${error.message}`);
                }
            }
            else if (activeSection === "news") {
                selectedFiles.forEach((file, index) => formData.append(`news`, file));
                newsWithTitles.forEach((newsWithTitle, index) => {
                    formData.append(`titles[${index}]`, newsWithTitle.title || '');
                    formData.append(`desc[${index}]`, newsWithTitle.desc || '');
                });

                try {
                    const response = await fetch(`http://localhost:8000/users/${currentUser.email}/news`, {
                        method: 'PATCH',
                        body: formData,
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Upload failed: ${errorData.message}`);
                    }

                    alert("News upload successful!");
                    clearFormAndDraft();
                } catch (error) {
                    console.error("Error uploading news:", error);
                    alert(`Error uploading: ${error.message}`);
                }
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
                                    className="w-[10rem] h-[8rem]"
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
                    <div className="flex gap-4 justify-center">
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="border-2 p-2 mb-2 w-[8rem] h-[3rem] mr-4"
                            />
                        </div>
                        <div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="border-2 p-2 mb-2 w-[8rem] h-[3rem] mr-4"
                            />
                        </div>
                        <button onClick={handleSave} className="bg-blue-500 text-white p-2 w-[8rem] h-[3rem] rounded">
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Drafts;
