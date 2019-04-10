var mysql = require('mysql');   
var express = require('express');
var exphbs  = require('express-handlebars');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'deltamusic02',
  multipleStatements: true
});

app.set('view engine', 'handlebars');
app.engine( 'handlebars', exphbs( {
    extname: 'handlebars',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
  }));

app.use(express.urlencoded());

connection.connect(function(err) {
    if (err) throw err
}); 

// SELECET playlistID FROM Playlists; SELECT artistID FROM Artists;
app.get('/playlist', function (req, res, next) {
    connection.query('SELECT name FROM Tracks; SELECT playlistID FROM Playlists; SELECT artistID FROM Artists;', 
        function(err, rows, fields){
        if(err){
            throw err;
        }else{
            //console.log(rows[0]);       // Column1 as a result
            //console.log(rows[1]);       // Column2 as a result
            //console.log(rows[2]);       // Column3 as a result
            
            var trackList = [];
            var playList = [];
            var artistList = [];

                rows[0].forEach(function(row) {
                    trackList.push({
                        name  : [row.name]
                    });
                });
                rows[1].forEach(function(row) {
                    playList.push({
                        playlistID  : [row.playlistID]
                    });
                });
                rows[2].forEach(function(row) {
                    artistList.push({
                        artistID  : [row.artistID]
                    });
                });
                
                // for(var i = 0; i <= 3; i++){
                //     console.log(rows[i]);
                // }
                
            var data = {
                layout: 'main',
                template: 'playlist-template',
                rows,
                trackList,
                playList,
                artistList
            };
            res.render('playlist', data);
        }
    });
});

app.listen(3001);