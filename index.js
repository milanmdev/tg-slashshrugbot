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

/* Owner Commands */
client.command("pull", (ctx) => {
  if (ctx.from.is_bot) return;
  if (ctx.from.id !== config.owner_userid) return;
  ctx.reply("Executing command. Please wait...");

  require("child_process").exec(
    "git fetch origin && git reset --hard origin/main && yarn install",
    {
      timeout: 5000,
    },
    (err, stdout, stderr) => {
      let e = !!stderr;
      let result =
        stdout && stderr
          ? `Stdout:\n${stdout}\nStderr:\n${stderr}`
          : stdout || stderr;

      ctx.reply(`${e ? "Error" : "Success"}\n\n${result.substr(0, 2042)}`);
    }
  );
});

/* Launch Bot */
client.launch().then((b) => {
  console.log("Bot launched!");
});
