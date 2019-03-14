#!/usr/bin/python
import mysql.connector as mariadb

mariadb_connection = mariadb.connect(user='root', password='minimouse9798', database='DeltaMusic02')
cursor = mariadb_connection.cursor()


cursor.execute("SELECT name FROM Tracks")
for name in cursor:
    print(name)

mariadb_connection.close()




