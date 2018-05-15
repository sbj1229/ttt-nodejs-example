var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors()); // http://guswnsxodlf.github.io/enable-CORS-on-express

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var gameState = {winner:'', isXnext: true, squares: Array(9).fill('') };

function wins(turn){
  if((gameState.squares[0]==turn && gameState.squares[1]==turn && gameState.squares[2]==turn) ||
  (gameState.squares[3]==turn && gameState.squares[4]==turn && gameState.squares[5]==turn) ||
  (gameState.squares[6]==turn && gameState.squares[7]==turn && gameState.squares[8]==turn) ||
  (gameState.squares[0]==turn && gameState.squares[3]==turn && gameState.squares[6]==turn) ||
  (gameState.squares[1]==turn && gameState.squares[4]==turn && gameState.squares[7]==turn) ||
  (gameState.squares[2]==turn && gameState.squares[5]==turn && gameState.squares[8]==turn) ||
  (gameState.squares[0]==turn && gameState.squares[4]==turn && gameState.squares[8]==turn) ||
  (gameState.squares[2]==turn && gameState.squares[4]==turn && gameState.squares[6]==turn))
  return true;
  else  return false;
};

function Winner(){
  if(wins('X')) return'X';
  if(wins('O')) return 'O';
  return '';
};

app.get('/game_state', (req, res) => {
  res.charset = 'UTF-8';
  res.send(gameState); // send JSON
} );

// https://...../move?turn=X&pos=4
app.get('/move', (req, res) => {
  res.charset = 'UTF-8';
  var turn = req.query.turn;
  var pos = req.query.pos;
  if((gameState.isXnext && turn=="O") || (!gameState.isXnext && turn=="X"))
  {
    res.send('턴이 아님');
  }
  else{
    if(Winner() == 'X' || Winner() == 'O' )
    {
      res.send('게임이 종료됨');
      return;
    }
    console.log('move: '+turn+pos);
    if(gameState.squares[pos]!='')
    {
      res.send('빈칸이 아님');
    }
    else{
      gameState.squares[pos] = turn;
      gameState.isXnext = !gameState.isXnext;
      gameState.winner = Winner();
    }

  }
} );

app.get('/', (req, res) => {
  res.charset = 'UTF-8';
  res.send('GET으로 넘어온 name은 '+ req.query.name + '입니다.');
} );

app.post('/', (req, res) => {
  res.charset = 'UTF-8';
  res.send('POST로 넘어온 name은 '+ req.body.name + '입니다.');
} );

app.listen(8080, () => console.log('Example app listening on port 8080!'));
