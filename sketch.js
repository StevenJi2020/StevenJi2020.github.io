// voice Rec
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var myCommand = new p5.SpeechRec();
myRec.continuous = true; // do continuous recognition
myRec.interimResults = false; // allow partial recognition (faster, less accurate)
var roomNum = -1;
var rooms = ["palmcourt",  //0 ******
"southconservatory", //1
"fern", //2 ****
"stove", //3 ******
"orchid", //4 *******
"fruitspices", //5 
"sunkengarden", //6
"desert", //7 ******
"eastroom", //8
"serpentine", //9
"childrens", //10
"gallery", //11
"congo", //12
"victorian", //13
"broderie"]; //14

var roomIndex = 0;
var command = ["hello", "next" , "restart", "yes"];
var keywords = ["peaceful" , "introspective", "relaxed" , "energetic" , "romantic" , "curious" , "excited" , "inspired" , "happy" , "social" , "refreshed" ];
var mappings = [
                ["palmcourt", "southconservatory","victorian"], //peaceful
                ["congo", "orchid", "fern"],//introspect
                ["palmcourt"], //relax
                ["stove", "eastroom", "congo"], //energy
                ["victorian", "orchid", "broderie"], // romantic
                ["desert", "serpentine", "childrens", "gallery", "congo", "fruitspices"],//curious
                ["serpentine","eastroom","childrens","gallery"], //excited
                ["orchid", "stove"], //inspired
                ["childrens","gallery", "eastroom", "serpentine","stove"], //happy
                ["childrens","gallery"], //social
                ["fern", "palmcourt"], //refreshed
                ];

var randomIndex = -1; //index of random room
var activeRooms;
var activeKeyword;
var finalRoom = "";

// a = mood board index  b = command boolean ;c = screen #  ;
var a = 0;
var b;
var c = 4;
var d = false
var canvasWidth = 1024;
var canvasHeight = 768;

// images gradient var
var c1, c2;
var screen1;
var screen2;
var screen3;
var screen4;
var source1;
var desertRoom;
var fernGif, fernText;
var desertGif, desertText;

//some unknown arrays
var gifs = [];
var texts = [];
var gradients = [];
var gradient;

// some typefaces shit
var sentinel;
var helvetica;


function preload() {
  screen1 = loadImage("assets/screen1.png");
  screen2 = loadImage("assets/screen2.png");
  screen3 = loadImage("assets/screen3-1.png");
  screen4 = loadImage("assets/screen3-2.png");
  source1 = loadImage("assets/source1.png");
  sentinel = loadFont("assets/sentinel-medium.otf");
  helvetica = loadFont("assets/helvetica-regular.ttf");

   for (var i = 0; i < 15; i++) {
    gifs[i] = loadGif("assets/" + i + '.gif'); // store gifs in the array
    texts[i] = loadImage("assets/" + i + '.png');
    gradients[i] = loadImage('assets/'+i + '.jpg');
  } 
 }

function setup() {
  createCanvas(canvasWidth,canvasHeight);
  background(0);
  // load this upon start
  image(screen1, 0, 0, canvasWidth, canvasHeight);
  b = false;
  desertRoom = loadGif('assets/desertRoom.gif');

  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine
}


function setupGradient(){
  var x1 = int(random(200/2));
  var y1 = int(random (200/2));
  var x2 = int(random (200/2,200));
  var y2 = int(random (200/2, 200));
  c1 = (gradient.get(x1,y1));
  c2 = (gradient.get(x2,y2));
  // changing opacity of colors //
  c1[3] = 100;
  c2[3] = 100;
  println(c1 + "\n");
  println(c2 + "\n");
  c1 = color(c1);
  c2 = color(c2);
}


function reset(){
  clear();
  background(0);
  // load this upon start
  image(screen1, 0, 0, canvasWidth, canvasHeight);
  b = false;
  d = false;
}

function drawGradient() {
  for (var i = 0; i <= 850; i++) {
      var inter = map(i, 0, 850, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, 0, i, 768);
    }
}

// room is final room
function drawRoom(room){
  roomIndex = rooms.indexOf(room);// get index of room to load.
  println("roomIndex is " + roomIndex);
   image(gifs[roomIndex], 0,0,canvasWidth, canvasHeight);
   gradient = gradients[roomIndex];//gradient images
  setupGradient();
   drawGradient();
  image(texts[roomIndex],0,0,canvasWidth, canvasHeight);
    
    
}


function draw(){
  if(d){
    drawRoom(finalRoom);
  }else{
  }
}



function commandResult(){
  var mostrecentword = myRec.resultString.split(' ').pop();
  mostrecentword = mostrecentword.toLowerCase();
  console.log(mostrecentword);
}


