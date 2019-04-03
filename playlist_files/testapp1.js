const port = 3000;
const express = require('express');
const hb  = require('express-handlebars');
const app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    database: 'DeltaMusic02'
});

app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.urlencoded());
const query_test_insert = 'INSERT INTO Playlists (playlistID, libraryID, name) VALUES (?, ?, ?);';

connection.query('SELECT now() AS time', function(err, rows, fields){
  if(err) throw err;
  console.log('The time is: ', rows[0].time);  
});

app.get('/', function (req, res) {
  connection.query('SELECT * FROM Tracks', (error, rows, fields) => {
    if (error) throw error;
    //res.send(rows);
    res.render('home', { rows });
  });
});

app.post('/playlist-submit', (req, res) => {
  const playlistID =  8;
  const libraryID = 1;
  const name = req.body.name;

  connection.query(query_test_insert, [playlistID, libraryID, name], (error, results, fields) => {
      if (error) {
          throw error;
      }
      console.log("Inserted successfully.")
      res.redirect('/')
  });
});


function change(sourceUrl) {
  var audio = document.getElementById("player");
  var source = document.getElementById("mp3_src");

  audio.pause();
  
  if (sourceUrl) {
    source.src = sourceUrl;
    audio.load();
    audio.play();
  }
}

app.listen(3000);


