
import { Link } from 'react-router-dom';
import './naviguation.css';
function Navbar() {
    return (
        <nav id='naviguation-item'>
            <div id='naviguation-block'>
                <div id="logo">
                    WA
                </div>
                <div id="links">
                    <Link to="/home">Home</Link>
                    <Link to="/strategy">Strategy</Link>
                    <Link to="/statistics">Statistics</Link>
                </div>
                <div id='login'>
                    Login
                </div>

            </div>
        </nav>)
}


export default Navbar;  