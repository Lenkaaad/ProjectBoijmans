const io = require('socket.io')();

let lobbies = {'room1': [], 'room2': [], 'room3': []};
let usernames = [];

io.on('connection', function(socket){

  // what to do when a user connects
  console.log('User connected: '+ socket.id);
  io.emit('lobbies', lobbies);
  // what to do when a user disconnects
  socket.on('disconnect', function(){
    console.log('User disconnected: ' + socket.id);
    // go through all lobbies to see if user was in this lobby, remove from object

    Object.keys(lobbies).map(lobby => {
      const newLobbies = lobbies[lobby].filter(function( obj ) {
        return obj.id !== socket.id;
      });

      lobbies[lobby] = newLobbies;
      socket.leave(lobby);
    }) 
    // send update to all clients
    io.emit('lobbies', lobbies);
  });

  socket.on('pick username', function(username){
    // setup username in socket object
    console.log('User ' + socket.id + ' has picked this username: ' + username);
    socket.username = username;
    // save usernames in array for check later for duplicates
    usernames.push(username);
  })

  socket.on('join lobby', function(lobby){
    console.log('User ' + socket.id + ' has joined ' + lobby);
    // if the lobby exists in our object, join it.
    if(lobbies[lobby]) {
      socket.join(lobby);
      lobbies[lobby].push({ 'username': socket.username, 'id': socket.id });
    }

    if(lobbies[lobby][0].id === socket.id){
      const host = true;
      io.emit('host', host);
    }
    console.log(lobbies);
    io.emit('lobbies', lobbies);
  });

  socket.on('show users', function(lobby){
    console.log('Returning users for lobby ' + lobby + '...');
    // send back all users per lobby on request
    io.emit('lobbies', lobbies);
  })

  socket.on('leave lobby', function(lobby){
    console.log('User ' + socket.id + ' has left ' + lobby);
    // if lobby exists, leave lobby and user from lobby in object
    if(lobbies[lobby]){
      socket.leave(lobby);

      const newLobbies = lobbies[lobby].filter(function( obj ) {
        return obj.id !== socket.id;
      });

      lobbies[lobby] = newLobbies;

      console.log(lobbies);
    }
    
    io.emit('lobbies', lobbies);
  })
});
    
const port = 8000;
io.listen(port);
console.log('Listening on port', port);
