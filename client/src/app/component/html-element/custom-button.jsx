import './element.css'


/**
 * Used to build Custom Button with same design
 * @param onClick behavior of the button when the user clicks on
 * @param placeholder display the placeholder
 * @param additionalClass add another class to the component
 * @returns {JSX.Element}
 */
function Button({onClick,placeholder,additionalClass}) {
    return (<button type={"button"} className={'button '+additionalClass}onClick={onClick} >{placeholder}</button>)

}

/**
 * A button with 'Save' word displayed
 * @param onClick behavior of the button when the user clicks on
 * @returns {JSX.Element}
 */
function SaveButton({onClick}){
    return <Button onClick={onClick} placeholder={'Save'} additionalClass={'green-button'} />

}
/**
 * A button with 'Add' word displayed
 * @param onClick behavior of the button when the user clicks on
 * @returns {JSX.Element}
 */
function AddButton({onClick}){
    return <Button onClick={onClick} placeholder={'Add'} additionalClass={'blue-button'} />
}
/**
 * A button with 'Delete' word displayed
 * @param onClick behavior of the button when the user clicks on
 * @returns {JSX.Element}
 */
function DeleteButton({onClick}){
    return <Button onClick={onClick} placeholder={'Delete'} additionalClass={'red-button'} />
}

/**
 * Plus Icon
 * For the moment the size doesn't resize by itself
 * @param oncClick
 * @returns {JSX.Element}
 */
function PlusButton ({oncClick}){
    return (<button type='button' className='icon' onClick={oncClick}>
        <i className="plus"/>
    </button>);
}

/**
 * Minus Icon
 * For the moment the size doesn't resize by itself
 * @param oncClick behavior when the user click on
 * @returns {JSX.Element}
 */
function MinusButton({oncClick}){
    return (<button type='button' className='icon' onClick={oncClick} >
        <i className="minus"/>
    </button>);
}

/**
 * Break Icon
 * For the moment the size doesn't resize by itself
 * @param oncClick
 * @returns {JSX.Element}
 */
function BreakButton({oncClick}){
    return (<button type='button' className='break' onClick={oncClick} />);
}

function PlayButton({oncClick}){
    return (<button type='button' className='icon-minus' onClick={oncClick} >
        <i className="play"/>
    </button>);
}

function Input({additionalClass,oncClick,placeholder,type}){
    return <input type={type} className={'input-field '+additionalClass} placeholder={placeholder} onClick={oncClick} />
}

/**
 * Select Model
 * @param additionalClass used to add class to select component
 * @param onChange function when the user change the selected options
 * @param placeholder used for the description wrote inside the box
 * @param options an array with value/name pair
 * @returns {JSX.Element}
 */
function Select({additionalClass,onChange,placeholder,options=[]}){
    return <select className={additionalClass} onChange={onChange} >
        <option value={"none"}>{placeholder}</option>
        {options.map((option,index)=> <option  key={index} value={option.value}>{option.name}</option>)}
    </select>
}



export {PlusButton,MinusButton,BreakButton,Input,Select,Button,SaveButton,AddButton,DeleteButton}


