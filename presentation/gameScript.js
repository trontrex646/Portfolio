var em = [
  "💐",
  "🌹",
  "🌻",
  "🏵️",
  "🌺",
  "🌴",
  "🌈",
  "🍓",
  "🍒",
  "🍎",
  "🍉",
  "🍊",
  "🥭",
  "🍍",
  "🍋",
  "🍏",
  "🍐",
  "🥝",
  "🍇",
  "🥥",
  "🍅",
  "🌶️",
  "🍄",
  "🧅",
  "🥦",
  "🥑",
  "🍔",
  "🍕",
  "🧁",
  "🎂",
  "🍬",
  "🍩",
  "🍫",
  "🎈",
];

//Shuffling above array
var tmp,
  c,
  p = em.length;
if (p)
  while (--p) {
    c = Math.floor(Math.random() * (p + 1));
    tmp = em[c];
    em[c] = em[p];
    em[p] = tmp;
  }

//Variables
var pre = "",
  pID,
  ppID = 0,
  turn = 0,
  t = "transform",
  flip = "rotateY(180deg)",
  flipBack = "rotateY(0deg)",
  time,
  mode,
  currentLevel,
  currentColor = 1,
  rem,
  moves,
  timer; // Timer variable

// Time limits for different levels
const levelTimeLimits = {
  1: 90, // 5 seconds for testing
  2: 300, // 5 minutes
  3: 300, // 5 minutes
  4: 300, // 5 minutes
  5: 300, // 5 minutes
  6: 300, // 5 minutes
  7: 300, // 5 minutes
  8: 240, // 4 minutes
  9: 240, // 4 minutes
  10: 240, // 4 minutes
  11: 240, // 4 minutes
  12: 240, // 4 minutes
  13: 240, // 4 minutes
  14: 240, // 4 minutes
  15: 210, // 3.5 minutes
  16: 210, // 3.5 minutes
  17: 210, // 3.5 minutes
  18: 210, // 3.5 minutes
  19: 210, // 3.5 minutes
  20: 210, // 3.5 minutes
};

const levelScores = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
}

const colors = {
  1:"#c7417b",
  2:"#8f3b76",
  3:"#1f306e",
  4:"#553772",
}

//Resizing Screen
window.onresize = init;
function saveGameHistory(level, moves, time) {
  // Check if local storage is supported
  if (typeof Storage !== "undefined") {
    // Retrieve existing game history or initialize empty array
    var gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];

    // Add current game to history
    gameHistory.push({ level: level, moves: moves, time: time });

    // Save updated game history to local storage
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  } else {
    console.log("Local storage is not supported.");
  }
}
function init() {
  W = innerWidth;
  H = innerHeight;
  $("body").height(H + "px");
  $("#ol").height(H + "px");
}

