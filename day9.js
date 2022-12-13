const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day9Input.txt', 'utf-8');
    let returnVal = contents.split('\n').map((e) => e.trim().split(' '));
    returnVal.pop();
    return returnVal;
}



function day9Part1(input) {
    let hPos = [0, 0];
    let tPos = [0, 0];
    let coords = {};
    coords['' + tPos[0] + '-' + tPos[1]] = 0;
    for (let i = 0; i < input.length; ++i) {
        let direction = input[i][0] === 'R' || input[i][0] === 'U' ? 1 : -1;
        let axis = input[i][0] === 'R' || input[i][0] === 'L' ? 0 : 1;
        let steps = parseInt(input[i][1]);
        for (let j = 0; j < steps; ++j) {
            oldHPos = [...hPos];
            hPos[axis] += direction;
            let relativeTPos = [tPos[0] - hPos[0], tPos[1] - hPos[1]];
            if (Math.abs(relativeTPos[0]) > 1 || Math.abs(relativeTPos[1]) > 1) {
                tPos = [...oldHPos];
                coords['' + tPos[0] + '-' + tPos[1]] = 0;
            }
        }
    }
    return Object.keys(coords).length;
}

function day9(input, knotCount) {
    let knotPos = [];
    for (let i = 0; i < knotCount; ++i) {
        knotPos.push([0, 0]);
    }
    let coords = {};
    coords['' + 0 + '-' + 0] = 0;
    for (let i = 0; i < input.length; ++i) {
        let direction = input[i][0] === 'R' || input[i][0] === 'U' ? 1 : -1;
        let axis = input[i][0] === 'R' || input[i][0] === 'L' ? 0 : 1;
        let steps = parseInt(input[i][1]);
        for (let j = 0; j < steps; ++j) {
            knotPos[0][axis] += direction;
            for (let k = 1; k < knotPos.length; ++k) {
                let relativeKnotPos = [knotPos[k - 1][0] - knotPos[k][0], knotPos[k - 1][1] - knotPos[k][1]];
                if (Math.abs(relativeKnotPos[0]) > 1 || Math.abs(relativeKnotPos[1]) > 1) {
                    for (let l = 0; l < knotPos[k].length; ++l) {
                        knotPos[k][l] += relativeKnotPos[l] === 0 ? 0 : relativeKnotPos[l] / Math.abs(relativeKnotPos[l]);
                    }
                }
                if (k === knotPos.length - 1) {
                    coords['' + knotPos[k][0] + '-' + knotPos[k][1]] = 0;
                }
            }
        }
    }
    return Object.keys(coords).length;
}


let input = parser();

console.log(day9(input, 2));

console.log(day9(input, 10));