// file: index.js

var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

let Utils = require('./util');

var http = require('http');
var path = require('path');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var db = [
  {
    credential: {
      id: 1,
      username: 'admin',
      password: 'admin'
    },
    somethingelse: ''
  },
  {
    credential: {
      id: 2,
      username: 'test',
      password: 'test'
    },
    somethingelse: ''
  }
];

let tokens = [];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'secret key bla bla';
//jwtOptions.issuer = 'accounts.examplesoft.com';
//jwtOptions.audience = 'yoursite.net';

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  console.log('payload received', jwt_payload);

  if (!jwt_payload) {
    console.error('jwt payload not valid');
    done(null, false);
  }

  console.log('jwt_payload is', jwt_payload);

  let isLoggedIn = tokens.findIndex(o => o && o.userId === jwt_payload.id) !== -1;
  console.log('jwtStrategy verify with isLoggedIn: ', isLoggedIn);

  if (!isLoggedIn) {
    console.error('cannot find previous login in tokenMap with payload', jwt_payload);
    return done(null, false);
  }

  // if (!tokenMap.has(jwt_payload.id)) {
  //   console.error(`cannot find user with id=${jwt_payload.id} in tokenMap`);
  //   done(null, false);
  // } else {
  //   let jwtFromMap = tokenMap.get(jwt_payload.id);
  // }

  try {
    let isJwtValidDate = Utils.isJwtValidDate(jwt_payload);
    console.log('isJwtValidDate', isJwtValidDate);

    if (!isJwtValidDate) {
      console.error('jwt has an invalid data');
      done(null, false);
    }

    console.log('systemDate valid');

    var user = db[_.findIndex(db, o => o && o.credential && o.credential.id === jwt_payload.id)];
    console.log(' user obtained from payload ', user);
    if (user && user.credential) {
      done(null, user.credential);
    } else {
      done(null, false);
    }
  } catch (err2) {
    console.error('exception thrown by isJwtValidDate', err2);
    done(null, false);
  }
}));

var app = express();

app.use('/', express.static(path.join(__dirname, 'public/')));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())

app.use(function (err, req, res, next) {
  res.send(500, {
    status: 500,
    message: 'internal server error'
  });
})

// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true
// }));

app.use(passport.initialize());
//app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
  // res.status(200).success();
});

app.post("/api/login", function(req, res) {
  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = db[_.findIndex(db, o => o && o.credential && o.credential.username === username)];
  if( !user || !user.credential  ){
    res.status(401).json({message:"no such user found"});
    return;
  }

  console.log('user: ', user);

  if(user.credential.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.credential.id};
    console.log('payload', payload );
    var token = jwt.sign(getJwtToSign(payload), jwtOptions.secretOrKey);
    console.log('token', token );

    let indexLoggedUser = tokens.findIndex(o => o && (o.token === token || o.userId === user.credential.id));

    if (indexLoggedUser !== -1) {
      tokens.splice(indexLoggedUser, 1); // remove element
      tokens.push({token: token, userId: user.credential.id});
    } else {
      tokens.push({token: token, userId: user.credential.id});
    }
    // tokenMap.set(token, user.credential.id);

    console.log('tokens', tokens);

    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

function getJwtToSign(thisObject) {
  let user = thisObject; // eventually, you can filter some information

  let expiry = new Date();
  expiry.setTime(expiry.getTime() + 600000); //valid for 10 minutes (10*60*1000)

  return {
    id: thisObject.id,
    //I don't want to expose private information here
    user: 'other useful data in this object',
    exp: parseFloat(expiry.getTime())
  };
}

app.get("/api/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});

app.get("/api/logout", passport.authenticate('jwt', { session: false }), function(req, res){
  console.log('req.headers.authorization is ', req.headers.authorization);
  console.log('req.user is ', req.user);

  let currentToken = req.headers.authorization.replace('Bearer ','');
  let currentUser = req.user;
  tokens = tokens.filter(o => o && currentToken && currentUser && o.token !== currentToken && o.userId !== currentUser.id);

  console.log('tokens after logout', tokens);
  res.json({message: "Logging out"});
});

app.get("/api/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

app.listen(3000, function() {
  console.log("Express running");
});
