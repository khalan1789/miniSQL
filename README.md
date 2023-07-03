# miniSQL
It was the ultimate challenge from Arena01 by TheArenaProject i had to do.  

<h2>What is it ?</h2>
It consists of coding a simplified version of a database.

More specifically, it involves creating a program that allows persisting usernames on the disk and searching for them later.

When starting the program, it should wait for instructions passed on the standard input and react accordingly.

A prefix miniSQL$ should indicate that the program is waiting for instructions, like when opening a shell.

Instructions can be passed by the standart input or via a pipe or in the CLI like ``` echo -e "INSERT julius1\nINSERT julius2\n" | npm run start ```

<h2>How should it works ?</h2>

You start the program with ```npm run start```.

You can pass only these three following instruction : INSERT, SELECT, EXIT .

In case of an unknown instruction, an error message is sended.
An empty instruction will not trigger an error message.

The ```INSERT``` command allows adding a username that will be stored on the disk.
Once the entry is added, a standard confirmation message is displayed to the user.

The ```SELECT``` command takes an optional username argument and returns all matching entries stored on the disk, displaying the number of available results. If no argument is passed to SELECT, all entries must be returned.

The ```EXIT``` command allows you to exit the program with an exit code provided as an argument or 0 if not specified.

<h2>Constraints</h2>

Under no circumstances should the program exit with an error code 1.
It is therefore possible to pass numerous instructions to the program in a row.

But this program does not run as usual.

For this program, I needed to submit a package.json file containing at least the following scripts:

 - ```build ```: this script must compile all your TypeScript files into a folder called dist at the root of your repository. 
 - ```start``` : this script will start your compiled program in the dist folder.

<h2>How to test the result ?</h2>

First clone these repository. Then, go into these repository, and follow these three steps to install it on your computer : 

- 1 : Run ```npm install``` to install all dependencies.
- 2 : When it's done, run ```npm run build``` to install the program.
- 3: You can now launch it, by running ```npm run start```

You can know see my minisql's version 😉