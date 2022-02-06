class Runner {
    /**
     * 
     * @param {Strategy} strategy 
     */
    constructor(strategy){
        this.strategy = strategy;
        this.subscriber = undefined; 
      
    }
    subscribe(nameEvent){
        event.on('nameEvent',(candleDTO)=>{
            if(finish || lauched){
               let finish =  await strategy.listen(candleDTO);
            }
            else{
                
            }
        })
    }
    run(){

    }
    stop(){

    }

}


module.exports = Runner; 