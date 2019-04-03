var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'minimouse9798',
    database: 'DeltaMusic02'
});

connection.connect();

connection.query('SELECT now() AS time', function(err, rows, fields){
    if(err) throw err;

    console.log('The time is: ', rows[0].time);
    
});

connection.query('SELECT * FROM tracks', function(err, rows, fields) {
  if (err) throw err;
    
  console.log(rows);

});

connection.end();