//Showing instructions
window.onload = function () {
  $("#ol").html(
    `<center><div id="inst"><h3>Welcome !</h3><br/><br/><li>Make pairs of similar blocks by flipping them.</li><li>To flip a block, you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following level's to start it.</p></div>
    <button onclick="start(2, 2, 1)">Lvl 1<br/>Lowest Moves:${levelScores[1]}</button>
    <button onclick="start(2, 3, 2)">Lvl 2<br/>Lowest Moves:${levelScores[2]}</button>
    <button onclick="start(2, 4, 3)">Lvl 3<br/>Lowest Moves:${levelScores[3]}</button>
    <button onclick="start(5, 2, 4)">Lvl 4<br/>Lowest Moves:${levelScores[4]}</button>
    <button onclick="start(3, 4, 5)">Lvl 5<br/>Lowest Moves:${levelScores[5]}</button>
    <button onclick="start(2, 7, 6)">Lvl 6<br/>Lowest Moves:${levelScores[6]}</button>
    <button onclick="start(4, 4, 7)">Lvl 7<br/>Lowest Moves:${levelScores[7]}</button>
    <button onclick="start(3, 6, 8)">Lvl 8<br/>Lowest Moves:${levelScores[8]}</button>
    <button onclick="start(4, 5, 9)">Lvl 9<br/>Lowest Moves:${levelScores[9]}</button>
    <button onclick="start(2, 11, 10)">Lvl 10<br/>Lowest Moves:${levelScores[10]}</button>
    <button onclick="start(4, 6, 11)">Lvl 11<br/>Lowest Moves:${levelScores[11]}</button>
    <button onclick="start(7, 4, 12)">Lvl 12<br/>Lowest Moves:${levelScores[12]}</button>
    <button onclick="start(6, 5, 13)">Lvl 13<br/>Lowest Moves:${levelScores[13]}</button>
    <button onclick="start(8, 4, 14)">Lvl 14<br/>Lowest Moves:${levelScores[14]}</button>
    <button onclick="start(6, 6, 15)">Lvl 15<br/>Lowest Moves:${levelScores[15]}</button>
    <button onclick="start(5, 8, 16)">Lvl 16<br/>Lowest Moves:${levelScores[16]}</button>
    <button onclick="start(7, 6, 17)">Lvl 17<br/>Lowest Moves:${levelScores[17]}</button>
    <button onclick="start(8, 6, 18)">Lvl 18<br/>Lowest Moves:${levelScores[18]}</button>
    <button onclick="start(5, 10, 19)">Lvl 19<br/>Lowest Moves:${levelScores[19]}</button>
    <button onclick="start(6, 9, 20)">Lvl 20<br/>Lowest Moves:${levelScores[20]}</button>
    
    </div></center>
  `
  );
  displayGameHistory(); // Display game history when page loads
};

// Starting the game with time limit
function start(r, l, level) {
  currentLevel = level
  // Hide game history
  $("#gameHistory").hide();
  // Clearing previous timer
  clearInterval(timer);

  // Timer and moves
  min = 0;
  sec = 0;
  moves = 0;
  $("#time").html("Time: 00:00");
  $("#moves").html("Moves: 0");
  const timeLimit = levelTimeLimits[currentLevel]; // Fetching time limit for the level

  // Starting timer
  timer = setInterval(function () {
    sec++;
    if (sec == 60) {
      min++;
      sec = 0;
    }
    if (min * 60 + sec >= timeLimit) {
      // Check if time limit exceeded
      clearInterval(timer);
      timeUp();
    }
    if (sec < 10) $("#time").html("Time: 0" + min + ":0" + sec);
    else $("#time").html("Time: 0" + min + ":" + sec);
  }, 1000);

  rem = (r * l) / 2; // Number of remaining pairs
  mode = r + "x" + l; // Setting mode

  //Generating item array and shuffling it
  var items = [];
  var noItems = (r * l) / 2;
  for (var i = 0; i < noItems; i++) items.push(em[i]);
  for (var i = 0; i < noItems; i++) items.push(em[i]);
  var tmp,
    c,
    p = items.length;
  if (p)
    while (--p) {
      c = Math.floor(Math.random() * (p + 1));
      tmp = items[c];
      items[c] = items[p];
      items[p] = tmp;
    }

  //Creating table
  $("table").html("");
  var n = 1;
  for (var i = 1; i <= r; i++) {
    $("table").append("<tr>");
    for (var j = 1; j <= l; j++) {
      $("table").append(
        `<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${
          items[n - 1]
        }</p></div></div></td>`
      );
      n++;
    }
    $("table").append("</tr>");
  }

  //Hiding instructions screen
  $("#ol").fadeOut(500);
}

