const {Client, Collection, GatewayIntentBits, ActivityType} = require('discord.js')
const BotToken = require('./config.json').token;
const { SlashCommandBuilder } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
	],
});



client.once('ready', () => {
	console.log('Ready!');
  client.user.setPresence({
    activities: [{ name: `/roll stats`, type: ActivityType.Listening }],
    status: 'Ready',
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