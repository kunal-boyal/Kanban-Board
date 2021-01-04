import React, { Component } from 'react'
import Board from './container/Board'
import Navbar from './component/Navbar/Navbar'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Board />
      </div>
    );
  }
}

export default App;
