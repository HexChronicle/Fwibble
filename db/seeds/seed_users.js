var pg = require('../db_setup');

var seedUser = function() {
  // pg('users').truncate()
  //   .then(function() {
      return pg('users').insert([
        {
          username: 'Player1',
          password: 'password',
          active_game: '458d21'
        },
        {
          username: 'Player2',
          password: 'drowssap',
          active_game: '458d21'
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding users', error)
    })
};

seedUser();



