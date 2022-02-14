import { useState } from "react"


import {MinusButton, PlusButton} from "../../html-element/custom-button";

function StrategyManager() {
    const [create, setCreate] = useState(false);

    function update(){
            console.log("clicked");
            setCreate(!create);
        }
    }
    return (<div>
            <MinusButton behavior = {this.update()} />
            (create ? <StrategyCreator/> : <StrategyList/>)
        </div>);
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