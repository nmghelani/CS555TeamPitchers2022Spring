(function ($) {
  $("body").css({
    "background-image": "url(public/images/image.jpg)",
  });

  $("#gameBox").css("top", ($(window).height() - $("#gameBox").height()) / 2);
  $("#gameBox").css("left", ($(window).width() - $("#gameBox").width()) / 2);
})(jQuery);

var snd = new Audio("public/audio/dart.mp3");
var sndWin = new Audio("public/audio/game_over_win.mp3");
var sndLoose = new Audio("public/audio/game_over_loose.mp3");
var SHOW_PROGRESS_BAR = 1; // 1-zobrazuje se, 0- nezobrazuje se
var WIND_ACTIVE = 1; // 1-vitr je aktivni 0-bezvetri

var GAME_XRES = 550;
var GAME_YRES = 400;

var HAND_REF_X = 12;

var BOARD_CENTER_X = 363;
var BOARD_CENTER_Y = 201;
var BOARD_RADIUS = 154;

var OFFSET_POINT_X = 515;
var OFFSET_POINT_Y = 176;

var SEGMENT_COUNT = 20;
var SEGMENT_SIZE = Math.PI / 10.0;

var SEGMENTS = [10, 21, 77, 90, 141, 154];
var SEGMENT_NAMES = ["50", "25", "value", "tripple", "value", "double", "out"];

let counter = 0;

var angleOffset = Math.round(
  -Math.atan2(
    BOARD_CENTER_Y - OFFSET_POINT_Y,
    BOARD_CENTER_X - OFFSET_POINT_X
  ) *
    (180.0 / Math.PI) +
    180.0
);

var SCORE_VALUES = [
  6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10, 6,
]; // obvodovy hodnoty

var targetAngle = 0;
var targetDelta = 0;
var targetDX = 0;
var targetDY = 0;

var segmentIndex = 0; // index vysece
var segmentType = 0; // typ policka
var segmentAngle = 0;

var segment = 0;

var totalScore = 0;
var userScore = 0;

var DART_REF_X = 34;
var DART_REF_Y = 66;

var FLIGHT_ANIM_DELAY = 20;

var dartCount = 3;
var ligthOn = 0;

var CURSOR_LEFT = 193;
var CURSOR_RIGHT = 530;
var CURSOR_TOP = 350;
var CURSOR_BOTTOM = 380;

var CURSOR_HOR_STEP = 10;
var CURSOR_VER_STEP = 1;

var cursor_hor = CURSOR_HOR_STEP;
var cursor_ver = CURSOR_VER_STEP;

var CURSOR_TIMER = 50;

var hand_top = 350;
var hand_left = 450;

var cursorTimerId = 0;
var dartTimerId = 1;

var firing = 0;

var wind_angle = 0;
var wind_phase = 0;

var WIND_CELL_COUNT = 20;
var WIND_TIMER = 300;

var wind_cell_x = [WIND_CELL_COUNT];
var wind_cell_y = [WIND_CELL_COUNT];

var gameAngle = 0;
var windStrenght = 0; // <0-20>

// -----------------------------------------------------

var sprite_cellwidth = 57;
var sprite_cellheight = 400;
var sprite_cellnum = 21; // there are 14 cells in the sprite sheet
var animId;

function initWindIndicator(newAngle) {
  var wi = document.getElementById("windIndicator");

  for (i = 0; i < WIND_CELL_COUNT; i++) {
    // add cell divs to windIndicator div

    var newShadow = document.createElement("div");
    var divIdName = "shadow" + i;
    newShadow.setAttribute("id", divIdName);
    newShadow.setAttribute("class", "windCell");

    wi.appendChild(newShadow);
  }

  for (i = 0; i < WIND_CELL_COUNT; i++) {
    // add cell divs to windIndicator div

    var newCell = document.createElement("div");
    var divIdName = "cell" + i;
    newCell.setAttribute("id", divIdName);
    newCell.setAttribute("class", "windCell");

    wi.appendChild(newCell);
  }

  setWindAngle(newAngle); // prekresli wind indicator podle zvoleneho uhlu
  startWindAnimation();
}

