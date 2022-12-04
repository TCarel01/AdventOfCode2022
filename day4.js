const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day4Input.txt', 'utf-8');
    return contents.split(/[.\s]+/);
}


function getRangeAsArr(values) {
    let list = [];
    for (let i = values[0]; i <= values[1]; ++i){
        list.push(i);
    }
    return list;
}
function day4Part1(input) {
    input.pop();
    let ints = input.map((e) => e.split(','));
    ints = ints.map((value) => value.map((curElem) =>getRangeAsArr(curElem.split('-').map((number) => parseInt(number)))));
    return ints.reduce((acc, e) => e[0][0] >= e[1][0] && e[0][e[0].length - 1] <= e[1][e[1].length - 1] || e[0][0] <= e[1][0] && e[0][e[0].length - 1] >= e[1][e[1].length - 1] ? acc + 1 : acc, 0);
}

function day4Part2(input) {
    input.pop();
    let ints = input.map((e) => e.split(','));
    ints = ints.map((value) => value.map((curElem) =>getRangeAsArr(curElem.split('-').map((number) => parseInt(number)))));
    return ints.reduce((acc, e) => e[0].reduce((isOverlap, element) => e[1].findIndex((num) => num === element) !== -1 ? true : isOverlap, false)? acc + 1 : acc, 0);
}


console.log(day4Part1(parser()));

console.log(day4Part2(parser()));