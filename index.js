const config = require("./config.json");

const { Telegraf } = require("telegraf");
const client = new Telegraf(config.token);

/* Bot Slash Commands */
client.command("shrug", (ctx) => {
  if (ctx.from.is_bot) return;

  let textInt = ctx.update.message.text.split(" ");
  textInt.shift();
  let text = textInt.join(" ");

  if (!text) return ctx.reply(`¯\\_(ツ)_/¯\n - ${ctx.from.username}`);
  ctx.reply(`${text} ¯\\_(ツ)_/¯\n - ${ctx.from.username}`);
});
client.command("invite", (ctx) => {
  if (ctx.from.is_bot) return;

  ctx.reply(
    `👋 Hello there!\n\nYou can invite me to your group chat by adding @slashshrugbot`
  );
});
client.command("source", (ctx) => {
  if (ctx.from.is_bot) return;

  ctx.reply(
    `View my source code over at https://github.com/milanmdev/tg-slashshrugbot\n\nNOTE: Support is not provided for selfhosting. You can use this as a guide for making your own bot though :p`
  );
});

/* Bot Commands */
client.hears("@" + config.bot_username + " invite", (ctx) => {
  if (ctx.from.is_bot) return;

  ctx.reply(
    `👋 Hello there!\n\nYou can invite me to your group chat by adding @slashshrugbot`
  );
});
client.hears("@" + config.bot_username + " source", (ctx) => {
  if (ctx.from.is_bot) return;

  ctx.reply(
    `View my source code over at https://github.com/milanmdev/tg-slashshrugbot\n\nNOTE: Support is not provided for selfhosting. You can use this as a guide for making your own bot though :p`
  );
});

/* Launch Bot */
client.launch().then((b) => {
  console.log("Bot launched!");
});
