import React, { createContext, useState, useContext } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <DropdownContext.Provider value={{ isDropdownOpen, toggleDropdown }}>
            {children}
        </DropdownContext.Provider>
    );
};

export const useDropdown = () => useContext(DropdownContext);
