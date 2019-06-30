import React from 'react';
import logo from './logo.svg';
import './App.css';

import QueryForm from './components/QueryComponent'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="nav_icon">Weather!</div>
        <QueryForm/>
      </header>
    </div>
  );
}

export default App;
