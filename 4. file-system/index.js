const fs = require('fs');
const path = require('path');

//getting the current directory and joining it with the data folder to get the full path
// of the data folder
const dataFolder = path.join(__dirname, "data");

//creating a folder if it doesn't exist
if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder)
    console.log('data folder created')
}

const filePath = path.join(dataFolder, 'example.txt');
//synchronous way of creating the file and writing to it
fs.writeFileSync(filePath, 'Hello from node js')
console.log('file created successfully')

//reading the file
const readContentFromFile = fs.readFileSync(filePath, 'utf-8');
console.log('File content: ', readContentFromFile)

//append a line to the file
fs.appendFileSync(filePath, '\n This is a new line added to the file')
console.log("new file content added");

//ASYNC way of writing the code
const asyncFilePath = path.join(dataFolder, 'async-example.txt');
fs.writeFile(asyncFilePath, 'Hello, Async node js', (err) => {
    if (err) throw err
    console.log('Async file created successfully')

    fs.readFile(asyncFilePath, 'utf-8', (err, data)=> {
        if (err) throw err
        console.log('Async file content: ', data);
        fs.appendFile(asyncFilePath, '\n This is a new line added to the file', (err) => {
            if (err) throw err
            console.log("new line added to the async file");
            fs.readFile(asyncFilePath, 'utf-8', (err, updatedData) => {
                if(err) throw err;
                console.log('Updated file content', updatedData);
        })
    })
})
})