/*
*UNIT TEST
* 
*/


// Dependencies
var helpers = require("./../lib/helpers.js");
var assert = require('assert');
var logs = require('./../lib/logs.js')
var exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem.js')

// Holder for tests
var unit = {};

// Assert that the getNumber function is returning a number
unit['helpers.getNumber should return a number'] = function(done){
    var val = helpers.getNumber();
    assert.equal(typeof(val),'number');
    done();
};

// Assert that the getNumber function is returning 1
unit['helpers.getNumber should return 1'] = function(done){
    var val = helpers.getNumber();
    assert.equal(val,1);
    done();
};

// Assert that the getNumber function is returning 2
unit['helpers.getNumber should return 2'] = function(done){
    var val = helpers.getNumber();
    assert.equal(val,2);
    done();
};
// Log.List should callback an Array and a false error
unit['logs.list should callback a false and an array of log names'] = function(done){
    logs.list(true,function(err,logFileNames){
        assert.equal(Error,false);
        assert.ok(logFileNames instanceof Array);
        assert.ok(logFileNames > 1);
        done();
    });
}

// Logs .truncate should not throw if the log id doesn't exist
unit['Logs.truncate should not throw if the logId does not exist.. It should callback an error instead'] = function(done){
    assert.doesNotThrow(function(){
        logs.truncate('I do not exist', function(err){
            assert.ok(err);
            done();
        });
    },TypeError);
};

// ExampleDebuggingProblem.init should not throw(but it does)
unit['exampleDebuggingProblem.init should not throw when called'] = function(done){
    assert.doesNotThrow(function(){
        exampleDebuggingProblem.init()
        done();
    },TypeError);
};


// Export the tests to the runner
module.exports = unit;