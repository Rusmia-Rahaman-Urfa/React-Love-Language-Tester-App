import React, { memo, useCallback, useMemo, useState } from "react";
const Title = ({ children }) => (
  <h1 className="title-style">
    {children}
  </h1>
);

const Button = ({ onClick, children, isPrimary }) => (
  <button
    onClick={onClick}
    className={`button-base ${isPrimary ? 'button-primary' : 'button-secondary'}`}
  >
    {children}
  </button>
);

// memo (Child Component) - Displays static meesage
const Display = ({ staticMessage }) => {
  console.log("Memo component rendered");
  return (
    <div className="display-box">
      <p className="display-text">
        {staticMessage}
      </p>
    </div>
  );
};

const MemorizedADisplay = memo(Display);
const MemorizedTitle = memo(Title);
const MemorizedButton = memo(Button);

// Love Tester Component (useState, useMemo, useCallback)
function LoveTester() {
  const [actsOfKindness, setActsOfKindness] = useState(0);
  const [currentAct, setCurrentAct] = useState("");
  const [secondaryState, setSecondaryState] = useState(0); 
  
  console.log("Render LoveTester Component");

  // for text input change
  const handleInputChange = useCallback((e) => {
    setCurrentAct(e.target.value);
  }, []);

  // useCallback - Now handles the log act and clearing the input
  const handleLogAct = useCallback(() => {
    if (currentAct.trim() !== "") {
      setActsOfKindness((prev) => prev + 1);
      console.log(`🔥 useCallback: Logged Act of Kindness: "${currentAct}"`);
      setCurrentAct("");
    } else {
      console.log("🚫 Cannot log empty act.");
    }
  }, [currentAct]); 

  // for secondary state
  const handleForceRerender = () => {
    setSecondaryState((prev) => prev + 1);
    console.log("Forced Re-render and Test Memo");
  };

  // 2. useMemo
  const loveBatteryLevel = useMemo(() => {
    console.log("⚡️ useMemo: Recalculating Love Battery Level");
    return Math.min(100, actsOfKindness * 5);
  }, [actsOfKindness]); 

  return (
    <div className="app-container">
      
      <MemorizedTitle>Love Language Tracker</MemorizedTitle>
      
      {/* Kindness Counter (useState) */}
      <div className="kindness-counter-box">
        <p className="text-lg text-gray-500">Acts of Kindness Logged:</p>
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
          {loveBatteryLevel === 100 ? "FULL: Overflowing with kindness! 💕" : "Still charging..."}
        </p>
      </div>

      {/*Input Field for Act of Kindness */}
      <div className="mb-4">
        <input
          type="text"
          value={currentAct}
          onChange={handleInputChange}
          placeholder="What specific act of kindness did your partner do?"
          className="input-field"
        />
      </div>

      {/* Display (memo) */}
      <MemorizedADisplay staticMessage= "The truest form of love is how you behave toward someone, not how you feel about them. - Steve Hall "/>

      <div className="space-y-3 mt-6">
          
        {/* Button using useCallback */}
        <MemorizedButton onClick={handleLogAct} isPrimary={true}>
          Add Kindness of your partner...
        </MemorizedButton>
        
        {/* Secondary Button to test memo */}
        <Button onClick={handleForceRerender} isPrimary={false}>
          Secondary Button to Test Memo
        </Button>
      </div>
    </div>
  );
}

export default LoveTester;