function setWindAngle(newAngle) {
  wind_angle = newAngle;

  var rad = newAngle * (Math.PI / 180);
  //   rad -= Math.PI;
  var rad2 = rad - Math.PI;

  var radius = 23;
  var cx = 29;
  var cy = 29;

  var sx = Math.cos(rad2) * radius + cx;
  var sy = Math.sin(rad2) * radius + cy;

  var step = (radius * 2) / WIND_CELL_COUNT;

  var stp = 0;

  for (i = 0; i < WIND_CELL_COUNT; i++) {
    var px = sx + Math.cos(rad) * stp;
    var py = sy + Math.sin(rad) * stp;

    var sh = document.getElementById("shadow" + i);
    sh.style.top = Math.round(py) - 4;
    sh.style.left = Math.round(px) - 4;

    var cl = document.getElementById("cell" + i);
    cl.style.top = Math.round(py) - 4;
    cl.style.left = Math.round(px) - 4;

    if (WIND_CELL_COUNT - i > windStrenght) {
      cl.style.backgroundPosition = "-9px 0px";
    } else {
      cl.style.backgroundPosition = "-36px 0px";
    }
    stp += step;
  }
}

function startWindAnimation() {
  setInterval("doWindAnimation()", WIND_TIMER);
}

function doWindAnimation() {
  wind_phase++;
  if (wind_phase > 4) wind_phase = 0;

  for (i = 0; i < windStrenght; i++) {
    var state = (wind_phase + i) % 4;
    var offset = -(9 + state * 9);

    var cl = document.getElementById(
      "cell" + (WIND_CELL_COUNT - windStrenght + i)
    );
    cl.style.backgroundPosition = offset + "px 0px";
  }
}

function generateAngle() {
  gameAngle = Math.round(360 * Math.random());
  //gameAngle = 180;

  windStrenght = Math.round(15 * Math.random()) + 5;
  //windStrenght = 5;

  setWindAngle(gameAngle);
}

function getWindXOffset() {
  var a = gameAngle * (Math.PI / 180) - Math.PI;
  var xo = Math.cos(a) * windStrenght;

  return Math.round(xo);
}

function getWindYOffset() {
  var a = gameAngle * (Math.PI / 180) - Math.PI;
  var yo = Math.sin(a) * windStrenght;

  return Math.round(yo);
}

function initPowerBar(xpos, ypos) {
  var el = document.getElementById("power-back");
  el.style.visibility = "visible";

  el.style.top = ypos;
  el.style.left = xpos;

  var el2 = document.getElementById("power");
  el2.style.visibility = "visible";

  setPowerBarProgress(0);
}

// 0-130

function setPowerBarProgress(val) {
  var el = document.getElementById("power");
  // el.style.visible = 'visible';

  el.style.backgroundPosition = "0px " + -(139 - val) + "px";
  el.style.top = 140 - val;
  el.style.height = 150 - (139 - val);
}

function hidePowerBar() {
  var el = document.getElementById("power-back");
  el.style.visibility = "hidden";

  var el2 = document.getElementById("power");
  el2.style.visibility = "hidden";
}

function initCursor() {
  hand_left = CURSOR_LEFT;
  hand_top = CURSOR_TOP;
}

function moveCursor(newX, newY) {
  hand_left = newX;
  hand_top = newY;

  var dart = document.getElementById("handCursor");
  dart.style.left = hand_left;
  dart.style.top = hand_top;
  dart.style.visible = "visible";
}

function doHorizontalCursorMovement() {
  hand_left += cursor_hor;

  if (cursor_hor > 0 && hand_left >= CURSOR_RIGHT) {
    //	addMessage("right border hit");
    hand_left = CURSOR_RIGHT;
    cursor_hor *= -1;
    //	addMessage("cursor_hor = " + cursor_hor);
    //	addMessage("hand_left = " + hand_left);
  }

  if (cursor_hor < 0 && hand_left < CURSOR_LEFT) {
    //	addMessage("left border hir");
    hand_left = CURSOR_LEFT;
    cursor_hor *= -1;

    //	addMessage("cursor_hor = " + cursor_hor);
    //	addMessage("hand_left = " + hand_left);
  }

  moveCursor(hand_left, hand_top);
}

