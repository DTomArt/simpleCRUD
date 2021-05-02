const express = require('express');
const morgan = require('morgan');   //for logs
const {Pool} = require('pg');   //communication with postgresql
require('dotenv').config(); //configuration of pg with env variables

//dependencies for rendering site
const ejs = require('ejs');

const app = express();  //initialize app
app.use(morgan('common'));  //for logs
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//set for rendering site
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname));

app.get('/', (req,res)=>{
    res.render('index');    //render index html file
})

let pool = new Pool;

app.get('/info/get', (req, res)=>{
    try{
        pool.connect( async (error, client, release)=>{
            let resp = await client.query(`SELECT * FROM country`);
            release();
            res.json(resp.rows);
        })
    }catch(error){
        console.log(error)
    }
});

app.post('/info/add', (req, res)=>{
    try{
        pool.connect( async (error, client, release)=>{
            let resp = await client.query(`INSERT INTO country (name) VALUES ('${req.body.add}')`);
            release();
            res.redirect('/info/get');
        })
    }catch(error){
        console.log(error)
    }
});

app.post('/info/delete', (req, res)=>{
    try{
        pool.connect( async (error, client, release)=>{
            let resp = await client.query(`DELETE FROM country WHERE name = '${req.body.delete}'`);
            release();
            res.redirect('/info/get');
        })
    }catch(error){
        console.log(error)
    }
});

app.post('/info/update', (req, res)=>{
    try{
        pool.connect( async (error, client, release)=>{
            let resp = await client.query(`UPDATE country SET name = '${req.body.newValue}' WHERE name = '${req.body.oldValue}'`);
            release();
            res.redirect('/info/get');
        })
    }catch(error){
        console.log(error)
    }
});

const port = 3000;

app.listen(port, (
    console.log(`server started on port ${port}`)
))
