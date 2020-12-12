// [!!!] https://cube3x3.com/큐브를-맞추는-방/#notation 동작 참고함

// >> rubik.js의 actionEx에서 사용되는 함수들
// 1) 회전
const rotateArr = (propArr, bLeft = false) => {
    const arrCopy = [];
    
    for (let i = 0; i < 3; i++) {
        const arrTmp = [];

        if (bLeft) {
            // 만들어야함
        } else {
            arrTmp.push(propArr[2][i]);
            arrTmp.push(propArr[1][i]);
            arrTmp.push(propArr[0][i]);
        }

        arrCopy.push(arrTmp);
    }
    return arrCopy;
}   

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
    }  
    
    // up 변경되어야함
    /* 
        1 2 3   7 4 1   9 8 7   3 6 9   1 2 3
        4 5 6   8 5 2   6 5 4   2 5 8   4 5 6
        7 8 9   9 6 3   3 2 1   1 4 7   7 8 9
    */
    /*
    const arrCopy = cubeTmp['up'].slice();        
    console.log(arrCopy);
    for (let i = 0; i < 3; i++) {
        arrCopy[i][0] = cubeTmp['up'][2][i];
        arrCopy[i][1] = cubeTmp['up'][1][i];
        arrCopy[i][2] = cubeTmp['up'][0][i];
    }
    console.log(arrCopy);
    */
   /*
   const arrCopy = cubeTmp['up'].slice(); 
    // cubeTmp['up'] = arrCopy.slice();

    console.log(arrCopy[0][0], cubeTmp['up'][2][0])
    console.log(arrCopy[0][1], cubeTmp['up'][1][0])
    console.log(arrCopy[0][2], cubeTmp['up'][0][0])

    console.log(arrCopy[1][0], cubeTmp['up'][2][1])
    console.log(arrCopy[1][1], cubeTmp['up'][1][1])
    console.log(arrCopy[1][2], cubeTmp['up'][0][1])

    
    console.log(arrCopy[2][0], cubeTmp['up'][2][2])
    console.log(arrCopy[2][1], cubeTmp['up'][1][2])
    console.log(arrCopy[2][2], cubeTmp['up'][0][2])

/*    
    arrCopy[0][0] = cubeTmp['up'][2][0];
    arrCopy[0][1] = cubeTmp['up'][1][0];
    arrCopy[0][2] = cubeTmp['up'][0][0];        
    

    arrCopy[1][0] = cubeTmp['up'][2][1]; 
    arrCopy[1][1] = cubeTmp['up'][1][1];
    arrCopy[1][2] = cubeTmp['up'][0][1];
    

    arrCopy[2][0] = cubeTmp['up'][2][2];
    arrCopy[2][1] = cubeTmp['up'][1][2];
    arrCopy[2][2] = cubeTmp['up'][0][2];
    
    cubeTmp['up'] = [...arrCopy];
*/

};

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
        }             
    } else {            // L'
        for (let i = 0; i < 3; i++) { 
            tmp = cubeTmp['front'][i].shift();             
            cubeTmp['front'][i].unshift(cubeTmp['down'][i].shift());
            cubeTmp['down'][i].unshift(cubeTmp['back'][i].shift());
            cubeTmp['back'][i].unshift(cubeTmp['up'][i].shift());
            cubeTmp['up'][i].unshift(tmp);
        } 
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
            case 'U\'': {
                executeU(cubeTmp, bReverse); break;  
            }
            case 'L':
            case 'L\'': 
                executeL(cubeTmp, bReverse); break;    
            default:
                break;
        }         
    }
};

module.exports = commandFunc;
