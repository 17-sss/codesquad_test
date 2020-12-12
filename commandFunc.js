// [!!!] https://cube3x3.com/큐브를-맞추는-방/#notation 동작 참고함

// >> rubik.js의 actionEx에서 사용되는 함수들
// 1) U & U' 
const executeU = (cubeTmp, objOpt) => {
    let { bReverse, bDouble } = objOpt;    
    let nCnt = 0;
    let nLoop = bDouble ? 2 : 1;

    let tmp = null;
    while (nLoop !== nCnt) {        
        nCnt++;

        if (!bReverse) {    // U    
            tmp = cubeTmp['front'].shift();
            cubeTmp['front'].unshift(cubeTmp['right'].shift()); 
            cubeTmp['right'].unshift(cubeTmp['back'].shift()); 
            cubeTmp['back'].unshift(cubeTmp['left'].shift());
            cubeTmp['left'].unshift(tmp);
        } else {            // U'
            tmp = cubeTmp['front'].shift();
            cubeTmp['front'].unshift(cubeTmp['left'].shift()); 
            cubeTmp['left'].unshift(cubeTmp['back'].shift()); 
            cubeTmp['back'].unshift(cubeTmp['right'].shift());
            cubeTmp['right'].unshift(tmp);
        } 
    }    
};

// 2) L & L' (f > d , d > b, b > u, u > f)
const executeL = (cubeTmp, objOpt) => {
    let { bReverse, bDouble } = objOpt;    
    let nCnt = 0;
    let nLoop = bDouble ? 2 : 1;

    let tmp = null;
    while (nLoop !== nCnt) {
        nCnt++;
        
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
    }    
};

module.exports = { executeU, executeL };
