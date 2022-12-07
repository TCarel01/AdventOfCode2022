const fs = require("fs");

function parser(){
    const contents = fs.readFileSync('day6Input.txt', 'utf-8');
    return contents.split('');
}



function day6(input, charCount) {
    let flag = false;
    for (let i = charCount; i < input.length; ++i){
        curIndex = 0;
        let test = input.slice(i - charCount, i);
        flag = test.reduce(function(acc, e) {
            let eIndex = test.findIndex((val) => val === e);
            if (eIndex === -1 || eIndex === curIndex) {
                curIndex += 1;
                return acc;
            }
            return false;
        }, true);
        if (flag) {
            return i;
        }
    }
    return -1;
}

let input = parser();

console.log(day6(input, 4));

console.log(day6(input, 14));