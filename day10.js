const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day10Input.txt', 'utf-8');
    let returnVal = contents.split('\n').map((e) => e.trim().split(' '));
    returnVal.pop();
    return returnVal;
}

function day10Part1(input) {
    let cycleNum = 0;
    let register = 1;
    let cycleWait = 0;
    let sumVal = 0;
    let total = 0;
    for (let i = 0; i < input.length; ++i) {
        ++cycleNum;
        if ((cycleNum - 20) % 40 === 0) {
            total += (cycleNum) * register;
        }
        if (input[i][0] === 'addx' && cycleWait === 0) {
            sumVal = parseInt(input[i][1]);
            cycleWait += 1;
            --i;
        }
        else if (input[i][0] === 'addx' && cycleWait < 1) {
            cycleWait += 1;
            --i;
        }
        else if (input[i][0] === 'addx') {
            cycleWait = 0;
            register += sumVal;
        }
        else if (input[i][0] === 'noop' && cycleWait !== 0) {
            ++cycleWait;
        }
    }
    return total;
}

function day10Part2(input) {
    let cycleNum = 0;
    let register = 1;
    let cycleWait = 0;
    let sumVal = 0;
    let curRowString = '';
    for (let i = 0; i < input.length; ++i) {
        ++cycleNum;
        if ((cycleNum - 1) % 40 === 0) {
            console.log(curRowString);
            curRowString = '';
        }
        if (curRowString.length >= register - 1 && curRowString.length <= register + 1) {
            curRowString += '#'
        }
        else {
            curRowString += '.'
        }
        if (input[i][0] === 'addx' && cycleWait === 0) {
            sumVal = parseInt(input[i][1]);
            cycleWait += 1;
            --i;
        }
        else if (input[i][0] === 'addx' && cycleWait < 1) {
            cycleWait += 1;
            --i;
        }
        else if (input[i][0] === 'addx') {
            cycleWait = 0;
            register += sumVal;
        }
        else if (input[i][0] === 'noop' && cycleWait !== 0) {
            ++cycleWait;
        }
    }
    console.log(curRowString);
}

let input = parser();

console.log(day10Part1(input));

day10Part2(input);


