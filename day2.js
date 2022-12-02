const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day2Input.txt', 'utf-8');
    return contents;
}


let scores = {'A': 1, 'B': 2, 'C': 3, 'X': 1, 'Y': 2, 'Z': 3};

function parseDay2(input){
    return input.split('\n');
}

function day2part1(input) {
    return input.map((value) => value.split(' '));
}


function findScore(games) {
    let totalScore = 0;
    for (let i = 0; i < games.length - 1; ++i) {
        let myMove = games[i][1];
        totalScore += scores[myMove];
        switch (myMove) {
            case 'X': 
                totalScore += games[i][0] === 'A' ? 3 : 0;
                totalScore += games[i][0] === 'C' ? 6 : 0;
                break;
            case 'Y':
                totalScore += games[i][0] === 'A' ? 6 : 0;
                totalScore += games[i][0] === 'B' ? 3 : 0;
                break;
            case 'Z':
                totalScore += games[i][0] === 'B' ? 6 : 0;
                totalScore += games[i][0] === 'C' ? 3 : 0;
                break;
            default:
                break;
        }

    }
    return totalScore;
}

function findScoreP2(games) {
    let totalScore = 0;
    for (let i = 0; i < games.length - 1; ++i) {
    let opponentsMove = games[i][0];
       let choice = games[i][1];
        switch (opponentsMove) {
            case 'A':
                totalScore += choice === 'X' ? scores['C'] : 0;
                totalScore += choice === 'Y' ? scores['A'] + 3 : 0;
                totalScore += choice === 'Z' ? scores['B'] + 6: 0;
                break;
            case 'B':
                totalScore += choice === 'X' ? scores['A'] : 0;
                totalScore += choice === 'Y' ? scores['B'] + 3 : 0;
                totalScore += choice === 'Z' ? scores['C'] + 6 : 0;
                break;
            case 'C':
                totalScore += choice === 'X' ? scores['B'] : 0;
                totalScore += choice === 'Y' ? scores['C'] + 3 : 0;
                totalScore += choice === 'Z' ? scores['A'] + 6 : 0;
                break;
            default:
                break; 
        }
    }
    return totalScore;
}

let input = parser();
let day2Input = day2part1(parseDay2(input));

console.log(findScore(day2Input));

console.log(findScoreP2(day2Input));
