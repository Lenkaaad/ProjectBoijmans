const io = require('socket.io')();

let lobbies = [];
let usernames = [];

io.on('connection', function(socket){
  // what to do when a user connects
  console.log('User connected: '+ socket.id);

  io.emit('lobbies', lobbies);

  socket.on('disconnect', function(){
    console.log('User disconnected: '+socket.id);
  })

  socket.on('test', testbericht => {
    console.log(testbericht + " " + socket.id);
  })

  socket.on('create user', ({nickname, avatar, host}) => {
    if(host){
      socket.host = true;
    }else{
      socket.host = false;
    }

    socket.nickname = nickname
    socket.avatar = avatar

  })


  socket.on('create lobby', ({gamename, spelers, rondes, tijd}) => {
    const lobby = {
      "gamename": gamename,
      "maxPlayers": spelers,
      "maxRounds": rondes,
      "maxTime": tijd,
      "mode": null,
      "players": [{
        "id": socket.id,
        "nickname": socket.nickname 
      }],
      "rondes": []
    }
    
    socket.lobby = gamename;
    lobbies.push(lobby);
    console.log(lobbies);
  })

  socket.on('set mode', (mode) => {
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    lobby.mode = mode;

    io.emit('new lobby', lobby.gamename);
    io.emit('lobbies', lobbies);

    io.emit('players', lobby.players);
    
  })
  
});
    
const port = 8000;
io.listen(port);
console.log('Listening on port', port);
