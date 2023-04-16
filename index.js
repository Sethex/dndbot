const {Client, Collection, Intents} = require('discord.js');
const BotToken = require('./config.json').token;
const { SlashCommandBuilder } = require('@discordjs/builders');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, 'GUILD_VOICE_STATES');

const client = new Client({ intents: myIntents});


client.once('ready', () => {
	console.log('Ready!');
  client.user.setPresence({ 
    activities: [{ 
      name: '/roll stats',
      type: "LISTENING"
       }],
    status: "online"
    });
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  
  try {
		 await command.execute(interaction);
	} catch (error) {
	  console.error(error);
	  await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true 
    });
	}
});

const fs = require('node:fs');
const commandFiles = fs.readdirSync('./Commands');

client.commands = new Collection();
for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);

  client.commands.set(command.data.name, command);
}

client.login(BotToken);