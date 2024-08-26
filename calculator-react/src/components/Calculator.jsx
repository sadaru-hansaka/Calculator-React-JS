import React, { useState } from "react";
import Keys from "./Keys"

const Calculator = () =>{

    const keys = [
        "AC","DEL","%","/",
        "7","8","9","*",
        "4","5","6","-",
        "1","2","3","+","-","0","Equals",
    ];

    const [showResult, setShowResult] = useState(false);

    const resultClass = ""

    return(
        <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
            <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
                <div className={'${showResult ? :}'}>RESULT</div>
            </div>
            <div>
                {keys.map((item, index)=>(
                    <Keys label={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Calculator;