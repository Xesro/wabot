
const { MessageEmbed, WebhookClient } = require('discord.js');
const { webhookURL } = require('../config/config.json')

const webhookClient = new WebhookClient({ url: webhookURL })



/**
 * 
 * @param {*} content 
 * @param {*} type 
 */
function sendMessage(from, content, level) {
    const embed = new MessageEmbed()
        .setTitle(`Message de rang : ${level}`)
        .setFields(
            { name: 'provenance', value: from },
            { name: 'description', value: content });

    webhookClient.send({
        embeds: [embed],
    });
}

module.exports = sendMessage