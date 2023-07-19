
export const errorMessage = (instruction: string) => {
       let illegalInstruction = `illegal instruction: ${instruction}
       usage: INSERT username
       SELECT [username]
       EXIT [code]`
      return console.log(illegalInstruction)
       
}

export type ExtractFn = (entries: string[]) => string
export const createUsername: ExtractFn = (entries: string[]) => {
    let username = ''
    for(let i = 1 ; i < entries.length; i++){
        username = username + ' ' + entries[i]
    }
    return username
}

export const checkExit = (entries: string[]) => {
    if(!entries[1]){
        return true
    } else {
        // if(entries.length > 2) {
        //     return false       
        // }
        let argValue = parseInt(entries[1])
        if(isNaN(argValue)){
            return false
        } else {
          return argValue >= 0 && argValue <= 255 ? true : false  
        }
    } 
}

type WriteFileSyncFn = (path: string, buffer: string) => number
import * as fs from 'fs'

export const writeFile: WriteFileSyncFn = (path: string, buffer: string) => {
    const fd = fs.openSync(path, 'w+')
    return fs.writeSync(fd, buffer)
    
} 

export const usersDirectory = './users'
export const returnId = (filename: string) => {
          return filename.split('.')[0]
        }
export const returnUsername = (filename: string) => {
          const fd = usersDirectory + '/' + filename
          return fs.readFileSync(fd).toString()
         } 
export const createCompleteUser = (file: string) => {
 return { username : returnUsername(file), id: returnId(file)}
}