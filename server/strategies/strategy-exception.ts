import Logger from '../logger/logger';

function NoStrategyFoundException(strategyName: String) : void  {
    Logger.info(`no strategy match with the strategyName given "${strategyName}"`);
}
export default { NoStrategyFoundException }