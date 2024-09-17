import React from "react";

const Keys = ({ label, keyClass, onClick}) => {
    const equalClass = " bg-[#4ccdc6] text-[#1a261a] font-semibold hover:bg-[#141414] hover:text-[#fff]";
    
    // Determine final class string
    const finalClass = `bg-[#141414] flex justify-center p-4 rounded-[5px] cursor-pointer items-center m-1 hover:bg-black ${keyClass ? equalClass : ''}`;
    
    return (
        <div className={finalClass} onClick={onClick}>
            {label}
        </div>
    );
};

export default Keys;
