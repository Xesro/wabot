
import TimeSlot from '../../timeslot/timeslot';
import StrategyMaker from "../maker/strategy-maker";
import Logs from "../../logs/logs";

import './strategy-view.css';
function StrategyView() {


    return (<div id="strategy-view">
        <section id="date" className=''>
            <TimeSlot/>
        </section>
        <section id="strategy-maker" className='grid-item'>
            <StrategyMaker/>
        </section>
        <section id="insight" className='grid-item'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quibusdam sint autem sit placeat pariatur temporibus consequatur deleniti, incidunt excepturi, consequuntur facere repellendus deserunt voluptates assumenda, iusto error harum culpa.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, beatae modi. Ex quidem quasi quas ipsam nesciunt incidunt cumque nobis tempore culpa! Laborum rem dignissimos magni! Non reprehenderit nulla similique!
        </section>
        <section id="logs" className='grid-item'>
            <Logs/>
        </section>
        <section id="chart" className='grid-item'>
            je suis la graphique

        </section>
    </div>)

}


export default StrategyView;