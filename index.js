var Botkit = require('botkit');

var slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
    console.error('SLACK_TOKEN is required!');
    process.exit(1);
}

var controller = Botkit.slackbot();
var bot = controller.spawn({
    token: slackToken
}).startRTM();

var importantMsgs = ['direct_message', 'direct_mention', 'mention'];

var allMsgs = importantMsgs.concat('ambient');

controller.hears(['hello', 'hi', 'how are you', 'hey'], importantMsgs, function (bot, message) {
    bot.reply(message, 'Hello.');
});

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, 'Hello VEXabits.');
});

controller.hears(['\\bex'], allMsgs, function (bot, message) {
    if (message.text) {
        bot.reply(message, 'You mean: ' + message.text.replace(/(\bex)/ig, 'VEX'));
    }
});

controller.hears(['\\be\\W+x'], allMsgs, function (bot, message) {
    if (message.text) {
        bot.reply(message, "Don't do that, you mean: " + message.text.replace(/(\be\W+x)/ig, 'VEX'));
    }
});

controller.hears(['serious'], allMsgs, function (bot, message) {
    if (message.text) {
        bot.reply(message, 'You mean: ' + message.text.replace(/(serious)/ig, 'serial'));
    }
});
