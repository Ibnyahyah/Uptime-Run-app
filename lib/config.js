/*
Create and export config variables
*/

const env = require('dotenv');
env.config();

// Container for all the environment
var environments = {};

// Staging {default} environment
environments.staging = {
  httpPort: process.env.PORT || 3000,
  httpsPort: process.env.PORT || 3001,
  envName: "staging",
  hashingSecret: "thisIsASecret",
  maxChecks: 5,
  twilio: {
    accountSid: "AC560d7222ee03ae46f97f6acf94f5df7f",
    authToken: "faf49cae96c5a9927376770c9001360a",
    fromPhone: "+19378822597",
  },
  templateGlobals: {
    appName: "UptimeChecker",
    companyName: "NotARealCompany",
    yearCreated: "2022",
    baseUrl: "http://localhost:3000/",
  },
};

// production envirionment
environments.production = {
  httpPort: process.env.PORT,
  httpsPort: process.env.PORT,
  envName: "production",
  hashingSecret: "thisIsASecret",
  maxChecks: 5,
  twilio: {
    accountSid: "AC560d7222ee03ae46f97f6acf94f5df7f",
    authToken: "faf49cae96c5a9927376770c9001360a",
    fromPhone: "+19378822597",
  },
  templateGlobals: {
    appName: "UptimeChecker",
    companyName: "NotARealCompany",
    yearCreated: "2018",
    baseUrl: "http://localhost:3001/",
  },
};

// Determine which enviromennt was passed as acommand argument
var currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : " ";

// check that the current environment is one of the environment above, if not use default to staging
var environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;
