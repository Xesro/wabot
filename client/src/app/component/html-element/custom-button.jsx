

import './element.css'


/**
 * Plus Icon
 * For the moment the size doesn't resize by itself
 * @param oncClick
 * @returns {JSX.Element}
 * @constructor
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
 * @constructor
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
 * @constructor
 */
function BreakButton({oncClick}){
    return (<button type='button' className='break' onClick={oncClick} />);
}

function PlayButton({oncClick}){
    return (<button type='button' className='icon-minus' onClick={oncClick} >
        <i className="play"/>
    </button>);
}

function Input({oncClick,placeholder,type}){
    return <input type={type} className={'input-field'} placeholder={placeholder} onClick={oncClick} />
}

/**
 * Select Model
 * @param onChange function when the user change the selected options
 * @param placeholder used for the description wrote inside the box
 * @param options an array with value/name pair
 * @returns {JSX.Element}
 */
function Select({onChange,placeholder,options=[]}){
    return <select onChange={onChange} >
        <option className={"none"}>{placeholder}</option>
        {options.map((option,index)=> <option  key={index} value={option.value}>{option.name}</option>)}
    </select>

}



export {PlusButton,MinusButton,BreakButton,Input,Select}


