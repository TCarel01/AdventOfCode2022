const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day8Input.txt', 'utf-8');
    return contents.split('\n').map((e) => e.trim().split('').map((val) => parseInt(val))).filter((val) => val.length !== 0);
}


function day8Part1(input) {
    let visibleCount = 0;
    for (let i = 0; i < input.length; ++i){
        for (let j = 0; j < input[0].length; ++j){
            let curTree = input[i][j];
            let visibleL = true;
            let visibleR = true;
            let visibleU = true;
            let visibleD = true;
            for (let k = 0; k < input[0].length; ++k) {
                if (k === j) {
                    continue;
                }
                let sameRowTree = input[i][k]
                if (sameRowTree >= curTree){
                    switch(true) {
                        case k < j:
                            visibleL = false;
                            break;
                        case k > j:
                            visibleR = false;
                            break;
                    }
                } 
            }
            for (let l = 0; l < input.length; ++l) {
                if (i === l) {
                    continue;
                }
                let sameColTree = input[l][j];
                if (sameColTree >= curTree) {
                    switch(true) {
                        case l < i:
                            visibleU = false;
                            break;
                        case l > i:
                            visibleD = false;
                            break
                    }
                }
            }
            if (visibleL || visibleR || visibleU || visibleD) {
                ++visibleCount;
            }
        }
    }
    return visibleCount;
}

function day8Part2(input) {
    let maxScenicScore = 0;
    for (let i = 0; i < input.length; ++i){
        for (let j = 0; j < input[0].length; ++j){
            let curTree = input[i][j];
            let viewDistanceL = j;
            let viewDistanceR = input[0].length - j - 1;
            let viewDistanceD = input.length - i - 1;
            let viewDistanceU = i;
            for (let k = 0; k < input[0].length; ++k) {
                if (k === j) {
                    continue;
                }
                let sameRowTree = input[i][k]
                if (sameRowTree >= curTree){
                    switch(true) {
                        case k < j:
                            viewDistanceL = j - k;
                            break;
                        case k > j:
                            viewDistanceR = Math.min(k - j, viewDistanceR);
                            break;
                    }
                } 
            }
            for (let l = 0; l < input.length; ++l) {
                if (i === l) {
                    continue;
                }
                let sameColTree = input[l][j];
                if (sameColTree >= curTree) {
                    switch(true) {
                        case l < i:
                            viewDistanceU = i - l;
                            break;
                        case l > i:
                            viewDistanceD = Math.min(l - i, viewDistanceD);
                            break
                    }
                }
            }
            let curScenicScore = viewDistanceL * viewDistanceR * viewDistanceD * viewDistanceU;
            maxScenicScore = maxScenicScore > curScenicScore ? maxScenicScore : curScenicScore;
        }
    }
    return maxScenicScore;
}

let input = parser();

console.log(day8Part1(input));


console.log(day8Part2(input));