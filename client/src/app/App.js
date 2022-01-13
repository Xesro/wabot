import React from 'react';
import './App.css';

import Naviguation from './features/naviguation/Navigation';
import StrategyManager from './features/strat-manager/StrategyManager';

function App() {
  return (
    <div>
      <Naviguation/>
      <div className='main-content'>
        <div className='blocks'>
            <StrategyManager/>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
