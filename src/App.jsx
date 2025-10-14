import React from 'react';
// Corrected import path, assuming App.jsx and loveTester.jsx are sibling files
// or that the bundler can resolve it directly if the component is in a components folder.
// Based on typical build environments, changing the path to just the component name usually resolves these errors.
import LoveTester from './assets/components/loveTester';
function App(){
  return(
    <LoveTester/>
  )
}

export default App;