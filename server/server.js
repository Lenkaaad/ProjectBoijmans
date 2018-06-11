const io = require('socket.io')();

let lobbies = [];

// function generates a random string + number combination (used for lobby code)
function randomStr(m) {
	var m = m || 9; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
  return s.toUpperCase();
};

io.on('connection', function(socket){
  // what to do when a user connects
  console.log('User connected: '+ socket.id);


  // on disconnect we log to console
  socket.on('disconnect', function(){
    console.log('User disconnected: '+socket.id);

    // if socket is host of a lobby, remove said lobby
    if(socket.host){
      const lobby = lobbies.find(lobby => {
        return lobby.gamename === socket.lobby;
      })
  
      if(lobby){
        // remove the lobby
        var filteredlobbies = lobbies.filter(function(lobby) { return lobby.gamename !== socket.lobby; }); 
        lobbies = filteredlobbies;
  
        // send all people in room request to leave + message
        io.sockets.in(socket.lobby).emit('leave request');
        io.sockets.in(socket.lobby).emit('lobby removed', 'The host has left the lobby!');
  
        // leave lobby as host
        socket.leave(socket.lobby)
        // socket.emit('lobby removed', 'The lobby has been removed!');
        socket.lobby = null
      }

      console.log(lobbies);
    }else{
      // if socket is not host of a lobby, check if socket is in a lobby, if so, remove socket from lobby and list of players
      const lobby = lobbies.find(lobby => {
        return lobby.gamename === socket.lobby;
      })

      // remove socket from players
      if(lobby){
        var filteredplayers = lobby.players.filter(function(player) { return player.id !== socket.id; }); 
        lobby.players = filteredplayers;
      }

      // leave room, send other sockets update on players
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

  // when user joins a game with gamename/gamecode
  socket.on('user join', ({ nickname, avatar, gamename}) => {

    const lobby = lobbies.find(lobby => {
      return lobby.gamename === gamename;
    })

    socket.nickname = nickname
    socket.avatar = avatar

    // if lobby exists, add user to it
    if(lobby){
      // if lobby already started: player can't join anymore
      if(lobby.started){
        console.log("whoops the game already started!");
        socket.emit('err', 'Je kunt je niet toevoegen aan een spel als het al gestart is...');
      }else{
      socket.lobby = gamename
      lobby.players.push({
        "id": socket.id,
        "nickname": socket.nickname,
        "avatar": socket.avatar,
        "wins": 0,
        "responseTime": 0
      })
      
      socket.join(gamename);
      console.log("lobby exists... joining...")
      
      // then send updated players back to everyone IN THAT ROOM!
      io.sockets.in(lobby.gamename).emit('lobby', lobby)
      }
    }else{
      // als de lobby niet bestaat, send error naar socket met message
      socket.emit('err', 'Deze lobby bestaat niet!')
      console.log("lobby doesn't exist...")
    }
  })

  // create a lobby
  socket.on('create lobby', (rondes) => {

    // create gamecode
    const gamestring = randomStr(5);

    // if a lobby already exists with this string: lobby already exists
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === gamestring;
    })

    console.log(gamestring);
    console.log(lobby);

    if(lobby !== undefined){
      console.log("lobby already exists");
      // preferably recreate a new gamecode and check again
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
          "avatar": socket.avatar,
          "wins": 0,
          "responseTime": 0
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

  // remove a lobby
  socket.on('remove lobby', () => {

    // called when exit as host
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    if(lobby !== undefined){
      // remove the lobby
      var filteredlobbies = lobbies.filter(function(lobby) { return lobby.gamename !== socket.lobby; }); 
      lobbies = filteredlobbies;

      // send all people in room request to leave
      io.sockets.in(socket.lobby).emit('leave request');
      io.sockets.in(socket.lobby).emit('lobby removed', 'The host has removed the lobby!');

      // leave lobby as host + change host to false
      socket.leave(socket.lobby)
      socket.lobby = null
      socket.host = false

      // send host back to homescreen with message
      socket.emit('lobby removed', 'The lobby has been removed!');

    }

    console.log(lobbies);
  })

  socket.on('leave lobby', () => {
      // leave lobby as player

      const lobby = lobbies.find(lobby => {
        return lobby.gamename === socket.lobby;
      })

      // filter socket out of players
      if(lobby !== undefined){
        if(!socket.host){
          var filteredplayers = lobby.players.filter(function(player) { return player.id !== socket.id; }); 
          lobby.players = filteredplayers;
        }else{
          var filteredlobbies = lobbies.filter(function(lobby) { return lobby.gamename !== socket.lobby; }); 
          lobbies = filteredlobbies;

          io.sockets.in(socket.lobby).emit('leave request');
          io.sockets.in(socket.lobby).emit('lobby removed', 'The host has removed the lobby!');
          socket.emit('lobby removed', 'The lobby has been removed!');

          socket.host = false;
        }
      }

      socket.host = false;

      // leave room, send update to other players in room
      socket.leave(socket.lobby)
      io.sockets.in(socket.lobby).emit('lobby', lobby);
      socket.lobby = null

      console.log(lobbies);
  })

  socket.on('start game', () => {
    // start game when after all players joined

    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    // add variable to keep track of state of game;
    lobby.started = true;

    // select first picker + add to ronde?
    const picker = lobby.players[0].id;

    lobby.rondes.push({
      "artwork" : Math.ceil(Math.random() * 33),
      "picker" : picker,
      "antwoorden": []
    })

    // send update to players in game
    io.sockets.in(socket.lobby).emit('go game');
    // send current ronde to players in games
    io.sockets.in(socket.lobby).emit('ronde', lobby.rondes[lobby.rondes.length - 1]);
    // send wait for round state to picker
    io.to(picker).emit('wait for round');

  })

  socket.on('enter answer', ({answer, seconds}) => {
    const lobby = lobbies.find(lobby => {
      return lobby.gamename === socket.lobby;
    })

    if(lobby !== undefined){
      // get last round
      const laatsteronde = lobby.rondes[lobby.rondes.length - 1];
      const player = lobby.players.find(player => {
        return player.id === socket.id;
      })

      player.responseTime = player.responseTime + seconds;

      // create antwoord object
      const antwoord = {
        "player": socket.nickname,
        "id": socket.id,
        "antwoord": answer,
        "win": false
      }

      // push antwoord to last round on enter answer
      laatsteronde.antwoorden.push(antwoord);

      // if all players in lobby - picker have sent answer: go to voting
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

    // find picked answer
    const winner = laatsteronde.antwoorden.find(antwoord => {
      return antwoord.player === name;
    })

    // add win to true
    winner.win = true;

    const player = lobby.players.find(player => {
      return player.nickname === winner.player;
    })

    // add a win to the player
    player.wins++;

    // send winner to players
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
      "artwork" : Math.ceil(Math.random() * 33),
      "picker" : picker,
      "antwoorden": []
    })

    io.sockets.in(socket.lobby).emit('picker', false);

    io.sockets.in(socket.lobby).emit('ronde', lobby.rondes[lobby.rondes.length - 1]);
    io.to(picker).emit('wait for round');

    }else{
      console.log("maximum aantal rondes bereikt!");
      // emit event to get results

      const sortedWinner = lobby.players.sort(function(a, b){
        return a.wins < b.wins;
      })

      const fastestPlayers = lobby.players.sort(function(a, b){
        return a.responseTime > b.responseTime
      })

      // still need to fix ties!
      const winner = sortedWinner[0];
      console.log(sortedWinner);
      console.log(fastestPlayers);
      const fastestPlayer = fastestPlayers[0];
      fastestPlayer.responseTime = fastestPlayer.responseTime / lobby.maxRondes;
      const slowestPlayer = fastestPlayers[fastestPlayers.length-1];
      slowestPlayer.responseTime = slowestPlayer.responseTime / lobby.maxRondes;

      const mothersFavorite = lobby.players.find(player => {
        return player.id !== winner.id && player.id !== fastestPlayer.id && player.id !== slowestPlayer.id;
      })

      io.sockets.in(socket.lobby).emit('end game', {winner, fastestPlayer, slowestPlayer, mothersFavorite});
    }

  })
  
});
    
const port = 8000;
io.listen(port);
console.log('Listening on port', port);
