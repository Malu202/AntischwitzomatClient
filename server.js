
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function () {
    if (!exists) {
        db.run('CREATE TABLE Measurements (time DATETIME, temperature DECIMAL, humidity DECIMAL, pressure DECIMAL)');
    }
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/measurements', function (request, response) {
    db.all('SELECT * from Measurements', function (err, rows) {
        response.send(JSON.stringify(rows));
    });
});

app.post('/measurements', function (request, response) {
    var date = new Date();
    var sqllite_date = date.toISOString();

    var id = request.body.i;
    var temp = request.body.t;
    var hum = request.body.h;
    var pres = request.body.p;
    addNewMeasurement(sqllite_date, id, temp, hum, pres);
    response.send("saved " + temp + " " + hum + " " + pres + " at " + sqllite_date);
    console.log(request.body);
});

app.delete('/measurements', function (request, response) {
    db.run('DELETE FROM Measurements');
    response.send("deleted database");
});

function addNewMeasurement(time, id, temperature, humidity, pressure) {
    const dataString = '"' + time + '", "' + temperature + '", "' + humidity + '", "' + pressure + '"';
    console.log("saving: " + dataString);
    db.serialize(function () {
        db.run('INSERT INTO Measurements (time, temperature, humidity, pressure) VALUES ((?),(?),(?),(?))', [time, temperature, humidity, pressure]);
    });
}

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
