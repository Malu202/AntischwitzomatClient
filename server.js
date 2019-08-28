
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
        db.run('CREATE TABLE Measurements (date DATETIME, temperature DECIMAL, humidity DECIMAL, pressure, DECIMAL)');
    }
    else {
        db.each('SELECT * from Measurements', function (err, row) {
            if (row) {
                console.log('record:', row);
            }
        });
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
    // var time = request.body.time;
    var date = new Date();
    var sqllite_date = date.toISOString();

    var temp = request.body.temperature;
    var hum = request.body.humidity;
    var pres = request.body.pressure;
    addNewMeasurement(sqllite_date, temp, hum, pres);
    response.send("saved " + sqllite_date + " " + temp);

});

app.delete('/measurements', function (request, response) {
    db.run('DELETE FROM Measurements');
    response.send("deleted database");
});

function addNewMeasurement(time, temperature, humidity, pressure) {
    console.log("creating time: " + time + " temperature: " + temperature)
    db.serialize(function () {
        db.run('INSERT INTO Measurements (time, temperature) VALUES ("' + time + '", "' + temperature + '")');
    });
}

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
