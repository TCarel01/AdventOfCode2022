const fs = require("fs");
const { parse } = require("path");

function parser(){
    const contents = fs.readFileSync('day7Input.txt', 'utf-8');
    return contents.split('$ ').filter((x) => x !== '').map((e) => e.split('\n'));
}

function sum(arr) {
    return arr.reduce ((acc, e) => acc + e, 0);
}
function parseFileSystem(fileSystem) {
    let fileSizes = 0;
    let dirSizes = 0;
    let returnValSize = 0;
    let directoryValues = [];
    for (let entry in fileSystem) {
        if (typeof(fileSystem[entry]) === 'number') {
            fileSizes += fileSystem[entry];
            returnValSize += fileSystem[entry];
        }
        else {
            let dirSize = parseFileSystem(fileSystem[entry]);
            dirSizes += dirSize[0];
            directoryValues.push(dirSize[1]);
        }
    }
    if (fileSizes + dirSizes > 100000) {
        return [dirSizes + fileSizes, sum(directoryValues)];
    }
    return [fileSizes + dirSizes, returnValSize + 2 * sum(directoryValues)];
}

function findTotalSpace(fileSystem) {
    let size = 0;
    for (let entry in fileSystem) {
        if (typeof(fileSystem[entry]) === 'number') {
            size += fileSystem[entry];
        }
        else {
            size += findTotalSpace(fileSystem[entry]);
        }
    }
    return size;
}

function findSmallestDir(fileSystem, minSize, smallestDir) {
    let size = 0;
    for (let entry in fileSystem) {
        if (typeof(fileSystem[entry]) === 'number') {
            size += fileSystem[entry];
        }
        else {
            let values = findSmallestDir(fileSystem[entry], minSize, smallestDir)
            size += values[0];
            smallestDir = values[1];
        }
    }
    if (size > minSize && (size < smallestDir || smallestDir === -1)){
        return [size, size];       
    }
    return [size, smallestDir];
}

function fileSystemParser(input){
    let fileSystem = {'/': {}};
    let path = '/';
    for (let i = 0; i < input.length; ++i) {
        input[i].pop();
        let command = input[i][0].split(' ');
        switch (command[0]) {
            case 'cd':
                if (command[1] === '/'){
                    path = '/'
                }
                else if (command[1] === '..') {
                    path = path.substring(0, path.lastIndexOf('/'));
                }
                else {
                    path += path[path.length - 1] === '/' ? command[1] : '/' + command[1];
                }
                break;
            case 'ls':
                let parsePath = ['/'].concat(path.split('/')).filter((e) => e !== '');
                parsePath.reverse()
                let curDirectoryJson = fileSystem;
                while (parsePath.length !== 0) {
                    let instruction = parsePath.pop();
                    curDirectoryJson = curDirectoryJson[instruction];
                }

                let dirContents = input[i].slice(1, input[i].length).map((e) => e.split(' '));
                for (let j = 0; j < dirContents.length; ++j) {
                    if (dirContents[j][0] === 'dir' && !curDirectoryJson[dirContents[j][1]]) {
                        curDirectoryJson[dirContents[j][1]] = {};
                    }
                    else if (dirContents[j][0] !== 'dir'){
                        curDirectoryJson[dirContents[j][1]] = parseInt(dirContents[j][0]);
                    }
                }
            }
        }
        return fileSystem;
    }

function day7Part1(input) {
    return parseFileSystem(fileSystemParser(input))[1];
}

function day7Part2(input) {
    let fileSystem = fileSystemParser(input);
    let availableSpace = 70000000 - findTotalSpace(fileSystem);
    return findSmallestDir(fileSystem, 30000000 - availableSpace, -1)[1];
}

let input = parser();

let input2 = parser();

console.log(day7Part1(input));

console.log(day7Part2(input2));