/*
* CLI Related Tasks
*/

// Dependencies
var readLine = require("readline");
var util = require("util");
var debug = util.debuglog("cli");
var events = require("events");
class _events extends events{};
var e = new _events();
var os = require('os');
var v8 = require('v8');
var _data = require("./data");
var _logs = require('./logs');
var helpers = require("./helpers")

// Instantiate the CLI module object
var cli = {};

// Input handlers
e.on('man',function(str){
    cli.responders.help();
});
e.on('help',function(str){
    cli.responders.help();
});
e.on('exit',function(str){
    cli.responders.exit();
});
e.on('stats',function(str){
    cli.responders.stats();
});
e.on('list users',function(str){
    cli.responders.listUsers();
});
e.on('more user info',function(str){
    cli.responders.moreUserInfo(str);
})
e.on('list checks',function(str){
    cli.responders.listChecks(str);
})
e.on('more check info',function(str){
    cli.responders.moreCheckInfo(str);
})
e.on('list logs',function(str){
    cli.responders.listLogs();
})
e.on('more log info',function(str){
    cli.responders.moreLogInfo(str);
})



// Responders object
cli.responders = {};

// Help /Man
cli.responders.help = function(){

    var commands = {
        'man' : ' Kill the CLI (and the rest of the application)',
        'help': ' Show this help page',
        'exit' : ' Alisa of the "man" command',
        'stats' : ' Get statistics on the underlying operating sydtem and resource utilization',
        'list users' : ' Show a list all the registered (undeleted) users in the system',
        'more user info --{userId}' : ' Show details of a specific user',
        'list checks --up --down' : ' Show a list of all the checks in the system, including their state. The "--up" and the "--down" flags are both option',
        'more check info --{checkId}' : ' Show details of a specified check',
        'list logs' : ' Show a list of all the log files available to be read (compressed only)',
        'more log info --{fileName}' : ' Show details of a specified log file'
    };

    // Show a header for the help page that is as wid as the screen
    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(2);

    // Show each command, followed by its explanation in white and yellow respectively
    for(var key in commands){
        if(commands.hasOwnProperty(key)){
            var value = commands[key];
            var line = '\x1b[33m'+key+'\x1b[0m';
            var padding = 60 - line.length;
            for(i =0; i < padding; i++){
                line+=' ';
            }
            line+=value;
            console.log(line);
            cli.verticalSpace();
        }
    }

    cli.verticalSpace(1);

    // End with another horizontalLine
    cli.horizontalLine();

};

// Creat a vertical space
cli.verticalSpace = function(lines){
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for(i = 0; i < lines; i++){
        console.log('');
    }
};

// Create a horizontal line across the screen
cli.horizontalLine = function(){
    // Get the available screen line
    var width = process.stdout.columns;

    var line = '';
    for(i = 0; i < width; i++){
        line+='-';
    }
    console.log(line);
}

// Create centerd text on the screen
cli.centered = function(str){
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

    // Get the available screen size
    var width = process.stdout.columns;

    // Calculate the left padding there should be
    var leftPadding = Math.floor((width - str.length) / 2);

    // Put the left padded space before the strinng itself
    var line = '';
    for(i = 0; i < leftPadding; i++){
        line+=' ';
    }
    line+=str;
    console.log(line);
};

// Exit
cli.responders.exit = function(){
    process.exit(0);
}

// Stats
cli.responders.stats = function(){
    // Compile an object of stats
    var stats = {
        'Load Average ' : os.loadavg().join(' '),
        'CPU Count ' : os.cpus().length,
        'Free Memory ' : os.freemem(),
        'Currency Malloced Memory ' : v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory ' : v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Used (%) ' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
        'Available Heap Allocated (%) ' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
        'Uptime ' : os.uptime()+' Seconds'
    }

    // Create a header for the stat
    cli.horizontalLine();
    cli.centered('SYSTEM STATISTICS');
    cli.horizontalLine();
    cli.verticalSpace(2);

    for(var key in stats){
        if(stats.hasOwnProperty(key)){
            var value = stats[key];
            var line = '\x1b[33m'+key+'\x1b[0m';
            var padding = 60 - line.length;
            for(i =0; i < padding; i++){
                line+=' ';
            }
            line+=value;
            console.log(line);
            cli.verticalSpace();
        }
    }

    cli.verticalSpace(1);

    // End with another horizontalLine
    cli.horizontalLine();
}

// List users
cli.responders.listUsers = function(){
    _data.list('users',function(err,userIds){
        if(!err && userIds && userIds.length > 0){
            cli.verticalSpace();
            userIds.forEach(function(userId){
                _data.read('users',userId,function(err,userData){
                    if(!err && userData){
                        var line = 'Name: '+userData.firstName+' '+userData.lastName+' Phone: '+userData.phone+' Checks: ';
                        var numberOfChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array && userData.checks.length > 0 ? userData.checks.length : 0;
                        line+= numberOfChecks;
                        console.log(line);
                        cli.verticalSpace();
                    }
                });
            });
        }
    });
}

