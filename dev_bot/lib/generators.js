/**
 * Module dependencies
 */
var ft = require('./fileTools');
var os = require('os');
var pathy = require('path');
var fs = require('fs');
/**
 * Generate a Page
 * @param {string} path
 * @param {string} pageName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generatePage(path, pagePath, pageName, pageDir, cb) {
    var extension =  'js';
    if(fs.existsSync(path + '\\' + pagePath + '-pages\\' + pageName + '.' + extension)){
        console.log('Exiting... Page Exists @ ' + path + '\\' + pagePath + '-pages\\' + pageName + '.' + extension);
        cb();
    }else{
        var page = ft.loadTemplateSync('page.' + extension);
        page = page.replace(/__pageScss__/, pageDir);
        page = page.replace(/__pageDir__/, pageDir);
        page = page.replace(/__page__/, fcLower(ucwords(pageName)));
        page = page.replace(/__page__/, fcLower(ucwords(pageName)));
        page = page.replace(/__page__/, pageName);
        page = page.replace(/__page__/g, fcLower(ucwords(pageName)));
        page = page.replace(/__pageClass__/g, ucwords(pageName));
        ft.createDirIfIsNotDefined(path, pagePath + '-pages', function () {
            ft.writeFile(path + '\\' + pagePath + '-pages\\' + pageName + '.' + extension, page, null, cb);
        });
    }
}

/**
 * Generate a Express router
 * @param {string} path
 * @param {string} modelName
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateDuck(path, duckPath, duckName, cb) {
    var extension =  'js';
    if(fs.existsSync(path + '\\' + duckPath + '-ducks\\' + duckName + '.' + extension)){
        console.log('Exiting... Duck exists @ ' + path + '\\' + duckPath + '-ducks\\' + duckName + '.' + extension);
        cb();
    }else{
        var duck = ft.loadTemplateSync('duck.' + extension);
        
        duck = duck.replace(/__duck__/g, fcLower(ucwords(duckName))); 
        ft.createDirIfIsNotDefined(path, duckPath + '-ducks', function () {
            ft.writeFile( path + '\\' + duckPath + '-ducks\\' + duckName + '.' + extension, duck, null, cb);
        });
    }
}

/**
 * Generate a Express router
 * @param {string} path
 * @param {string} modelName
 * @param {string} generateMethod
 * @param {function} cb
 */
function updateApp(path, appDir, pageDir, pageName, cb) {
   var extension =  'js';    
   
   var appFile = pathy.join(__dirname, '..', '..', 'src', 'components', 'App.js');
   var app = ft.readFileSync(appFile);
   
   if(app.indexOf(ucwords(pageName)) !== -1){
       console.log('Exiting... Component ' + ucwords(pageName) + ' already imported');
       cb();
    }else{
        var componentImport =  ft.loadTemplateSync('component-import.' + extension);
        componentImport = componentImport.replace(/__pageDir__/, pageDir);
        componentImport = componentImport.replace(/__componentName__/g, pageName);
        componentImport = componentImport.replace(/__component__/, ucwords(pageName));
        
        var componentElement =  ft.loadTemplateSync('component-element.' + extension);
        componentElement = componentElement.replace(/__component-dir__/, pageDir);
        componentElement = componentElement.replace(/__component-path__/, pageName);
        componentElement = componentElement.replace(/__component__/, ucwords(pageName));
        app = app.replace(/\/\/ __component__/, componentImport);
        app = app.replace(/\{\/\* __componentElement__ \*\/\}/, componentElement);
        console.log('updating... App file');
        ft.writeFile(appFile, app, null, cb);
    }
}

/**
 * Generate Controller
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateActionController(path, controllerName, actionName, cb) {
    var extension = 'js';
    var controllerFile = pathy.join(__dirname, '..', '..', '..', 'univas.org', 'Controller', ucwords(controllerName) + 'Controller.php');
    
    if(fs.existsSync(controllerFile)){
        var controller = ft.readFileSync(controllerFile);
    }else{
        var controller = ft.loadTemplateSync('controller.' + extension);
        controller = controller.replace(/__controller__/, ucwords(controllerName));
    }
    if(controller.indexOf(fcLower(ucwords(actionName)) + 'Action') !== -1){
        console.log('Exiting... Action ' + fcLower(ucwords(actionName)) + ' already in controller.');
        cb();
    }else{
        var action = ft.loadTemplateSync('controller-action.' + extension);
        action = action.replace(/__action__/, fcLower(ucwords(actionName)));
        controller = controller.replace(/\/\/ __action__/, action);
        console.log('updating... controller file');
        ft.writeFile(controllerFile, controller, null, cb);
    }
}
/**
 * Generate Repository
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateAPIRepo(path, repositoryName, cb) {
    var extension = 'js';
    var repositoryFile = pathy.join(__dirname, '..', '..', '..', 'univas.org', 'Repository', ucwords(repositoryName) + 'Repository.php');
    
    if(fs.existsSync(repositoryFile)){
        console.log('Exiting... repository exists @ ' + repositoryFile);
        cb();
    }else{
        var repository = ft.loadTemplateSync('api-repository.' + extension);
        repository = repository.replace(/__repository__/, ucwords(repositoryName));
        repository = repository.replace(/__repository__/, ucwords(repositoryName));
        console.log('creating... repository file');
        ft.writeFile(repositoryFile, repository, null, cb);
    }
}

/**
 * Generate Form
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateAPIForm(path, formName, cb) {
    var extension = 'js';
    var formFile = pathy.join(__dirname, '..', '..', '..', 'univas.org', 'Form', ucwords(formName) + 'Form.php');
    
    if(fs.existsSync(formFile)){
        console.log('Exiting... form exists @ ' + formFile);
        cb();
    }else{
        var form = ft.loadTemplateSync('api-form.' + extension);
        form = form.replace(/__form__/, ucwords(formName));
        console.log('creating... form file');
        ft.writeFile(formFile, form, null, cb);
    }
}

function generateSCSS(path, scssName, cb) {
    var scssFile = pathy.join(__dirname, '..', '..', 'src', 'public', 'styles', scssName + '.scss');
    if(fs.existsSync(scssFile)){
        console.log('Exiting... scss exists @ ' + scssFile);
        cb();
    }else{
        console.log('writing... scss file');
        ft.writeFile(scssFile, '/*  ' + scssName + '  */', null, cb);
    }
    
}

