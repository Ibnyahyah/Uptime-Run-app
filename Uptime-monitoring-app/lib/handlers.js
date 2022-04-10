/**
 * Request handlers
 */

// dependecies
// const { config } = require('process');
const _data = require('./data');
const helpers = require("./helpers");
const config = require("./config");

// Define the handlers
var handlers = {}

/**
 * 
 * HTML Handler
 */

// Index handler
handlers.index = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Uptime Monitoring - Made Simple',
            'head.description':'We offer free simple uptime monitoring for HTTP/HTTPS sites of all kins, when you site goes down we send you a text to lets you know.',
            'body.class':'index'
        }

        // Read in the index template as a string
        helpers.getTemplate('index',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// Create Account
handlers.accountCreate = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Create an account',
            'head.description':'Signup is easy and only takes a few seconds.',
            'body.class':'accountCreate'
        }

        // Read in the index template as a string
        helpers.getTemplate('accountCreate',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// sessionCreate
handlers.sessionCreate = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Login to access Your account',
            'head.description':'Login with your phone number and your password.',
            'body.class':'sessionCreate'
        }

        // Read in the index template as a string
        helpers.getTemplate('sessionCreate',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// Delete session
handlers.sessionDeleted = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Logged out',
            'head.description':'You have been logged out of your account',
            'body.class':'sessionDeleted'
        }

        // Read in the index template as a string
        helpers.getTemplate('sessionDeleted',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// Edit your account
handlers.accountEdit = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Account Settings',
            'body.class':'accountEdit'
        }

        // Read in the index template as a string
        helpers.getTemplate('accountEdit',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// Account has been deleted
handlers.accountDeleted = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Account Deleted',
            'headd.description':'Your account has been deleted',
            'body.class':'accountDeleted'
        }

        // Read in the index template as a string
        helpers.getTemplate('accountDeleted',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// Create a new check
handlers.checksCreate = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Create a check',
            'body.class':'checksCreate'
        }

        // Read in the index template as a string
        helpers.getTemplate('checksCreate',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// Dashboard view all checks 
handlers.checksList = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Dashboard',
            'body.class':'checksList'
        }

        // Read in the index template as a string
        helpers.getTemplate('checksList',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}

// Edit a checks 
handlers.checksEdit = function(data,callback){
    // Reject any request that isn't a Get
    if(data.method == 'get'){

        // Prepare data for interpolation
        var templateData = {
            'head.title':'Check Detail',
            'body.class':'checksEdit'
        }

        // Read in the index template as a string
        helpers.getTemplate('checksEdit',templateData,function(err, str){
            if(!err && str){
                // Add the universalheader and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the as HTML
                        callback(200,str,'html');
                    }else{
                        callback(500,undefined,'html');
                    }
                });
            }else{
                callback(500,undefined,'html');
            }
        })
    }else{
        callback(405,undefined,'html');
    }
}


// Favicon
handlers.favicon = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico',function(err,data){
            if(!err && data){
                // Callback the data
                callback(200,data,'favicon');
            }else{
                callback(500);
            }
        });
    }else{
        callback(405);
    }
};

// Public assets
handlers.public = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Get the filename being requested
      var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
      if(trimmedAssetName.length > 0){
        // Read in the asset's data
        helpers.getStaticAsset(trimmedAssetName,function(err,data){
          if(!err && data){
  
            // Determine the content type (default to plain text)
            var contentType = 'plain';
  
            if(trimmedAssetName.indexOf('.css') > -1){
              contentType = 'css';
            }
  
            if(trimmedAssetName.indexOf('.png') > -1){
              contentType = 'png';
            }
  
            if(trimmedAssetName.indexOf('.jpg') > -1){
              contentType = 'jpg';
            }
  
            if(trimmedAssetName.indexOf('.ico') > -1){
              contentType = 'favicon';
            }
  
            // Callback the data
            callback(200,data,contentType);
          } else {
            callback(404);
          }
        });
      } else {
        callback(404);
      }
  
    } else {
      callback(405);
    }
  };


