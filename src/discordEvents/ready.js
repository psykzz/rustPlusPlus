const BattlemetricsTrackerHandler = require('../handlers/battlemetricsTrackerHandler.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.log('INFO', 'LOGGED IN AS: ' + client.user.tag);
        // client.user.setUsername('rustPlusPlus');

        try {
            await client.user.setAvatar('./src/resources/images/rustplusplus_logo.png');
        }
        catch (e) {
            client.log('INFO', 'Ignored changing avatar.');
        }

        client.user.setActivity('/help', { type: 'LISTENING' });

        client.guilds.cache.forEach(async (guild) => {
        //     guild.me.setNickname('rustPlusPlus');
            await client.setupGuild(guild);
        });

        BattlemetricsTrackerHandler.handler(client);
        client.battlemetricsIntervalId = setInterval(
            BattlemetricsTrackerHandler.handler,
            60000,
            client);

        client.createRustplusInstancesFromConfig();
    },
};