/*
*Libary for storing and relating logs
*
*/

// Dependencies
var fs = require('fs');
var path = require("path");
var zlib = require("zlib");

// Container for the module 
var lib = {};


// base directory of the logs folder
lib.baseDir = path.join(__dirname,'/../.logs/');

// Append a string to a file , create  the file if it doesnt exist.
lib.append = function(file, str, callback){
    // Open the file appending
    fs.open(lib.baseDir+file+'.log','a',function(err, fileDescriptor){
        if(!err && fileDescriptor){
            // Append to file and close it
            fs.appendFile(fileDescriptor,str+'\n', function(err){
                if(!err){
                    fs.close(fileDescriptor, function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback("Error closing file that was appended");
                        }
                    });
                }else{
                    callback('Error appending a file')
                }
            });
        }else{
            callback('Could not open file for appending');
        }
    });
}

// List all the logs, and optionally include the compress logs
lib.list = function(includeCompressedLogs,callback){
    fs.readdir(lib.baseDir, function(err,data){
        if(!err && data && data.length > 0){
            var trimmedFileNames = [];
            data.forEach(function(fileName){
                // Add the .log files
                if(fileName.indexOf('.log') > -1){
                    trimmedFileNames.push(fileName.replace('.log',''));
                }

                // Add on the .gz files
                if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
                    trimmedFileNames.push(fileName.replace('.gz.b64',''));
                }

                callback(false, trimmedFileNames);
            });
        }else{
            callback(err,data)
        }
    })
}

// Compress the contents of one .log file into a .gz.b64 file within the same directory
lib.compress = function(logId,newFileId,callback){
    var sourceFile = logId+'.log';
    var desFile = newFileId+'.gz.b64';

    // Read the source file
    fs.readFile(lib.baseDir+sourceFile,'utf8', function(err, inputString){
        if(!err && inputString){
            zlib.gzip(inputString,function(err, buffer){
                if(!err && buffer){
                    // Send the data to the destination file
                    fs.open(lib.baseDir+desFile,'wx', function(err,fileDescriptor){
                        if(!err && fileDescriptor){
                            // Write to the destination file
                            fs.writeFile(fileDescriptor,buffer.toString('base64'),function(err){
                                if(!err){
                                    // Close the destination file
                                    fs.close(fileDescriptor,function(err){
                                        if(!err){
                                            callback(false);
                                        }else{
                                            callback(err);
                                        }
                                    });
                                }else{
                                    callback(err);
                                }
                            });
                        }else{
                            callback(err);
                        }
                    })
                }else{
                    callback(err);
                }
            });
        }else{
            callback(err);
        }
    });
};

// Decompress the content of a .gz.b64 file into a string variable
lib.decompress = function(fileId,callback){
    var fileName = fileId+'.gz.b64';
    fs.readFile(lib.baseDir+fileName,'utf8',function(err,str){
        if(!err && str){
            // Decompress the data
            var inputBuffer = Buffer.from(str,'base64');
            zlib.unzip(inputBuffer,function(err,outputBuffer){
                if(!err && outputBuffer){
                    // callback
                    var str = outputBuffer.toString();
                    callback(false,str);
                }else{
                    callback(err)
                }
            })
        }else{
            callback(err);
        }
    });
}

// Truncate a log file
lib.truncate = function(logId,callback){
    fs.truncate(lib.baseDir+logId+'.log',0,function(err){
        if(!err){
            callback(false);
        }else{
            callback(err);
        }
    })
}





// Export the module
module.exports = lib;