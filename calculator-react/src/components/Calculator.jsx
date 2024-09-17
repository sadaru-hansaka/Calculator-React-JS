import React, { useState } from "react";
import Keys from "./Keys";
import { evaluate } from "mathjs";
import { FaBars } from "react-icons/fa";
import ProgrammingUI from "./ProgrammingUI"; // Import ProgrammingUI

const Modes = {
  Standard: "Standard",
  Programming: "Programming",
  Scientific: "Scientific",
};

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

                // Evaluate the expression using math.js
                const result = evaluate(display);
                setShowResult(result);
            } catch (error) {
                setShowResult("Error");
            }
        } else if (["sin", "cos", "tan", "√", "^"].includes(label)) {
            let modifiedDisplay;
            if (label === "√") {
                modifiedDisplay = `sqrt(${display})`;  // Replace √ with math.js sqrt()
            } else if (label === "^") {
                modifiedDisplay = `${display}^`;  // Handle power operator
            } else {
                modifiedDisplay = `${label}(${display})`;  // Handle trigonometric functions
            }
            setDisplay(modifiedDisplay);  // Update display with the function
        }else{
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

      {/* Conditional Menu */}
      {menuOpen && (
        <div className="absolute bg-[#222] p-6 w-[316px] rounded-2xl">
          <ul className="flex flex-col gap-2">
            <li onClick={toggleMenu} className="text-red-600 cursor-pointer flex justify-end">x</li>
            <li className="cursor-pointer hover:text-blue-400" onClick={() => changeMode(Modes.Standard)}>Standard</li>
            <li className="cursor-pointer hover:text-blue-400" onClick={() => changeMode(Modes.Scientific)}>Scientific</li>
            <li className="cursor-pointer hover:text-blue-400" onClick={() => changeMode(Modes.Programming)}>Programming</li>
          </ul>
        </div>
      )}

            {/* Answer and Calculation section */}
            <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
                <div className="text-[25px]">{display}</div>
                <div className={'${showResult ? resultClass : operationClass} '}>{showResult}</div>
            </div>

      {/* Render different UIs based on the current mode */}
      {mode === Modes.Programming ? (
        <ProgrammingUI display={display} convertedValues={convertedValues} onClick={handleClick} />
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {keys.map((item, index) => (
            <Keys label={item} key={index} onClick={() => handleClick(item)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculator;
