/*
* Library thar demonstrate something throwing when it's init() is called
*/

// Container for the mobile
var example = {};

// Init function
example.init = function(){
    // This is an error created intentionally (bar is not defained)
    var foo = bar;
}

// Export the module
module.exports = example;