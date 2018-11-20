import React, { Component } from 'react';
import '../styles/App.css';
import Battlefield from './Battlefield';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id='header'>Pokemon</div>
        <Battlefield />
        <div id='disclosure'>We don't own any rights of this game. This is only for learning purposes.</div>
      </div>
    );
  }
}

export default App;
