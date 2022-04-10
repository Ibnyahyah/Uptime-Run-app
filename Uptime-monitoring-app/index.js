/* 
*Primary File for the API
*
*/

// Dependencies
var server = require("./lib/server");
var workers = require("./lib/workers");
var cli = require('./lib/cli');

// Declare the app
var app = {};

// Init Function
app.init = function(){
    // Start the server
    server.init();

    // Start the worker
    workers.init();

    // Start the CLi,but make sure it satarts last
    setTimeout(function(){
        cli.init();
    },50)
}

// Execute the function
app.init();

// Export the app
module.exports = app;