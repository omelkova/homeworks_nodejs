var environments = {};

environments.debug = {
    port: 3000,
    envName: "debug"
}

var currentEnvironment = 'debug';

if (typeof(process.env.NODE_ENV) == 'string') {
    currentEnvironment = process.env.NODE_ENV.toLowerCase;
}

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.debug; 

module.exports = environmentToExport;
