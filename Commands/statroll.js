const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll_stats')
    .setDescription('Rull stats for din D&D-karakter.'),
  async execute(interaction) {
    let statString = "Erorr"

    let fourRollList = []
    fourRollList.length = 0
    let summedStats = []

    for (let i = 1; i <= 6; i++) {
      for (let num = 1; num <= 4; num++) {
        fourRollList[num] = Math.floor(Math.random() * 6) + 1;
      }
      console.log(fourRollList)
      
      fourRollList.sort(function(a, b){return b - a});
      //fourRollList.pop();
      fourRollList.pop();
      summedStats[i] = fourRollList[0] + fourRollList[1] + fourRollList[2];
      fourRollList.length = 0
    }

    summedStats.sort(function(a, b){return b - a});
    summedStats.pop()
    if (summedStats[0] >= 15) {
      statString = `[${summedStats[0]}, ${summedStats[1]}, ${summedStats[2]}, ${summedStats[3]}, ${summedStats[4]}, ${summedStats[5]}]`
    }
    else {
      statString = `[${summedStats[0]}, ${summedStats[1]}, ${summedStats[2]}, ${summedStats[3]}, ${summedStats[4]}, ${summedStats[5]}]
Stats must be rerolled!`
      
    }

    
    await interaction.reply(statString)
  }
}