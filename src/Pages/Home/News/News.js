import React from 'react';
import New from './New';

const News = () => {
    const news = [
        {
            "id": "1",
            "title": "Lorem ipsum dolor sit amet, adipiscing elit",
            "img": "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
            "des": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
        },
        {
            "id": "2",
            "title": "Lorem ipsum dolor sit amet, adipiscing elit",
            "img": "https://i.ibb.co/ZhQrCsy/shutterstock-1862662789-min-scaled.jpg",
            "des": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu convallis metus, in euismod diam. Praesent condimentum rhoncus purus, ut pretium lacus rhoncus sed. Aliquam placerat aliquam auctor. Integer feugiat porta risus, id tincidunt ante interdum quis. Nullam faucibus ex nec turpis ornare, sit amet faucibus augue condimentum. Aliquam erat volutpat."
        },
    ]
    return (
        <div className="px-8 my-10">
            <div className="flex flex-row items-center gap-4">
                <div className="bg-[rgb(42,193,235)] w-[3rem] h-[0.5rem]"></div>
                <div className="text-[rgb(30,81,153)] text-[64px] font-bold">News</div>
            </div>
            <p className="text-left text-black font-[600] text-[24px] mb-10">The news and articles written on the internet.</p>
            <div className="flex justify-evenly">
                {news.map((info) => <New key={info.id} info={info}></New>)}
            </div>
        </div>
    );
};

export default News;