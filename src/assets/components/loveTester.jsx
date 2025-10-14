import React, { memo, useCallback, useMemo, useState } from "react";

// NOTE: This file contains all the component logic, state management, and hooks.
// All visual styling is handled by classes defined in index.css.

// ---------------------------------------------------------------------
// Mock Components (Styled via index.css)
// ---------------------------------------------------------------------

const Title = ({ children }) => (
  // Uses the "title-style" class from index.css
  <h1 className="title-style">
    {children}
  </h1>
);

const Button = ({ onClick, children, isPrimary }) => (
  <button
    onClick={onClick}
    // Uses the "button-base" class plus conditional primary/secondary styles from index.css
    className={`button-base ${isPrimary ? 'button-primary' : 'button-secondary'}`}
  >
    {children}
  </button>
);

// ---------------------------------------------------------------------
// 4. memo (Child Component) - Displays static content
// ---------------------------------------------------------------------
const AffirmationDisplay = ({ staticMessage }) => {
  // Console log confirms if memo is working. It should only run on initial load.
  console.log("💖 AffirmationDisplay component RENDERED (memoized)");
  return (
    // Uses "affirmation-box" and "affirmation-text" classes from index.css
    <div className="affirmation-box">
      <p className="affirmation-text">
        {staticMessage}
      </p>
    </div>
  );
};

// Memoized versions to prevent unnecessary re-renders of simple components
const MemorizedAffirmationDisplay = memo(AffirmationDisplay);
const MemorizedTitle = memo(Title);
const MemorizedButton = memo(Button);

// ---------------------------------------------------------------------
// Love Tester Component (Contains the Core Logic: useState, useMemo, useCallback)
// ---------------------------------------------------------------------
function LoveTester() {
  // 1. useState (The core counter)
  const [actsOfKindness, setActsOfKindness] = useState(0);
  // New state to hold the text input for the act of kindness
  const [currentAct, setCurrentAct] = useState("");
  
  // Secondary state (used only to force the component to re-render for memo/useMemo testing)
  const [secondaryState, setSecondaryState] = useState(0); 
  
  console.log("Render LoveTester Component");

  // Handler for text input change
  const handleInputChange = useCallback((e) => {
    setCurrentAct(e.target.value);
  }, []);

  // 3. useCallback (Memoized Function) - Now handles the log act and clearing the input
  const handleLogAct = useCallback(() => {
    if (currentAct.trim() !== "") {
      setActsOfKindness((prev) => prev + 1);
      console.log(`🔥 useCallback: Logged Act of Kindness: "${currentAct}"`);
      // Clear the input field after logging
      setCurrentAct("");
    } else {
      console.log("🚫 Cannot log empty act.");
    }
  }, [currentAct]); // Dependency array includes currentAct so the function uses the latest value

  // Standard handler for secondary state
  const handleForceRerender = () => {
    setSecondaryState((prev) => prev + 1);
    console.log("🔄 Standard Function: Forced Re-render (Check memo effectiveness)");
  };

  // 2. useMemo (Memoized Calculation)
  const loveBatteryLevel = useMemo(() => {
    // Complex Calculation (simulated with log)
    console.log("⚡️ useMemo: Recalculating Love Battery Level");
    // Formula: Every act gives 7 points, capped at 100
    return Math.min(100, actsOfKindness * 7);
  }, [actsOfKindness]); // Only recalculate when actsOfKindness changes

  return (
    // The main container relies on the .app-container class defined in index.css
    <div className="app-container">
      
      <MemorizedTitle>Love Language Tracker</MemorizedTitle>
      
      {/* Kindness Counter (useState) */}
      <div className="kindness-counter-box">
        <p className="text-lg text-gray-500">Acts of Kindness Logged:</p>
        {/* Directly use Tailwind text classes for styling that doesn't belong in CSS file */}
        <p className="text-6xl font-extrabold text-pink-700">{actsOfKindness}</p>
      </div>

      {/* Love Battery Level (useMemo) */}
      <div className="battery-level-box">
        <p className="text-lg font-semibold text-pink-800">
          Love Battery Level
        </p>
        <p className="text-4xl font-bold text-pink-500 mt-2">
          {loveBatteryLevel}%
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {loveBatteryLevel === 100 ? "FULL: Overflowing with affection! 💕" : "Still charging..."}
        </p>
      </div>

      {/* Input Field for Act of Kindness */}
      <div className="mb-4">
        <input
          type="text"
          value={currentAct}
          onChange={handleInputChange}
          placeholder="What specific act of kindness did your partner do?"
          className="input-field"
        />
      </div>

      {/* Affirmation Display (memo) */}
      <MemorizedAffirmationDisplay staticMessage="A relationship is built on consistent, small acts." />

      <div className="space-y-3 mt-6">
          
        {/* Button using useCallback */}
        <MemorizedButton onClick={handleLogAct} isPrimary={true}>
          + Log Kind Act (useCallback)
        </MemorizedButton>
        
        {/* Secondary Button to test memo */}
        <Button onClick={handleForceRerender} isPrimary={false}>
          Force App Re-render (Test Memo)
        </Button>
      </div>
      
      <p className="text-xs text-gray-400 text-center mt-4">
          (Check console to see which components and calculations run.)
      </p>
    </div>
  );
}

export default LoveTester;
