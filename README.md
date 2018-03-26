# nodejs_server
2018 capstone design nodejs server

# 로컬 파일 시스템에 저장
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/update?api_key=xyzz&field1=32.12<br>
온도 센서 측정 결과를 로컬 파일 시스템에 저장한다.

# 저장된 측정 결과 출력
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/get<br>
지금까지 저장된 온도 센서 측정 결과를 출력한다.

# 서버의 DB에 온도센서 정보 저장
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/log?device=101&unit=1&type=T&seq=1&value=13.32<br>
서버의 DB에 온도센서 측정 정보를 저장한다.

# DB Data 다운로드
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/download<br>
DB에 저장된 온도센서 측정 정보를 csv파일로 다운로드 시켜준다.
