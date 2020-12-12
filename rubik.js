// [STEP-3]
const {executeU} = require('./commandFunc');

// [function] START ****************************

// 1. cubeStateView, 현재 큐브 상태 반환 (String)
const cubeStateView = (aCube) => {
    let strResult = ``;

    // left front right back
    for (const key in aCube) {
        if (key === 'front' || key === 'right' || key === 'back') continue;

        const arrProperty = aCube[key];

        for (let i = 0; i < arrProperty.length; i++) {
            const arrItem = arrProperty[i];
            const strSplit = arrItem.join(' ');

            let strTmp = '';
            if (key === 'left') {
                strTmp =
                    strSplit +
                    '\t' +
                    aCube['front'][i].join(' ') +
                    '\t' +
                    aCube['right'][i].join(' ') +
                    '\t' +
                    aCube['back'][i].join(' ');
            } else {
                strTmp = '\t' + strSplit;
            }
            strResult +=
                i === arrProperty.length - 1
                    ? key === 'down'
                        ? strTmp
                        : strTmp + '\n\n'
                    : strTmp + '\n';
        }
    }
    return '\n' + strResult + '\n';
};


// 2. arrActionCreate, 입력 값을 배열로 변환.
const arrActionCreate = (strAction) => {
    const arrResult = [];

    const arrAllow = ['U', 'L', 'F', 'R', 'B', 'D'];    
    const arrActionTmp = strAction.split('');
    
    for (let i = 0; i < arrActionTmp.length; i++) {        
        const strCheck = arrActionTmp[i].toUpperCase();
        if (arrAllow.indexOf(strCheck) <= -1) continue;        

        let strTmp = '';
        if (arrActionTmp[i + 1] === "\'") {
            strTmp = arrActionTmp[i + 2] === "2" 
                ? arrActionTmp[i] + arrActionTmp[i + 1] + arrActionTmp[i + 2]
                : arrActionTmp[i] + arrActionTmp[i + 1];           
        } else {
            strTmp = arrActionTmp[i + 1] === "2" 
                ? arrActionTmp[i] + arrActionTmp[i + 1]
                : arrActionTmp[i];
        }
        
        arrResult.push(strTmp.toUpperCase());
    }
    
    return arrResult;
} 

// 3. actionEx, 받아온 동작 실행 (각종 동작 commandFunc에서 가져옴)
const actionEx = (aCube, arrAction) => {
    for (let i = 0; i < arrAction.length; i++) {
        const strActionTmp = arrAction[i];
        const objOpt = {
            bReverse: (strActionTmp.split('').indexOf('\'') <= -1) ? false : true,
            bDouble: (strActionTmp.split('').indexOf('2') <= -1) ? false : true,
        };
                
        const strAction = strActionTmp.replace("2", '');      
        switch (strAction) {
            // 가장 윗줄을 왼쪽으로
            case 'U': 
            case 'U\'': 
                executeU(aCube, objOpt); break; 
            default: break;
        }

        console.log(`\n--action: ${strActionTmp}\n${cubeStateView(aCube)}`);
    }   
};


// 4 (main). readInput, 큐브 실행
const readInput = (aCube) => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('\n-- 초기 상태 --\n' + cubeStateView(aCube));

    rl.setPrompt('CUBE >');
    rl.prompt();
    rl.on('line', (strLine) => {
        if (strLine.toUpperCase() === 'Q') rl.close();
        actionEx(aCube, arrActionCreate(strLine));

        rl.prompt();
    }).on('close', () => {
        console.log('Bye~');
        process.exit();
    });
};

// [function] END ****************************


// [Execute] START **************************** 

// 1. 큐브 기본 값
const cube = {
    // 속성 이름들은 단지 어느 면인지 나타내는 것임.
    up: Array.from({ length: 3 }, () => new Array(3).fill('B')),
    left: Array.from({ length: 3 }, () => new Array(3).fill('W')),
    front: Array.from({ length: 3 }, () => new Array(3).fill('O')),
    right: Array.from({ length: 3 }, () => new Array(3).fill('G')),
    back: Array.from({ length: 3 }, () => new Array(3).fill('Y')),
    down: Array.from({ length: 3 }, () => new Array(3).fill('R')),
};

// 2. 실행
console.log(
    '\n======================= [STEP-3] Rubik\'s Cube =======================' + '\n'
    + '[info] 루빅스 큐브 게임에 오신걸 환영합니다. 동작을 입력해주세요.' + '\n'
    + '   ' + '<입력 가능 값>' + '\n'
    + '\t' + '1. 시계 방향 회전:   U L F R B D' + '\n'
    + '\t' + '2. 시계 반대 방향 회전:   U\' L\' F\' R\' B\' D\'' + '\n'
    + '\t' + '(!) 모든 값에는 숫자 2가 붙을 수 있습니다.' + '\n'
    + '\t' + '    - 2가 뒤에 붙을 시 180도 회전, 평상시 90도 회전' + '\n'
    + '   ' + '<입력 예>' + '\n'     
    + '\t' + 'U  LB\'  F2D\'2  FRR\'U2R\'' + '\n\n'
    + '[info] 종료하시려면 \'알파벳 Q(q)\'를 입력하거나 Ctrl + C를 눌러주세요.' + '\n'
    + '====================================================================='
);  
readInput(cube);

// [Execute]  START **************************** 
