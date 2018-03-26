# nodejs_server
2018 capstone design nodejs server

# save temperature date to DB
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/log?device=101&unit=1&type=T&seq=1&value=13.32<br>
logging temperature to db server

# download log
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/download<br>
download temperature sensors log to csv file

# data save to file system
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/update?api_key=xyzz&field1=32.12<br>
data save to file system

# dump file
ex) http://ec2-13-125-232-83.ap-northeast-2.compute.amazonaws.com:15234/get<br>
dump all saved data
