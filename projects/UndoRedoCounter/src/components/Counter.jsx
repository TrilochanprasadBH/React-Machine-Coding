import React, { useState } from "react";
import Button from "./Button";

const Counter = () => {
  const [history, setHistory] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentValue = history[currentIndex];
  console.log(history, "history");
  console.log(currentIndex, "currentIndex");
  console.log(currentValue, "currentValue");

  // const updateHistory0 = (newValue) => {
  //   const newHistory = history.slice(0, currentIndex + 1);
  //   const updatedHistory = [...newHistory, newValue];
  //   //why slice? to remove any "future" states if we are not at the end of the history
  //   // For example, if we have history [0, 1, 2] and currentIndex is 1 (value 1),
  //   // and we add a new value 3, we want to remove 2 from the history.
  //   setHistory(updatedHistory);
  //   setCurrentIndex(updatedHistory.length - 1);
  // };

  //even better reactt recommended way
  const updateHistory = (newValue) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      const updatedHistory = [...newHistory, newValue];
      setCurrentIndex(updatedHistory.length - 1); //works fine
      return updatedHistory;
    });
  };

  const handleIncrease = () => {
    updateHistory(currentValue + 1);
  };
  const handleDecrease = () => {
    updateHistory(currentValue - 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Counter Value : {currentValue}</h2>
      <div className="flex justify-center gap-3">
        <Button
          onClick={handleIncrease}
          className="bg-green-400 p-2 rounded-md"
        >
          Increase
        </Button>
        <Button onClick={handleDecrease} className="bg-red-400 p-2 rounded-md">
          Decrease
        </Button>
      </div>
      <div className="flex justify-center gap-3">
        <Button onClick={handleUndo} className="bg-green-400 p-2 rounded-md">
          Undo
        </Button>
        <Button onClick={handleRedo} className="bg-red-400 p-2 rounded-md">
          Redo
        </Button>
      </div>
      <div className="History">
        <h3>History:</h3>
        <ul>
          {history.map((value, index) => (
            <li
              key={index}
              style={{
                fontWeight: index === currentIndex ? "bold" : "normal",
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Counter;
