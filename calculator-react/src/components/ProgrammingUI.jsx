import React from "react";
import Keys from "./Keys";

const ProgrammingUI = ({ display, convertedValues, onClick }) => {
  const programmerKeys = [ 
    "AC", "DEL", "A", "B",
    "C", "D", "E", "F",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    ".", "0", "Equals", "+",
  ];

  return (
    <div>
      {/* Display converted values for HEX, DEC, OCT, BIN */}
      <div className="flex justify-around text-white">
        <div>
          <p>HEX</p>
          <p>{convertedValues.hex}</p>
        </div>
        <div>
          <p>DEC</p>
          <p>{convertedValues.dec}</p>
        </div>
        <div>
          <p>OCT</p>
          <p>{convertedValues.oct}</p>
        </div>
        <div>
          <p>BIN</p>
          <p>{convertedValues.bin}</p>
        </div>
      </div>

      {/* Programming-specific keys */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {programmerKeys.map((key, index) => (
          <Keys label={key} key={index} onClick={() => onClick(key)} />
        ))}
      </div>
    </div>
  );
};

export default ProgrammingUI;
