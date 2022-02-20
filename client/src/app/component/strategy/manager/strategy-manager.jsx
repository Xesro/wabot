import { useState } from "react"

import './strategy-manager.css';
import {MinusButton, PlusButton,Button,SaveButton,BreakButton,
        Input,Select,AddButton,DeleteButton} from "../../html-element/custom-button";
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
    const [canDelete,setCanDelete] = useState(false);

    const strategies  = useSelector(selectStrategiesInfo);
    const currencies = useSelector(selectCurrenciesInfo);

    const dispatch = useDispatch();
    /**
     * Update the value of the strategy info,
     * if the strategy is an available strategy, parameters of it are displayed
     * @param event
     */

    /**
     * Function triggered when the select input changed, used to display deleted button instead of save button when
     * an existing config is chosen
     */
    const updateConfig = (event) => {
        let value = event.target.value;
        console.log(value)
        setCanDelete(value !== 'none');

    }
    const updateStrategy = (event) => {
          let value =  event.target.value;
          setStrategy(value);
          setShow(value !== 'none');
    }

    const save = (event) => {

    }

    const deleteConfig = (event) => {

    }
    const add = ()=> {

    }

    return (
        <form id={"strategy-form"}>
            <section id={"basics"}>
                <Input additionalClass={'third-split'} placeholder={"money"}/>
                <Select  additionalClass={'third-split'} placeholder={'currency'} options={currencies}/>
                <Select  additionalClass={'third-split'} placeholder={'strategy'} options={strategies} onChange={updateStrategy}/>
            </section>
            { show &&
                <section id={"parameters"} >
                    <div id={"left"}>
                        <Configuration strategyName={strategy}/>
                    </div>
                    <div id={"right"}>
                        <Select  onChange={updateConfig} placeholder={"config"} options={[{name:'w',value:'d'}]}/>
                        {canDelete?<DeleteButton onClick={deleteConfig}/>: <SaveButton onChange={save} />}

                        <AddButton onChange ={add} />
                    </div>
                </section>
            }
        </form>);
}

function Configuration({strategyName}){
        return <div>

        </div>
}


export default StrategyManager; 