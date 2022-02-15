import  Binance from 'node-binance-api';

export default class CandleProvider {

  binance : Binance;
  subscriptions : Set<string>
  constructor() {
    this.binance = new Binance();
    this.subscriptions = new Set();
  }

  isNewSubscription(eventName:string)   {

    if (this.subscriptions.has(eventName)) return { new: false }
    this.subscriptions.add(eventName);
    return { new: true, eventName: eventName }
  }
}

