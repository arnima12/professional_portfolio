import React from 'react';

const Institution = ({ institution }) => {
    const { name, year, img, cls, border } = institution;
    return (
        <div className="zoom-in-animation flex flex-col border-[6px] box-border shadow-md w-[16rem] py-4 p-2" style={{ borderColor: border }}>
            <div className="text-start text-xl font-bold">{name}</div>
            <div className="text-start text-2xl font-bold text-[rgb(30,81,153)]">Year {year}</div>
            <div className="flex justify-center">
                <img src={img} alt="logo" className="w-[8rem]" />
            </div>
            <div className="text-[rgb(255,162,91)] text-[20px] font-semibold">{cls}</div>
        </div >
    );
};

export default Institution;