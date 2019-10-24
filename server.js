
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
        db.run('CREATE TABLE Measurements (time DATETIME, temperature DECIMAL, humidity DECIMAL, pressure DECIMAL, id INTEGER)');
        db.run(`CREATE TABLE Stations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100),
            groupId INTEGER,

            greaterThanGroupId INTEGER,
            greaterThanOffset DECIMAL,
            greaterThanMessage VARCHAR(254),
            greaterThanDelay INTEGER,
            greaterThanLastNotification DATE,
            greaterThanAndMinimum DECIMAL,
            greaterThanAndMaximum DECIMAL,
            
            smallerThanGroupId INTEGER,
            smallerThanOffset DECIMAL,
            smallerThanMessage VARCHAR(254),
            smallerThanDelay INTEGER,
            smallerThanLastNotification DATE,
            smallerThanAndMinimum DECIMAL,
            smallerThanAndMaximum DECIMAL,
            )`);
    }
});

app.get('/measurements', function (request, response) {
    db.all('SELECT * from Measurements', function (err, rows) {
        response.send(JSON.stringify(rows));
    });
});

app.get('/mockup', function (request, response) {
    response.sendFile(__dirname + "/sampleDay_spikes.json");
});

app.post('/measurements', function (request, response) {
    response.send("saved " + temp + " " + hum + " " + pres + " at " + sqllite_date);

    var id = request.body.i;
    var temp = request.body.t / 100;
    var hum = request.body.h / 100;
    var pres = request.body.p / 10000;
    var date = request.body.d;
    var date = new Date(date);

    if (isNaN(date.getMilliseconds())) {
        date = new Date();
    }
    var sqllite_date = date.toISOString();

    addNewMeasurement(sqllite_date, id, temp, hum, pres);
    checkNotifications(sqllite_date, id, temp, hum, pres);
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
        db.run('INSERT INTO Measurements (time, temperature, humidity, pressure, id) VALUES ((?),(?),(?),(?),(?))', [time, temperature, humidity, pressure, id]);
    });
}

app.get('/stations', function (request, response) {
    db.all('SELECT * from Stations', function (err, rows) {
        response.send(JSON.stringify(rows));
    });
});

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

function checkNotifications() {
    //TODO
}