function doVerticalCursorMovement() {
  hand_top += cursor_ver;

  if (cursor_ver > 0 && hand_top > CURSOR_BOTTOM) {
    hand_top = CURSOR_BOTTOM;
    cursor_ver *= -1;
  }

  if (cursor_ver < 0 && hand_top < CURSOR_TOP) {
    hand_top = CURSOR_TOP;
    cursor_ver *= -1;
  }

  if (SHOW_PROGRESS_BAR == 1) {
    var prog = (hand_top - CURSOR_TOP) * (130 / (CURSOR_BOTTOM - CURSOR_TOP));
    setPowerBarProgress(prog);
  }

  moveCursor(hand_left, hand_top);
}

function startHorizontalCursorMovement() {
  initCursor();

  var el = document.getElementById("handCursor");

  var cx = 0;
  var cy = 0;

  el.style.backgroundPosition = cx + "px " + cy + "px";

  cursorTimerId = setInterval("doHorizontalCursorMovement()", CURSOR_TIMER);
}

function stopHorizontalCursorMovement() {
  clearInterval(cursorTimerId);
}

function startVerticalCursorMovement() {
  if (firing == 0) {
    stopHorizontalCursorMovement();

    cursorTimerId = setInterval("doVerticalCursorMovement()", CURSOR_TIMER);

    firing = 1;

    if (SHOW_PROGRESS_BAR == 1) {
      initPowerBar(510, 130);
    }
  }
}

function stopVerticalCursorMovement() {
  firing = 0;

  clearInterval(cursorTimerId);

  var fireY =
    360 - (hand_top - CURSOR_TOP) * ((BOARD_RADIUS * 2 + 20) / 30) - DART_REF_Y;

  if (WIND_ACTIVE == 1) {
    fireDart(
      hand_left - DART_REF_X + HAND_REF_X + getWindXOffset() * 4,
      fireY + getWindYOffset() * 4
    );
  } else {
    fireDart(hand_left - DART_REF_X + HAND_REF_X, fireY);
  }

  // fire Dart

  initCursor();

  var el = document.getElementById("handCursor");

  var cx = -100;
  var cy = 0;

  el.style.backgroundPosition = cx + "px " + cy + "px";

  if (SHOW_PROGRESS_BAR == 1) {
    hidePowerBar();
  }

  setTimeout("startHorizontalCursorMovement()", 500);
}

function mouseHandler(evt) {
  // create cross-browser event detector:
  var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
  evt = evt ? evt : event ? event : null;

  // create mouse coordinates objects:
  xpo = evt.clientX;
  ypo = evt.clientY;

  // post all coordinates to the status bar while the mouse is moving:
  window.status =
    "X-coordinate is: " + (xpo - 350) + " Y-coordinate is: " + (ypo - 150);

  var rx = xpo - 350;
  var ry = ypo - 150;

  computeHit(rx, ry);

  var bonus =
    "policko = " +
    SEGMENT_NAMES[segmentType] +
    " + hodnota = " +
    SCORE_VALUES[segment];
  var m =
    "segment type: " +
    segmentType +
    ", segment index: " +
    segmentIndex +
    ", cnt: " +
    segment;

  generateScore();

  var mmx = xpo - 350;
  var mmy = ypo - 150;

  //dartCount--;
  //if (dartCount == 0) dartCount = 3;
  //renderIndicator();

  // fireDart(mmx - DART_REF_X,  mmy - DART_REF_Y);
}

