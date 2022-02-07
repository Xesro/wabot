import {Link,BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
function App(){
    return (
        <div>
            <BrowserRouter>
                <nav>
                    <Link to="/">Helleeeo</Link> {" ee "}
                    <Link to="/animaux">ANIMAUX</Link>
                </nav>

                <Routes>
            </Routes>
        </BrowserRouter>


    </div>);
}

export default App ;