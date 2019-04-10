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


app.get('/playlist', function (req, res, next) {
    
    var trackList = [];
    var playList = [];
    
    connection.query('SELECT trackID, name FROM Tracks; SELECT playlistID, name FROM Playlists;', 
        function(err, rows, fields){
        if(err){
            throw err;
        }else{
            //console.log(rows[0]);       // Column1 as a result
            //console.log(rows[1]);       // Column2 as a result
            //console.log(rows[2]);       // Column3 as a result

            rows[0].forEach(function(row) {
                trackList.push({
                    name    : [row.name],
                    trackID :  row.trackID
                });
            });
            rows[1].forEach(function(row) {
                playList.push({
                    playlistID  : [row.playlistID],
                    name        : row.playlistID
                });
            });
            
            console.log(rows[0]);       // Column1 as a result
            console.log(rows[1]);      

            var data = {
                layout: 'main',
                template: 'playlist-template',
                rows,
                trackList,
                playList,
            };
            res.render('playlist', data);
        }
    });
});


app.post('/add_to_playlist', (req, res) => {

    var select_track_list = []; // multiple tracks selected to store in array
    
    // how to display the playlist ??? - find out if we can make the two query connection.
    // we can inser into the playlist where playlistID = ....

    const select_playlist = req.body.playlist;

    connection.query('INSERT INTO Playlists WHERE ? = playlistID;', [start, finish], (error, results, fields) => {
        if (error) {
            throw error;
        }
        console.log('PlaylistID : ' + start);
        console.log('');
        res.redirect('/')
    });
    

    const start = req.body.start;
    const finish = req.body.finish;

    // insert into playlist [ selected play list ]
});

app.listen(3002);