"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
// three instruction to handle : INSERT, SELECT? EXIT  
// IMPORT
var readline = require('readline');
var miniSqlPrompt = 'miniSQL$ ';
var rl = readline.createInterface({ input: process.stdin, output: process.stdout }); // , prompt : miniSqlPrompt
var utils_1 = require("./utils");
var fs = require("fs");
var usersDirectory = './dist/users';
var exit = rl.pause();
var returnCreatedEntry = function (id, username) {
    return console.log("added: id=".concat(id, ", username=").concat(username));
};
var returnTotalEntries = function (total) {
    return console.log("found ".concat(total, " entries:"));
};
var usernameInfos = function (id, name) {
    return console.log("-> id=".concat(id, ", username=").concat(name));
};
var checkEntryCommand = function (entry) {
    var entries = entry.split(' ');
    var username = (0, utils_1.createUsername)(entries).slice(1);
    var users = fs.readdirSync(usersDirectory);
    var usernames = [];
    switch (entries[0]) {
        case 'INSERT':
            var userId = users.length + 1;
            var path = usersDirectory + '/' + "".concat(userId, ".minisql");
            (0, utils_1.writeFile)(path, username);
            returnCreatedEntry(userId, username);
            // rl.prompt()
            break;
        //
        case 'SELECT':
            if (username.length === 0) {
                users.map(function (file) {
                    usernames.push((0, utils_1.createCompleteUser)(file));
                });
                usernames.sort(function (previous, next) { return previous.id - next.id; });
                returnTotalEntries(usernames.length);
                var index = 0;
                while (index < usernames.length) {
                    usernameInfos(usernames[index].id, usernames[index].username);
                    index++;
                }
            }
            else {
                users.map(function (file) {
                    usernames.push((0, utils_1.createCompleteUser)(file));
                });
                var findUsername = function (username) {
                    var results = __spreadArray([], usernames, true).filter(function (element) { return element.username === username; });
                    results.sort(function (previous, next) { return previous.id - next.id; });
                    returnTotalEntries(results.length);
                    var index = 0;
                    while (index < results.length) {
                        usernameInfos(results[index].id, results[index].username);
                        index++;
                    }
                };
                findUsername(username);
            }
            // rl.prompt()
            break;
        /**EXIT */
        case 'EXIT':
            if ((0, utils_1.checkExit)(entries)) {
                rl.close();
                return exit;
            }
            else {
                console.log((0, utils_1.errorMessage)(entry));
                // rl.prompt()
            }
            break;
        default:
            console.log((0, utils_1.errorMessage)(entry));
            break;
        // rl.prompt();
    }
    rl.prompt();
};
rl.setPrompt(miniSqlPrompt);
rl.prompt(); // very important ! 
rl.on('line', function (userInput) {
    // if(!userInput){
    //   return rl.prompt()
    // }
    checkEntryCommand(userInput);
    //  console.log("là je viens après la fct");
    // rl.prompt()
});
rl.on("SIGINT", function () {
    console.log((0, utils_1.errorMessage)("CTRL + C"));
    rl.prompt();
});
