import Candle from "../models/candle";


export default class Strategy {
    parameter: String[];
    constructor() {
        this.parameter = [""];
    }

    async  listen(candle :  Candle ) {
        console.log("j'ai recu",candle)
        return true;
    }
}