// Function for flipping blocks
function change(x) {
  //Variables
  let i = "#" + x + " .inner";
  let f = "#" + x + " .inner .front";
  let b = "#" + x + " .inner .back";

  //Don't flip for these conditions
  if (turn == 2 || $(i).attr("flip") == "block" || ppID == x) {
    return;
  }

  //Flip
  $(i).css(t, flip);
  if (turn == 1) {
    //This value will prevent spam clicking
    turn = 2;

    //If both flipped blocks are not the same
    if (pre != $(b).text()) {
      setTimeout(function () {
        $(pID).css(t, flipBack);
        $(i).css(t, flipBack);
        ppID = 0;
      }, 1000);
    }

    //If blocks flipped are the same
    else {
      rem--;
      $(i).attr("flip", "block");
      $(pID).attr("flip", "block");
    }

    setTimeout(function () {
      turn = 0;
      //Increase moves
      moves++;
      $("#moves").html("Moves: " + moves);
      if (rem == 0) {
        saveLevelScores(moves,5)
        clearInterval(timer);
        setTimeout(function () {
          $("#ol").html(
            `<center>
          <div id="iol">
          <h2>Congrats!</h2>
          <p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${min} minute(s) and ${sec} second(s).</p>
          <button onclick="start(2, 2, 1)">Lvl 1<br/>Lowest Moves:${levelScores[1]}</button>
          <button onclick="start(2, 3, 2)">Lvl 2<br/>Lowest Moves:${levelScores[2]}</button>
          <button onclick="start(2, 4, 3)">Lvl 3<br/>Lowest Moves:${levelScores[3]}</button>
          <button onclick="start(5, 2, 4)">Lvl 4<br/>Lowest Moves:${levelScores[4]}</button>
          <button onclick="start(3, 4, 5)">Lvl 5<br/>Lowest Moves:${levelScores[5]}</button>
          <button onclick="start(2, 7, 6)">Lvl 6<br/>Lowest Moves:${levelScores[6]}</button>
          <button onclick="start(4, 4, 7)">Lvl 7<br/>Lowest Moves:${levelScores[7]}</button>
          <button onclick="start(3, 6, 8)">Lvl 8<br/>Lowest Moves:${levelScores[8]}</button>
          <button onclick="start(4, 5, 9)">Lvl 9<br/>Lowest Moves:${levelScores[9]}</button>
          <button onclick="start(2, 11, 10)">Lvl 10<br/>Lowest Moves:${levelScores[10]}</button>
          <button onclick="start(4, 6, 11)">Lvl 11<br/>Lowest Moves:${levelScores[11]}</button>
          <button onclick="start(7, 4, 12)">Lvl 12<br/>Lowest Moves:${levelScores[12]}</button>
          <button onclick="start(6, 5, 13)">Lvl 13<br/>Lowest Moves:${levelScores[13]}</button>
          <button onclick="start(8, 4, 14)">Lvl 14<br/>Lowest Moves:${levelScores[14]}</button>
          <button onclick="start(6, 6, 15)">Lvl 15<br/>Lowest Moves:${levelScores[15]}</button>
          <button onclick="start(5, 8, 16)">Lvl 16<br/>Lowest Moves:${levelScores[16]}</button>
          <button onclick="start(7, 6, 17)">Lvl 17<br/>Lowest Moves:${levelScores[17]}</button>
          <button onclick="start(8, 6, 18)">Lvl 18<br/>Lowest Moves:${levelScores[18]}</button>
          <button onclick="start(5, 10, 19)">Lvl 19<br/>Lowest Moves:${levelScores[19]}</button>
          <button onclick="start(6, 9, 20)">Lvl 20<br/>Lowest Moves:${levelScores[20]}</button>
          </div></center>
        `
          );
          $("#ol").fadeIn(750);
          saveGameHistory(mode, moves, `${min} minute(s) and ${sec} second(s)`); // Save game history
          displayGameHistory(); // Display updated game history
        }, 1500);
      }
    }, 1150);
  } else {
    pre = $(b).text();
    ppID = x;
    pID = "#" + x + " .inner";
    turn = 1;
  }
}

