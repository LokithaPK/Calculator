import React, { useState } from 'react';
import './App.css'; // Import the CSS file for additional styles
import { evaluate } from 'mathjs'; // Import mathjs for safe evaluation

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      // Clear entire display
      setDisplay('');
      setIsResultDisplayed(false);
    } else if (value === 'DEL') {
      // Erase the last digit
      setDisplay(display.slice(0, -1));
    } else if (value === '=') {
      // Calculate the result and display it
      try {
        const result = evaluate(display); // Use mathjs evaluate function
        setDisplay(result.toString());
        setIsResultDisplayed(true);
      } catch {
        setDisplay('Error');
        setIsResultDisplayed(true);
      }
    } else {
      if (isResultDisplayed) {
        // If the result is already displayed and a number is entered, start a new calculation
        if (!isNaN(value)) {
          setDisplay(value); // Replace the display if the new input is a number
        } else {
          setDisplay(display + value); // Append the operator to continue calculations
        }
        setIsResultDisplayed(false);
      } else {
        // Append new numbers or operators to the display
        setDisplay(display + value);
      }
    }
  };

  return (
    <div className="calculator-container">
      <div className="display">{display || '0'}</div>
      <div className="button-grid">
        {['7', '8', '9', '/'].map((item) => (
          <button key={item} className="button" onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {['4', '5', '6', '*'].map((item) => (
          <button key={item} className="button" onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {['1', '2', '3', '-'].map((item) => (
          <button key={item} className="button" onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {['0', '.', '=', '+'].map((item) => (
          <button key={item} className="button" onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        <button className="button del-btn" onClick={() => handleButtonClick('DEL')}>
          DEL
        </button>
        <button className="button clear-btn" onClick={() => handleButtonClick('C')}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