function parseCommand(mostrecentword){
  if (mostrecentword.indexOf("hello") !== -1) {
      println("hello called");
      image(screen2, 0, 0, canvasWidth, canvasHeight);
      b = true;
  }else if (mostrecentword.indexOf("next") !== -1) {      
      println("next called");
  }else if (mostrecentword.indexOf("yes") !== -1) {
      println("yes called");
      
  }
  return b;
}

function parseWord(mostrecentword){
  if (mostrecentword.indexOf("peaceful") !== -1) {
      a = keywords.indexOf("peaceful");
      println(keywords[a] + "; a = " + a);

  } else if (mostrecentword.indexOf("introspective") !== -1) {
    a = keywords.indexOf("introspective");
      println(keywords[a] + "; a = " + a);

  } else if (mostrecentword.indexOf("relaxed") !== -1) {
    a = keywords.indexOf("relaxed");
      println(keywords[a] + "; a = " + a);

  } else if (mostrecentword.indexOf("energetic") !== -1) {
    a = keywords.indexOf("energetic");
      println(keywords[a] + "; a = " + a);

  } else if (mostrecentword.indexOf("romantic") !== -1) {
    a = keywords.indexOf("romantic");
      println(keywords[a] + "; a = " + a);

  } else if (mostrecentword.indexOf("curious") !== -1) {
    a = keywords.indexOf("curious");
      println(keywords[a] + "; a = " + a);

  }
  else if (mostrecentword.indexOf("excited") !== -1) {
    a = keywords.indexOf("excited");
      println(keywords[a] + "; a = " + a);

  }
  else if (mostrecentword.indexOf("inspired") !== -1) {
    a = keywords.indexOf("inspired");
      println(keywords[a] + "; a = " + a);

  }
  else if (mostrecentword.indexOf("happy") !== -1) {
    a = keywords.indexOf("happy");
      println(keywords[a] + "; a = " + a);

  }
  else if (mostrecentword.indexOf("social") !== -1) {
    a = keywords.indexOf("social");
      println(keywords[a] + "; a = " + a);

  }
  else if (mostrecentword.indexOf("refreshed") !== -1) {
    a = keywords.indexOf("refreshed");
      println(keywords[a] + "; a = " + a);
  }
  return;
}

// function drawRoom(){
//    fill(65,117,5);
//   textSize(100);
//   noStroke();
//   textSize(100);
//   textAlign(LEFT);
//   // textFont(sentinel);
//   text(finalRoom,100,200);
//   // if (true) {}
//   // right now all load the same gif
// }


function parseResult() {
  // pop deletes and returns the last element. Take the last one because it should be the most correct one. 
  var mostrecentword = myRec.resultString.split(' ').pop();
  mostrecentword = mostrecentword.toLowerCase();
  console.log(mostrecentword);
  println( "b is " + b);
  // check if needs to restart
  if (mostrecentword.indexOf("restart") !== -1){
      println("restart called");
      reset();
  }else if( b ){
      println("parseWord Called");
      println("index of " + mostrecentword + "is \n " + a);
      parseWord(mostrecentword);
      underline(a);
      setTimeout(function() {
        activeRooms = mappings[a];
        // println("type of activeRooms" + typeof activeRooms);
        println("activeRooms = " + activeRooms);
        // println("activeRooms length =" + activeRooms.length);
        randomIndex = int(random(activeRooms.length));
        println("randomindex = " + randomIndex);
        finalRoom = activeRooms[randomIndex];
        println("finalRoom = " + finalRoom);
        d = true;
      }, 3000);
  }else if ( b !== true ){
    println("parseCommand called");
      parseCommand(mostrecentword);
  }
}


function underline(a) {
  println("drawing lines now");
  stroke(255);
  strokeWeight(3);
  strokeCap(SQUARE);
  
  if (a === 0) line (514.5,478,637.5,478); //peaceful
  else if (a == 1) line (550.5,538,550.5+189,538); //introspective
  else if (a == 2) line (690.5,416,690.5+107,416); //relax
  else if (a == 3) line (384.5,416,384.5+137,416); //energetic
  else if (a == 4) line (224,478,224+128,478); //romantic
  else if (a == 5) line (379,478,379+104,478); //curious
  else if (a == 6) line (674,478,674+105,478); //excited
  else if (a == 7) line (286,538,286+116,538); //inspired
  else if (a == 8) line (563,416,563.5+92,416); //happy
  else if (a == 9) line (436,538,436+82,538); //social
  else if (a == 10) line (203.5,416,203.5+141,416); //refreshed
  
}
