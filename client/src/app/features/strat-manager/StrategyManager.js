import { useState } from 'react';
import { useSelector } from 'react-redux';
import './StrategyManager.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPlay, faBorderNone } from '@fortawesome/free-solid-svg-icons';
import StrategyForm from './StrategyForm';

function StrategyManager() {
    const [makeForm, setMakeForm] = useState(false);
    const strategies = useSelector((state) => state.strategies);

    return (
        <div className="strategy">
            <div className='header'>
                <div>Strategies</div>
                <div><FontAwesomeIcon className='icon' onClick={() => setMakeForm(true)} icon={faPlusSquare} /></div>
            </div>
            <div className='content'>
                {!makeForm ? <StrategyList strategies={strategies} /> :
                    <StrategyForm setMakeForm={() => setMakeForm(false)} />}
            </div>
        </div>
    )
}

function StrategyList({ strategies }) {
    return (<div className='list'>
        {strategies.map((element) => <StratItem key={element.id} strategy={element} />)}
    </div>)
}
function StratItem({ strategy }) {
    const [isShow, setIsShown] = useState(false);
    function changeDisplay(event) {
        
    }
    return <div className='item'>
        <div className='item-display' onClick={() => setIsShown(!isShow)}>
            <div className='left'>
                <div>{strategy.currency}</div>
                <div>{strategy.name}</div>
            </div>
            <div className='right'>
                <FontAwesomeIcon icon={faPlay} />
            </div>
        </div>
        {isShow &&
            <div className='card anime'>

                <div className='details'>Details</div>
            </div>
        }

    </div>
}

export default StrategyManager; 