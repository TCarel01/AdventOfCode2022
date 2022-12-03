const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day3Input.txt', 'utf-8');
    return contents.split('\n');
}


function findPriority(elem){
    elem = elem.charCodeAt(0);
    let returnVal = elem >= 'a'.charCodeAt(0) && elem <= 'z'.charCodeAt(0) ? elem - 'a'.charCodeAt(0) + 1 : elem - 'A'.charCodeAt(0) + 27;
    return returnVal;
}



function part1(input) {
    input = input.map((value) => [value.slice(0, value.length / 2), value.slice(value.length / 2, value.length)]);
    input.pop();
    let totalValue = 0;
    for (let i = 0; i < input.length; ++i) {
        let firstHalfArr = input[i][0].split('');
        let secondHalfArr = input[i][1].split('');
        totalValue += firstHalfArr.reduce((acc, e) => secondHalfArr.findIndex((val) => val === e) !== -1 && acc === 0 ? 
                                                        findPriority(e) : acc, 0);
        let x = 2;
    }
    return totalValue;
}

function part2(input) {
    input.pop;
    let elfGroupsList = [];
    let curElves = [];
    for (let i = 0; i < input.length; ++i) {
        if (i % 3 === 0 && i !== 0) {
            elfGroupsList.push(curElves);
            curElves = [];
        }
        curElves.push(input[i]);
    }
    let x = 2;
    let totalSum = 0;
    for (let i = 0; i < elfGroupsList.length; ++i) {
        firstElf = elfGroupsList[i][0].split('');
        secondElf = elfGroupsList[i][1].split('');
        thirdElf = elfGroupsList[i][2].split('');
        let priority = firstElf.reduce((acc, e) => secondElf.findIndex((val) => val === e) !== -1
                                                                && thirdElf.findIndex((val) => val === e) !== -1 &&
                                                                acc === 0 ? e : acc, 0);
        totalSum += findPriority(priority);
    }
    return totalSum;
}

let input = parser();

console.log(part1(input));

console.log(part2(input));