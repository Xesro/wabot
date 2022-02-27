const Binance = require("node-binance-api");
const {container} = require("./server")

const apiKey = "558700f186327cdc5cd9db8e95b9075b20fe2ef3ffbd7b1d86ec9dfa6b088dfe";
const secretKey = "329e6a419d551f0e4b77cc497dbca3736f4a6ddc8878414965c67322c199cb66";

let binance = new Binance().options({
    'APIKEY': apiKey,
    'APISECRET': secretKey,
    'test' : true
});


// module.exports = test

async function getOrderStatus(orderId) {
    let order = await binance.futuresOrderStatus('ETHUSDT', {orderID : orderId })
    return order.origQty === order.executedQty;
}

async function buy(){
    //execute un ordre market pour les tests
    let order =  await binance.futuresBuy( 'ETHUSDT', 1, null, {type : 'MARKET', undefined, newOrderRespType: 'RESULT'});
    console.log(order);

/** LIMIT STOP MARKET STOP_MARKET TAKE_PROFIT TAKE_PROFIT_MARKET **/

    //stopLOSS market OK
    // console.info( await binance.futuresMarketSell( 'ETHUSDT', 0.666, {stopPrice: 2500, type: "STOP_MARKET"}));
    // console.info( await binance.futuresSell( 'ETHUSDT', 0.666,null,  {stopPrice: 2500, type: "STOP_MARKET"}));


    //stop loss LIMIT
    // console.info( await binance.futuresSell( 'ETHUSDT', 0.666, 2499, {stopPrice: 2500, type: 'STOP'}));


    //takeprofit Market
    // console.info( await binance.futuresMarketSell( 'ETHUSDT', 0.666, {stopPrice: 3000, type: 'TAKE_PROFIT_MARKET'}));
    // console.info( await binance.futuresSell( 'ETHUSDT', 0.666, null, {stopPrice: 3000, type: 'TAKE_PROFIT_MARKET'}));


    //takeprofit LIMIT
    // console.info( await binance.futuresSell( 'ETHUSDT', 0.666, 3001, {stopPrice: 3000, type: 'TAKE_PROFIT'}));




    //binance.orderStatus("ETHUSDT", order.orderId, function(error, json) {
	//console.log("orderStatus()",json);
    //});
   // console.info( await binance.futuresMarketSell( 'ETHUSDT', 0.666, {stopPrice: 2500, type: "STOP_MARKET"}));




}

//buy()


