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
        setStrategy(element);
        if (strategy === 'none') return;

    }
    function onAdd() {
        // check if one of the parameter are empty 
        if (money === 0 || currency === 'none' || strategy === 'none') return;
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
        <div className="form-info">
            <div className="align-parameter">
                <input type='number' onChange={(event) => setMoney(event.target.value)}
                    placeholder='money' value={money}>
                </input>
                <SelectTag placeholder={'Currency'} lst={currencyMock}
                    value={currency}
                    setValue={(newValue) => setCurrency(newValue)} />

                <SelectTag placeholder={'Strategy'} lst={strategyMock}
                    value={strategy}
                    setValue={setupStrategy} />
            </div>
            {strategy !== 'none' && <Parameter />}
        </div>
        <div className='buttons'>
            <button onClick={onAdd} className='add '>Add</button>
        </div>
    </div>)
}

function Parameter() {
    return <div className='settings'>
        sdfsdsd
    </div>
}


function SelectTag({ placeholder, lst, value, setValue }) {

    return (
        <select placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}>
            <option value='none'>{placeholder}</option>
            {lst.map((
                element, index) => <option key={index}
                    value={element.value}>{element.name}</option>)}
        </select>
    )
}


export default StrategyForm; 