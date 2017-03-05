# CS361ProjectB

##Requirements
- Docker
- Node v6

##Notes

Run the command ```npm run devstart```

You should see the following:

```
> node devstart.js
Downloading mysql docker container, please wait...
MySQL container was downloaded!
Stopping and cleaning up any old instances...
hello!
Example app listening on port 3000!
Dev environment variable set! Using dev settings...
Creating sample user
Attempting to open db connection
Attempting to open db connection
Attempting to open db connection
Attempting to open db connection
Attempting to open db connection
DB connection opened.
Executing (default): INSERT INTO `Customers` (`id`,`username`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'test','2017-03-05 20:36:42','2017-03-05 20:36:42');
```

Note that you can connect to mysql and view changes in another window:

```
nsosnov@nsosnov-ubuntu:~$ mysql -h 127.0.0.1 -P 3306 -u root -pdev
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 13
Server version: 8.0.0-dmr MySQL Community Server (GPL)

Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use fbank;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+-----------------+
| Tables_in_fbank |
+-----------------+
| Customers       |
+-----------------+
1 row in set (0.00 sec)

mysql> select * from Customers;
+----+----------+---------------------+---------------------+
| id | username | createdAt           | updatedAt           |
+----+----------+---------------------+---------------------+
|  1 | test     | 2017-03-05 20:36:42 | 2017-03-05 20:36:42 |
+----+----------+---------------------+---------------------+
1 row in set (0.00 sec)
```
