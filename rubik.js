// [STEP-3]

// cubeStateView, 현재 큐브 상태 반환 (String)
const cubeStateView = (aCube) => {
    let strResult = ``;

    // left front right back
    for (const key in aCube) {
        if (key === "front" || key === "right" || key === "back") 
            continue;

        const arrProperty = aCube[key];        

        for (let i=0; i < arrProperty.length; i++) {
            const arrItem = arrProperty[i];
            const strSplit = arrItem.join(' ');            
            
            let strTmp = '';
            if (key === 'left') {
                strTmp = strSplit + '\t' 
                    + aCube["front"][i].join(' ') + '\t' 
                    + aCube["right"][i].join(' ') + '\t' 
                    + aCube["back"][i].join(' ');                
            } else {
                strTmp = '\t'+strSplit;                            
            }                            
            strResult += (i === arrProperty.length-1) ? strTmp + '\n\n' : strTmp + '\n';                    
        }
    }
    return '\n' + strResult;    
}

// readInput, 큐브 실행
const readInput = (aCube) => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log(cubeStateView(aCube));

    rl.setPrompt("CUBE >");
    rl.prompt();
    rl.on('line', (strLine) => {
        if (strLine.toUpperCase() === 'Q') rl.close();
        console.log(cubeStateView(aCube));
        rl.prompt();
    }).on('close', () => {
        console.log('Bye~');
        process.exit();
    });
};

// 큐브 생성
const cube = {
    up: Array.from({ length: 3 }, () => new Array(3).fill('B')),
    left: Array.from({ length: 3 }, () => new Array(3).fill('W')),
    front: Array.from({ length: 3 }, () => new Array(3).fill('O')),
    right: Array.from({ length: 3 }, () => new Array(3).fill('G')),
    back: Array.from({ length: 3 }, () => new Array(3).fill('Y')),
    down: Array.from({ length: 3 }, () => new Array(3).fill('R')),
};

readInput(cube);
