import {selectLogs} from "../../store/log-slice";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import './logs.css'

export default function Logs() {
    const logs = useSelector(selectLogs);

    useEffect(() => {


    }, [])

    return (<div className='logs'>
        <header className='header'>
            Logs
        </header>
        <div className='main'>
            {logs.map((log, index) => <Log key={index} log={log}/>)}
        </div>

    </div>)
}


function Log({log}) {
    return (<div className='log-message'>
        <span className='top-log'>
            {(log.type + ' ' + log.side).toUpperCase()}
        </span>
        <span className='price item '>Price : {log.price} $</span>
        <span className='stop item '> stopPrice : {log.stopPrice} $</span>
        <span className='quantity item '> Quantity : {log.quantity}</span>
        <span className={'profit item ' + (parseFloat(log.profit) < 0 ? 'negative' : 'positive')}> {log.profit}</span>
        <div className='date item '> {log.date}</div>
    </div>);
}