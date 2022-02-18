import { useState } from "react"

import './strategy-manager.css';
import {MinusButton, PlusButton,BreakButton,Input,Select} from "../../html-element/custom-button";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrenciesInfo, selectStrategiesInfo} from "../../../store/strategy-slice";

function StrategyManager() {
    const [create, setCreate] = useState(false);

    const update = ()=> {setCreate(!create);}


    return (
        <div className="manager">
            <div className="header">
                Strategies
                {create ? <PlusButton oncClick={update}/> :
                          <MinusButton oncClick={update}/>}
            </div>
            <div className="main">
                {create ? <StrategyCreator/> :
                          <StrategyList/>}
            </div>
        </div>
    );
}

function StrategyList() {
    return (<ul>

    </ul>);
}

function StrategyItem() {
    /**
     * Use for each
     * @param event
     */
    const updateState = (event) =>{

    }
}

/**
 * JSX element which manage the creation of a strategy,
 * when the user select one of the strategies available,
 *  A JSX Parameter appear , with all the prerequisite
 *  It allows the user to custom the strategy, but we could take existing parameter settings
 *
 */
function StrategyCreator() {
    /* Current strategy chosen */
    const [strategy,setStrategy] = useState('none');
    /* Used to display parameters */
    const [show,setShow] = useState(false)

    const strategies  = useSelector(selectStrategiesInfo);
    const currencies = useSelector(selectCurrenciesInfo);

    const dispatch = useDispatch();
    /**
     * Update the value of the strategy info,
     * if the strategy is an available strategy, parameters of it are displayed
     * @param event
     */
    const updateStrategy = (event) => {
          let value =  event.target.value;
          setStrategy(value);
          setShow(value !== 'none');
    }
    return (
        <form id={"strategy-form"}>
            <section id={"basics"}>
                <Input placeholder={"money"}/>
                <Select placeholder={'currency'} options={currencies}/>
                <Select placeholder={'strategy'} options={strategies} onChange={updateStrategy}/>
            </section>
            { show &&
                <section id={"parameters"} >
                    <Parameters strategy={strategy}/>
                </section>
            }
        </form>);
}

function Parameters({strategy}){
        return (<div>
            parameter
        </div>)
}
export default StrategyManager; 