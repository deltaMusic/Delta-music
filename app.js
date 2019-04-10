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
    // defaultView: 'main',
    defaultLayout: 'main',
    // layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
  }));

app.use(express.urlencoded());

connection.connect(function(err) {
    if (!err) throw err
}); 

const query_playlist_select = 'SELECT * FROM Playlists ORDER BY playlistID';

app.get('/', function (req, res, next) {
    connection.query(query_playlist_select, function(err, rows, fields) {
    if (!err){
        
        var data = {
          layout: 'main',
          template: 'library-template',
          rows
        };

        res.render('library', data);

    }else
        console.log('Error while performing Query.', err);
    });
});

    //////////////////////////////////
    ///// Creating New Playlist //////
    //////////////////////////////////

    const query_playlist_insert = 'INSERT INTO Playlists (libraryID, name) VALUES (?, ?);';
    //later once we migrate with all the login features, we need to update SQL to set the defualt libraryID to 1

    app.post('/create_playlist', (req, res) => {
      
      // if usedr created, default libraryID = 1 created.
      // then, create many of playlist corresponding to libraryID 1.
      
      const libraryID = 1;
      // check if the primary key (Playlist ID) auto increament - if not find the way to created index. -- done  

      const name = req.body.playlist_name;    
      
      connection.query(query_playlist_insert, [libraryID, name], (error, results, fields) => {
          if (error) {
              throw error;
          }
          console.log("Playlist : '" + name + "' Inserted successfully.");
          res.redirect('/')
      });
    });

    /////////////////////////////////////////////////////////////////////////

    app.post('/delete_playlist', (req, res) => {
      
      const playlist = req.body.playlist;

      connection.query('DELETE FROM Playlists WHERE ? = playlistID;', [playlist], (error, results, fields) => {
          if (error) {
              throw error;
          }
          console.log('PlaylistID : ' + playlist + ' Deleted successfully !');
          res.redirect('/')
      });
    });

    app.post('/delete_playlist_range', (req, res) => {

        const start = req.body.start;
        const finish = req.body.finish;
        connection.query('DELETE FROM Playlists WHERE ? <= playlistID AND playlistID <= ?;', [start, finish], (error, results, fields) => {
            if (error) {
                throw error;
            }
            console.log('PlaylistID Start: ' + start);
            console.log('PlaylistID Finish: ' + finish);
            console.log('Delete Completed !! or not');
            res.redirect('/')
        });
    });


    ///////////////////////////////// Playlist ////////////////////////////////////////////////
    
    app.get('/playlist', function (req, res, next) {
          
        connection.query('SELECT * FROM Tracks', function(err, rows, fields) {
        if (!err){
            
            var data = {
              layout: 'main',
              template: 'playlist-template',
              rows
            };
            res.render('playlist', data);
            console.log(rows);

        }else
            console.log('Error while performing Query1.', err);
        });
    });

    ///////// SELECT the TrackID and add to the play list.
    // I might need to display the playlist as well. list of them maybe
    // select the song and select playlis then add

        // const query_track_and_playlist_select = 'SELECT * FROM Tracks UNION SELECT * FROM Playlists';


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
            connection.query('DELETE FROM Playlists WHERE ? <= playlistID AND playlistID <= ?;', [start, finish], (error, results, fields) => {
                if (error) {
                    throw error;
                }
                console.log('PlaylistID Start: ' + start);
                console.log('PlaylistID Finish: ' + finish);
                console.log('Delete Completed !! or not');
                res.redirect('/')
            });
        });

app.listen(3000);

