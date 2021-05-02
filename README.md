# simpleCRUD
First set PostgreSQL database. To do so, do queries:
```
CREATE DATABASE worldtransactions;
\c worldtransactions postgres;
CREATE TABLE country(id serial PRIMARY KEY,name text);
```
Set appropriate variables in .env: user, password, etc.

After downloading repo do
```sh
$ npm install
```

Start with:
```sh
$ npm run start
```
App should be on localhost port listed in terminal(default: 3000)
