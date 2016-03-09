// Dépendances
Log = require('./lib/Log');
var PingtestEvent = require('./lib/PingtestEvents');
var SpeedtestEvent = require('./lib/SpeedtestEvents');

// Config
var config = {
    log: {
        logPath: "logs/logs.log",
        speedtestFolderPath: "/logs/speedtest/"
    },
    ping: {
        delay: 15*1000, // 15 secondes
        hosts: ['192.168.0.1', 'google.com', 'yahoo.fr']
    },
    speedtest: {
        delay: 5*60*1000 // 5 minutes
    }
};


// Initialisation des services
Log.writeLog("[Init] Initialisation en cours");
var Pingtest = PingtestEvent.init(config);
var Speedtest = SpeedtestEvent.init(config);