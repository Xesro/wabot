
class Strategy {
    constructor() {
        //     this.event.on('...',function())
    }

    async listen(candleDTO) {
        console.log("j'ai recu",candleDTO)
        return true; 
    }
}



module.exports = Strategy