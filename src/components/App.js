import React, { Component } from 'react';
import '../styles/App.css';
import OpeningPage from './OpeningPage';
import Battlefield from './Battlefield';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <Switch>
            <Route path='/' exact component={OpeningPage} />
            <Route path='/battle' component={Battlefield} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
