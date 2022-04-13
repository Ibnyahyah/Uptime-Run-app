/*
Create and export config variables
*/

// Container for all the environment
var environments = {};

// Staging {default} environment
environments.staging = {
  httpPort: 3000,
  httpsPort:3001,
  envName: "staging",
  hashingSecret: "thisIsASecret",
  maxChecks: 5,
  twilio: {
    accountSid: process.env.ACCOUNTS_ID,
    authToken: process.env.AUTH_TOKEN,
    fromPhone: process.env.PHONE_NUMBER,
  },
  templateGlobals: {
    appName: "UptimeChecker",
    companyName: "whitecode, inc",
    yearCreated: "2022",
    baseUrl: "http://localhost:3000/",
  },
};

// production envirionment
environments.production = {
  httpPort: process.env.httpPORT || 5000,
  httpsPort: process.env.PORT || 5001,
  envName: "production",
  hashingSecret: "thisIsASecret",
  maxChecks: 5,
  twilio: {
    accountSid: process.env.ACCOUNTS_ID,
    authToken: process.env.AUTH_TOKEN,
    fromPhone: process.env.PHONE_NUMBER,
  },
  templateGlobals: {
    appName: "UptimeChecker",
    companyName: "whitecode, inc",
    yearCreated: "2022",
    baseUrl: "http://localhost:3001/",
  },
};

// Determine which enviromennt was passed as a command argument
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