/**
 * 
 * JSON API Handlers
 */

// Example Error
handlers.exampleError = function(data,callback){
    var err = new Error("This is an Example Error");
    throw(err);
};

// users
handlers.users = function(data,callback){
    var acceptableMethods = ['post', 'get', 'put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback)
    }else{
        callback(405);
    }
}

// container for user submethod
handlers._users = {};

// User - post
// required data : firstName, lastName,phone password and tosAgreement.
handlers._users.post = function(data, callback){
    // check that all the require fields are fillout
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true: false;

    if(firstName && lastName && phone && password && tosAgreement){
        // make sure the user doesnt already exist
        _data.read('users', phone, function(err,data){
            if(err){
                // hash password
                var hashedPassword = helpers.hash(password);
                // create the user object
                if(hashedPassword){
                    var userObject = {
                        'firstName':firstName,
                        'lastName' : lastName,
                        'phone': phone,
                        'hashedPassword': hashedPassword,
                        'tosAgreement':true
                    }
                    // storing user 
                    _data.create('users',phone,userObject, function(err){
                        if(!err){
                            callback(200);
                        }else{
                            console.log(err);
                            callback(500,{'Error':'Could not Create user'})
                        }
                    });
                }else{
                    console.log(err);
                    callback(500,{'Error':'Could not hash password'})
                }
            }else{
                callback(400, {'Error':'A user with this phone already exist'});
            }
        });
    }else{
        callback(400,{'Error':'missing require field'})
    }
}

// user -- get
handlers._users.get = function(data,callback){
    // check that the phone number is valid
    var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim(): false;
    if (phone){
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string'? data.headers.token: false;
        // verify that the given token is valid for the phone 
        handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
            if(tokenIsValid){
                // look up to user
            _data.read('users', phone, function(err, data){
                if(!err && data){
                    // Remove the hashed password from the user obj before returing user
                    delete data.hashedPassword;
                    callback(200,data)
                }else{
                    callback(400)
                }
            })
            }else{
                callback(403,{'Error':'Missing require token in headers or token is invalid'})
            }
        });
    }else{
        callback(400,{'Error':'Missing required field'});
    }
}


// user -- put
// required data - phone
// optional data - firstName lastName, Password
handlers._users.put = function(data, callback){
    // check the phone 
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    // check optional field
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    // Error if the phone is invalid
    if(phone){
        // Error ifnothing is send to update
        if(firstName || lastName || password){
            
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string'? data.headers.token: false;

        handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
            if(tokenIsValid){
                // look up to user 
            _data.read('users',phone,function(err,userData){
                if(!err && userData){
                    // update the neccsary field
                    if(firstName){
                        userData.firstName = firstName;
                    }
                    if(lastName){
                        userData.lastName = lastName;
                    }
                    if(password){
                        userData.hashedPassword = helpers.hash(password);
                    }

                    // store the update
                    _data.update('users',phone,userData,function(err){
                        if(!err){
                            callback(200)
                        }else{
                            console.log(err);
                            callback(500,{'Error':'Could not update the user'})
                        }
                    })
                }else{
                    callback(400,{"Error":"The specified user deoesnt exist"})
                }
            });
            }else{
                callback(403,{'Error':'Missing require token in headers or token is invalid'})
            }
        })
        }else{
            callback(400,{'Error':'Missing fields to update'});
        }
    }else{
        callback(400,{"Error":"Missing required field"});
    }

}

