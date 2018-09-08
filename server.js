var Discord = require('discord.js')
var client = new Discord.Client()
var firebase = require('firebase')
var moment = require('moment')
var config = {
    apiKey: process.env.KEY,
    authDomain: process.env.DOM,
    databaseURL: process.env.URL,
    projectId: process.env.ID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: process.env.SID
  };
  firebase.initializeApp(config);
  var database = firebase.database()
client.on('ready', () => {
	database.ref(`/staty/online`).once("value")
	.then(async dbo => {
	var high = dbo.val()
	var ytspeak = client.guilds.get("486928691524272134")
	
	setInterval(function(){
		
	
		let online = ytspeak.members.filter(member => member.user.presence.status !== 'offline');
	var hr = new Date().getHours() +2
	if(hr == 25) hr = 1
		
		if(high<online.size-ytspeak.members.filter(m => m.user.bot).size) {
			high = online.size-ytspeak.members.filter(m => m.user.bot).size
			database.ref(`/staty/`).set({ 
				online:high
			})
		}
	client.channels.get("488047116284067841").edit({name: `Osób online: ${online.size-ytspeak.members.filter(m => m.user.bot).size}`});
   	client.channels.get("488048173743603713").edit({name: `Liczba Członków: ${ytspeak.memberCount}`});
   	client.channels.get("488047589367742465").edit({name: `Data: ${moment.utc(new Date()).format('DD.MM.YYYY')}`})
   	client.channels.get("488047837704224781").edit({name: `Godzina: ${hr}:${moment.utc(new Date()).format('mm:ss')}`})
   	client.channels.get("488047289450102804").edit({name:`Rekord Online: ${high}`})
  },1000)
  console.log(`[client] Zalogowano jako ${client.user.tag}`);
	})
});
client.login(process.env.TOKEN)
