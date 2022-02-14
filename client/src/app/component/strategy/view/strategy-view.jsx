
import TimeSlot from '../../timeslot/timeslot';
import StrategyManager from '../manager/strategy-manager';
import './strategy-view.css';
function StrategyView() {


    return (<div id="strategy-view">
        <section id="date" className='grid-item'>
            <TimeSlot/>
        </section>
        <section id="strategy-manager" className='grid-item'>
            <StrategyManager/>
        </section>
        <section id="insight" className='grid-item'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quibusdam sint autem sit placeat pariatur temporibus consequatur deleniti, incidunt excepturi, consequuntur facere repellendus deserunt voluptates assumenda, iusto error harum culpa.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, beatae modi. Ex quidem quasi quas ipsam nesciunt incidunt cumque nobis tempore culpa! Laborum rem dignissimos magni! Non reprehenderit nulla similique!
        </section>
        <section id="logs" className='grid-item'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ut similique quidem. Soluta doloremque at illum expedita odit fugiat aspernatur architecto, esse deserunt, blanditiis eaque doloribus veniam possimus quis qui?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate a, dolor quod qui omnis consequatur, amet impedit quia sint repudiandae recusandae rerum quisquam ipsum labore totam praesentium, placeat ut reiciendis.
        </section>
        <section id="chart" className='grid-item'>
            je suis la graphique

        </section>
    </div>)

}


export default StrategyView;