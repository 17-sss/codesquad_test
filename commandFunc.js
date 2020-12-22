// [!!!] https://cube3x3.com/큐브를-맞추는-방/#notation 동작 참고함

// 201222_1447 (전부 리펙토링)

// >> rubik.js의 actionEx에서 사용되는 함수들
// 1-1) 회전 (Right 방향)
const rotateRightDirection = (propArr) => {
    const CNT = 3;
    const arrCopy = [];

    for (let i = 0; i < CNT; i++) {
        const arrTmp = [];
        arrTmp.push(propArr[2][i]);
        arrTmp.push(propArr[1][i]);
        arrTmp.push(propArr[0][i]);

        arrCopy.push(arrTmp);
    }

    return arrCopy;
};

// 1-2) 회전 (Left 방향)
const rotateLeftDirection = (propArr) => {
    const CNT = 3;
    const arrCopy = [];

    for (let i = CNT - 1; i >= 0; i--) {
        const arrTmp = [];
        arrTmp.push(propArr[0][i]);
        arrTmp.push(propArr[1][i]);
        arrTmp.push(propArr[2][i]);

        arrCopy.push(arrTmp);
    }

    return arrCopy;
};

// ================================================================

// 2-1) U
const executeU = (cubeTmp) => {
    let tmp = null;

    tmp = cubeTmp['front'].shift();
    cubeTmp['front'].unshift(cubeTmp['right'].shift());
    cubeTmp['right'].unshift(cubeTmp['back'].shift());
    cubeTmp['back'].unshift(cubeTmp['left'].shift());
    cubeTmp['left'].unshift(tmp);

    cubeTmp['up'] = rotateRightDirection(cubeTmp['up']);
};

// 2-2) U'
const reverseExecuteU = (cubeTmp) => {
    let tmp = null;

    tmp = cubeTmp['front'].shift();
    cubeTmp['front'].unshift(cubeTmp['left'].shift());
    cubeTmp['left'].unshift(cubeTmp['back'].shift());
    cubeTmp['back'].unshift(cubeTmp['right'].shift());
    cubeTmp['right'].unshift(tmp);

    cubeTmp['up'] = rotateLeftDirection(cubeTmp['up']);
};

// 3-1) L
const executeL = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['back'][tmpCnt][2] = cubeTmp['down'][i][0];
        cubeCopy['down'][i][0] = cubeTmp['front'][i][0];
        cubeCopy['front'][i][0] = cubeTmp['up'][i][0];
        cubeCopy['up'][i][0] = cubeTmp['back'][tmpCnt][2];
        tmpCnt--;
    }
    cubeCopy['left'] = rotateRightDirection(cubeCopy['left']);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 3-2) L'
const reverseExecuteL = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['back'][tmpCnt][2] = cubeTmp['up'][i][0];
        cubeCopy['down'][i][0] = cubeTmp['back'][tmpCnt][2];
        cubeCopy['front'][i][0] = cubeTmp['down'][i][0];
        cubeCopy['up'][i][0] = cubeTmp['front'][i][0];
        tmpCnt--;
    }
    cubeCopy['left'] = rotateLeftDirection(cubeCopy['left'], true);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 4-1) F
const executeF = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['up'][2][i] = cubeTmp['left'][i][2];
        cubeCopy['left'][i][2] = cubeTmp['down'][0][i];
        cubeCopy['down'][0][i] = cubeTmp['right'][tmpCnt][0];
        cubeCopy['right'][tmpCnt][0] = cubeTmp['up'][2][i];
        tmpCnt--;
    }
    cubeCopy['front'] = rotateRightDirection(cubeCopy['front']);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 4-2) F'
const reverseExecuteF = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['up'][2][i] = cubeTmp['right'][tmpCnt][0];
        cubeCopy['left'][i][2] = cubeTmp['up'][2][i];
        cubeCopy['down'][0][i] = cubeTmp['left'][i][2];
        cubeCopy['right'][tmpCnt][0] = cubeTmp['down'][0][i];
        tmpCnt--;
    }
    cubeCopy['front'] = rotateLeftDirection(cubeCopy['front']);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 5-1) R
