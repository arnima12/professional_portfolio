import React from 'react';

const Institution = ({ institution }) => {
    const { school, startYear, degree, logo } = institution;
    return (
        <div className="zoom-in-animation flex flex-col border-[3px] border-solid box-border shadow-md w-[16rem] py-4 p-2">
            <div className="text-start text-xl font-bold border-0">{school}</div>
            <div className="text-start text-2xl font-bold text-[rgb(30,81,153)]">Year {startYear}</div>
            <div className="flex justify-center">
                <img src={logo} alt="logo" className="w-[8rem]" />
            </div>
            <div className="text-[rgb(255,162,91)] text-[20px] font-semibold">{degree}</div>
        </div >
    );
};

export default Institution;