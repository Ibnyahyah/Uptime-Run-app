/**
 * Library for storing and editing data
 */

// dependencies
var fs = require("fs");
var path = require("path");
var helpers = require("./helpers");

// container for the module (to be exported)
var lib = {}

// base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');

// write data to a file
lib.create = function(dir,file,data,callback){
    // open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            // convert data to string
            var stringData = JSON.stringify(data);

            // write to file and close it
            fs.writeFile(fileDescriptor,stringData,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback('Error Closing new file');
                        }
                    });
                }else{
                    callback('Error writing to new file');
                }
            });
        }else{
            callback('Could not create a new file, it may already exist');
        }
    });
}

// Read data from a file
lib.read = function(dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
        if(!err && data){
            var parseData = helpers.parseJsonToObject(data);
            callback(false,parseData)
        }else{
            callback(err,data);
        }
    });
}

// updat data inside a file
lib.update = function(dir,file,data,callback){
    // open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            // convert data to string
            var stringData = JSON.stringify(data);
            // ftruncate the file truncate as been changed to ftruncate
            fs.ftruncate(fileDescriptor,function(err){
                if(!err){
                    // write to the file and close it
                    fs.writeFile(fileDescriptor,stringData,function(err){
                        if(!err){
                            fs.close(fileDescriptor,function(err){
                                if(!err){
                                    callback(false)
                                }else{
                                    callback('Error in closing existing file');
                                }
                            })
                        }else{
                            callback('Error writing to existing file');
                        }
                    })
                }else{
                    callback('Error truncating file')
                }
            })
        }else{
            callback('Could not editing, may file doesnt exist');
        }
    })
}

// Delete a file
lib.delete = function(dir,file,callback){
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
        if(!err){
            callback(false);
        }else{
            callback('Error deleting file');
        }
    });
}

// List all the item ina directory
lib.list = function(dir, callback){
    fs.readdir(lib.baseDir+dir+'/',function(err,data){
        if(!err && data && data.length > 0){
            var trimmeedFileNames = [];
            data.forEach(function(fileName){
                trimmeedFileNames.push(fileName.replace('.json',''));
            });
            callback(false, trimmeedFileNames);
        }else{
            callback(err, data)
        }
    })
}

// Eport the module
module.exports= lib;