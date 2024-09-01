import React, { useState } from "react";
import Keys from "./Keys";
import { evaluate } from "mathjs";
import { FaBars } from "react-icons/fa";

const MODES = {
  NORMAL: "Normal",
  SCIENTIFIC: "Scientific",
  PROGRAMMER: "Programmer",
};

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState(MODES.NORMAL);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (label) => {
    if (label === "AC") {
      setDisplay("");
      setShowResult("");
    } else if (label === "DEL") {
      setDisplay(display.slice(0, -1));
    } else if (label === "Equals") {
      try {
        const result = evaluate(display);
        setShowResult(result);
      } catch (error) {
        setShowResult("Error");
      }
    } else {
      setDisplay(display + label);
      setShowResult(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setMenuOpen(false); // Close the menu after selecting a mode
  };

  const normalKeys = [
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

  const programmerKeys = [
    "AC", "DEL", "AND", "OR", "XOR", "NOT", "Lsh", "Rsh", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+", ".", "0", "Equals",
  ];

  const keys = mode === MODES.SCIENTIFIC ? scientificKeys : mode === MODES.PROGRAMMER ? programmerKeys : normalKeys;

  return (
    <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl relative">
      {/* Top Bar with Menu Icon and Mode Display */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaBars onClick={toggleMenu} className="cursor-pointer text-2xl text-white" />
          <span className="text-white text-lg">{mode}</span> {/* Display the current mode */}
        </div>
        <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
          <div className="text-[25px]">{display}</div>
          <div className={`text-[1.2rem] ${showResult ? 'text-white' : 'text-[rgba(255,255,255,0.5)]'}`}>
            {showResult}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 bg-[#222] p-6 w-full z-10 rounded-lg">
          <ul className="flex flex-col gap-2">
            <li>
              <button onClick={() => changeMode(MODES.NORMAL)} className="p-2 w-full text-left bg-[#4ccdc6] rounded">
                Normal Mode
              </button>
            </li>
            <li>
              <button onClick={() => changeMode(MODES.SCIENTIFIC)} className="p-2 w-full text-left bg-[#4ccdc6] rounded">
                Scientific Mode
              </button>
            </li>
            <li>
              <button onClick={() => changeMode(MODES.PROGRAMMER)} className="p-2 w-full text-left bg-[#4ccdc6] rounded">
                Programmer Mode
              </button>
            </li>
            <li>
              <button onClick={toggleMenu} className="p-2 w-full text-left bg-[#ff4d4d] rounded">
                Close Menu
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Calculator Keys */}
      <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem]">
        {keys.map((item, index) => (
          <Keys label={item} key={index} keyClass={item === 'Equals' ? 'equals' : ''} onClick={() => handleClick(item)} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
