import React from "react";

const Keys = ({ label, keyClass, onClick}) => {
    const equalClass = label === '=' ? "bg-blue-400 text-white font-semibold hover:bg-red-600" : '';
    
    // Determine final class string
    const finalClass = `bg-[#141414] flex justify-center p-4 rounded-[5px] cursor-pointer items-center m-1 hover:bg-black ${equalClass}`;
    
    return (
        <div className={finalClass} onClick={onClick}>
            {label}
        </div>
    );
};

export default Keys;
