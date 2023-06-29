"use strict";
exports.__esModule = true;
exports.createCompleteUser = exports.returnUsername = exports.returnId = exports.usersDirectory = exports.writeFile = exports.checkExit = exports.createUsername = exports.errorMessage = void 0;
var errorMessage = function (instruction) {
    var illegalInstruction = "illegal instruction: ".concat(instruction, "\n       usage: INSERT username\n       SELECT [username]\n       EXIT [code]");
    return illegalInstruction;
};
exports.errorMessage = errorMessage;
var createUsername = function (entries) {
    var username = '';
    for (var i = 1; i < entries.length; i++) {
        username = username + ' ' + entries[i];
    }
    return username;
};
exports.createUsername = createUsername;
var checkExit = function (entries) {
    if (!entries[1]) {
        return true;
    }
    else {
        if (entries.length > 2) {
            return false;
        }
        var argValue = parseInt(entries[1]);
        if (isNaN(argValue)) {
            return false;
        }
        else {
            return argValue === 1 ? true : false;
        }
    }
};
exports.checkExit = checkExit;
var fs = require("fs");
var writeFile = function (path, buffer) {
    var fd = fs.openSync(path, 'w+');
    return fs.writeSync(fd, buffer);
};
exports.writeFile = writeFile;
exports.usersDirectory = './dist/users';
var returnId = function (filename) {
    return filename.split('.')[0];
};
exports.returnId = returnId;
var returnUsername = function (filename) {
    var fd = exports.usersDirectory + '/' + filename;
    return fs.readFileSync(fd).toString();
};
exports.returnUsername = returnUsername;
var createCompleteUser = function (file) {
    return { username: (0, exports.returnUsername)(file), id: (0, exports.returnId)(file) };
};
exports.createCompleteUser = createCompleteUser;
