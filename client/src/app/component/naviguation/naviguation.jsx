
import { Link } from 'react-router-dom';
import './naviguation.css';
function Navbar() {
    return (
        <nav id='navigation-item'>
                <div id="logo">
                    WA
                </div>
                <div id="links">
                    <span className='separator'>
                        <Link to="/home">Home</Link>
                    <Link to="/strategy">Strategy</Link>
                    <Link to="/statistics">Statistics</Link>
                    </span>

                </div>
                <div id='login'>
                    Login
                </div>
        </nav>)
}


export default Navbar;  