// user -- delete
handlers._users.delete = function(data,callback){
    // check that the phone number is valid
    var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim(): false;
    if (phone){
        // look up to user
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string'? data.headers.token: false;

        handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
            if(tokenIsValid){
                _data.read('users', phone, function(err, userData){
                    if(!err && userData){
                       _data.delete('users', phone, function(err){
                           if(!err){
                            //    delete each of the check associated with the user
                            var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                            var checksToDelete = userChecks.length;
                                if(checksToDelete > 0){
                                    var checksDeleted = 0;
                                    var deletionErrors = false;
                                    // loop through the checks
                                    userChecks.forEach(function(checkId){
                                        // Delete the checks
                                        _data.delete('checks', checkId, function(err){
                                            if(err){
                                                deletionErrors = true;
                                            }
                                            checksDeleted++;
                                            if(checksDeleted == checksToDelete){
                                                if(!deletionErrors){
                                                    callback(200)
                                                }else{
                                                    callback(500,{"Error":"Error encounter while attemping to delete all of the user checks. All checks may not have been deleted from the user system succesfully"})
                                                }
                                            }
                                        });
                                    });
                                }else{
                                    callback(200);
                                }
                           }else{
                            callback(500,{'Error':'Could not delete this user'});
                           }
                       });
                    }else{
                        callback(400,{'Error':'Could not find this user'});
                    }
                });
            }else{
                callback(403,{'Error':'Missing require token in headers or token is invalid'})
            }
        });
    }else{
        callback(400,{'Error':'Missing required field'});
    }
}


// Tokens
handlers.tokens = function(data,callback){
    var acceptableMethods = ['post', 'get', 'put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._tokens[data.method](data,callback)
    }else{
        callback(405);
    }
}

// token container
handlers._tokens = {};

// token - post 
// Required data : phone, password;
// Optional : none

handlers._tokens.post = function(data,callback){
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    
    if(phone&&password){
        // look up to the user who matches with the phone
        _data.read("users",phone,function(err,userData){
            if(!err && userData){
                // hash the sent password and compare it
                var hashedPassword = helpers.hash(password);
                if(hashedPassword == userData.hashedPassword){
                    // if valid Create a new token set expire date to 1 hour in future
                    var tokenId = helpers.createRandomString(20);

                    var expires = Date.now() + 1000 * 60 * 60;
                    var tokenObject = {
                        'phone':phone,
                        'id':tokenId,
                        'expires':expires,
                    }
                    // Store the token
                    _data.create('tokens', tokenId, tokenObject,function(err){
                        if(!err){
                            callback(200, tokenObject);
                        }else{
                            callback(500, {'Error':'Could not create the new token'})
                        }
                    });
                }else{
                    callback(400, {'Error':'Password did not match the spaecified users stored password'})
                }
            }else{
                callback(400,{'Error':'Could not find the specified user'})
            }
        })
    }else{
        callback(400,{'Error':'Missing required field(s)'});
    }
}

// Token - get
// Require data: id
// optional data : none

handlers._tokens.get = function(data, callback){
    // check that the id is valid
    var id = typeof(data.queryStringObject.id) =='string' && data.queryStringObject.id.trim().length ? data.queryStringObject.id.trim(): false;
    if(id){
        // lookup the token
        _data.read('tokens',id, function(err, tokenData){
            if(!err && tokenData){
                callback(200, tokenData);
            }else{
                callback(404)
            }
        })
    }else{
        callback(400,{'Error':'Missing required field'})
    }
}


// token put 
// required field : id, extend
handlers._tokens.put = function(data,callback){
    var id = typeof(data.payload.id) =='string' && data.payload.id.trim().length == 20? data.payload.id.trim(): false;
    var extend = typeof(data.payload.extend) =='boolean' && data.payload.extend == true? true: false;

    if(id && extend){
        // look up to token
        _data.read('tokens',id, function(err,tokenData){
            if(!err && tokenData){
                // Check to make sure the token isn't yet expired
                if(tokenData.expires > Date.now()){
                    // set expiration an 1 hour from now
                    tokenData.expires = Date.now() + 1000 * 60 * 60;

                    // store the new updates
                    _data.update('tokens',id, tokenData, function(err){
                        if(!err){
                            callback(200);
                        }else{
                            callback(500, {'Error':'Could not update the tokens expirarion'});
                        }
                    });
                }else{
                    callback(500, {'Error':'The token has already expired, and cannot be extended'});
                }
            }else{
                callback(400,{'Error':'specified token doesnot exist'});
            }
        })
    }else{
        callback(400,{'Error':'Missing required field(s) or field(s) are invalid'})
    }
}

