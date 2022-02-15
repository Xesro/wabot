import { useState } from "react"


import {MinusButton, PlusButton} from "../../html-element/custom-button";

function StrategyManager() {
    const [create, setCreate] = useState(false);

    function update() {
        console.log("clicked");
        setCreate(!create);
    }
    if(create) {
        return (<div>
            <PlusButton behavior = {update} />
            <StrategyCreator/>
        </div>)
    }
    else {
        return (<div>
            <MinusButton behavior = {update} />
            <StrategyList/>
        </div>)
    }
}

function StrategyList() {
    return <div>
        List
    </div>
}


function StrategyCreator() {
    return <div>
        create
    </div>
}

export default StrategyManager; 