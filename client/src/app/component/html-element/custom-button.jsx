




function PlusButton (behavior){
    return (<button type='button' id='plus'  onClick={behavior}/>);

}
function MinusButton(behavior){
    return (<button type='button' id='minus' onClick={behavior} />);
}

export {PlusButton,MinusButton}


