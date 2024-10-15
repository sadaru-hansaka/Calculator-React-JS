import React, { useState } from "react";
import Keys from "./Keys";
import {evaluate} from "mathjs";
import {FaBars} from "react-icons/fa";  //import menu bar icon
import { FaExchangeAlt } from "react-icons/fa";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'; // Import from FontAwesome


// three modes include inside the calculator
const Modes = {
    Standard : "Standard",
    Programming : "Programming",
    Scientefic : "Scientefic",
}

// check the operator(+,-,*,/) and calculate the value
const programmingCal = (value1 , Op, value2) => {
    let proResult;

    switch(Op){
        case "+":
            proResult = value1 + value2;
            break;
        case "-":
            proResult = value1 - value2;
            break;
        case "*":
            proResult = value1*value2;
            break;
        case "/":
            proResult = value2 !== 0 ? Math.floor(value1/value2) : Nan; //check second hex values is 0 or not
            break;
        default:
            setShowResult("Error");
            break;
    }
    // return the value
    return proResult;

}

const Calculator = () =>{

    // keys for standard calculator
    const standardkeys = [
        "AC","DEL","%","/",
        "7","8","9","*",
        "4","5","6","-",
        "1","2","3","+",
        <FaExchangeAlt/> , "0",".","=",
    ];

    // keys for scientefic calculator
    const datesss = [
        "AC", "DEL", "sin", "cos", "tan", "^", "√", "/",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+", 
        <FaExchangeAlt/>,".", "0", "=",
    ]

    // keys for programminf cal
    const programmerKeys = [
        "AC", "DEL", "A", "B", 
        "C", "D", "E", "F", 
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        ".", "0", "=","+",
      ];

    const handleClick = (label) =>{
        // when click "AC" key
        if(label === "AC"){
            setDisplay("");   //set display blanck when click AC
            setShowResult("");
            setConvertedValues({ hex: "0", dec: "0", oct: "0", bin: "0" });
            sethistoryDisplay("")
        }else if (label === "DEL"){   //delete key
            setDisplay(display.slice(0, -1));  //delete items one by one from the right side corner when click DEL
        }else if(label === "="){
            // Calculate hex, decimal, octal, binary values
            try {
                if (mode === Modes.Programming) {                   //check the calculator mode
                    if(inputFormat === 'hex'){
                        const operatorPatterns = /([+\-*/])/;
                        const operands = display.split(operatorPatterns).map(op => op.trim());
                        
                        if (operands.length === 3) {
                            // Convert each operand from hexadecimal to decimal
                            const hex1 = parseInt(operands[0], 16);
                            const Op = operands[1];  //get the operator
                            const hex2 = parseInt(operands[2], 16);
                            
                            // Check if both conversions were successful
                            if (!isNaN(hex1) && !isNaN(hex2)) {
                                
                                // call the function
                                const hexResult = programmingCal(hex1 , Op, hex2)
                                
                                setShowResult(hexResult.toString(16).toUpperCase());  // Display the result in hex
                                updateConvertedValues(hexResult.toString(16).toUpperCase());  // Update converted values
                            } else {
                                setShowResult("Error");  // invalid input
                            }
                        } else {
                            // If a single value is entered
                            const hexSingle = parseInt(display, 16);
                            if (!isNaN(hexSingle)) {
                                setShowResult(hexSingle);
                                updateConvertedValues(hexSingle.toString(16).toUpperCase());
                            } else {
                                setShowResult("Error");
                            }
                        }
                    }else if(inputFormat === "oct"){
                        const operatorPatterns = /([+\-*/])/;
                        const operands = display.split(operatorPatterns).map(op => op.trim());
                        
                        if (operands.length === 3) {
                            // Convert each operand from hexadecimal to decimal
                            const oct1 = parseInt(operands[0], 8);
                            const Op = operands[1];  //get the operator
                            const oct2 = parseInt(operands[2], 8);
                            
                            // Check if both conversions were successful
                            if (!isNaN(oct1) && !isNaN(oct2)) {
                                
                                const octResult = programmingCal(oct1 , Op, oct2)
                                
                                setShowResult(octResult.toString(8).toUpperCase());  // Display the result in hex
                                updateConvertedValues(octResult.toString(8).toUpperCase());  // Update converted values
                            } else {
                                setShowResult("Error");  // invalid input
                            }
                        } else {
                            // If a single value is entered
                            const octSingle = parseInt(display, 8);
                            if (!isNaN(octSingle)) {
                                setShowResult(octSingle);
                                updateConvertedValues(octSingle.toString(8).toUpperCase());
                            } else {
                                setShowResult("Error");
                            }
                        }

                    }else if(inputFormat === "bin"){
                        const operatorPatterns = /([+\-*/])/;
                        const operands = display.split(operatorPatterns).map(op => op.trim());
                        
                        if (operands.length === 3) {
                            // Convert each operand from hexadecimal to decimal
                            const bin1 = parseInt(operands[0], 2);
                            const Op = operands[1];  //get the operator
                            const bin2 = parseInt(operands[2], 2);
                            
                            // Check if both conversions were successful
                            if (!isNaN(bin1) && !isNaN(bin2)) {
                                
                                const binResult = programmingCal(bin1 , Op, bin2)
                                
                                setShowResult(binResult.toString(2).toUpperCase());  // Display the result in hex
                                updateConvertedValues(binResult.toString(2).toUpperCase());  // Update converted values
                            } else {
                                setShowResult("Error");  // invalid input
                            }
                        } else {
                            // If a single value is entered
                            const binSingle = parseInt(display, 2);
                            if (!isNaN(binSingle)) {
                                setShowResult(binSingle);
                                updateConvertedValues(binSingle.toString(2).toUpperCase());
                            } else {
                                setShowResult("Error");
                            }
                        }
                    }
                    // decimal calculations
                    else{
                        const result = evaluate(display);
                        setShowResult(result);
                        updateConvertedValues(result);

                    }
                } else {
                    // Evaluate the expression using math.js 
                    const result = evaluate(display);
                    setShowResult(result);
                    updateConvertedValues(result);

                    // set history
                    const updatedHistory = [...history, `${display} = ${result}`];
                    setHistory(updatedHistory);

                }
            } catch (error) {
                console.error(error);  // Log the error for debugging
                setShowResult("Error");
            }
        } else if (["sin", "cos", "tan", "√", "^"].includes(label)) {
            let modifiedDisplay;
            if (label === "√") {
                modifiedDisplay = `sqrt(${display})`;  // display √ with math.js sqrt()
            } else if (label === "^") {
                modifiedDisplay = `${display}^`;  // power operator
            } else {
                modifiedDisplay = `${label}(${display})`;  // trigonometric functions
            }
            setDisplay(modifiedDisplay);  // Update display with the function

        // change icon operation
        }else if (React.isValidElement(label) && label.type === FaExchangeAlt){
            if (mode === Modes.Standard){  //change the mode when click change key in standard and scientefic cal
                setMode(Modes.Scientefic);
                setDisplay("");
                setShowResult("");
                sethistoryDisplay("");
            }else if (mode === Modes.Scientefic){
                setMode(Modes.Standard);
                setDisplay("");
                setShowResult("");
                sethistoryDisplay("");
            }
            // --------------------------
        }else{
            // display clicked numbers and operators
            setDisplay(display + label);
            setShowResult(false);
            sethistoryDisplay("");

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
            // validate input(only 0 or 1)
            if (/^[01]+$/.test(value)) {
                convert_Value = parseInt(value, 2);  // Convert from binary
            } else {
                convert_Value = NaN;  // Invalid input for binary
            }
            break;
        case 'oct':
            // validate input (0-7)
            if (/^[0-7]+$/.test(value)) {
                convert_Value = parseInt(value, 8);  // Convert from octal
            } else {
                convert_Value = NaN;  // Invalid input for octal
            }
            break;
        case 'hex':
            // validate input (0-9, A-F)
            if (/^[0-9A-Fa-f]+$/.test(value)) {
                convert_Value = parseInt(value, 16);  // Convert from hexadecimal
            } else {
                convert_Value = NaN;  // Invalid input for hexadecimal
            }
            break;
        default:
            // validate input (digits 0-9)
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

    const displayValue = display;

    // State for managing the scientific mode and menu visibility
    const [mode, setMode] = useState(Modes.Standard)
    const [menuOpen, setMenuOpen] = useState(false); 

    // history state
    const [history, setHistory] = useState([]);
 

    const [histortDisplay, sethistoryDisplay] = useState("");

    const displayHistory = () => {
        // last three items from the history array
        const lastThreeHistory = history.slice(-3);
        // display on three lines
        const historyString = lastThreeHistory.join("\n");
        sethistoryDisplay(historyString);
        setDisplay("History"); 
        setShowResult("");
    };
    
    

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
        sethistoryDisplay("");
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

            {/* history icon displays only for standard and scientefic calculators only*/}
            {(mode === Modes.Standard || mode === Modes.Scientefic) && (
                <div onClick={displayHistory} className="ml-auto flex items-end text-[20px] mr-2 cursor-pointer">
                    <FontAwesomeIcon icon={faClockRotateLeft} style={{color: "#ffff"}} />
                </div>
            )}
        </div>
        
            
            {menuOpen && (
                
                <div className="absolute items-start bg-[#222] p-6 w-[316px] rounded-2xl m-0">
                    {/* display all the modes as a list */}
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
                {/* display typing values | use <pre> to preserve formattings */}
                <div className="text-[25px]">{display}</div> 

                <pre className="text-[20px] text-slate-400">{histortDisplay}</pre> 
                <div className={showResult ? resultClass : operationClass} >{showResult}</div>

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


