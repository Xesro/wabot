import { useState } from 'react';
import './StrategyList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import Slider from './Slide';

/***
 * Display all of the strategies, 
 */
function StrategyList({ strategies }) {
    return (<div className='list'>
        {strategies.map((element) => <StratItem key={element.id} id={element.id} strategy={element} />)}
    </div>)
}
/***
 * Item with a preview and a detail card 
 */

function StratItem({ strategy, id }) {
    const [slider] = useState(new Slider(100, 2))
    function changeDisplay() {
        const tag = document.getElementById(id + '-display');
        slider.launch(tag);
    }
   
    return <div className='item-strat'>
        <div className='item-strat-preview' onClick={changeDisplay}>
            <div className='item-strat-preview-left'>
                <div>{strategy.currency}</div>
                <div>{strategy.name}</div>
            </div>
            <div className='item-strat-preview-right'>
                <FontAwesomeIcon className='play' icon={faPlay} />
                <FontAwesomeIcon className='stop' icon={faStop} />
            </div>
        </div>
        <div id={id + '-display'} className='item-strat-toggle'>
            <div className='item-strat-card'>
                <div className='details'>Details</div>
            </div>
        </div>
    </div>
}

export default StrategyList; 