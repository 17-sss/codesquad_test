// [!!!] https://cube3x3.com/큐브를-맞추는-방/#notation 동작 참고함

// >> rubik.js의 actionEx에서 사용되는 함수들
// 1) 회전
const rotateArr = (propArr, bLeft = false) => {
    const CNT = 3;
    const arrCopy = [];
    
    if (bLeft) {
        for (let i = CNT-1; i >= 0; i--) {
            const arrTmp = [];
            arrTmp.push(propArr[0][i]);
            arrTmp.push(propArr[1][i]);
            arrTmp.push(propArr[2][i]);
            
            arrCopy.push(arrTmp);
        }
    } else {
        for (let i = 0; i < CNT; i++) {
            const arrTmp = [];
            arrTmp.push(propArr[2][i]);
            arrTmp.push(propArr[1][i]);
            arrTmp.push(propArr[0][i]);
    
            arrCopy.push(arrTmp);
        }
    }
    return arrCopy;
};

// 2) U & U' 
const executeU = async (cubeTmp, bReverse) => {
    let tmp = null;
    if (!bReverse) {    // U    
        tmp = cubeTmp['front'].shift();
        cubeTmp['front'].unshift(cubeTmp['right'].shift()); 
        cubeTmp['right'].unshift(cubeTmp['back'].shift()); 
        cubeTmp['back'].unshift(cubeTmp['left'].shift());
        cubeTmp['left'].unshift(tmp);

        cubeTmp['up'] = rotateArr(cubeTmp['up']);
    } else {            // U'
        tmp = cubeTmp['front'].shift();
        cubeTmp['front'].unshift(cubeTmp['left'].shift()); 
        cubeTmp['left'].unshift(cubeTmp['back'].shift()); 
        cubeTmp['back'].unshift(cubeTmp['right'].shift());
        cubeTmp['right'].unshift(tmp);

        cubeTmp['up'] = rotateArr(cubeTmp['up'], true);
    }  
};

// 2) L & L'
const executeL = (cubeTmp, bReverse) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;
    if (!bReverse) {    // L
        for (let i = 0; i < 3; i++) {
            cubeCopy['back'][tmpCnt][2] = cubeTmp['down'][i][0];
            cubeCopy['down'][i][0] = cubeTmp['front'][i][0];
            cubeCopy['front'][i][0] = cubeTmp['up'][i][0];
            cubeCopy['up'][i][0] = cubeTmp['back'][tmpCnt][2];
            tmpCnt--;
        }
        cubeCopy['left'] = rotateArr(cubeCopy['left']);
    } else {    // L'
        for (let i = 0; i < 3; i++) {
            cubeCopy['back'][tmpCnt][2] = cubeTmp['up'][i][0];
            cubeCopy['down'][i][0] = cubeTmp['back'][tmpCnt][2];
            cubeCopy['front'][i][0] = cubeTmp['down'][i][0];
            cubeCopy['up'][i][0] = cubeTmp['front'][i][0];
            tmpCnt--;
        }
        cubeCopy['left'] = rotateArr(cubeCopy['left'], true);
    }

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 3) F & F'
const executeF = (cubeTmp, bReverse) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;
    if (!bReverse) {    // F              
        for (let i = 0; i < 3; i++) {                
            cubeCopy["up"][2][i] = cubeTmp["left"][i][2];
            cubeCopy["left"][i][2] = cubeTmp["down"][0][i];
            cubeCopy["down"][0][i] = cubeTmp["right"][tmpCnt][0];                
            cubeCopy["right"][tmpCnt][0] = cubeTmp["up"][2][i];
            tmpCnt--;            
        }
        cubeCopy['front'] = rotateArr(cubeCopy['front']);
    } else {            // F'
        for (let i = 0; i < 3; i++) { 
            cubeCopy["up"][2][i] = cubeTmp["right"][tmpCnt][0];
            cubeCopy["left"][i][2] = cubeTmp["up"][2][i];
            cubeCopy["down"][0][i] = cubeTmp["left"][i][2];                
            cubeCopy["right"][tmpCnt][0] = cubeTmp["down"][0][i];
            tmpCnt--; 
        } 
        cubeCopy['front'] = rotateArr(cubeCopy['front'], true);        
    }

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
};

// 3) R & R'
const executeR = (cubeTmp, bReverse) => {
    const cubeCopy = JSON.parse(JSON.stringify(cubeTmp));
    let tmpCnt = 2;

    /* 
        F[0][2] > U[0][2]
        F[1][2] > U[1][2]
        F[2][2] > U[2][2]

        U[0][2] > B[2][0]
        U[1][2] > B[1][0]
        U[2][2] > B[0][0]

        B[2][0] > D[0][2]
        B[1][0] > D[1][2]
        B[0][0] > D[2][2]

        D[0][2] > F[0][2]
        D[1][2] > F[1][2]
        D[2][2] > F[2][2]
    */
    if (!bReverse) {    // R              
        for (let i = 0; i < 3; i++) {                
            cubeCopy["up"][i][2] = cubeTmp["front"][i][2];
            cubeCopy["back"][tmpCnt][0] = cubeTmp["up"][i][2];
            cubeCopy["down"][i][2] = cubeTmp["back"][tmpCnt][0];                
            cubeCopy["front"][i][2] = cubeTmp["down"][i][2];
            tmpCnt--;            
        }
        cubeCopy['right'] = rotateArr(cubeCopy['right']);
    } else {            // R'
        for (let i = 0; i < 3; i++) { 
            
            tmpCnt--; 
        } 
        cubeCopy['right'] = rotateArr(cubeCopy['right'], true);        
    }

    for (const key in cubeCopy) {
        cubeTmp[key] = cubeCopy[key];
    }
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
            case 'U\'':
                executeU(cubeTmp, bReverse); break;              
            case 'L':
            case 'L\'': 
                executeL(cubeTmp, bReverse); break;    
            case 'F':
            case 'F\'': 
                executeF(cubeTmp, bReverse); break;    
            case 'R':
            case 'R\'': 
                executeR(cubeTmp, bReverse); break;  
            default:
                break;
        }         
    }
};

module.exports = commandFunc;



/* 
-- bak code
// @ 201213_1056
// 2) L & L'
const executeL = (cubeTmp, bReverse) => {
    let tmp = null;
    if (!bReverse) {    // L
        for (let i = 0; i < 3; i++) { 
            tmp = cubeTmp['front'][i].shift();             
            cubeTmp['front'][i].unshift(cubeTmp['up'][i].shift());
            cubeTmp['up'][i].unshift(cubeTmp['back'][i].shift());
            cubeTmp['back'][i].unshift(cubeTmp['down'][i].shift());
            cubeTmp['down'][i].unshift(tmp);

            cubeTmp['left'] = rotateArr(cubeTmp['left'], true);
        }             
    } else {            // L'
        for (let i = 0; i < 3; i++) { 
            tmp = cubeTmp['front'][i].shift();             
            cubeTmp['front'][i].unshift(cubeTmp['down'][i].shift());
            cubeTmp['down'][i].unshift(cubeTmp['back'][i].shift());
            cubeTmp['back'][i].unshift(cubeTmp['up'][i].shift());
            cubeTmp['up'][i].unshift(tmp);

            cubeTmp['left'] = rotateArr(cubeTmp['left']);
        } 
    }
};
*/