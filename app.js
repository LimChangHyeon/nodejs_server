var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var json2csv = require('json2csv');
var app = express();
var port = 15234;
const api_key = 'xyzz';

var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'capstone',
	password : '1q2w3e4r',
	database : 'capstone'
});

connection.connect(function(err) {
	if (err) {
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
});

Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};

function insert_sensor(device, unit, type, value, seq, ip)
{
	var obj = {};
	obj.seq = seq;
	obj.device = device;
	obj.unit = unit;
	obj.type = type;
	obj.value = value;
	obj.ip = ip.replace(/^.*:/, '');

	var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols){
		if(err) throw err;
		console.log('database insertion ok = %j', obj);
	});
}

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

app.get('/update', (req, res) => {
	console.log('query json : %j', req.query);
	if(req.query.field1 == undefined || req.query.api_key == undefined)
	{
		res.send('data incomplete!');
	}
	else if(req.query.api_key !== api_key)
	{
		res.send('api_key is wrong!');
	}
	else
	{
		var d = new Date();
		var dateString = d.format("yyyyMMdd");
		var timeString = d.format("hhmm");
		var temperature = req.query.field1;
		var output = dateString + "," + timeString + "," + temperature;

		var data = fs.readFileSync('temper.txt', 'utf8');
		data += "\n" + output;
		fs.writeFileSync('temper.txt', data);
	
		res.send('data saving is success');
	}
});

app.get('/get', (req, res) => {
	var output = "";
	console.log('get - file dump');

	var output = fs.readFileSync('temper.txt', 'utf8');

	res.send(`<pre>${output}
	</pre>`);
});

app.get('/log', (req, res) => {
	var output = '';
	var q = req.query;
	console.log('log %j', req.query);

	insert_sensor(q.device, q.unit, q.type, q.value, q.seq, req.connection.remoteAddress);
	res.send('OK');
});

app.get('/data', function(req, res) {
	console.log('get data');

	var qstr = 'select * from sensors';
	connection.query(qstr, function(err, rows, cols){
		if(err)
		{
			throw err;
			res.send('query error: ' + qstr);
			return;
		}

		html = '';
		for(var i = 0; i < rows.length; i++)
		{
			html += JSON.stringify(rows[i]);
		}
		res.send(html);
	});
});

app.get('/download', (req, res) => {
	console.log('download csv file');

	var qstr = 'select * from sensors';
	var query = connection.query(qstr, function(err, rows)
	{
		if(err)
		{
			throw err;
			res.send('query error: ' + qstr);
			return;
		}
		var output = json2csv.parse(rows);
		res.attachment('data.csv');
		res.status(200).send(output);
	});
});

app.listen(port, () => {
	console.log('Server is running at ' + port);
});
