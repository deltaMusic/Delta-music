# Delta-music
Steps I took to confirm a connection between my python program and mariadb. 
  1) SQL FILE
      I attached an SQL file which emcompases a demo database with three track entries and teo user entries. 
      We should all have the same starting (local) database so when we develop the python program we can confirm outcomes, etc.
      Hopefully, we will get more information from the professor about the MariaDB cloud by monday (3/18)
  2) MariaDB
      I found online how to connect MariaDB to a python file, which I included as a file. If you don't plan on using MariaDB ((locally!))
      simply google the connection line to your preferred managing system. I tried to run the SQL script file through MariaDB, but it was
      giving errors. SO, instead I just copied table by table of the file into MariaDB, then it worked perfectly. 
      NOTE:::: 
            line: /// mariadb_connection = mariadb.connect(user='root', password='xxxx', database='DeltaMusic02') ///
      You need to put the correct password for this MariaDB connection. Also, verify the database name. If you copy from the file, then
      it is DeltaMusic02. 
      
      Getting to run this file successfully, results in this output. 
          C:\Python27\python.exe "C:/Users/Izzy/Documents/cs 336 DATAB/projectConnectionPython.py"
           (u'Going Bad (feat. Drake)',)
           (u'Nights Like This (feat. Ty Dolla Sign)',)
           (u'Come Through and Chill (feat. J.Cole & Salaam Remi)',)
          Process finished with exit code 0

Basically, once you make the connection, you can write a query as a string then connect it to the magaging system. 
I will attach a file with basics on how to insert data, manipulate, create tables, etc...
We should learn this quick as the application we are creating will involve more than just sending queries. Somwhow, we habe to get
to the application of it (probably using Tkinter python module [google it!]). 

You may need to download/upgrade certain features like python 2.7>. The difficult part for me was downloading 'mysql.connector'. 
If you need help, reach out! :) it's doesn't take much time to set up. I will play around with the application part this weekend to see
if it is doable. 
