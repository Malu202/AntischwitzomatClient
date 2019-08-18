
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
        db.run('CREATE TABLE Temperatures (time TEXT, temperature DECIMAL)');

    }
    else {
        db.each('SELECT * from Temperatures', function (err, row) {
            if (row) {
                console.log('record:', row);
            }
        });
    }
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/temperatures', function (request, response) {
    db.all('SELECT * from Temperatures', function (err, rows) {
        response.send(JSON.stringify(rows));
    });
});

app.post('/temperatures', function (request, response) {
    var time = request.body.time;
    var temp = request.body.temperature;
    addNewTemperature(time, temp);
    response.send("saved " + time + " " + temp);

});

app.delete('/temperatures', function (request, response) {
    db.run('DELETE FROM Temperatures');
    response.send("deleted database");
});

function addNewTemperature(time, temperature) {
    console.log("creating time: " + time + " temperature: " + temperature)
    db.serialize(function () {
        db.run('INSERT INTO Temperatures (time, temperature) VALUES ("' + time + '", "' + temperature + '")');
    });
}

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
