/*
 *Server-related task
 */

// Dependencies
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var config = require("./config");
var fs = require("fs");
var handlers = require("./handlers");
var helpers = require("./helpers");
var path = require("path");
var util = require("util");
const { type } = require("os");
var debug = util.debuglog("server");

// Instantiate the server module object
var server = {};

// Instantiate the http server
server.httpServer = http.createServer(function (req, res) {
  server.unifiedSever(req, res);
});

// Instantiate the http server

server.httpsServerOption = {
  key: fs.readFileSync(path.join(__dirname, "/../https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../https/cert.pem")),
};

server.httpsServer = https.createServer(
  server.httpsServerOption,
  function (req, res) {
    server.unifiedSever(req, res);
  }
);

//All the server logic for both the http and https server
server.unifiedSever = function (req, res) {
  // get url and parse it
  var parseUrl = url.parse(req.url, true);

  //get the path
  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // get method
  var method = req.method.toLocaleLowerCase();

  // get the query string as an object
  var queryStringObject = parseUrl.query;

  // get the headers as an object
  var headers = req.headers;

  // get the payload
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    // choose the handler this request go to , if one is not found, use the not found handler
    var chosenHandler =
      typeof server.router[trimmedPath] !== "undefined"
        ? server.router[trimmedPath]
        : handlers.notFound;

    //  If the request is with in the public
    chosenHandler =
      trimmedPath.indexOf("public/") > -1 ? handlers.public : chosenHandler;

    // construct the data object to send to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // route the request to the header specified in the router
    try {
      chosenHandler(data, function (statusCode, payload, contentType) {
        server.processHandlerResponse(
          res,
          method,
          trimmedPath,
          statusCode,
          payload,
          contentType
        );
      });
    } catch (e) {
      debug(e);
      server.processHandlerResponse(
        res,
        method,
        trimmedPath,
        500,
        { Error: "An unknown Error has occured" },
        "json"
      );
    }
  });
};

// To process the response from the hanlders
server.processHandlerResponse = function (
  res,
  method,
  trimmedPath,
  statusCode,
  payload,
  contentType
) {
  // Determine the type of response callback to json
  contentType = typeof contentType == "string" ? contentType : "json";

  // use the statusCode called back by handler, or default 200
  statusCode = typeof statusCode == "number" ? statusCode : 200;

  // return respond part that are content specific
  var payloadString = "";
  if (contentType == "json") {
    res.setHeader("Content-Type", "application/json");
    payload = typeof payload == "object" ? payload : {};
    var payloadString = JSON.stringify(payload);
  }
  if (contentType == "html") {
    res.setHeader("Content-Type", "text/html");
    payloadString = typeof payload == "string" ? payload : "";
  }
  if (contentType == "favicon") {
    res.setHeader("Content-Type", "img/x-icon");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }
  if (contentType == "css") {
    res.setHeader("Content-Type", "text/css");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }
  if (contentType == "png") {
    res.setHeader("Content-Type", "image/png");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }
  if (contentType == "jpg") {
    res.setHeader("Content-Type", "image/jpg");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }
  if (contentType == "plain") {
    res.setHeader("Content-Type", "text/plain");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }

  //  Return the response-parts that are common to all content-type
  res.writeHead(statusCode);
  res.end(payloadString);

  // If the response is 200, print green otherwise print red
  if (statusCode == 200) {
    debug(
      "\x1b[32m%s\x1b[0m",
      method.toUpperCase() + " /" + trimmedPath + " " + statusCode
    );
  } else {
    debug(
      "\x1b[31m%s\x1b[0m",
      method.toUpperCase() + " /" + trimmedPath + " " + statusCode
    );
  }
};
// Define the router
server.router = {
  "": handlers.index,
  "account/create": handlers.accountCreate,
  "account/edit": handlers.accountEdit,
  "account/deleted": handlers.accountDeleted,
  "session/create": handlers.sessionCreate,
  "session/deleted": handlers.sessionDeleted,
  "checks/all": handlers.checksList,
  "checks/create": handlers.checksCreate,
  "checks/edit": handlers.checksEdit,
  ping: handlers.ping,
  "api/users": handlers.users,
  "api/tokens": handlers.tokens,
  "api/checks": handlers.checks,
  "favicon.ico": handlers.favicon,
  public: handlers.public,
  "example/error": handlers.exampleError,
};

// Init script
server.init = function () {
  // Start the http server
  server.httpServer.listen(config.httpPort, function () {
    console.log(
      "\x1b[35m%s\x1b[0m",
      "The Server is listening on port " +
        config.httpPort +
        " in " +
        config.envName +
        " model."
    );
  });

  // Start the https server
  server.httpsServer.listen(config.httpsPort, function () {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "The Server is listening on port " +
        config.httpsPort +
        " in " +
        config.envName +
        " model."
    );
  });
};

// Eport the module
module.exports = server;
