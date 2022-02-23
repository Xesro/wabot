import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrenciesInfo, selectStrategiesInfo} from "../../../store/strategy-slice";
import {
    AddButton,
    DeleteButton,
    Input,
    MinusButton,
    PlusButton,
    SaveButton,
    Select
} from "../../html-element/custom-button";
import './strategy-maker.css'

/**
 * JSX element which manage the creation of a strategy,
 * when the user select one of the strategies available,
 *  A JSX Parameter appear , with all the prerequisite
 *  It allows the user to custom the strategy, but we could take existing parameter settings
 *
 */
export default function StrategyMaker() {


    const [make,setMake] = useState(false)

    const dispatch = useDispatch();
    /**
     * Update the value of the strategy info,
     * if the strategy is an available strategy, parameters of it are displayed
     * @param event
     */

    const update = ()=> setMake(!make);



    return (
        <div style={{'height':`100%`}}>
            <div className="header">
                Strategies
                { make && <MinusButton  size={25} oncClick={update}/>}
            </div>
            <div id="maker">
                {make?<Maker/> : <Adder update={update}/> }
            </div>
        </div>
    );
}
function Adder({update}){

    return (<div id="adder">
        <PlusButton size={50} custom={'center'}  oncClick={update}/>
    </div>)
}
function Maker(){
    /* Current strategy chosen */
    const [strategy, setStrategy] = useState('none');

    /* Used to display parameters */
    const [show, setShow] = useState(false)

    const [canDelete, setCanDelete] = useState(false);
    /**
     * Function triggered when the select input changed, used to display deleted button instead of save button when
     * an existing config is chosen
     */
    const strategies = useSelector(selectStrategiesInfo);
    const currencies = useSelector(selectCurrenciesInfo);


    const save = (event) => {

    }

    const deleteConfig = (event) => {

    }
    const add = () => {

    }
    const updateConfig = (event) => {
        let value = event.target.value;
        console.log(value)
        setCanDelete(value !== 'none');

    }
    const updateStrategy = (event) => {
        let value = event.target.value;
        setStrategy(value);
        setShow(value !== 'none');
    }
    return (   <form id={"strategy-form"}>
        <Input id='money-element' placeholder={"money"}/>
        <Select id='currency-element' placeholder={'currency'} options={currencies}/>
        <Select id='strategy-element' placeholder={'strategy'} options={strategies}
                onChange={updateStrategy}/>
        {show &&
            <div style={{display: 'contents'}}>
                <Parameters id='param-element' strategyName={strategy}/>
                <Select id='config-element' onChange={updateConfig} placeholder={"config"}
                        options={[{name: 'w', value: 'd'}]}/>
                {canDelete ? <DeleteButton id='action-element' onClick={deleteConfig}/> :
                    <SaveButton id='action-element' onChange={save}/>}
                <AddButton id='add-element' onChange={add}/>
            </div>
        }


    </form>)
}

function Parameters({id, strategyName}) {

    return <section id={id}>
        A implementer
    </section>
}
