

class CandleProvider{
    constructor(key, secret) {
        this.binance = new Binance().options({
          APIKEY: `${key}`,
          APISECRET: `${secret}`
        });
        this.subscriptions = new Set();
      }
}