// Function to handle time up event
function timeUp() {
  $("#ol").html(
    `<center><div id="inst"><h3>You ran out of time!</h3><br/><br/>
    <p>Better luck next time!</p></div></center>`
  );
  $("#ol").fadeIn(750);
  setTimeout(function () {
     // Display level select screen
    $("#ol").html(
      `<center><div id="inst"><h3>Welcome !</h3><br/><br/><li>Make pairs of similar blocks by flipping them.</li><li>To flip a block, you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following level's to start it.</p></div>
      <button onclick="start(2, 2, 1)">Lvl 1<br/>Lowest Moves:${levelScores[1]}</button>
      <button onclick="start(2, 3, 2)">Lvl 2<br/>Lowest Moves:${levelScores[2]}</button>
      <button onclick="start(2, 4, 3)">Lvl 3<br/>Lowest Moves:${levelScores[3]}</button>
      <button onclick="start(5, 2, 4)">Lvl 4<br/>Lowest Moves:${levelScores[4]}</button>
      <button onclick="start(3, 4, 5)">Lvl 5<br/>Lowest Moves:${levelScores[5]}</button>
      <button onclick="start(2, 7, 6)">Lvl 6<br/>Lowest Moves:${levelScores[6]}</button>
      <button onclick="start(4, 4, 7)">Lvl 7<br/>Lowest Moves:${levelScores[7]}</button>
      <button onclick="start(3, 6, 8)">Lvl 8<br/>Lowest Moves:${levelScores[8]}</button>
      <button onclick="start(4, 5, 9)">Lvl 9<br/>Lowest Moves:${levelScores[9]}</button>
      <button onclick="start(2, 11, 10)">Lvl 10<br/>Lowest Moves:${levelScores[10]}</button>
      <button onclick="start(4, 6, 11)">Lvl 11<br/>Lowest Moves:${levelScores[11]}</button>
      <button onclick="start(7, 4, 12)">Lvl 12<br/>Lowest Moves:${levelScores[12]}</button>
      <button onclick="start(6, 5, 13)">Lvl 13<br/>Lowest Moves:${levelScores[13]}</button>
      <button onclick="start(8, 4, 14)">Lvl 14<br/>Lowest Moves:${levelScores[14]}</button>
      <button onclick="start(6, 6, 15)">Lvl 15<br/>Lowest Moves:${levelScores[15]}</button>
      <button onclick="start(5, 8, 16)">Lvl 16<br/>Lowest Moves:${levelScores[16]}</button>
      <button onclick="start(7, 6, 17)">Lvl 17<br/>Lowest Moves:${levelScores[17]}</button>
      <button onclick="start(8, 6, 18)">Lvl 18<br/>Lowest Moves:${levelScores[18]}</button>
      <button onclick="start(5, 10, 19)">Lvl 19<br/>Lowest Moves:${levelScores[19]}</button>
      <button onclick="start(6, 9, 20)">Lvl 20<br/>Lowest Moves:${levelScores[20]}</button>
      
      </div></center>
    `
    );
    displayGameHistory(); // Display game history when page loads
    }, 3000);
}

// Function to display game history
function displayGameHistory() {
  // Show game history
  $("#gameHistory").show();

  // Retrieve game history from local storage
  var gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];

  if (gameHistory.length > 0) {
    // Clear existing content of game history
    $("#gameHistory").html("<h3>Game History</h3>");

    // Display game history for each completed game
    gameHistory.forEach(function (game, index) {
      $("#gameHistory").append(
        `<p>Level: ${game.level}, Moves: ${game.moves}, Time: ${game.time}</p>`
      );
    });
  } else {
    $("#gameHistory").html("<p>No game history available.</p>");
  }
}

function saveLevelScores(moves, time) {
  if (levelScores[currentLevel] == 0){
    console.log(currentLevel)
    levelScores[currentLevel] = moves
    console.log(levelScores);
  }
    
  else {
    if (levelScores[currentLevel] >= moves) {
      console.log(currentLevel)
      levelScores[currentLevel] = moves
      console.log(levelScores);
    }
    
  }
    
}

function changeColor(){
  currentColor++
  if (currentColor == 5){
    currentColor = 1 
  }
   
  document.body.style.backgroundColor = colors[currentColor]; 
}