// Tokens - delete
// Required data : id
// optional data :none
handlers._tokens.delete = function(data, callback){
    // check if the id is valid 
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

    if(id){
        // look up to the token
        _data.read('tokens',id, function(err,data){
            if(!err && data){
                _data.delete('tokens',id,function(err){
                    if(!err){
                        callback(200);
                    }else{
                        callback(500,{'Error':'could not delete the specified token'})
                    }
                });
            }else{
                callback(400,{'Error':'could not find the specified token'});
            }
        })
    }else{
        callback(400,{'Error':'Missing required field'})
    }
}

// Verify if a given token Id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){
    // lookup to tokens
    _data.read('tokens',id,function(err,tokenData){
        if(!err && tokenData){
            // check that the token is for the given user and has not expire
            if(tokenData.phone == phone && tokenData.expires > Date.now()){
                callback(true)
            }else{
                callback(false)
            }
        }else{
            callback(false)
        }
    });
}


// Checks
handlers.checks = function(data,callback){
    var acceptableMethods = ['post', 'get', 'put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._checks[data.method](data,callback)
    }else{
        callback(405);
    }
}

// container for all the checks method
handlers._checks = {};

// Checks - post
// required data : protocol, url, method, successCode, timeoutSeconds
// Optional data : none
handlers._checks.post = function(data,callback){
    // validate inputs 
    var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol: false;
    var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim():false;
    var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds %1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5? data.payload.timeoutSeconds : false;

    if(protocol && url && method && successCodes && timeoutSeconds){
        // Get token from headers
        var token = typeof(data.headers.token) == 'string'? data.headers.token : false;
        // look up the user by reading the token 
        _data.read('tokens',token, function(err, tokenData){
            if(!err && tokenData){
                var userPhone = tokenData.phone;
                // look up the user  by phone
                _data.read('users', userPhone, function(err, userData){
                    if(!err && userData){
                        var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                        // verify that the user has less than the number of maxChecks-per-unit
                        if(userChecks.length < config.maxChecks){
                            // create a random Id for the check
                            var checkId = helpers.createRandomString(20);

                            // Create the check object and include the user's phone
                            var checkObject = {
                                'id':checkId,
                                'userPhone':userPhone,
                                'protocol':protocol,
                                'url':url,
                                'method':method,
                                'successCodes':successCodes,
                                'timeoutSeconds':timeoutSeconds,
                            };

                            // save object
                            _data.create('checks',checkId, checkObject, function(err){
                                if(!err){
                                    // add the checkId to the user object
                                    userData.checks = userChecks,
                                    userData.checks.push(checkId);

                                    // save the new user data
                                    _data.update('users',userPhone, userData, function(err){
                                        if(!err){
                                            // return the data about the new checks
                                            callback(200, checkObject)
                                        }else{
                                            callback(500,{'Error':'Could not update the user with the new check'});
                                        }
                                    })
                                }else{
                                    callback(500,{'Error':'Could not create the new checks'})
                                }
                            })
                        }else{
                            callback(400, {'Error':'The user already has the maximum number of checker('+config.maxChecks+')'});
                        }
                    }else{
                        callback(403);
                    }
                });
            }else{
                callback(403);
            }
        });
    }else{
        callback(400,{'Error':'Missing required input or input are invalid'});
    }
}