/**
 * Generate Controller
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateApiACL(path, controllerName, actionName, allowRole, denyRole, cb) {
    var extension = 'js';
    var aclFile = pathy.join(__dirname, '..', '..', '..', 'univas.org', 'config', 'acl.global.php');
    
    if(fs.existsSync(aclFile)){
        var acl = ft.readFileSync(aclFile);
        allowIndex = acl.indexOfAfter('Controller\\' + ucwords(controllerName), acl.indexOf('allow'));
        denyIndex = acl.indexOfAfter('Controller\\' + ucwords(controllerName), acl.indexOf('deny'));
        
        
        if(allowRole !== 'ignore'){
            var actionAllow = ft.loadTemplateSync('action-allow-perm.' + extension);
            actionAllow = actionAllow.replace(/__action__/, actionName);
            actionAllow = actionAllow.replace(/__permission__/, allowRole);
    
            var controllerAllowPerm = '';
            if(allowIndex === -1){
                console.log('writing')
                controllerAllowPerm = ft.loadTemplateSync('controller-allow-perm.' + extension);
                controllerAllowPerm = controllerAllowPerm.replace(/__controller__/, ucwords(controllerName));
                controllerAllowPerm = controllerAllowPerm.replace(/\/\/ __allowActionPerm__/, actionAllow);
                acl = acl.replaceAfter(/\/\/ __allowControllerAction__/, controllerAllowPerm, acl.indexOf('allow'));       
            }else{
                var allowPos = acl.indexOfAfter('Controller\\' + ucwords(controllerName), acl.indexOf('allow'));
                acl = acl.replaceAfter(/\/\/ __allowActionPerm__/, actionAllow, allowPos);
            }
        }
        if(denyRole !== 'ignore'){
            console.log('denyIndex ' + denyIndex + ', allowIndex ' + allowIndex);
            var controllerDenyPerm = '';
            var actionDeny = ft.loadTemplateSync('action-deny-perm.' + extension);
            actionDeny = actionDeny.replace(/__action__/, actionName);
            actionDeny = actionDeny.replace(/__permission__/, denyRole);
            
            if(denyIndex === -1){
                console.log('writing')
                controllerDenyPerm = ft.loadTemplateSync('controller-deny-perm.' + extension);
                controllerDenyPerm = controllerDenyPerm.replace(/__controller__/, ucwords(controllerName));
                controllerDenyPerm = controllerDenyPerm.replace(/\/\/ __denyActionPerm__/, actionDeny);
                acl = acl.replaceAfter(/\/\/ __denyControllerAction__/, controllerDenyPerm, acl.indexOf('deny'));
            }else{
                var denyPos = acl.indexOfAfter('Controller\\' + ucwords(controllerName), acl.indexOf('deny'));
                acl = acl.replaceAfter(/\/\/ __denyActionPerm__/, actionDeny, denyPos);
            }
        }

        if(denyRole !== 'ignore' || allowRole !== 'ignore'){
            ft.writeFile(aclFile, acl, null, cb);
        }else{
            cb();
        }
    }else{
        console.log('Exiting... ACL file does not exist.'); 
        cb();
    }
}

function ucwords(str){
    var words = str.replace(/\-/g, ' ').toLowerCase().replace(/\b./g, function(a){
        return a.toUpperCase();
    });
    return words.replace(/\s+/g, '')
}

function fcLower(str){
    return str.replace(/\b./g, function(a){
        return a.toLowerCase();
    });
}

String.prototype.replaceAfter = function(search, replace, after){
    if(this.length > after){
        return this.slice(0, after) + this.slice(after).replace(search, replace);
    }
    return this;
}
String.prototype.indexOfAfter = function(search, after){
    if(this.length > after && this.slice(after).indexOf(search) !== -1){
        return this.slice(0, after).length + this.slice(after).indexOf(search);
    }
    return -1;
}

module.exports = {
    generatePage: generatePage,
    generateDuck: generateDuck,
    generateSCSS: generateSCSS,
    generateActionController: generateActionController,
    updateApp: updateApp,
    generateAPIRepo: generateAPIRepo,
    generateApiACL: generateApiACL,
    generateAPIForm: generateAPIForm
};