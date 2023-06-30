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
var readline = require("readline");
var miniSqlPrompt = 'miniSQL$ ';
var rl = readline.createInterface({ input: process.stdin, output: process.stdout }); // , prompt : miniSqlPrompt
var utils_1 = require("./utils");
var fs = require("fs");
var usersDirectory = './dist/users';
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
            if (!entries[1]) {
                (0, utils_1.errorMessage)('empty username');
            }
            else {
                var userId = users.length + 1;
                var path = usersDirectory + '/' + "".concat(userId, ".minisql");
                (0, utils_1.writeFile)(path, username);
                returnCreatedEntry(userId, username);
            }
            break;
        // SELECT
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
            break;
        /**EXIT */
        case 'EXIT':
            if ((0, utils_1.checkExit)(entries)) {
                return process.exit();
            }
            else {
                (0, utils_1.errorMessage)(entry);
            }
            break;
        default:
            (0, utils_1.errorMessage)(entry);
            break;
    }
    rl.prompt();
};
rl.setPrompt(miniSqlPrompt);
rl.prompt();
rl.on('line', function (userInput) {
    if (!userInput) {
        return rl.prompt();
    }
    checkEntryCommand(userInput.toString());
});
rl.on("SIGINT", function () {
    (0, utils_1.errorMessage)("CTRL + C");
    rl.prompt();
});
// const readline = require('readline')
// const miniSqlPrompt = 'miniSQL$ '
// const rl = readline.createInterface({input : process.stdin,output : process.stdout}) // , prompt : miniSqlPrompt
// import {errorMessage, checkExit, createUsername, writeFile, returnId, createCompleteUser, returnUsername} from './utils'
// import * as fs from 'fs'
// const usersDirectory = './dist/users'
// // const exit = rl.close()
// const returnCreatedEntry = (id: number, username: string) => {
//   return console.log(`added: id=${id}, username=${username}`);
// }
// const returnTotalEntries = (total: number) => {
//   return console.log(`found ${total} entries:`);
// }
// const usernameInfos = (id: number, name: string) => {
//   return console.log(`-> id=${id}, username=${name}`);
// }
// const checkEntryCommand = (entry: string) => {
//     const entries = entry.split(' ')
//     let username = createUsername(entries).slice(1) 
//     const users = fs.readdirSync(usersDirectory)
//     const usernames: any[] = []
//     switch(entries[0]){        
//         case 'INSERT' : 
//         if(!entries[1]){
//           errorMessage('empty username')
//         }else{
//            let userId = users.length + 1
//         const path = usersDirectory + '/'+ `${userId}.minisql`
//         writeFile(path, username)
//         returnCreatedEntry(userId, username)
//         }
//         break
//       //
//         case 'SELECT' : 
//         if(username.length === 0){
//           users.map(file => {
//           usernames.push(createCompleteUser(file))         
//           })
//           usernames.sort((previous, next) => previous.id - next.id)         
//           returnTotalEntries(usernames.length)
//           let index = 0
//           while(index < usernames.length){
//             usernameInfos(usernames[index].id, usernames[index].username)
//             index++
//           }
//         } else {
//         users.map(file => {
//           usernames.push(createCompleteUser(file))
//         })
//         const findUsername = (username: string) => {
//           const results = [...usernames].filter((element) => element.username === username)
//           results.sort((previous, next) => previous.id - next.id)
//           returnTotalEntries(results.length)
//           let index = 0
//           while(index < results.length){
//             usernameInfos(results[index].id, results[index].username)
//             index++
//           }
//         }
//         findUsername(username)
//       }
//         break
//         /**EXIT */
//         case 'EXIT' : if(checkExit(entries)){
//             return process.exit()
//         } else {
//             errorMessage(entry)
//         }
//         break
//         default : errorMessage(entry)
//         break
//     }
//     rl.prompt()
// } 
// rl.setPrompt(miniSqlPrompt)
// rl.prompt() // very important ! 
// rl.on('line', (userInput: string) => {
//   if(!userInput){
//     return rl.prompt()
//   }
//    checkEntryCommand(userInput.toString())
// })
// rl.on("SIGINT", () => {
//   errorMessage("CTRL + C")
//   rl.prompt()
// })
