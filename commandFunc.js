// [!!!] https://cube3x3.com/큐브를-맞추는-방/#notation 동작 참고함

// >> rubik.js의 actionEx에서 사용되는 함수들
// 1) U & U' 
const executeU = (aCube, objOpt) => {
    let { bReverse, bDouble } = objOpt;
    let tmp = [];
    let nCnt = 0;
    let nLoop = bDouble ? 2 : 1;

    while (nLoop !== nCnt) {
        console.log(nCnt);
        nCnt++;

        if (!bReverse) {    // U    
            tmp = aCube['front'].shift();
            aCube['front'].unshift(aCube['right'].shift()); 
            aCube['right'].unshift(aCube['back'].shift()); 
            aCube['back'].unshift(aCube['left'].shift());
            aCube['left'].unshift(tmp);
        } else {            // U'
            tmp = aCube['front'].shift();
            aCube['front'].unshift(aCube['left'].shift()); 
            aCube['left'].unshift(aCube['back'].shift()); 
            aCube['back'].unshift(aCube['right'].shift());
            aCube['right'].unshift(tmp);
        } 
    }    
};

// 2) L & L' (f > d , d > b, b > u, u > f)


module.exports = { executeU };
