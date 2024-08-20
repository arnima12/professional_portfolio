import React from 'react';
import AllNew from './AllNew';
import Sidebar from '../../Shared/Sidebar/Sidebar';

const AllNews = () => {
    const allNews = [
        {
            id: "1",
            title: "Lorem ipsum dolor sit amet, adipiscing elit",
            year: "2015-08-13",
            img: "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
            des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
        },
        {
            id: "2",
            title: "Lorem ipsum dolor sit amet, adipiscing elit",
            year: "2016-08-13",
            img: "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
            des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
        },
    ]
    const latestNews = allNews.reduce((latest, current) =>
        new Date(latest.year) > new Date(current.year) ? latest : current
    );
    const sortedNews = allNews.sort((a, b) => new Date(b.year) - new Date(a.year));
    return (
        <div className="flex flex-col items-center w-[95%]">
            <div className="flex flex-col items-center w-full mb-8">
                <div className="flex flex-row items-center gap-4 my-8">
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                    <div className="text-[rgb(30,81,153)] text-[64px] font-bold">News</div>
                    <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                </div>
                <AllNew latestNew={latestNews} />
            </div>
            <div className='articleHead mb-12 px-4 py-2 w-[93%] text-left text-white text-xl'>
                Print News Media
            </div>
            <div className="flex flex-col w-[93%] mb-8">
                <div className="grid grid-cols-3 gap-12">
                    {sortedNews.map((news) => (
                        <AllNew key={news.id} allNew={news} />
                    ))}
                </div>
            </div>
            <Sidebar fullHeight="true" />
        </div>
    );
};

export default AllNews;