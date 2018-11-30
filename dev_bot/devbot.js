#!/usr/bin/env node

var async = require('async');
var readline = require('readline');
var generators = require('./lib/generators');
var cliStyles = require('./lib/cliStyles');
var pathy = require('path');
var fs = require('fs');

var rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
});

// Main program
(function (path) {
    runInteractiveMode(path);
})('.');

/**
 * Get parameters in interactive mode
 * @param {string} path destination path
 * @param {boolean} ts generating code in TS
 */
function runInteractiveMode (path) {
    async.series({
            controller: function (cb) {
                askQuestion("What is the Controller/Page/Duck directory name: ", isPageNameParamValid, function (name) {
                    //console.log(cliStyles.green + "Page name must not contain special chars" + cliStyles.reset);
                    cb(null, name);
                });
            },
            action: function (cb) {
                askQuestion("What is the page/duck/action: ", isPageNameParamValid, function (name) {
                    //console.log(cliStyles.green + "Page name must not contain special chars" + cliStyles.reset);
                    cb(null, name);
                });
            },
            allow: function (cb) {
                askQuestion("What is the role to allow: ", isPermissionParamValid, function (allow) {
                    allow = (allow.trim().length === 0) ? 'ignore' : allow;
                    cb(null, allow);
                });
            },
            deny: function (cb) {
                askQuestion("What is the role to deny: ", isPermissionParamValid, function (deny) {
                    deny = (deny.trim().length === 0) ? 'ignore' : deny;
                    cb(null, deny);
                });
            },
        },
        function (err, results) {
            if (err) {
                return closeProgram();
            }
            async.parallel([
                    function (cb) {
                        var path_to_pages = pathy.join(path, 'src', 'pages', results.controller);
                        generators.generatePage(path, path_to_pages, results.action, results.controller, cb);
                    },
                    function (cb) {
                        var path_to_ducks = pathy.join(path, 'src', 'ducks', results.controller);
                        generators.generateDuck(path, path_to_ducks, results.action, cb);
                    },
                    function (cb) {
                        generators.generateSCSS(path, results.controller, cb);
                    },
                    function (cb) {
                        var path_to_app = pathy.join(path, '..', '..', 'src', 'components');
                        generators.updateApp(path, path_to_app, results.controller, results.action, cb);
                    },
                    function (cb) {
                        generators.generateActionController(path, results.controller, results.action, cb);
                    },
                    function (cb) {
                        generators.generateAPIRepo(path, results.controller, cb);
                    },
                    function (cb) {
                        generators.generateAPIForm(path, results.controller, cb);
                    },
                    function (cb) {
                        generators.generateApiACL(path, results.controller, results.action, results.allow, results.deny, cb);
                    }
                ],
                function (err, results) {
                    console.log('Task completed successfully');
                    closeProgram();
                }
            );
        }
    );
}
/**
 * Ask a question in the console and waits for a response
 * if the answer is invalid, the question is recalled
 * @param {string} question input question in the console
 * @param {function} validate validation function (nullable)
 * @param {function} callback callback function
 */
function askQuestion(question, validate, callback) {
    rl.question(question, function(answer) {
        if (validate) {
            if (!validate(answer)) {
                askQuestion(question, validate, callback);
                return ;
            }
        }else{
            console.log('invalid');
        }
        callback(answer);
    });
}

/**
 * Close the program
 */
function closeProgram() {
    rl.close();
    process.exit();
}

/**
 * Validate model name input
 * @param {string} name
 * @returns {boolean} is validated
 */
function isPageNameParamValid(name) {
    if (!name || name.trim().length === 0) {
        consoleError("Page name must be given");
        return false;
    }
    return true;
}
/**
 * Validate model name input
 * @param {string} name
 * @returns {boolean} is validated
 */
function isPermissionParamValid(name) {
    if (!name || name.trim().length === 0) {
        name = 'ignore';
    }
    return true;
}

function consoleError(msg) {
    return console.log(cliStyles.red + msg + cliStyles.reset);
}