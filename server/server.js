const io = require('socket.io')();

let lobbies = [];
let usernames = [];

function randomStr(m) {
	var m = m || 9; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
  return s.toUpperCase();
};

io.on('connection', function(socket){
  // what to do when a user connects
  console.log('User connected: '+ socket.id);
  console.log(randomStr(5));

  // on disconnect we log to console
  socket.on('disconnect', function(){
    console.log('User disconnected: '+socket.id);

    if(socket.host){
      const lobby = lobbies.find(lobby => {
        return lobby.gamename === socket.lobby;
      })
  
      if(lobby){
        // remove the lobby
        var filteredlobbies = lobbies.filter(function(lobby) { return lobby.gamename !== socket.lobby; }); 
        lobbies = filteredlobbies;
  
        // send all people in room request to leave
        io.sockets.in(socket.lobby).emit('leave request');
  
        // leave lobby as host
        socket.leave(socket.lobby)
        socket.emit('lobby removed', 'The lobby has been removed!');
        socket.lobby = null
      }
  
      console.log(lobbies);
    }else{
      const lobby = lobbies.find(lobby => {
        return lobby.gamename === socket.lobby;
      })

      if(lobby){
        var filteredplayers = lobby.players.filter(function(player) { return player.id !== socket.id; }); 
        lobby.players = filteredplayers;
      }

      socket.leave(socket.lobby)
      io.sockets.in(socket.lobby).emit('lobby', lobby);
      socket.lobby = null
    }
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


  socket.on('create lobby', (rondes) => {

    const gamestring = randomStr(5);

    const lobby = lobbies.find(lobby => {
      return lobby.gamename === gamestring;
    })

    console.log(gamestring);
    console.log(lobby);

    if(lobby !== undefined){
      console.log("lobby already exists");
      // return false: gamestring already exists
    }else{
      const lobby = {
        "gamename": gamestring,
        "maxRondes": rondes,
        "players": [{
          "id": socket.id,
          "nickname": socket.nickname 
        }],
        "rondes": []
      }

      socket.lobby = gamestring;
      socket.join(gamestring);
      lobbies.push(lobby);

      console.log(lobby);
      io.sockets.in(lobby.gamename).emit('lobby', lobby)
    }
    
  })

  socket.on('remove lobby', () => {
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    if(lobby){
      // remove the lobby
      var filteredlobbies = lobbies.filter(function(lobby) { return lobby.gamename !== socket.lobby; }); 
      lobbies = filteredlobbies;

      // send all people in room request to leave
      io.sockets.in(socket.lobby).emit('leave request');

      // leave lobby as host
      socket.leave(socket.lobby)
      socket.lobby = null

      socket.emit('lobby removed', 'The lobby has been removed!');

    }

    console.log(lobbies);
  })

  socket.on('leave lobby', () => {
      // leave lobby as player

      const lobby = lobbies.find(lobby => {
        return lobby.gamename === socket.lobby;
      })

      if(lobby){
        var filteredplayers = lobby.players.filter(function(player) { return player.id !== socket.id; }); 
        lobby.players = filteredplayers;
      }

      socket.leave(socket.lobby)
      io.sockets.in(socket.lobby).emit('lobby', lobby);
      socket.lobby = null
  })

  socket.on('start game', () => {
    console.log("Host has started the game");
    
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    lobby.rondes.push({
      "artwork" : Math.floor(Math.random() * 21),
      "antwoorden": []
    })

    io.sockets.in(socket.lobby).emit('go game');
    console.log(lobby.rondes[lobby.rondes.length - 1]);
    io.sockets.in(socket.lobby).emit('ronde', lobby.rondes[lobby.rondes.length - 1]);
  
  })

  socket.on('enter answer', answer => {
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    console.log("enter answer")
    console.log(lobby);

    if(lobby !== undefined){
      const laatsteronde = lobby.rondes[lobby.rondes.length - 1];

      console.log(laatsteronde);

      const antwoord = {
        "player": socket.nickname,
        "id": socket.id,
        "antwoord": answer
      }

      laatsteronde.antwoorden.push(antwoord);

      if(laatsteronde.antwoorden.length === lobby.players.length){
        io.sockets.in(socket.lobby).emit('answers sent', laatsteronde);
      }

      io.sockets.in(socket.lobby).emit('ronde', laatsteronde);

      console.log(laatsteronde.antwoorden);
    }
  });
  
});
    
const port = 8000;
io.listen(port);
console.log('Listening on port', port);
