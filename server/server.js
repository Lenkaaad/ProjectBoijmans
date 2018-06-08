const io = require('socket.io')();

let lobbies = [];

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
    console.log(lobbies);

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
      if(lobby.started){
        console.log("whoops the game already started!");
        socket.emit('err', 'Je kunt je niet toevoegen aan een spel als het al gestart is...');
      }else{
      socket.lobby = gamename
      lobby.players.push({
        "id": socket.id,
        "nickname": socket.nickname,
        "wins": 0
      })
      
      socket.join(gamename);
      console.log("lobby exists... joining...")
      
      // then send updated players back to everyone IN THAT ROOM!
      io.sockets.in(lobby.gamename).emit('lobby', lobby)
      }
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
        "currentPicker": 0,
        "started": false,
        "players": [{
          "id": socket.id,
          "nickname": socket.nickname,
          "wins": 0
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

    lobby.started = true;

    // select first picker + add to ronde?
    const picker = lobby.players[0].id;

    lobby.rondes.push({
      "artwork" : Math.floor(Math.random() * 21),
      "picker" : picker,
      "antwoorden": []
    })

    io.sockets.in(socket.lobby).emit('go game');
    console.log(lobby.rondes[lobby.rondes.length - 1]);
    io.sockets.in(socket.lobby).emit('ronde', lobby.rondes[lobby.rondes.length - 1]);
    io.to(picker).emit('wait for round');

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
        "antwoord": answer,
        "win": false
      }

      laatsteronde.antwoorden.push(antwoord);

      if(laatsteronde.antwoorden.length === (lobby.players.length - 1)){
        io.sockets.in(socket.lobby).emit('answers sent', laatsteronde);
        //io.sockets.socket(savedSocketId).emit('vote round', laatsteronde)
      }

      //io.sockets.in(socket.lobby).emit('ronde', laatsteronde);
      console.log(laatsteronde.antwoorden);
    }
  });

  socket.on('vote for answer', name => {
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    const laatsteronde = lobby.rondes[lobby.rondes.length - 1];

    const winner = laatsteronde.antwoorden.find(antwoord => {
      return antwoord.player === name;
    })

    winner.win = true;

    console.log("The winner is " + winner.player);
    const player = lobby.players.find(player => {
      return player.nickname === winner.player;
    })

    player.wins++;

    io.sockets.in(socket.lobby).emit('winner', winner);
  })

  socket.on('next round', () => {
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    if(lobby.rondes.length < lobby.maxRondes){
    console.log("volgende ronde start");

    // select first picker + add to ronde?
    
    if(lobby.currentPicker < lobby.players.length - 1){
      lobby.currentPicker++;
    }else{
      lobby.currentPicker = 0;
    }

    const picker = lobby.players[lobby.currentPicker].id;

    lobby.rondes.push({
      "artwork" : Math.floor(Math.random() * 21),
      "picker" : picker,
      "antwoorden": []
    })

    io.sockets.in(socket.lobby).emit('picker', false);

    console.log(lobby.rondes[lobby.rondes.length - 1]);
    io.sockets.in(socket.lobby).emit('ronde', lobby.rondes[lobby.rondes.length - 1]);
    io.to(picker).emit('wait for round');

    }else{
      console.log("maximum aantal rondes bereikt!");
      // emit event to get results

      const sorted = lobby.players.sort(function(a, b){
        return a.wins < b.wins;
      })

      const winner = sorted[0];
      console.log(sorted);
      console.log(winner);

      io.sockets.in(socket.lobby).emit('end game', winner);
    }

  })
  
});
    
const port = 8000;
io.listen(port);
console.log('Listening on port', port);
