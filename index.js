// Copyright (C) 2017 Louis de Charsonville
// This program is free software: you can redistribute it and/or modify
// it under the terms of the MIT License

const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser');

var bookings = require('./public/json/bookings.json');

// DOTENV
require('dotenv').config({path:path.join(__dirname,'/.env')});
const myAdmin = process.env.USER_ADMIN;
const myPass = process.env.USER_PASS;

// APP
const app = express();


// CONFIG
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public',express.static(path.join(__dirname, 'public')));

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// ROUTES
app.get('/',function(req,res) {
    res.render('index',{bookings:bookings['Bookings']});
});

