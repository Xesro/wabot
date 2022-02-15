import Logger  from 'js-logger'
import sendMessage from '../discord/webhook-manager';

Logger.useDefaults();

Logger.setHandler(function (messages, context ) {
    console.log(`Message provenant de ${messages[0]}\n`,messages[0])
    if (context.level === Logger.ERROR || context.level === Logger.WARN) {
        // send message to discord only when it's warn or error level
        sendMessage(messages[0],messages[1],context.level.name)
    } 
});


export default Logger;