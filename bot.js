var config = {
	channels: ["#common"],
	server: "localhost",
	botName: "CoolBot"
};

// npm install irc
var irc = require("irc");

var bot = new irc.Client(config.server, config.botName, { channels : config.channels });

var reminder = "";
console.log("adding listeners");



bot.addListener("error", function(message) {
	console.error('ERROR: %s: %s',message.command, message.args.join(' '));
});

bot.addListener("registered", function(message) {
	console.log("registered");
});

bot.addListener("join", function(channel, who) {
	console.log("join " + who);
	bot.say(channel, who + " has joined your party");

});


bot.addListener('message#common', function (from, message, who) {
	console.log(from + ' => #common: ' + message);

	// ignore unnecessary capitalization and spacing for ease of use 
	message = message.replace(/\s/g,'').toLowerCase();

	// List commands this bot will respond to
	if ((message.localeCompare("coolbothey") == 0) || (message.localeCompare("coolbothi") == 0) || (message.localeCompare("coolbothello") == 0)) {
		console.log("Displaying bot command list...");
		bot.say('#common', "Hi there, here are some commands I respond to...\n");
		bot.say('#common', "'Hi'/'Hey'/'Hello': List the commands I respond to. Looks like you've found this command already\n");
		bot.say('#common', "'Time'/'Date': Display the current date and time\n");
		bot.say('#common', "'Roll [Number]': Roll a random number between 1 and [Number]. Please note that an integer must be entered after 'Roll'\n");
		bot.say('#common', "'cat': Draw a multiline ASCII cat. Let's not spam this\n");
		bot.say('#common', "'dog': Draw a multiline ASCII dog. Let's not spam this\n");
	}
	// Display the date and time
	else if ((message.localeCompare("coolbottime") == 0) || (message.localeCompare("coolbotdate") == 0)) {
		console.log("Displaying the time...");

		var d = Date(); 

		a = d.toString();  

		bot.say('#common', "The current date is: " + a); 
	}

	// Roll a random number between 1 and a number from user input
	// The maximum number to roll must follow the roll command here
	else if (message.substring(0,11).localeCompare("coolbotroll") == 0) {

		// Remove everything in the string except the number to roll
		var num = message.replace( /^\D+/g, '');

		// Make sure the user has entered a number. If a number was not
		// added, the whole String becomes ''
		if (num != '') {

			console.log("Rolling a random number between 1 and num");
			var roll = Math.floor(Math.random() * num) + 1;
			console.log("Rolled " + roll);
			bot.say('#common', "Rolled a " + roll);

		}

		else {

			console.log("No number was entered to roll");
			bot.say('#common', "You haven't entered a number to roll");

		}


	}

	// Draw an ASCII cat
	else if (message.localeCompare("coolbotcat") == 0) {
		console.log("Drawing a cat...");
		bot.say('#common', "  ,';,               ,';, ");
		bot.say('#common', " ,' , :;             ; ,,.; " );
		bot.say('#common', " | |:; :;           ; ;:|.| ");
		bot.say('#common', " | |::; ';,,,,,,,,,'  ;:|.|    ,,,;;;;;;;;,,, ");
		bot.say('#common', " ; |''  ___      ___   ';.;,,''             ''';,,, ");
		bot.say('#common', " ',:   /   \    /   \    .;.                      '';,");
		bot.say('#common', " ;    /    |    |    \     ;,                        ';, ");
		bot.say('#common', ";    |    /|    |\    |    :|                          ';,");
		bot.say('#common', "|    |    \|    |/    |    :|     ,,,,,,,               ';, ");
		bot.say('#common', "|     \____| __ |____/     :;  ,''                        ;, ");
		bot.say('#common', ";           /  \          :; ,'                           :; ");
		bot.say('#common', " ',        `----'        :; |'                            :| ");
		bot.say('#common', "   ',,  `----------'  ..;',|'                             :| ");
		bot.say('#common', "  ,'  ',,,,,,,,,,,;;;;''  |'                              :; ");
		bot.say('#common', " ,'  ,,,,                  |,                              :; ");
		bot.say('#common', " | ,'   :;, ,,''''''''''   '|.   ...........                ';,");
		bot.say('#common', " ;       :;|               ,,';;;''''''                      ';, ");
		bot.say('#common', " ',,,,,;;;|.............,'                          ....      ;, ");
		bot.say('#common', "           ''''''''''''|        .............;;;;;;;''''',    ':; ");
		bot.say('#common', "                      |;;;;;;;;'''''''''''''             ;    :| ");
		bot.say('#common', "                                                      ,,,'     :; ");
		bot.say('#common', "                                          ,,,,,,,,,,''       .;'  ");
		bot.say('#common', "                                         |              .;;;;'   ");
		bot.say('#common', "                                         ';;;;;;;;;;;;;;'        ");

	}

	// Draw an ASCII dog
	else if (message.localeCompare("coolbotdog") == 0) {
		console.log("Drawing a dog...");
		bot.say('#common', "          __. ");
		bot.say('#common', "       .-\".'                      .--.            _..._ ");
		bot.say('#common', "     .' .'                     .'    \       .-\"\"  __ \"\"-. ");
		bot.say('#common', "    /  /                     .'       : --..:__.-\"\"  \"\"-. ");
		bot.say('#common', "   :  :                     /         ;.d$$    sbp_.-\"\"-:_:");
		bot.say('#common', "   ;  :                    : ._       :P .-.   ,\"TP ");
		bot.say('#common', "   :   \                    \  T--...-; : d$b  :d$b ");
		bot.say('#common', "    \   `.                   \  `..'    ; $ $  ;$ $ ");
		bot.say('#common', "     `.   \"-.                 ).        : T$P  :T$P ");
		bot.say('#common', "       \..---^..             /           `-'    `._`._");
		bot.say('#common', "      .'        \"-.       .-\"                     T$$$b ");
		bot.say('#common', "     /             \"-._.-\"               ._        '^' ; ");
		bot.say('#common', "    :                                    \.`.         / ");
		bot.say('#common', "    ;                                -.   \`.\"-._.-'-' ");
		bot.say('#common', "   :                                 .'\   \ \ \ \ ");
		bot.say('#common', "   ;  ;                             /:  \   \ \ . ; ");
		bot.say('#common', "  :   :                            ,  ;  `.  `.;  : ");
		bot.say('#common', "  ;    \        ;                     ;    \"-._:  ; ");
		bot.say('#common', " :      `.      :                     :         \/ ");
		bot.say('#common', " ;       /\"-.    ;                    : ");
		bot.say('#common', ":       /    \"-. :                  : ; ");
		bot.say('#common', ":     .'        T-;                 ; ; ");
		bot.say('#common', " ;    :          ; ;                /  : ");
		bot.say('#common', " ;    ;          : :              .'    ; ");
		bot.say('#common', ":    :            ;:         _..-\"\     : ");
		bot.say('#common', ":     \           : ;       /      \     ; ");
		bot.say('#common', ";    . '.         '-;      /        ;    : ");
		bot.say('#common', ";  \  ; :           :     :         :    '-."); 
		bot.say('#common', "'.._L.:-'           :     ;          ;    . `.");
		bot.say('#common', "                     ;    :          :  \  ; :");
		bot.say('#common', "                     :    '-..       '.._L.:-'");
		bot.say('#common', "                      ;     , `.");
		bot.say('#common', "                      :   \  ; :");
		bot.say('#common', "                      '..__L.:-'");

	}

});

process.on('uncaughtException', function (err) {
	console.log(err);
});


console.log("running ...");


