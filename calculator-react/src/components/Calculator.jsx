import React, { useState } from "react";
import Keys from "./Keys";
import {evaluate} from "mathjs";

const Calculator = () =>{

    const keys = [
        "AC","DEL","%","/",
        "7","8","9","*",
        "4","5","6","-",
        "1","2","3","+",".","0","Equals",
    ];

    const handleClick = (label) =>{
        if(label === "AC"){
            setDisplay("");   //set display blanck when click AC
            setShowResult("");
        }else if (label === "DEL"){
            setDisplay(display.slice(0, -1));  //delete items one by one from the right side corner when click DEL
        }else if(label === "Equals"){
            try {
                // Replace some custom symbols with math.js compatible symbols
                // let processedExpression = display
                //     .replace(/√/g, "sqrt")
                //     .replace(/\^/g, "^");

                // Evaluate the expression using math.js
                const result = evaluate(display);
                setShowResult(result);
            } catch (error) {
                setShowResult("Error");
            }
        }
        else{
            setDisplay(display + label);
            setShowResult(false);
        }
    }

    const [showResult, setShowResult] = useState(false);
    const [display , setDisplay] = useState("");

    const resultClass = "text-[1.2rem]";
    const operationClass = "text-[1.2rem] flex-gap-[5px] item-center text-[rgba(255,255,255,0.5)] justify-end";
    return(
        <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
            <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
                <div className="text-[25px]">{display}</div>
                <div className={'${showResult ? resultClass : operationClass} '}>{showResult}</div>
            </div>
            <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3 rem]">
                {keys.map((item, index)=>(
                    <Keys label={item} key={index} keyClass ={item === 'Equals' && 'equals'} onClick = {() => handleClick(item)}/>
                ))}
            </div>
        </div>
    )
}

export default Calculator;