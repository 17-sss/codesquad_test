// [STEP-2]

// cubeState, 현재 큐브 상태 표시
const cubeState = (arrCube, curInput = '') => {
    curInput ? console.log('\n'+curInput) : console.log();
    arrCube.forEach(e => {
        console.log(e.join(' '))
    });
    console.log();
};

// actionExecute, 입력값에 따라 큐브제어
const actionExecute = (arrCube, strAction) => {
    const arrResult = arrCube;
    const arrAction = strAction.split('');
    
    for (let i=0; i < arrAction.length; i++) { 
        let action = arrAction[i];
        if (action === "\'") continue;
        
        let tmp = '';
        let bStateView = true;  // 큐브 상태 표시용 flag

        if(arrAction[i + 1] === "\'")
            action = action + arrAction[i + 1];
                
        action = action.toUpperCase();
        switch (action) {
            // 가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
            case 'U':{            
                tmp = arrResult[0].shift();
                arrResult[0].push(tmp);
                break;
            } 
            // 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
            case 'U\'': {
                tmp = arrResult[0].pop();
                arrResult[0].unshift(tmp);
                break;
            }
            // 가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
            case 'R': {
                tmp = arrResult[0].pop();
                arrResult[0].push(arrResult[1].pop());
                arrResult[1].push(arrResult[2].pop());
                arrResult[2].push(tmp);
                break;
            }
            // 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
            case 'R\'': {
                tmp = arrResult[2].pop();
                arrResult[2].push(arrResult[1].pop());
                arrResult[1].push(arrResult[0].pop());
                arrResult[0].push(tmp);
                break;
            }
            // 가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG (L의 경우 R과 방향이 반대임을 주의한다.)
            case 'L': {
                tmp = arrResult[2].shift();
                arrResult[2].unshift(arrResult[1].shift());
                arrResult[1].unshift(arrResult[0].shift());
                arrResult[0].unshift(tmp);
                break;
            }
            // 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
            case 'L\'': {
                tmp = arrResult[0].shift();
                arrResult[0].unshift(arrResult[1].shift());
                arrResult[1].unshift(arrResult[2].shift());
                arrResult[2].unshift(tmp);
                break;
            }          
            // 가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
            case 'B': {
                tmp = arrResult[2].pop();
                arrResult[2].unshift(tmp);                
                break;
            }   
            // 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
            case 'B\'': {
                tmp = arrResult[2].shift();
                arrResult[2].push(tmp);    
                break;
            }    
            default: {
                bStateView = false; 
                break;
            };
        } 
        
        if (bStateView) {
            cubeState(arrCube, action);
        }
    }

    return arrResult;
}

// readInput, 큐브 실행
const readInput = (arrCube) => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    cubeState(arrCube);
    rl.setPrompt('CUBE > ');

    rl.prompt();
    rl.on('line', (strLine) => {
        if (strLine.toUpperCase() === 'Q') {
            rl.close();
        } else {            
            arrCube = actionExecute(arrCube, strLine);            
        }

        rl.prompt();
    }).on('close', () => {
        console.log('Bye~');
        process.exit();
    });
};

const arrCube = [
    ['R', 'R', 'W'],
    ['G', 'C', 'W'],
    ['G', 'B', 'B'],
];
readInput(arrCube);
