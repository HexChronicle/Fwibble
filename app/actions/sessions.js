var pg = require('../../db/db_setup');
var sha1 = require('sha1');

var Session = module.exports;

/*
  Generate token for entry into db using the timestamp
*/

Session.generateToken = function(sessionId, timestamp) {
  var token = sha1(timestamp);
  console.log(token);
  return pg('sessions').where({'session_id': sessionId}).update({'token': token}).returning(['session_id', 'username', 'createdat', 'token'])
    .catch(function(error) {
      console.error('error inserting token into db', error)
    }) 
    .then(function(res){
      console.log('successfully updated token', res)
      return res[0];
    })  
}


/* 
  find session token via existing user id
*/

Session.findTokenByUsername = function(username) {
  return pg.select('token').from('sessions').where({'username': username})
    .catch(function(error) {
      console.error('error retrieving token', error)
    })
    .then(function(res){
      console.log('successfully retrieved token', res)
      return res[0].token;
    })
}

/*
  find session id using the existing username
*/

Session.findIdByUsername = function(username) {
  return pg.select('session_id').from('sessions').where({'username': username})
    .catch(function(error) {
      console.error('error retrieving session', error)
    })
    .then(function(res){
      console.log('successfully retrieved session', res)
      return res[0].session_id;
    })
}

/* 
  attrs: 
    username: username
*/

Session.create = function(attrs) {
  return pg('sessions').insert(attrs, ['session_id', 'username', 'createdat', 'token'])
    .catch(function(error) {
      console.error('error inserting session', error)
    })
    .then(function(res){
      console.log('successfully inserted session', res)
      var sessionId = res[0].session_id;
      var timestamp = res[0].createdat;
      Session.generateToken(sessionId, timestamp)
      console.log("create session after token creation", res);     
      return res[0];
    })
}

/* 
  Delete user's session via username
*/

Session.deleteByUsername = function(username) {
  return pg('sessions').where({'username': username}).del()
    .catch(function(error) {
      console.error('error deleting session');
    })
    .then(function(res) {
      console.log('successfully deleted session row', res)
      return res;
    })
}