const executeR = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['up'][i][2] = cubeTmp['front'][i][2];
        cubeCopy['back'][tmpCnt][0] = cubeTmp['up'][i][2];
        cubeCopy['down'][i][2] = cubeTmp['back'][tmpCnt][0];
        cubeCopy['front'][i][2] = cubeTmp['down'][i][2];
        tmpCnt--;
    }
    cubeCopy['right'] = rotateRightDirection(cubeCopy['right']);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 5-2) R'
const reverseExecuteR = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['up'][i][2] = cubeTmp['back'][tmpCnt][0];
        cubeCopy['back'][tmpCnt][0] = cubeTmp['down'][i][2];
        cubeCopy['down'][i][2] = cubeTmp['front'][i][2];
        cubeCopy['front'][i][2] = cubeTmp['up'][i][2];
        tmpCnt--;
    }
    cubeCopy['right'] = rotateLeftDirection(cubeCopy['right']);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 6) B
const executeB = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['left'][tmpCnt][0] = cubeTmp['up'][0][i];
        cubeCopy['down'][2][tmpCnt] = cubeTmp['left'][tmpCnt][0];
        cubeCopy['right'][i][2] = cubeTmp['down'][2][tmpCnt];
        cubeCopy['up'][0][i] = cubeTmp['right'][i][2];
        tmpCnt--;
    }

    cubeCopy['back'] = rotateRightDirection(cubeCopy['back']);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 6-2) B'
const reverseExecuteB = (cubeTmp) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    for (let i = 0; i < 3; i++) {
        cubeCopy['left'][tmpCnt][0] = cubeTmp['down'][2][tmpCnt];
        cubeCopy['down'][2][tmpCnt] = cubeTmp['right'][i][2];
        cubeCopy['right'][i][2] = cubeTmp['up'][0][i];
        cubeCopy['up'][0][i] = cubeTmp['left'][tmpCnt][0];
        tmpCnt--;
    }

    cubeCopy['back'] = rotateLeftDirection(cubeCopy['back']);

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 7) D
const executeD = (cubeTmp) => {
    let tmp = null;
    tmp = cubeTmp['front'].pop();
    cubeTmp['front'].push(cubeTmp['left'].pop());
    cubeTmp['left'].push(cubeTmp['back'].pop());
    cubeTmp['back'].push(cubeTmp['right'].pop());
    cubeTmp['right'].push(tmp);

    cubeTmp['down'] = rotateRightDirection(cubeTmp['down']);
};

// 7-2) D'
const reverseExecuteD = (cubeTmp) => {
    let tmp = null;
    tmp = cubeTmp['front'].pop();
    cubeTmp['front'].push(cubeTmp['right'].pop());
    cubeTmp['right'].push(cubeTmp['back'].pop());
    cubeTmp['back'].push(cubeTmp['left'].pop());
    cubeTmp['left'].push(tmp);

    cubeTmp['down'] = rotateLeftDirection(cubeTmp['down']);
};

// main
const commandFunc = (strEx, cubeTmp, objOpt) => {
    let { bReverse, bDouble } = objOpt;
    let nCnt = 0;
    let nLoop = bDouble ? 2 : 1;

    while (nLoop !== nCnt) {
        nCnt++;
        switch (strEx) {
            case 'U':
                executeU(cubeTmp);
                break;
            case "U'":
                reverseExecuteU(cubeTmp);
                break;

            case 'L':
                executeL(cubeTmp);
                break;
            case "L'":
                reverseExecuteL(cubeTmp);
                break;

            case 'F':
                executeF(cubeTmp);
                break;
            case "F'":
                reverseExecuteF(cubeTmp);
                break;

            case 'R':
                executeR(cubeTmp);
                break;
            case "R'":
                reverseExecuteR(cubeTmp);
                break;

            case 'B':
                executeB(cubeTmp);
                break;
            case "B'":
                reverseExecuteB(cubeTmp);
                break;

            case 'D':
                executeD(cubeTmp);
                break;
            case "D'":
                reverseExecuteD(cubeTmp);
                break;

            default:
                break;
        }
    }
};

module.exports = commandFunc;
