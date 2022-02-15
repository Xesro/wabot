
const { MessageEmbed, WebhookClient } = require('discord.js');
const { webhookURL } = require('../config/config.json').discord

const webhookClient = new WebhookClient({ url: webhookURL })

/**
 *
 */
export default function sendMessage(from, content, level) : void {
    const embed = new MessageEmbed()
        .setTitle(`Message de rang : ${level}`)
        .setFields(
            { name: 'provenance', value: from },
            { name: 'description', value: content });

    webhookClient.send({
        embeds: [embed],
    });
}
