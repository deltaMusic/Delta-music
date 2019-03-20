const port = 3000;
const express = require('express');
const hb  = require('express-handlebars');
const app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'minimouse9798',
    database: 'DeltaMusic02'
});

connection.query('SELECT now() AS time', function(err, rows, fields){
    if(err) throw err;

    console.log('The time is: ', rows[0].time);
    
});

connection.query('SELECT * FROM tracks', function(err, rows, fields) {
  if (err) throw err;
    
  console.log(rows);

});

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
});

app.listen(3000);


