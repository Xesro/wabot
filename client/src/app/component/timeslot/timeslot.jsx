import { useState } from "react";

import './timeslot.css'


// dabord aucune dispobibilité 
// demande a chaque fois a fetch dans le store, si y'a une strat et quand elle a commencé 
// si y'a une strat, affiché début et now 
function TimeSlot() {
    const [from, setFrom] = useState(new Date().getTime());
    const [to, setTo] = useState(from+3600*10);

    function updateSlot(event){
       // console.log(event.target.value)
       console.log(event.target.value)
    }
    return (<div id="slider-range">
        <span> date depart</span>
        <input  onChange={e=> updateSlot(e)} type="range" min={from/1000} max={to/1000}  
               value={from/1000}   id="slider" />
        <span> date fin</span>
    </div>)
}


export default TimeSlot;