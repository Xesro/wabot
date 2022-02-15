

import './element.css'


function PlusButton ({behavior}){
    return (<button type='button' id='plus'  onClick={behavior}>
        <div className="ee">
            eee
        </div>
    </button>);

}
function MinusButton({behavior}){
    return (<button type='button' id='minus' onClick={behavior} />);
}

export {PlusButton,MinusButton}


