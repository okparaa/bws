/**
 * Module dependencies
 */
var fs   = require('fs');
var path = require('path');
var cliStyles = require('./cliStyles');

/**
 * Create a directory if not defined
 * @param {string} dirPath directory path parent
 * @param {string} dirName directory name to find
 * @param {function} cb callback
 */
function createDirIfIsNotDefined(dirPath, dirName, cb) {
    if (!fs.existsSync(dirPath + '/' + dirName)){
        fs.mkdirSync(dirPath + '/' + dirName);
        console.info(cliStyles.cyan + '\tcreate' + cliStyles.reset + ': ' + dirPath + '\\' + dirName);
    }

    cb();
}

/**
 * Write a file
 * @param {string} path file path to write
 * @param {string} contents file contents to write
 * @param {int} mode write mode
 * @param {function} cb callback
 */
function writeFile(path, contents, mode, cb) {
    try{
        fs.writeFileSync(path, contents, {mode: mode || 0666, encoding: 'utf8', flag: 'w+'});
        console.info(cliStyles.cyan + '\tcreate' + cliStyles.reset + ': ' + path);
        cb();
    }catch(err){
        throw err;
    }
}

/**
 * Load a template
 * @param {string} name template name
 * @returns {string} template contents
 */
function loadTemplateSync(name) {
    return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf8');
}

function readFileSync(name) {
    return fs.readFileSync(name, 'utf8');
}

module.exports = {
    createDirIfIsNotDefined: createDirIfIsNotDefined,
    readFileSync: readFileSync,
    writeFile: writeFile,
    loadTemplateSync: loadTemplateSync
};
