import React, { useContext, useEffect, useState } from 'react';
import DashboardLeft from './DashboardLeft';
import { IoIosSearch } from 'react-icons/io';
import DashboardRight from './DashboardRight';
import browse from "../../assets/browse.png";
import { AuthContext } from '../../context/AuthProvider';
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
const UploadProject = () => {
    const [activeSection, setActiveSection] = useState("gallery");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imagesWithTitles, setImagesWithTitles] = useState([]);
    const [videosWithTitles, setVideosWithTitles] = useState([]);
    const [blogsWithTitles, setBlogsWithTitles] = useState([]);
    const [newsWithTitles, setNewsWithTitles] = useState([]);
    const [blogsWithDesc, setBlogsWithDesc] = useState([]);
    const [newsWithDesc, setNewsWithDesc] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [uploadedBlogs, setUploadedBlogs] = useState([]);
    const [uploadedNews, setUploadedNews] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [draft, setDraft] = useState([]);
    const debouncedDraft = useDebounce(draft, 2000);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const draftData = {
            activeSection,
            gallery: {
                files: imagesWithTitles.map((img, index) => ({
                    title: img.title || 'Untitled',
                    file: uploadedImages[index],
                })),
            },
            video: {
                files: videosWithTitles.map((video, index) => ({
                    title: video.title || 'Untitled',
                    file: uploadedVideos[index],
                })),
            },
            blogs: {
                files: blogsWithTitles.map((blog, index) => ({
                    title: blog.title || 'Untitled',
                    desc: blogsWithDesc[index]?.desc || '',
                    file: uploadedBlogs[index],
                })),
            },
            news: {
                files: newsWithTitles.map((newsItem, index) => ({
                    title: newsItem.title || 'Untitled',
                    desc: newsWithDesc[index]?.desc || '',
                    file: uploadedNews[index],
                })),
            },
        };
        const updateDraftTimeout = setTimeout(() => {
            setDraft(draftData);
        }, 10000);

        return () => clearTimeout(updateDraftTimeout);
    }, [activeSection, imagesWithTitles, videosWithTitles, blogsWithTitles, blogsWithDesc, newsWithTitles, newsWithDesc, uploadedImages, uploadedVideos, uploadedBlogs, uploadedNews]);
    useEffect(() => {
        console.log(draft)
    })
    useEffect(() => {
        const uploadDraft = async () => {
            try {
                const formData = new FormData();
                formData.append('draftData', JSON.stringify(debouncedDraft));
                if (selectedFiles && selectedFiles.length > 0) {
                    selectedFiles.forEach((file) => {
                        formData.append('files', file);
                    });
                }
                const hasValidData =
                    (draft.gallery?.files.some(file => file.file || file.title) ||
                        draft.video?.files.some(file => file.file || file.title) ||
                        draft.blogs?.files.some(file => file.file || file.title) ||
                        draft.news?.files.some(file => file.file || file.title));

                if (hasValidData) {
                    const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${currentUser.email}/updatedDraft`, {
                        method: 'PATCH',
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log('Draft data uploaded:', data);
                } else {
                    console.log('No valid files or titles to upload.');
                }
            } catch (error) {
                console.error('Error uploading draft data:', error);
            }
        };

        if (Object.keys(debouncedDraft).length > 0) {
            uploadDraft();
        }
    }, [debouncedDraft, currentUser.email, selectedFiles]);


    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);


        if (activeSection === "gallery") {
            const newImagesWithTitles = files.map(file => ({ file, title: '' }));
            setUploadedImages([...uploadedImages, ...files]);
            setImagesWithTitles([...imagesWithTitles, ...newImagesWithTitles]);


        } else if (activeSection === "video") {
            const newVideosWithTitles = files.map(file => ({ file, title: '' }));
            setUploadedVideos([...uploadedVideos, ...files]);
            setVideosWithTitles([...videosWithTitles, ...newVideosWithTitles]);


        } else if (activeSection === "blog") {
            const newBlogsWithDetails = files.map(file => ({
                file,
                title: '',
                desc: ''
            }));

            setUploadedBlogs([...uploadedBlogs, ...files]);
            setBlogsWithTitles([...blogsWithTitles, ...newBlogsWithDetails]);
        } else if (activeSection === "news") {
            const newNewsWithDetails = files.map(file => ({
                file,
                title: '',
                desc: ''
            }));
            setUploadedNews([...uploadedNews, ...files]);
            setNewsWithTitles([...newsWithTitles, ...newNewsWithDetails]);

        }
    };


    const handleTitleChange = (index, newTitle) => {
        setImagesWithTitles(prevTitles => {
            const updatedTitles = prevTitles.map((image, i) =>
                i === index ? { ...image, title: newTitle } : image
            );
            return updatedTitles;
        });

    };

    const handleVideoTitleChange = (index, newTitle) => {
        setVideosWithTitles(prevTitles =>
            prevTitles.map((video, i) =>
                i === index ? { ...video, title: newTitle } : video
            )
        );
    };
    const handleBlogTitleChange = (index, newTitle) => {
        setBlogsWithTitles(prevTitles =>
            prevTitles.map((image, i) =>
                i === index ? { ...image, title: newTitle } : image
            )
        );
        console.log("blogs")
    };
    const handleBlogDescChange = (index, newDesc) => {
        const updatedBlogs = blogsWithTitles.map((blog, i) =>
            i === index ? { ...blog, desc: newDesc } : blog
        );
        setBlogsWithTitles(updatedBlogs);
    };
    const handleNewsTitleChange = (index, newTitle) => {
        setNewsWithTitles(prevTitles =>
            prevTitles.map((image, i) =>
                i === index ? { ...image, title: newTitle } : image
            )
        );
        console.log("blogs")
    };
    const handleNewsDescChange = (index, newDesc) => {
        const updatedNews = newsWithTitles.map((news, i) =>
            i === index ? { ...news, desc: newDesc } : news
        );
        setNewsWithTitles(updatedNews);
    };
    const handleUpload = async () => {
        console.log("uploaded")
        if (!selectedFiles) {
            alert("Please select a file to upload.");
            return;
        }
        const formData = new FormData();
        if (activeSection === "gallery") {
            selectedFiles.forEach((file) => {
                formData.append('gallery', file);
            });
            imagesWithTitles.forEach((imageWithTitle, index) => {
                formData.append(`titles[${index}]`, imageWithTitle.title || '');
            });

            try {
                const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${currentUser.email}/gallery`, {
                    method: 'PATCH',
                    body: formData,
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Upload failed: ${errorData.message}`);
                }
                const responseData = await response.json();
                alert("Upload successful!");
                setImagesWithTitles([]);
                setSelectedFiles(null);
            } catch (error) {
                console.error("Error uploading:", error);
                alert(`Error uploading: ${error.message}`);
            }
        }
        else if (activeSection === "video") {
            selectedFiles.forEach((file) => formData.append("videos", file));
            videosWithTitles.forEach((videoWithTitle, index) => {
                formData.append(`titles[${index}]`, videoWithTitle.title || '');
            });
            try {
                const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${currentUser.email}/video`, {
                    method: 'PATCH',
                    body: formData,
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Upload failed: ${errorData.message}`);
                }
                const responseData = await response.json();
                alert("Upload successful!", responseData);
                setVideosWithTitles([]);
                setSelectedFiles(null);
            } catch (error) {
                console.error("Error uploading:", error);
                alert(`Error uploading: ${error.message}`);
            }
        }
        else if (activeSection === "blog") {
            selectedFiles.forEach((file) => formData.append("blog", file));
            blogsWithTitles.forEach((blogWithDetails, index) => {
                formData.append(`titles[${index}]`, blogWithDetails.title || '');
                formData.append(`desc[${index}]`, blogWithDetails.desc || '');
            });
            const currentDate = new Date().toLocaleDateString();
            formData.append("date", currentDate);
            console.log(formData)
            try {
                const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${currentUser.email}/blog`, {
                    method: 'PATCH',
                    body: formData,
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Upload failed: ${errorData.message}`);
                }
                const responseData = await response.json();
                alert("Upload successful!", responseData);
                setBlogsWithTitles([]);
                setBlogsWithDesc([]);
                setSelectedFiles(null);
            } catch (error) {
                console.error("Error uploading:", error);
                alert(`Error uploading: ${error.message}`);
            }

        }
        else if (activeSection === "news") {
            selectedFiles.forEach((file) => formData.append("news", file));
            newsWithTitles.forEach((newsWithDetails, index) => {
                formData.append(`titles[${index}]`, newsWithDetails.title || '');
                formData.append(`desc[${index}]`, newsWithDetails.desc || '');
            });
            try {
                const response = await fetch(`https://professional-portfolio-backend-gjit.onrender.com/users/${currentUser.email}/news`, {
                    method: 'PATCH',
                    body: formData,
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Upload failed: ${errorData.message}`);
                }
                const responseData = await response.json();
                alert("Upload successful!", responseData);
                setNewsWithTitles([]);
                setNewsWithDesc([]);
                setSelectedFiles(null);
                setDraft('')
            } catch (error) {
                console.error("Error uploading:", error);
                alert(`Error uploading: ${error.message}`);
            }
        }
    };
    const handleCancel = () => {
        setSelectedFiles(null);
        setImagesWithTitles([]);
        setVideosWithTitles([]);
        setBlogsWithTitles([]);
        setBlogsWithDesc([]);
        setNewsWithTitles([]);
        setNewsWithDesc([]);

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }

        console.log("Upload canceled, form cleared");
    }
    return (
        <div className="flex flex-col md:flex-row">
            <DashboardLeft paddingBottom="16.5rem" />
            <div className="center ml-8 mt-4 w-[90%] md:w-[60%]">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[48px] font-[700]">Upload Projects</h2>
                        <p className="text-[rgb(125,225,248)] text-left text-[24px] font-[700]">Add your latest achievements</p>
                    </div>
                    {/* <div className="bg-[rgb(27,66,124)] w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-4">
                        <div className="flex justify-end" >
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div> */}
                </div>

                {/* Section buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-8 mt-16 md:mx-32">
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'gallery' ? 'bg-[rgb(17,72,153)] text-white' : 'border-2 border-[rgb(17,72,153)] text-[rgb(17,72,153)]'}`}
                        onClick={() => handleSectionChange('image')}
                    >
                        Add Image
                    </div>
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'video' ? 'bg-[rgb(128,234,227)] text-white' : 'border-2 border-[rgb(128,234,227)] text-[rgb(128,234,227)]'}`}
                        onClick={() => handleSectionChange('video')}
                    >
                        Add Video
                    </div>
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'blog' ? 'bg-[rgb(102,145,214)] text-white' : 'border-2 border-[rgb(102,145,214)] text-[rgb(102,145,214)]'}`}
                        onClick={() => handleSectionChange('blog')}
                    >
                        Add Blog
                    </div>
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'news' ? 'bg-[rgb(17,72,153)] text-white' : 'border-2 border-[rgb(17,72,153)] text-[rgb(17,72,153)]'}`}
                        onClick={() => handleSectionChange('news')}
                    >
                        Add News
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full mt-12">
                    <div className="flex items-center flex-col">

                        {activeSection === 'gallery' && (
                            <div className="border-dashed border-2 w-[20rem] md:w-[32rem] flex flex-col items-center border-[rgb(122,173,255)] pb-6">
                                <img src={browse} alt="browse" className="w-[12rem]" />
                                <input
                                    type="file"
                                    name="image"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="imageInput"
                                />
                                <label htmlFor="imageInput" className="bg-[rgb(122,173,255)] text-2xl text-white font-bold px-14 py-2 rounded-lg cursor-pointer">
                                    Browse Images
                                </label>
                                {imagesWithTitles.map((imageWithTitle, index) => (
                                    <div key={index} className="w-full border-2 text-left px-8 text-[rgb(122,173,255)] border-[rgb(122,173,255)] mt-6 py-4">
                                        <input
                                            type="text"
                                            value={imageWithTitle.title}
                                            onChange={(e) => handleTitleChange(index, e.target.value)}
                                            placeholder="Add Title"
                                            className="w-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeSection === 'video' && (
                            <div className="border-dashed border-2 w-[20rem] md:w-[32rem] flex flex-col items-center border-[rgb(122,173,255)] pb-6">
                                <img src={browse} alt="browse" className="w-[12rem]" />
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="videoInput"
                                />
                                <label htmlFor="videoInput" className="bg-[rgb(122,173,255)] text-2xl text-white font-bold px-14 py-2 rounded-lg cursor-pointer">
                                    Browse Videos
                                </label>
                                {videosWithTitles.map((videoWithTitle, index) => (
                                    <div key={index} className="w-full border-2 text-left px-8 text-[rgb(122,173,255)] border-[rgb(122,173,255)] mt-6 py-4">
                                        <input
                                            type="text"
                                            value={videoWithTitle.title}
                                            onChange={(e) => handleVideoTitleChange(index, e.target.value)}
                                            placeholder="Add title"
                                            className="w-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeSection === 'blog' && (
                            <div className="border-dashed border-2 w-[20rem] md:w-[32rem] flex flex-col items-center border-[rgb(122,173,255)] pb-6">
                                <img src={browse} alt="browse" className="w-[12rem]" />
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="blogInput"
                                />
                                <label htmlFor="blogInput" className="bg-[rgb(122,173,255)] text-2xl text-white font-bold px-14 py-2 rounded-lg cursor-pointer">
                                    Browse Blogs
                                </label>
                                {blogsWithTitles.map((blogsWithTitle, index) => (
                                    <div key={index} className="w-full border-2 text-left px-8 text-[rgb(122,173,255)] border-[rgb(122,173,255)] mt-6 py-4">
                                        <input
                                            type="text"
                                            value={blogsWithTitle.title}
                                            onChange={(e) => handleBlogTitleChange(index, e.target.value)}
                                            placeholder="Add Title"
                                            className="w-full"
                                        />
                                        <div className="w-full text-center px-8 text-[rgb(122,173,255)] py-12">
                                            <input
                                                type="text"
                                                value={blogsWithTitle.desc}
                                                onChange={(e) => handleBlogDescChange(index, e.target.value)}
                                                placeholder="Describe your content up to 3000 words"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeSection === 'news' && (
                            <div className="border-dashed border-2 w-[20rem] md:w-[32rem] flex flex-col items-center border-[rgb(122,173,255)] pb-6">
                                <img src={browse} alt="browse" className="w-[12rem]" />
                                <input
                                    type="file"
                                    name="blogs"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="newsInput"
                                />
                                <label htmlFor="newsInput" className="bg-[rgb(122,173,255)] text-2xl text-white font-bold px-14 py-2 rounded-lg cursor-pointer">
                                    Browse News
                                </label>
                                {newsWithTitles.map((newsWithTitle, index) => (
                                    <div key={index} className="w-full border-2 text-left px-8 text-[rgb(122,173,255)] border-[rgb(122,173,255)] mt-6 py-4">
                                        <input
                                            type="text"
                                            value={newsWithTitle.title}
                                            onChange={(e) => handleNewsTitleChange(index, e.target.value)}
                                            placeholder="Add Title"
                                            className="w-full"
                                        />
                                        <div className="w-full text-center px-8 text-[rgb(122,173,255)] py-12">
                                            <input
                                                type="text"
                                                value={newsWithTitle.desc}
                                                onChange={(e) => handleNewsDescChange(index, e.target.value)}
                                                placeholder="Describe your content up to 3000 words"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>

                <div className="flex justify-center mt-6 gap-6">
                    <button onClick={handleCancel} className="border-2 border-[rgb(122,173,255)] px-6 rounded-lg text-xl text-[rgb(122,173,255)] py-1">
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        className="border-2 bg-[rgb(122,173,255)] px-6 rounded-lg text-xl text-white py-1"
                    >
                        Upload
                    </button>
                </div>
            </div>
            <DashboardRight />
        </div>
    );
};

export default UploadProject;
