const port = 3000;
const express = require('express');
const hb  = require('express-handlebars');
const app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'XXXXXXXX', //put your password
    database: 'DeltaMusic02' //based on the SQL file uploaded here
});

connection.query('SELECT now() AS time', function(err, rows, fields){
    if(err) throw err;

    console.log('The time is: ', rows[0].time);
    
});     //Prints out the current time in your terminal

connection.query('SELECT * FROM tracks', function(err, rows, fields) {
  if (err) throw err;
    
  console.log(rows);

});     //Prints out all the information from Table Tracks

app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.urlencoded());

app.get('/', function (req, res) {
    connection.query('SELECT * FROM Tracks', (error, rows, fields) => {
        if (error) {
            throw error;
        }
        res.send(rows);
        //res.render('home', { rows });
    });
});     //This allows localhost:3000 to display the track info

app.listen(3000);


