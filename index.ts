import * as readline from 'readline'
const miniSqlPrompt = 'miniSQL$ '
const rl = readline.createInterface({input : process.stdin,output : process.stdout}) // , prompt : miniSqlPrompt
import {errorMessage, checkExit, createUsername, writeFile, returnId, createCompleteUser, returnUsername} from './utils'
import * as fs from 'fs'

const usersDirectory = './users'


const returnCreatedEntry = (id: number, username: string) => {
  return console.log(`added: id=${id}, username=${username}`);
  
}

const returnTotalEntries = (total: number) => {
  return console.log(`found ${total} entries:`);
}
const usernameInfos = (id: number, name: string) => {
  return console.log(`-> id=${id}, username=${name}`);
  
}

const checkEntryCommand = (entry: string) => {
    const entries = entry.split(' ')
    let username = createUsername(entries).slice(1) 
    const users = fs.readdirSync(usersDirectory)
    const usernames: any[] = []

    switch(entries[0]){        
        case 'INSERT' : 
        if(!entries[1]){
          errorMessage('empty username')
        }else{
           let userId = users.length + 1
        const path = usersDirectory + '/'+ `${userId}.minisql`

        writeFile(path, username)
        returnCreatedEntry(userId, username)

        }      
        break

      // SELECT
        case 'SELECT' : 
        if(username.length === 0){
          users.map(file => {
          usernames.push(createCompleteUser(file))         
          })
          usernames.sort((previous, next) => previous.id - next.id)         
          returnTotalEntries(usernames.length)

          let index = 0
          while(index < usernames.length){
            usernameInfos(usernames[index].id, usernames[index].username)
            index++
          }

        } else {
 
        users.map(file => {
          usernames.push(createCompleteUser(file))
        })
        
        const findUsername = (username: string) => {
          const results = [...usernames].filter((element) => element.username === username)
          results.sort((previous, next) => previous.id - next.id)
          returnTotalEntries(results.length)
          let index = 0
          while(index < results.length){
            usernameInfos(results[index].id, results[index].username)
            index++
          }
        }
        findUsername(username)

      }
        break

        /**EXIT */
        case 'EXIT' : if(checkExit(entries)){
            return process.exit()
        } else {
           errorMessage(entry)
        }
        break

        default : errorMessage(entry)
        break
        
    }
    rl.prompt()
} 

rl.setPrompt(miniSqlPrompt)
rl.prompt()  

rl.on('line', (userInput: string) => {
 
  if(!userInput){
    return rl.prompt()
  }
   checkEntryCommand(userInput.toString())

})

rl.on("SIGINT", () => {
  errorMessage("CTRL + C")
  rl.prompt()
})



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
