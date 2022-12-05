const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day5Input.txt', 'utf-8');
    return contents.split('\n\n');
}



function makeInputIntoStacks(input){
    let stacks = [];
    let stackCountLine = input[input.length - 1].split(/[^0-9]+/).map((value) => parseInt(value)).reduce((acc, e) => e > acc ? e : acc, -1);
    let numLines = input.length - 1;
    for (let i = 0; i < stackCountLine; ++i) {
        stacks.push([]);
    }
    for (let i = 0; i < numLines; ++i) {
        for (let j = 0; j < stackCountLine; ++j) {
            let curBox = input[i][3 * j + 1 + j];
            if (curBox !== ' ') {
                stacks[j].unshift(curBox);
            }
        }
    }
    return stacks;
}

function parseInstructions(input) {
    let commands = input.map((e) => e.split(/[^0-9]+/).map((f) => parseInt(f)).filter((g) => g));
    commands.pop();
    return commands;
}

function day5Part1(input) {
    let boxes = input[0].split('\n');
    let stacks = makeInputIntoStacks(boxes);
    let commands = input[1].split('\n');
    let commandArrs = parseInstructions(commands);
    for (let i = 0; i < commandArrs.length; ++i) {
        let currCommand = commandArrs[i];
        for (let j = 0; j < currCommand[0]; ++j){
           stacks[currCommand[2] - 1].push(stacks[currCommand[1] - 1].pop());
        }
    }
    let returnStr = '';
    for (let i = 0; i < stacks.length; ++i) {
        returnStr += stacks[i][stacks[i].length - 1];
    }
    return returnStr;
}


function day5Part2(input) {
    let boxes = input[0].split('\n');
    let stacks = makeInputIntoStacks(boxes);
    let commands = input[1].split('\n');
    let commandArrs = parseInstructions(commands);
    for (let i = 0; i < commandArrs.length; ++i) {
        let currCommand = commandArrs[i];
        let buffer = [];
        for (let j = 0; j < currCommand[0]; ++j){
           buffer.push(stacks[currCommand[1] - 1].pop());
        }
        buffer.reverse();
        stacks[currCommand[2] - 1] = stacks[currCommand[2] - 1].concat(buffer);
    }
    let returnStr = '';
    for (let i = 0; i < stacks.length; ++i) {
        returnStr += stacks[i][stacks[i].length - 1];
    }
    return returnStr;
}
let input = parser();

console.log(day5Part1(input));

console.log(day5Part2(input));
