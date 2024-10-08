import React, { useContext, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import DashboardLeft from './DashboardLeft';
import { AuthContext } from '../../context/AuthProvider';

const MyProject = () => {
    const [activeSection, setActiveSection] = useState("image");
    const [gallery, setGallery] = useState([]);
    const [video, setVideo] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const userEmail = currentUser.email;

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (userEmail) {
                    const response = await fetch(`http://localhost:8000/users/${userEmail}`);
                    const contentType = response.headers.get('content-type');
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();

                        if (activeSection === "image") {
                            setGallery(data.gallery || []);
                        } else if (activeSection === "video") {
                            setVideo(data.videos || []);
                        } else if (activeSection === "blog") {
                            setBlogs(data.blog || []);
                        } else if (activeSection === "news") {
                            setNews(data.news || []);
                        }
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
    }, [activeSection, userEmail]);

    const deleteItem = async (itemType, itemUrl) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userEmail}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemType, itemUrl }),
            });

            const result = await response.json();
            if (response.ok) {
                switch (itemType) {
                    case "image":
                        setGallery((prev) => prev.filter(item => item.image !== itemUrl));
                        break;
                    case "video":
                        setVideo((prev) => prev.filter(item => item.video !== itemUrl));
                        break;
                    case "blog":
                        setBlogs((prev) => prev.filter(item => item.image !== itemUrl));
                        break;
                    case "news":
                        setNews((prev) => prev.filter(item => item.image !== itemUrl));
                        break;
                    default:
                        break;
                }
                console.log(`${itemType} deleted successfully:`, result);
            } else {
                throw new Error(`Error deleting ${itemType}: ${result.message}`);
            }
        } catch (error) {
            console.error(`Error deleting ${itemType}:`, error);
            setError(`Failed to delete ${itemType}. Please try again.`);
        }
    };

    const handleDelete = async (itemType, itemURL, itemTitle) => {
        await deleteItem(itemType, itemURL, itemTitle);
        const deletedItem = {
            [itemType]: itemURL,
            title: itemTitle,
            deletedAt: new Date().toISOString(),
        };
        try {
            const response = await fetch(`http://localhost:8000/users/${userEmail}/store-deleted-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemType, item: deletedItem }),
            });
            if (!response.ok) {
                throw new Error('Error storing deleted item');
            }
        } catch (error) {
            console.error('Error storing deleted item:', error);
            setError('Error tracking deleted item. Please try again.');
        }
    };
    return (
        <div className="flex flex-col md:flex-row">
            <DashboardLeft paddingBottom="16.5rem" />
            <div className="center ml-8 mt-4 w-[90%] md:w-[90%]">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-[rgb(27,66,124)] text-[48px] font-[700]">My Projects</h2>
                    </div>
                    {/* <div className="bg-[rgb(27,66,124)] w-[26rem] h-[2.5rem] mt-4 rounded-full border-2 border-[rgb(125,225,248)] mr-4">
                        <div className="flex justify-end">
                            <IoIosSearch className="text-white text-2xl mr-3 my-1 font-[100]" />
                        </div>
                    </div> */}
                </div>
                {/* Section buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-8 mt-16 md:mx-32">
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'image' ? 'bg-[rgb(17,72,153)] text-white' : 'border-2 border-[rgb(17,72,153)] text-[rgb(17,72,153)]'}`}
                        onClick={() => handleSectionChange('image')}
                    >
                        Image
                    </div>
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'video' ? 'bg-[rgb(128,234,227)] text-white' : 'border-2 border-[rgb(128,234,227)] text-[rgb(128,234,227)]'}`}
                        onClick={() => handleSectionChange('video')}
                    >
                        Video
                    </div>
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'blog' ? 'bg-[rgb(102,145,214)] text-white' : 'border-2 border-[rgb(102,145,214)] text-[rgb(102,145,214)]'}`}
                        onClick={() => handleSectionChange('blog')}
                    >
                        Blog
                    </div>
                    <div
                        className={`w-[10rem] h-[2rem] text-xl font-bold rounded-lg px-2 cursor-pointer ${activeSection === 'news' ? 'bg-[rgb(17,72,153)] text-white' : 'border-2 border-[rgb(17,72,153)] text-[rgb(17,72,153)]'}`}
                        onClick={() => handleSectionChange('news')}
                    >
                        News
                    </div>
                </div>
                <div className="w-full mt-12 ">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {activeSection === 'image' && gallery.length > 0 && (
                                <div className="mb-8 grid grid-cols-4 gap-12">
                                    {gallery.map((image, index) => (
                                        <div key={index}>
                                            <img src={image.image} alt="gallery" className="w-[48rem] h-[20rem]" />
                                            <h3 className="text-xl font-bold">{image.title}</h3>
                                            <div className="flex justify-center mt-6">
                                                <button className="border-2 border-[rgb(122,173,255)] px-6 rounded-lg text-xl text-[rgb(122,173,255)] py-1" onClick={() => handleDelete('image', image.image, image.title)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeSection === 'video' && video.length > 0 && (
                                <div className="mb-8 grid grid-cols-4 gap-12">
                                    {video.map((vid, index) => (
                                        <div key={index}>
                                            <video controls src={vid.video} className="w-[48rem] h-[20rem]"></video>
                                            <h3 className="text-xl font-bold">{vid.title}</h3>
                                            <div className="flex justify-center mt-6">
                                                <button className="border-2 border-[rgb(122,173,255)] px-6 rounded-lg text-xl text-[rgb(122,173,255)] py-1" onClick={() => handleDelete('video', vid.video, vid.title)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeSection === 'blog' && blogs.length > 0 && (
                                <div className="mb-8 grid grid-cols-4 gap-12">
                                    {blogs.map((blog, index) => (
                                        <div key={index}>
                                            <img src={blog.image} alt="blogs" className="w-[48rem] h-[20rem]" />
                                            <h3 className="text-xl font-bold">{blog.title}</h3>
                                            <div className="flex justify-center mt-6">
                                                <button className="border-2 border-[rgb(122,173,255)] px-6 rounded-lg text-xl text-[rgb(122,173,255)] py-1" onClick={() => handleDelete('blog', blog.image, blog.title)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeSection === 'news' && news.length > 0 && (
                                <div className="mb-8 grid grid-cols-4 gap-12">
                                    {news.map((article, index) => (
                                        <div key={index}>
                                            <img src={article.image} alt="news" className="w-[48rem] h-[20rem]" />
                                            <h3 className="text-xl font-bold">{article.title}</h3>
                                            <div className="flex justify-center mt-6">
                                                <button className="border-2 border-[rgb(122,173,255)] px-6 rounded-lg text-xl text-[rgb(122,173,255)] py-1" onClick={() => handleDelete('news', article.image, article.title)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {error && <p className="text-red-500">{error}</p>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProject;
