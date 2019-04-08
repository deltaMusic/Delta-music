var mysql = require('mysql');   
var express = require('express');
var exphbs  = require('express-handlebars');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'deltamusic02'
});

const query_playlist_select = 'SELECT * FROM Playlists ORDER BY playlistID';

app.set('view engine', 'handlebars');
app.engine( 'handlebars', exphbs( {
    extname: 'handlebars',
    // defaultView: 'main',
    defaultLayout: 'main',
    // layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
  }));
  // all the templates located in Views by default


connection.connect(function(err) {
    if (err) throw err
}); 
// Avoid  connect() and end() repeatly, it cause the problem

app.use(express.urlencoded());

app.get('/', function (req, res, next) {

    connection.query(query_playlist_select, function(err, rows, fields) {
    if (!err){
        
        var data = {
          layout: 'main',
          template: 'library-template',
          rows
        };

        res.render('library', data);
        // home-template for separate the section for CSS styling

    }else
        console.log('Error while performing Query.', err);
    });
});

    //////////////////////////////////
    ///// Creating New Playlist /////
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


    // UI - Click on Edit button
    // Check box is appear
    // select playist to delete
    // click on to delete the selected playlist(s)
    // 

    ////////////////////////////////////////////////////

    app.post('/delete_playlist_test', (req, res) => {
      
      const playlist = req.body.playlist;

      connection.query('DELETE FROM Playlists WHERE ? = playlistID;', [playlist], (error, results, fields) => {
          if (error) {
              throw error;
          }
          console.log('PlaylistID : ' + playlist + ' Deleted successfully !');
          res.redirect('/')
      });
  });
    // work for single list deletion.

    app.post('/delete_playlist', (req, res) => {

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

    // work for the deletion of playlist.

app.listen(3000);

