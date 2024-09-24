import React, { useState } from "react";
import Keys from "./Keys";
import {evaluate} from "mathjs";
import {FaBars} from "react-icons/fa";  //import menu bar icon
import { FaExchangeAlt } from "react-icons/fa";

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
        "1","2","3","+",
        <FaExchangeAlt/> , "0",".","=",
    ];

    const datesss = [
        "AC", "DEL", "sin", "cos", "tan", "^", "√", "/",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+", 
        <FaExchangeAlt/>,".", "0", "=",
    ]

    const programmerKeys = [
        "AC", "DEL", "A", "B", 
        "C", "D", "E", "F", 
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        ".", "0", "=","+",
      ];

    const handleClick = (label) =>{

        if(label === "AC"){
            setDisplay("");   //set display blanck when click AC
            setShowResult("");
            setConvertedValues({ hex: "0", dec: "0", oct: "0", bin: "0" });
        }else if (label === "DEL"){
            setDisplay(display.slice(0, -1));  //delete items one by one from the right side corner when click DEL
        }else if(label === "="){
            try {

                // Evaluate the expression using math.js
                const result = evaluate(display);
                setShowResult(result);

                if (mode == Modes.Programming){
                  updateConvertedValues(result);
                };

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

        // change icon operation
        }else if (React.isValidElement(label) && label.type === FaExchangeAlt){
            console.log("Changed"); //this should develop to change the mode
        }else{
            // display clicked numbers and operators
            setDisplay(display + label);
            setShowResult(false);

            if (mode === Modes.Programming){
              updateConvertedValues(display+label);
            };
        }
    }

    // data convertors
    const updateConvertedValues = (value) => {
      let convert_Value;
    
      // Validate and convert based on input format
    switch (inputFormat) {
      case 'bin':
          // Ensure the input is valid binary (only 0 or 1)
          if (/^[01]+$/.test(value)) {
              convert_Value = parseInt(value, 2);  // Convert from binary
          } else {
              convert_Value = NaN;  // Invalid input for binary
          }
          break;
      case 'oct':
          // Ensure the input is valid octal (0-7)
          if (/^[0-7]+$/.test(value)) {
              convert_Value = parseInt(value, 8);  // Convert from octal
          } else {
              convert_Value = NaN;  // Invalid input for octal
          }
          break;
      case 'hex':
          // Ensure the input is valid hexadecimal (0-9, A-F)
          if (/^[0-9A-Fa-f]+$/.test(value)) {
              convert_Value = parseInt(value, 16);  // Convert from hexadecimal
          } else {
              convert_Value = NaN;  // Invalid input for hexadecimal
          }
          break;
      default:
          // Assume decimal input (digits 0-9)
          if (/^\d+$/.test(value)) {
              convert_Value = parseInt(value, 10);  // Convert from decimal
          } else {
              convert_Value = NaN;  // Invalid input for decimal
          }
  }
    
      if (!isNaN(convert_Value)) {
        // Convert to different bases
        setConvertedValues({
          hex: convert_Value.toString(16).toUpperCase(),
          dec: convert_Value.toString(10),
          oct: convert_Value.toString(8),
          bin: convert_Value.toString(2),
        });
      } else {
        // If invalid, reset values
        setConvertedValues({
          hex: "Invalid",
          dec: "Invalid",
          oct: "Invalid",
          bin: "Invalid",
        });
      }
    };
    
    // --------------------------------------------------------------

    const [showResult, setShowResult] = useState(false);
    const [display , setDisplay] = useState("");

    // State for managing the scientific mode and menu visibility
    const [mode, setMode] = useState(Modes.Standard)
    const [menuOpen, setMenuOpen] = useState(false); 

      // Programming calculator data converters
    const [convertedValues, setConvertedValues] = useState({
      hex: "0",
      dec: "0",
      oct: "0",
      bin: "0",
    }); // Converted values for programming mode

    const [inputFormat, setInputFormat] = useState('dec');  // Track input format


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

    const handleFormatChange = (format) => {
        setInputFormat(format);
        setDisplay("");  // Reset display on format change
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

                 {/* Conditionally render converted values in programming mode */}
                {mode === Modes.Programming && (
                  <ul className="self-start mt-2">
                    <li className={`cursor-pointer ${inputFormat === 'hex' && 'text-blue-400'}`} onClick={() => handleFormatChange('hex')}>Hex : {convertedValues.hex}</li>
                    <li className={`cursor-pointer ${inputFormat === 'dec' && 'text-blue-400'}`} onClick={() => handleFormatChange('dec')}>DEC : {convertedValues.dec}</li>
                    <li className={`cursor-pointer ${inputFormat === 'oct' && 'text-blue-400'}`} onClick={() => handleFormatChange('oct')}>OCT : {convertedValues.oct}</li>
                    <li className={`cursor-pointer ${inputFormat === 'bin' && 'text-blue-400'}`} onClick={() => handleFormatChange('bin')}>BIN : {convertedValues.bin}</li>
                  </ul>
                )}
            </div>

            {/* key section */}
            <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3 rem]">
                {keys.map((item, index)=>(
                    <Keys label={item} key={index} keyClass ={item === '='} onClick = {() => handleClick(item)}/>
                ))}
            </div>
        </div>
    )
}

export default Calculator;