// More user info
cli.responders.moreUserInfo = function(str){
    // Get the ID from the string
    var arr = str.split('--');
    var userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(userId){
        // Lookup to user
        _data.read('users',userId,function(err,userData){
            if(!err,userData){
                // Remove the hashed password
                delete userData.hashedPassword;

                // Print the JSON with text highlighting
                cli.verticalSpace();
                console.dir(userData,{'colors':true});
                cli.verticalSpace();
            }
        });
    };
}

// List Checks
cli.responders.listChecks = function(str){
    _data.list('checks',function(err,checkIds){
      if(!err && checkIds && checkIds.length > 0){
        cli.verticalSpace();
        checkIds.forEach(function(checkId){
          _data.read('checks',checkId,function(err,checkData){
            if(!err && checkData){
              var includeCheck = false;
              var lowerString = str.toLowerCase();
              // Get the state, default to down
              var state = typeof(checkData.state) == 'string' ? checkData.state : 'down';
              // Get the state, default to unknown
              var stateOrUnknown = typeof(checkData.state) == 'string' ? checkData.state : 'unknown';
              // If the user has specified that state, or hasn't specified any state
              if((lowerString.indexOf('--'+state) > -1) || (lowerString.indexOf('--down') == -1 && lowerString.indexOf('--up') == -1)){
                var line = 'ID: '+checkData.id+' '+checkData.method.toUpperCase()+' '+checkData.protocol+'://'+checkData.url+' State: '+stateOrUnknown;
                console.log(line);
                cli.verticalSpace();
              }
            }
          });
        });
      }
    });
  };

// More checks info
cli.responders.moreCheckInfo = function(str){
     // Get the ID from the string
     var arr = str.split('--');
     var checkId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
     if(checkId){
         // Lookup to user
         _data.read('checks',checkId,function(err,checkData){
             if(!err,checkData){
 
                 // Print the JSON with text highlighting
                 cli.verticalSpace();
                 console.dir(checkData,{'colors':true});
                 cli.verticalSpace();
             }
         });
     };
}

// List logs
cli.responders.listLogs = function(){
    _logs.list(true,function(err,logFileNames){
        if(!err && logFileNames && logFileNames.length > 0){
            cli.verticalSpace();
            logFileNames.forEach(function(logFileName){
                if(logFileName.indexOf('-') > -1){
                    console.log(logFileName);
                    cli.verticalSpace();
                }
            });
        }
    });
}

// More log info
cli.responders.moreLogInfo = function(str){
    // Get the logFileName from the string
    var arr = str.split('--');
    var logFileName = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(logFileName){
        cli.verticalSpace();
        _logs.decompress(logFileName,function(err,strData){
            if(!err && strData){
                //Split into lines
                var arr = strData.split('\n');
                arr.forEach(function(jsonString){
                    var logObject = helpers.parseJsonToObject(jsonString);
                    if(logObject && JSON.stringify(logObject) !== '{}'){
                        console.dir(logObject,{'colors' : true});
                        cli.verticalSpace();
                    }
                });
            }
        });
    };
}

// Input processor
cli.processInput = function(str){
    str = typeof(str) == 'string' && str.length > 0 ? str.trim() : false;
    // Only processthe input if the user actually wrote something. Otherwise ignore
    if(str){
        // Codify the unique strings that identify the unique questions allowed to be asked
        var uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];

        // Go through the possible input, emit an event when a match is found
        var matchFound = false;
        var counter = 0;
        uniqueInputs.some(function(input){
            if(str.toLocaleLowerCase().indexOf(input) > -1){
                matchFound = true;
                // Emit an event matching the unique input, and includethe full string given by user
                e.emit(input,str);
                return true; 
            }
        });

        // If no match is found tell the user to try again
        if(!matchFound){
            console.log('No match found, try help or Try again');
        }
    }
};


// Init script
cli.init = function(){
    // Send the start message to the console, in dark blue
    console.log('\x1b[34m%s\x1b[0m',"The CLI is runing");

    // Start the interface
    var _interface = readLine.createInterface({
        input : process.stdin,
        output :process.stdout,
        prompt : '',
    });

    // Create an innitial prompt
    _interface.prompt();

    // Handle each line of input seperately
    _interface.on('line',function(str){
        // Send to the input processor
        cli.processInput(str);

        // Re-initialize the prompt afterward
        _interface.prompt();
    });

    // If the user stops the CLI, kill the associtated process
    _interface.on('close',function(){
        process.exit(0);
    });


};








//Export the module
module.exports = cli; 