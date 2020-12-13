## 3단계
* rubik.js  (실행 파일)
    1. cubeStateView(): 큐브의 상태를 표시
    2. arrActionCreate(): 입력된 값들을 받아와서 배열화 시킨 후, 허용되는 값만 결과 값(배열)에 넣어 확정.
    3. actionEx(): arrActionCreate()에서 만든 결과 값 기준으로 큐브를 움직임. 
        - '2' 여부와 '(반시계방향) 여부 확인 후 옵션(객체값) 전달.
        - 여기서 commandFunc.js가 실행됨.
    4. randomCommand(): 가능한 모든 명령어를 랜덤으로 섞어서 실행.
        - 해당 함수 실행 명령어: mix 숫자
    5. commandSet(): 현재 작성된 명령어가 일반명령어인지 랜덤명령인지 확인 후 최종 명령 확정.
    6. calcTime(): 종료 시 경과시간을 계산하여 반환.
    7. readInput(): main, 실행용 함수 / readline을 사용하여 입력을 받아 큐브 조작 실행.    
* commandFunc.js    (큐브 동작 실행용, 모듈화)
    1. rotateArr(): 한 면이 전부 회전 시에 이 함수 실행. 
        - ex) 'U' 명령 실행 시, UP의 면이 회전할 때.
    2. executeU, executeL, executeF, executeR, executeB, executeD()
        - 동작들 (U & U' / L & L' / F & F' / R & R' / B & B' / D & D') 실행.
    3. commandFunc():  main, 실행용 함수 / 입력된 현재 명령을 체크 후, 2.번에 있는 함수 실행.
<br/>

### 참고 이미지
![STEP3](./img/step3_1.png)
![STEP3](./img/step3_2.png)

<hr/>