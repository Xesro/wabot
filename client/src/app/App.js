import React from 'react';
import './App.css';
/** Component */
import StrategyForm from './features/strat-manager/StrategyForm';
import StrategyList from './features/strat-manager/StrategyList';
import Naviguation from './features/naviguation/Navigation';
import Logs from './features/logs/Logs';
import Error404 from './features/Error404';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import ChartManager from './features/chart/ChartMananager';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'


function App() {
  return (
    <div>
      <Naviguation />
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route path='/strategy' element={<StrategyManager />}>

          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}
{/* <div className='main-content'>
<StrategyManager />
<div className='colds card'>eeee</div>
<Logs />
<ChartManager />
</div> */}
function Login() {
  useEffect(() => {

    fetch("http://localhost:8080")
      .then(response => console.log(response))
      .catch(error => console.log(error.message));


  }, [])

 

  return (<div className='login'>
    <form action='http://localhost:8080/login/identification' method='POST' >
      
      <input type="text" name='username' placeholder='Username'/>
      <input type="password"  name='password' placeholder='Password' />
      <button type='submit'>Submit</button>
    </form>

    </div>
      )
}

      function StrategyManager() {
  const [makeForm, setMakeForm] = useState(false);
  const strategies = useSelector((state) => state.strategies);

      return (
      <div className="strategy card">
        <div className='header'>
          <div className='title-box'>
            <div className='title-strategy'>{makeForm ? 'Ajouter Stratégie' : 'Strategies'}</div>
          </div>
          <div>
            <FontAwesomeIcon className='icon' onClick={() => setMakeForm(!makeForm)}
              icon={makeForm ? faMinusSquare : faPlusSquare} /></div>
        </div>
        <div className='content'>
          {!makeForm ? <StrategyList strategies={strategies} /> :
            <StrategyForm setMakeForm={() => setMakeForm(false)} />}
        </div>
      </div>
      )
}

      // ajouiter manager de strategie 

      export default App;
