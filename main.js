// File Name: main.js
// Airside - Tampa International Airport Database Management System
// COP 4710 Database Design (Spring 2020)
// Mihail Kaburis, Jose-Pablo Mantilla, Jody Rutter

// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import cons from 'consolidate';
// import dust from 'dustjs-helpers';
const {Pool, Client} = require('pg');
const express = require('express')
const app = express()
const port = 3000

const pool = new Pool({
    user: 'airport_admin',
    host: 'localhost',
    database: 'airsidedb',
    password: 'tampa_airport',
    port: '5432'
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening at http://localhost:${port}'))

