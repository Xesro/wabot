import './Naviguation.css';


function Naviguation() {

    /**
     * Find the latest current tag selected, and remove the "selected" css, then add it to the new current 
     * @param {*} event 
     */
    function changeRoute(event) {
        let tag = event.target;
        let current = document.getElementsByClassName('selected')[0];
        current.classList.remove('selected');
        tag.classList.add('selected');
    }

    return (
        <div className='nav'>
            <div className='left'>
                <div className='title'>WA</div>
                <div className='heading'>
                    <div onClick={(event) => changeRoute(event)} className='nav-item selected'>Trade</div>
                    <div onClick={(event) => changeRoute(event)} className='nav-item'>Euros</div>
                </div>
            </div>
            <div onClick={(event) => changeRoute(event)} className=' nav-item right'>Settings</div>
        </div>


    );
}


export default Naviguation;