import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./component/naviguation/naviguation";
import './app.css';
import Insight from "./component/insight/insight";
import StrategyView from "./component/strategy/view/strategy-view";
function App() {
    return (
        <div className="app-content">
            <BrowserRouter>
                <Navbar />
                <div id="main-content">
                <Routes>
                    <Route path="home" element={<Insight />}/>
                    <Route path="strategy" element={<StrategyView />}/>
                    
                </Routes>
                </div>
            </BrowserRouter>


        </div>);
}

export default App;