// checks - get
// Required data : id
// optional data : none
handlers._checks.get = function(data,callback){
    // check that the phone number is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim(): false;
    if (id){
        _data.read('checks',id,function(err, checkData){
            if(!err && checkData){
                // Get the token from the headers
            var token = typeof(data.headers.token) == 'string'? data.headers.token: false;
            // verify that the given token is valid and belongs to the user who created the check
            handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
                if(tokenIsValid){
                    // return the check data
                    callback(200,checkData);
                }else{
                    callback(403);
                }
            });
            }else{
                callback(403);
            }
        });
    }else{
        callback(400,{'Error':'Missing required field'});
    }
}

// checks - put
// Required data : id
// optional data : protocol,url,method,successCodes,timeoutSeconds (one must be sent);
handlers._checks.put = function(data,callback){
    // check for the required field
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim():false;
    // check the optional fields
    var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol: false;
    var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim():false;
    var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds %1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5? data.payload.timeoutSeconds : false;

    //check to make sure the id is valid 
    if(id){
        // check to make sure one or more optiional field has been sent
        if(protocol || url || method || successCodes || timeoutSeconds){
            // look up to the check
            _data.read('checks',id,function(err, checkData){
                if(!err && checkData){
                    // get the token from the headers
                    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

                    handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
                        if(tokenIsValid){
                            // update the check where is neccersary
                            if(protocol){
                                checkData.protocol = protocol;
                            }
                            if(url){
                                checkData.url = url;
                            }
                            if(method){
                                checkData.method =  method;
                            }
                            if(successCodes){
                                checkData.successCodes = successCodes;
                            }
                            if(timeoutSeconds){
                                checkData.timeoutSeconds = timeoutSeconds;
                            }
                            // store the update
                            _data.update('checks',id,checkData,function(err){
                                if(!err){
                                    callback(200);
                                }else{
                                    callback(500,{'Error':'Could not update the check'})
                                }
                            })
                        }else{
                            callback(403);
                        }
                    })
                }else{
                    callback(400,{'Error':'check ID did not exist'});
                }
            })
        }else{
            callback(400,{'Error':'Missing field to update'});
        }
    }else{
        callback(400,{'Error':'Missing required field'});
    }
}

// checks - delete
handlers._checks.delete = function(data,callback){
    // check that the phone number is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim(): false;
    if (id){
        // look up to check
        _data.read('checks',id, function(err, checkData){
            if(!err && checkData){
                    // Get the token from the headers
                    var token = typeof(data.headers.token) == 'string'? data.headers.token: false;
            
                    handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
                        if(tokenIsValid){
                            // delete the check data
                            _data.delete('checks',id,function(err){
                                if(!err){
                                    // look upto user
                                    _data.read('users',checkData.userPhone, function(err, userData){
                                        if(!err && userData){
                                        var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                                        // remove the deleted from the list of checks
                                        var checkPosition = userChecks.indexOf(id);
                                            if(checkPosition > -1){
                                                userChecks.splice(checkPosition, 1);
                                                // Re-save the user's data
                                                _data.update('users',checkData.userPhone,userData, function(err){
                                                    if(!err){
                                                        callback(200);
                                                    }else{
                                                        callback(500,{'Error':'Could not update this user'});
                                                    }
                                                });

                                            }else{
                                                callback(500,{"Error":"Could not find the check user\'s object, so could not remove it"})
                                            }
                                        }else{
                                            callback(500,{'Error':'Could not find this user the user who created the check, so could not delete the user check from the check list'});
                                        }
                                    });
                                }else{
                                    callback(500,{'Error':'Could not delete the checked data'});
                                }
                            })
                        }else{
                            callback(403)
                        }
                    });
                }else{
                callback(400,{'Error':'The specified check Id does not exist'});
            }
        });
    }else{
        callback(400,{'Error':'Missing required field'});
    }
}

// ping handlers
handlers.ping = function(data, callback){
    // callback a http status code and a payload object
    callback(200,{"Active":'200'});
}
// not found handler
handlers.notFound = function(data,callback){
    callback(404);
}

module.exports = handlers;