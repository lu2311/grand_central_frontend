import React, { useEffect } from 'react';
import WOW from 'wowjs';
import Contact from './pages/Contact';
import './App.css';



function App() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="App">
      <Contact />
    </div>
  );
}

export default App;


