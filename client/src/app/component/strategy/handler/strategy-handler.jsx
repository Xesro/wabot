import {useSelector} from "react-redux";
import {selectRegisteredStrategies} from "../../../store/strategy-slice";
import {useState} from "react";
import {BreakButton, DeleteButton, PlayButton} from "../../html-element/custom-button";
import './strategy-handler.css'
export default function StrategyHandler() {
    const strategies = useSelector(selectRegisteredStrategies);
    return (<ul id={'list'}>
        {strategies.map((strategy) => <StrategyItem strategy={strategy}/>)}
    </ul>);
}

function StrategyItem({strategy}) {

    const [logo, setLogo] = useState(undefined);
    const [started,setStarted]  = useState(strategy.started);
    /**
     * Append the current logo from sources
     */
    import(`../../../picture/${strategy.currency}.svg`).then(img => setLogo(img.default));

    const updateState = (event) => {

    }

    return <li className='list-item'>

        <section className={`logo ${strategy.currency}`}>
            <img src={logo} alt={'e'}/>
        </section>
        <section>
            {strategy.name}
        </section>
        <section>
            {strategy.money}
        </section>
        <div id='action'>
            {started?<BreakButton onClick={updateState}/>: <PlayButton onClick={updateState}/>}
            <DeleteButton/>
        </div>

    </li>
}
