/* 
*Primary File for the API
*
*/

// Dependencies
var server = require("./lib/server");
var workers = require("./lib/workers");
var cli = require('./lib/cli');
var exampleDebuggingProblem = require('./lib/exampleDebuggingProblem');

// Declare the app
var app = {};

// Init Function
app.init = function(){
    // Start the server
    debugger;
    server.init();
    debugger;

    // Start the worker
    debugger;
    workers.init();
    debugger;

    // Start the CLi,but make sure it satarts last
    debugger;
    setTimeout(function(){
        cli.init();
        debugger;
    },50);
    debugger;

    debugger;
    var foo = 1;
    console.log('Just assign 1 to foo')
    debugger;

    // Increament foo
    foo++;
    console.log('Just increamented foo')
    debugger;

    // Square foo
    foo = foo * foo;
    console.log('Just square foo')
    debugger;

    // Convert foo to a string
    foo = foo.toString();
    console.log('Just converted foo to string')
    debugger;

    // Call the init script that will throw
    exampleDebuggingProblem.init();
    console.log('Just called the library')
    debugger;
}

// Execute the function
app.init();

// Export the app
module.exports = app;