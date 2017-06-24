// Copyright (C) 2017 Louis de Charsonville
// This program is free software: you can redistribute it and/or modify
// it under the terms of the MIT License

const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      fs = require('fs'),
      session = require('express-session'),
      sha3 = require('crypto-js/sha3'),
      randomstring = require("randomstring"),
      bodyParser = require('body-parser');

var bookings = require('./public/json/bookings.json');
// APP
const app = express();

require('dotenv').config({path:path.join(__dirname,'./config/.env')});
const myUser = process.env.USER_TUDOBEM;
const myPass = process.env.PASSW;

// CONFIG
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/bower_components',express.static(path.join(__dirname, 'bower_components')));

// use session
app.use(session({
    secret:'maggie-metleson',
    cookie:{},
    resave: false,
    saveUninitialized: false
}));
app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
// -----------------------------------------------------------------------------

// FUNCTIONS
// authentication
function authenticate(client_data,server_rnd,callback) {
    if (client_data.username != myUser) {
        console.log('cannot find user');
        return callback(new Error('cannot find user'));
    } else  {
        if (client_data.hash !== sha3(myPass+client_data.rnd+server_rnd).toString()) {
            console.log('client_data',client_data);
            console.log('server_rnd: ',server_rnd);
            console.log('server',sha3(myPass+client_data.rnd+server_rnd).toString());
            return callback(new Error('invalid password'));
        } else {
            return callback(null,client_data.username);
        }
    }
}
function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error =' Access denied !';
        res.redirect('/login');
    }
}

// Sort Bookings
function sortBookings() {
    bookings['Bookings'].sort(function(a, b) {
        return parseFloat(b.timestamp) - parseFloat(a.timestamp);
    });
}
// Clean Bookings
function cleaner(arr, id, callback) {
    var i = 0,
        found = false;
    while (i<arr.length && !found){
        var cur = arr[i];
        if (cur.timestamp === id) {
            arr.splice(i,1);
            found = true;
            callback();
        }
        i++;
    }
    if (!found){
        callback(new Error("elem not found in list"));
    }
}

// -----------------------------------------------------------------------------
// ROUTES
var server_rnd = '';
app.get('/',function(req,res) {
    sortBookings();
    res.render('index',{bookings:bookings['Bookings']});
});
app.get('/login',function(req,res){
    server_rnd = randomstring.generate();
    res.render('login',{server_rnd:server_rnd});
});
app.post('/login',function(req,res) {
    authenticate(req.body,server_rnd,function(err,user) {
        if (user) {
            req.session.regenerate(function() {
                req.session.user = user;
                req.session.success = "Authenticated as " + user;
                res.redirect('/bookings');
            });
        } else {
            req.session.error = 'Authentication failed';
            console.log('incorrect password or username');
            res.redirect('/login');
        }       
    });
});
app.get('/bookings',requiredAuthentication,function(req,res) {
    sortBookings();
    res.render('manage-bookings',{bookings:bookings['Bookings']});
});

app.post('/bookings',requiredAuthentication,function(req,res){
    if (req.body.delete !== undefined){
        cleaner(bookings['Bookings'],parseFloat(req.body.delete),function(error) {
            if (error) {
                console.log(error);
            }
        });
        fs.writeFile('./public/json/bookings.json', JSON.stringify(bookings), function (err) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/bookings');
            }
        });
    }
    else if (req.body.newdate !== undefined) {
        var new_booking = req.body.newdate;
        new_booking.timestamp = +new Date(new_booking.Date);
        bookings['Bookings'].push(new_booking);
        fs.writeFile('./public/json/bookings.json', JSON.stringify(bookings), function (err) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/bookings');
            }
        });
    }
    else {
        res.redirect('/bookings');
    }
});
