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

const Calculator = () => {
  const standardKeys = [
    "AC", "DEL", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+", ".", "0", "Equals",
  ];

  const scientificKeys = [
    "AC", "DEL", "sin", "cos", "tan", "^", "√", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+", ".", "0", "Equals",
  ];

  const [showResult, setShowResult] = useState(false);
  const [display, setDisplay] = useState("");
  const [mode, setMode] = useState(Modes.Standard); // mode state
  const [menuOpen, setMenuOpen] = useState(false); // menu state
  const [convertedValues, setConvertedValues] = useState({
    hex: "0",
    dec: "0",
    oct: "0",
    bin: "0",
  }); // converted values for programming mode

  const toggleMenu = () => setMenuOpen(!menuOpen); // open/close menu

  const changeMode = (newMode) => {
    setDisplay(""); // clear display when mode changes
    setShowResult(false);
    setMode(newMode);
    setMenuOpen(false); // close the menu after selecting a mode
  };

  const handleClick = (label) => {
    if (label === "AC") {
      setDisplay(""); // clear display
      setShowResult("");
    } else if (label === "DEL") {
      setDisplay(display.slice(0, -1)); // delete last character
    } else if (label === "Equals") {
      try {
        const result = evaluate(display); // evaluate expression
        setShowResult(result);
      } catch (error) {
        setShowResult("Error");
      }
    } else if (["sin", "cos", "tan", "√", "^"].includes(label)) {
      let modifiedDisplay;
      if (label === "√") {
        modifiedDisplay = `sqrt(${display})`; // handle sqrt
      } else if (label === "^") {
        modifiedDisplay = `${display}^`; // handle power
      } else {
        modifiedDisplay = `${label}(${display})`; // handle trigonometry
      }
      setDisplay(modifiedDisplay); // update display
    } else {
      setDisplay(display + label); // append label to display
      setShowResult(false);
    }
  };

  const keys = mode === Modes.Scientific ? scientificKeys : standardKeys; // keys for current mode

  return (
    <div className="w-[350px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
      {/* Menu bar with mode selection */}
      <div className="flex items-center text-white">
        <FaBars onClick={toggleMenu} className="mr-5 mt-1 cursor-pointer" />
        <p className="m-0 text-[20px]">{mode}</p>
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

      {/* Display Section */}
      <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
        <div className="text-[25px]">{display}</div>
        <div className={'${showResult ? "text-[1.2rem]" : "text-[rgba(255,255,255,0.5)]"}'}>{showResult}</div>
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
