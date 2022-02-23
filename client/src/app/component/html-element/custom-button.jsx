import './element.css'


/**
 * Used to build Custom Button with same design
 * @param onClick behavior of the button when the user clicks on
 * @param placeholder display the placeholder
 * @param additionalClass add another class to the component
 * @returns {JSX.Element}
 */
function Button({onClick, placeholder, additionalClass}) {
    return (<button type={"button"} className={'button ' + additionalClass} onClick={onClick}>{placeholder}</button>)

}

/**
 * A button with 'Save' word displayed
 * @param onClick behavior of the button when the user clicks on
 * @returns {JSX.Element}
 */
function SaveButton({onClick}) {
    return <Button onClick={onClick} placeholder={'Save'} additionalClass={'green-button'}/>

}

/**
 * A button with 'Add' word displayed
 * @param onClick behavior of the button when the user clicks on
 * @returns {JSX.Element}
 */
function AddButton({onClick}) {
    return <Button onClick={onClick} placeholder={'Add'} additionalClass={'blue-button'}/>
}

/**
 * A button with 'Delete' word displayed
 * @param onClick behavior of the button when the user clicks on
 * @returns {JSX.Element}
 */
function DeleteButton({onClick}) {
    return <Button onClick={onClick} placeholder={'Delete'} additionalClass={'red-button'}/>
}

/**
 * Plus Icon
 * For the moment the size doesn't resize by itself
 * @param oncClick
 * @param size
 * @param custom
 * @returns {JSX.Element}
 */
function PlusButton({oncClick,size,custom}) {
    return (<button type='button' className={'icon '+custom} style={{height:size,width:size}} onClick={oncClick}>
        <i className="plus"/>
    </button>);
}

/**
 * Minus Icon
 * For the moment the size doesn't resize by itself
 * @param oncClick behavior when the user click on
 * @param size
 * @param custom
 * @returns {JSX.Element}
 */
function MinusButton({oncClick,size,custom}) {
    return (<button type='button' style={{height:size,width:size}} className={'icon '+custom} onClick={oncClick}>
        <i className="minus"/>
    </button>);
}

/**
 * Break Icon
 * For the moment the size doesn't resize by itself
 * @param oncClick
 * @returns {JSX.Element}
 */
function BreakButton({onClick}) {
    return <Button onClick={onClick} placeholder={'Pause'}
                   additionalClass={'red-button'}/>
}

function PlayButton({onClick}) {
    return <Button onClick={onClick} placeholder={'Play'}
                   additionalClass={'green-button'}/>

    /*   return (<button type='button' className='icon-minus' onClick={oncClick} >
           <i className="play"/>
       </button>);*/
}

function Input({additionalClass, oncClick, placeholder, type, id}) {
    return <input id={id} type={type} className={'input-field ' + additionalClass} placeholder={placeholder}
                  onClick={oncClick}/>
}

/**
 * Select Model
 * @param additionalClass used to add class to select component
 * @param onChange function when the user change the selected options
 * @param placeholder used for the description wrote inside the box
 * @param options an array with value/name pair
 * @returns {JSX.Element}
 */
function Select({additionalClass, id, onChange, placeholder, options = []}) {
    return <select id={id} className={additionalClass} onChange={onChange}>
        <option value={"none"}>{placeholder}</option>
        {options.map((option, index) => <option key={index} value={option.value}>{option.name}</option>)}
    </select>
}


export {
    PlusButton, MinusButton, PlayButton,
    BreakButton, Input, Select, Button, SaveButton, AddButton, DeleteButton
}


