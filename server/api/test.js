const Binance = require("node-binance-api");

const apiKey = "558700f186327cdc5cd9db8e95b9075b20fe2ef3ffbd7b1d86ec9dfa6b088dfe";
 const secretKey = "329e6a419d551f0e4b77cc497dbca3736f4a6ddc8878414965c67322c199cb66";

let binance = new Binance().options({
    'APIKEY': apiKey,
    'APISECRET': secretKey,
    'test' : true
});

async function buy(){
    order =  await binance.futuresBuy( 'ETHUSDT', 10, 3088);
    //console.log(order);
    console.log(await binance.futuresOrderStatus('ETHUSDT', {orderID : order.orderId }));


    //binance.orderStatus("ETHUSDT", order.orderId, function(error, json) {
	//console.log("orderStatus()",json);
    //});
   // console.info( await binance.futuresMarketSell( 'ETHUSDT', 0.666, {stopPrice: 2500, type: "STOP_MARKET"}));

}

buy();

/*function(error, response) {
    if ( error ) return console.error(error);
    console.log("Market Buy response", response);
    console.log("order id: " + response.orderId);
    console.log("First price: "+response.fills[0].price);
}*/