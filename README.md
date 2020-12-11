# 2021 코드스쿼드 마스터즈코스  테스트

## 1단계
* Node.js로 readline을 사용하여 입력을 받음.
* 입력 받은 값을 ' ' 공백을 기준으로 문자열을 배열로 변환
    * 다시 입력을 받을 경우 & 알림 메세지 출력
        * 받아온 값이 3가지가 아닌 경우 [기준단어 / 숫자(정수) / 방향]
        * 두번째 값이 정수가 아니거나 지정된 범위를 벗어날 경우         
* calcResult() 함수
    1. 받아온 기준단어를 배열로 변경
    2. 숫자와 방향에 따라 배열 내장함수( shift(), unshift(), push(), pop() )를 활용하여 구현
    3. 다시 문자열로 변경 후 최종 값 출력.
<br/>

### 참고 이미지
![STEP1](./img/step1.png)

<hr/>