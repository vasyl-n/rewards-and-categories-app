import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { RewardsAndCategories } from './components/RewardsAndCategories'

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="App-header">
            <h2>Rewards and Categories</h2>
          </div>
            <RewardsAndCategories />
        </div>
    );
  }
}

export default App;
