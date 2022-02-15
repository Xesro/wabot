import CandleProvider from "./candle-provider";

import Logger  from '../logger/logger';
import event from '../event/candle-event';

class BackTestCandleProvider extends CandleProvider {

  constructor() {
    super()
  }

  /**
   * Check if there is one instance of a subscription with currency and time_frame,
   * if not, create a new one and create a new event associated
   */




}



export default BackTestCandleProvider;