import React from 'react';
import New from './New';
import './News.css'
const News = () => {
    const news = [
        {
            "id": "1",
            "title": "Lorem ipsum dolor sit amet, adipiscing elit",
            "year": "2015-08-13",
            "img": "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
            "des": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
        },
        {
            "id": "2",
            "title": "Lorem ipsum dolor sit amet, adipiscing elit",
            "year": "2016-08-13",
            "img": "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
            "des": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
        },
    ]
    return (
        <div className="px-8 mt-16 mb-8 news-section">
            <div className="flex flex-row items-center gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[50px] md:text-[64px] font-bold">News</div>
            </div>
            <p className="text-left text-black font-[600] text-[24px] mb-10">The news and articles written on the internet.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                {news.map((info) => <New key={info.id} info={info}></New>)}
            </div>
        </div>
    );
};

export default News;