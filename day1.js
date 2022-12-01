const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day1Input.txt', 'utf-8');
    return contents;
}

let input = parser();

function parseDay1(input){
    let arrInput = input.split('\n');
    let returnArr = arrInput.map((value) => value !== '\r' ? parseInt(value) : -1);
    returnArr.push(-1);
    return returnArr;
}

let parsedInput = parseDay1(input);

function day1Part1(input){
    let maxCal = 0;
    let localMaxCal = 0;
    for (let i = 0; i < parsedInput.length; ++i) {
        if (parsedInput[i] !== -1){
            localMaxCal += parsedInput[i];
        }
        else {
            if (localMaxCal > maxCal){
                maxCal = localMaxCal;
            }
            localMaxCal = 0;
        }
    }
    return maxCal;
}

function day1Part2(input){
    let maxCals = [0, 0, 0];
    let localMaxCal = 0;
    for (let i = 0; i < parsedInput.length; ++i) {
        if (parsedInput[i] !== -1){
            localMaxCal += parsedInput[i];
        }
        else {
            maxCals.sort(function(a, b) {
                if (a < b) {
                    return -1;
                }
                return 1;
            });
            for (let j = 0; j < maxCals.length; ++j) {
                if (localMaxCal > maxCals[j]) {
                    maxCals[j] = localMaxCal;
                    break;
                }
            }
            localMaxCal = 0;
        }

    }
    return maxCals[0] + maxCals[1] + maxCals[2];
}

console.log(day1Part1(parsedInput));

console.log(day1Part2(parsedInput));