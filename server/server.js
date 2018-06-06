const io = require('socket.io')();

let lobbies = [];
let usernames = [];

io.on('connection', function(socket){
  // what to do when a user connects
  console.log('User connected: '+ socket.id);

  // on disconnect we log to console
  socket.on('disconnect', function(){
    console.log('User disconnected: '+socket.id);
  })

  // use this to try emit messages from client side
  socket.on('test', testbericht => {
    console.log(testbericht + " / " + socket.id);
  })

  // create the user based on nickname, avatar en host
  // voegt de user nog niet toe aan een lobby
  socket.on('create user', ({nickname, avatar, host}) => {
    if(host){
      socket.host = true;
    }else{
      socket.host = false;
    }

    socket.nickname = nickname
    socket.avatar = avatar
  })

  socket.on('user join', ({ nickname, avatar, gamename}) => {

    const lobby = lobbies.find(lobby => {
      return lobby.gamename === gamename;
    })

    socket.nickname = nickname
    socket.avatar = avatar

    // if lobby exists, add user to it
    if(lobby){
      socket.lobby = gamename
      lobby.players.push({
        "id": socket.id,
        "nickname": socket.nickname
      })
      socket.join(gamename);
      console.log("lobby exists... joining...")
      
      // then send updated players back to everyone IN THAT ROOM!
      io.sockets.in(lobby.gamename).emit('lobby', lobby)
    }else{
      socket.emit('err', 'Deze lobby bestaat niet!')
      console.log("lobby doesn't exist...")
    }
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
    socket.join(gamename);
    lobbies.push(lobby);
  })

  socket.on('set mode', (mode) => {
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    if(lobby){
      lobby.mode = mode;
    }

    io.sockets.in(lobby.gamename).emit('lobby', lobby)
  })

  
  
});
    
const port = 8000;
io.listen(port);
console.log('Listening on port', port);
