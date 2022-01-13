import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStrategy } from "./strategySlice.js";
import { currencyMock, strategyMock } from './mock.js';
import './StrategyForm.css';

function StrategyForm({ setMakeForm }) {
    const [money, setMoney] = useState(0);
    const [currency, setCurrency] = useState('none');
    const [strategy, setStrategy] = useState('none');
    const dispatch = useDispatch();
    
    
    function setupStrategy(element) {
        console.log(element)
        setStrategy(element);
        if (strategy === 'none') return;

    }
    function onAdd() {
        // check if one of the parameter are empty 
        if(money === 0 || currency ==='none' || strategy === 'none') return; 
        const stratObject = {
            name: strategy,
            money: money,
            currency: currency,
            parameters: {}
        }
        dispatch(addStrategy(stratObject));
        setMakeForm();
    }

    return (<div className="form">
        <div className="align-parameter">
            <div className='block'>
                <label>Money</label>
                <input type='number' onChange={(event) => setMoney(event.target.value)}
                    placeholder='money' value={money}>
                </input>
            </div>
            <SelectTag label={'Currency'} lst={currencyMock}
                value={currency}
                setValue={(newValue) => setCurrency(newValue)} />

            <SelectTag label={'Strategy'} lst={strategyMock}
                value={strategy}
                setValue={setupStrategy} />
        </div>
        {strategy !== 'none' && <Parameter />}

        <div className='buttons'>
            <div onClick={() => setMakeForm()} className='cancel button'>Cancel</div>
            <div onClick={onAdd} className='add button'>Add</div>
        </div>
    </div>)
}

function Parameter() {
    return <div className='settings'>
        sdfsdsd
    </div>
}


function SelectTag({ label, lst, value, setValue }) {

    return (
        <div className="block">
            <label> {label} </label>
            <select value={value} onChange={(event) => setValue(event.target.value)}>
                <option value='none'></option>
                {lst.map((
                    element, index) => <option key={index}
                        value={element.value}>{element.name}</option>)}
            </select>
        </div>)
}


export default StrategyForm; 