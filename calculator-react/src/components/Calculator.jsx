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
        setMode(newMode);
        setMenuOpen(false); // Close the menu after selecting a mode
      };

    const keys = mode === Modes.Scientefic ? datesss : mode === Modes.Programming ? programmerKeys : standardkeys;


    const resultClass = "text-[1.2rem]";
    const operationClass = "text-[1.2rem] flex-gap-[5px] item-center text-[rgba(255,255,255,0.5)] justify-end";
    return(
        <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">

            {/* menu bar icon */}
            <FaBars onClick={toggleMenu} className="cursor-pointer text-[15px] text-white" />
            <span className="text-white text-lg">{mode}</span> {/* Display the current mode */}
            
            
            {menuOpen && (
                <div className="absolute top-[70px] left-0 bg-[#222] p-6 w-full z-10 rounded-lg">
                <ul className="flex flex-col gap-2">
                  <li onClick={() => changeMode(Modes.Standard)}>Standard</li>
                  <li onClick={() => changeMode(Modes.Scientefic)}>Scientific</li>
                  <li onClick={() => changeMode(Modes.Programming)}>Programming</li>
                  <li>
                    <button onClick={toggleMenu} className="p-2 w-full text-left bg-[#ff4d4d] rounded">
                      Close Menu
                    </button>
                  </li>
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