function fireDart(tarX, tarY) {
  var dart = document.getElementById("dart");
  dart.style.left = tarX;
  dart.style.top = tarY;
  dart.style.visibility = "visible";

  computeHit(tarX + DART_REF_X, tarY + DART_REF_Y);

  var bonus =
    "policko = " +
    SEGMENT_NAMES[segmentType] +
    " + hodnota = " +
    SCORE_VALUES[segment];
  var m =
    "segment type: " +
    segmentType +
    ", segment index: " +
    segmentIndex +
    ", cnt: " +
    segment;

  generateScore();

  addScoreA(totalScore);
  userScore += totalScore;

  dartCount--;
  if (dartCount == 0) {
    generateAngle();
    dartCount = 3;
  }
  renderIndicator();

  doFlightAnim(0);

  if (++counter == 10) {
    if (userScore >= 120) {
      sndWin.play();
      Swal.fire({
        title: "Game Over",
        text: "Great Job! Your score is " + userScore,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          counter = 0;
          userScore = 0;
          window.location.href = "/";
        } else {
        }
      });
    } else {
      sndLoose.play();
      Swal.fire({
        title: "Game Over",
        text: "You Aimed It wrong :(",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          counter = 0;
          userScore = 0;
          window.location.href = "/";
        } else {
        }
      });
    }
  } else {
    snd.play();
  }
}

function generateScore() {
  if (SEGMENT_NAMES[segmentType] == "out") {
    totalScore = 0; // mimo herni pole
  } else if (SEGMENT_NAMES[segmentType] == "50") {
    totalScore = 50; // cisty stred
  } else {
    if (SEGMENT_NAMES[segmentType] == "25") {
      totalScore = 25; // sirsi stred
    } else {
      totalScore = SCORE_VALUES[segment];

      if (SEGMENT_NAMES[segmentType] == "double") totalScore *= 2; // vnejsi okraj - double
      if (SEGMENT_NAMES[segmentType] == "tripple") totalScore *= 3; // prostredni pole - tripple
    }
  }
  
}

function computeHit(xpos, ypos) {
  var dx = BOARD_CENTER_X - xpos;
  var dy = BOARD_CENTER_Y - ypos;

  // var angle = Math.atan2(dx,dy)-angleOffset*2;
  var angle = Math.atan2(dy, dx);
  var delta = Math.sqrt(dx * dx + dy * dy);

  var sg = 0;
  for (i = 0; i < 6; i++) {
    if (delta > SEGMENTS[i]) sg = i + 1;
  }

  segmentType = sg;
  segmentIndex = Math.round(-angle * (180.0 / Math.PI) + 180.0);

  segment = Math.round(segmentIndex / (360.0 / SEGMENT_COUNT));
}

function addScoreA(msg) {
  var ni = document.getElementById("scoreA");

  var newpar = document.createElement("i");
  newpar.innerHTML = "" + msg + "<br>";
  ni.appendChild(newpar);

  var objDiv = document.getElementById("scoreA");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function showcell(x, y, id) {
  var el = document.getElementById(id);

  // the cx and cy are negative because we are shifting the left top corner
  var cx = -(x * sprite_cellwidth);
  var cy = -(y * sprite_cellheight);

  el.style.backgroundPosition = cx + "px " + cy + "px";
}

function doFlightAnim(step) {
  // Stop the last animation
  dartTimerId = clearTimeout(animId);

  if (step <= 20) {
    showcell(step, 0, "dart");
    dartTimerId = setTimeout(
      "doFlightAnim(" + (step + 1) + ");",
      FLIGHT_ANIM_DELAY
    );
  }
}

function startDartIndicator() {
  setInterval("renderDartIndicator()", 150);
}

function renderDartIndicator() {
  var width = dartCount * 35;
  var width2 = (dartCount - 1) * 35;

  var drt = document.getElementById("darts");
  if (ligthOn == 0) {
    drt.style.width = width;
    ligthOn = 1;
  } else {
    drt.style.width = width2;
    ligthOn = 0;
  }
}

function renderIndicator() {
  var width = dartCount * 35;
  var drt = document.getElementById("darts");
  drt.style.width = width;
}

(function ($) {
  $(".toggle_theme").change(function (e) {
    e.preventDefault();
    if (this.checked) {
      $("body").css(
        "background",
        "url(/public/images/image.jpg) no-repeat center center fixed"
      );
    } else {
      $("body").css(
        "background",
        "url(/public/images/nature2.jpg) no-repeat center center fixed"
      );
    }
    $("body").css("background-size", "cover");
  });
})(jQuery);
