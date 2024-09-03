import React, { useState } from "react";
import Keys from "./Keys";
import {evaluate} from "mathjs";
import {FaBars} from "react-icons/fa";  //import menu bar icon

const Modes = {
    Standard : "Standard",
    Programming : "Programming",
    Scientefic : "Scientefic",
}

const Calculator = () =>{

    

    const standardkeys = [
        "AC","DEL","%","/",
        "7","8","9","*",
        "4","5","6","-",
        "1","2","3","+",".","0","Equals",
    ];

    const datesss = [
        "AC", "DEL", "sin", "cos", "tan", "^", "√", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+", ".", "0", "Equals",
    ]

    const programmerKeys = [
        "AC", "DEL", "AND", "OR", "XOR", "NOT", "Lsh", "Rsh", "/",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+", ".", "0", "Equals",
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
            // display clicked numbers and operators
            setDisplay(display + label);
            setShowResult(false);
        }
    }

    const [showResult, setShowResult] = useState(false);
    const [display , setDisplay] = useState("");

    // State for managing the scientific mode and menu visibility
    const [mode, setMode] = useState(Modes.Standard)
    const [menuOpen, setMenuOpen] = useState(false); 

    //open menu
    const toggleMenu = () =>{
        setMenuOpen(!menuOpen)
    };

    //change to next mode
    const changeMode = (newMode) => {
        setShowResult("");
        setDisplay("");
        setMode(newMode);
        setMenuOpen(false); // Close the menu after selecting a mode
      };

    const keys = mode === Modes.Scientefic ? datesss : mode === Modes.Programming ? programmerKeys : standardkeys;


    const resultClass = "text-[1.2rem]";
    const operationClass = "text-[1.2rem] flex-gap-[5px] item-center text-[rgba(255,255,255,0.5)] justify-end";
    return(
        <div className="w-[350px] bg-black flex flex-col gap-4 p-4 rounded-2xl">

        <div className="flex items-center  text-[15px] text-white p-0 m-0">
            {/* menu bar icon */}
            <FaBars onClick={toggleMenu} className="mr-5 mt-1 cursor-pointer"/> 
            <p className="m-0 text-[20px]">{mode}</p> {/* Display the current mode */}
        </div>

            
            {menuOpen && (
                <div className="absolute items-start bg-[#222] p-6 w-[316px] rounded-2xl m-0">
                <ul className="flex flex-col gap-2">
                 <li onClick={toggleMenu} className="text-red-600 cursor-pointer flex justify-end p-0 m-0">x</li>
                  <li className="cursor-pointer hover:text-blue-400" onClick={() => changeMode(Modes.Standard)}>Standard</li>
                  <li className="cursor-pointer hover:text-blue-400" onClick={() => changeMode(Modes.Scientefic)}>Scientific</li>
                  <li className="cursor-pointer hover:text-blue-400" onClick={() => changeMode(Modes.Programming)}>Programming</li>
                </ul>
              </div>
            )}

            {/* Answer and Calculation section */}
            <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
                <div className="text-[25px]">{display}</div>
                <div className={'${showResult ? resultClass : operationClass} '}>{showResult}</div>
            </div>

            {/* key section */}
            <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3 rem]">
                {keys.map((item, index)=>(
                    <Keys label={item} key={index} keyClass ={item === 'Equals' && 'equals'} onClick = {() => handleClick(item)}/>
                ))}
            </div>
        </div>
    )
}

export default Calculator;


