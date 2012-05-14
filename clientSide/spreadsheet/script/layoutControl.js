// code written by Asher Glick



  //////////////////////////////////////////////////////////////////////////////
 //////////////////////////////// INITILIZATION ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var data = new Array(); // the array that will store the values for the spreadsheet

// Width and height for the labled cells
var labelCellHeight = 18;
var labelCellWidth = 40;
// Cell width and height
var defaultCellHeight = 20;
var dynamicCellHeight = new Array();
var defaultCellWidth  = 110;
var dynamicCellWidth  = new Array();

//currently selected cells
var startSelectionX = 1;
var startSelectionY = 1;

var endSelectionX = 0;
var endSelectionY = 0;

// When using tab remember which column you started at when you hit enter
var tabReturnColumn = -1;

// function focus or bar focus, can focus be determined from the object, or can we use oninput instead of a time delay to sync the two bars (i think oninput will work)

/************************** INITILIZE EVENT FUNCTIONS *************************\
|
\******************************************************************************/
$(document).ready( function () {
  // AJAX call to load the spreadsheet data
  
  try {load2();}
  catch (e) {}
  // size the window correctly
  resizeWindow();
  window.onresize = resizeWindow;
  
  // mouse events
  document.onmousedown = mousePress;
  document.getElementById('framecontain').onmouseup = mouseRelease;
  
  // general keyboard events (shortcut keys, etc.)
  document.onkeypress = keypress;
  
  
  // scrolling 
  document.getElementById("scrollbar").onscroll = resizeWindow;
  
  //init input box
  moveInputBox(1,1);
  setInputBoxValue(data["1,1"]);
  
  document.getElementById("inputbox").onfocus = function () {this.focused = true; inputBoxOnFocus();};
  document.getElementById("inputbox").onblur = function () {this.focused = false;};
  document.getElementById("inputbox").focused = false;
});
  
/*************************** GLOBAL KEY PRESS EVENT ***************************\
| This function handles all of the global keypresses:                          |
| - entering textmode when a cell is selected and you start typing             |
| - deleteing the context of a selected cell                                   |
| X moving the selected cell via arrow keys                                    |
| X tabbing to the cell the right when tab is pressed                          |
| X returning to the first column that was not tabbed away from                |
|     on the next row                                                          |
\******************************************************************************/
function keypress (event) {
  //alert(event.charCode +"|"+ event.keyCode);
  if (!isInputFocused()) {
    // delete key, for deleting a cell
    if (event.keyCode == 8) {
      data[startSelectionX + ',' + startSelectionY] = "";
      setInputBoxValue("");
    }
    // enter key, focus the cell
    else if (event.keyCode == 13) {
      event.preventDefault();
      focusInputBox();
      //alert("enter + focus")
    }
    // tab key on focused
    else if (event.keyCode == 9){
      event.preventDefault();
      tabToNextColumn();
    }
    
    // left arrow key
    else if (event.keyCode == 37) {
      event.preventDefault();
      alert("move left");
    }
    // up arrow key
    else if (event.keyCode == 38){
      event.preventDefault();
      alert("move up");
    }
    // right arrow key
    else if (event.keyCode == 39) {
      event.preventDefault();
      alert ("move right");
    }
    // down arrow key
    else if (event.keyCode == 40) {
      event.preventDefault();
      alert("move down");
    }
    else {
      // TODO some more params to make sure ctrl and alt, etc are not pressed
      // or that if they are the event is carried through 
      focusInputBox();
      setInputBoxValue(String.fromCharCode(event.charCode));
      //simulatekeypress(event.which);
    }
  }
  else { // input is focused
    // enter key, move down a row
    if (event.keyCode == 13) {
      event.preventDefault();
      returnToNextRow();
    }
    // tab key on unfocused (same command)
    else if (event.keyCode == 9){
      event.preventDefault();
      tabToNextColumn();
    }
  }
}

function isInputFocused() {
  return (document.getElementById("inputbox").focused == true) ;
}
function returnToNextRow () {
  alert("move to next row");
}
function tabToNextColumn () {
  //alert("tab next" + (startSelectionX+1));
  startSelectionX = startSelectionX+1;
  moveInputBox(startSelectionX, startSelectionY);
  redrawFrame();
}
/***************************** SIMULATE KEY PRESS *****************************\
|################################# DEPRECATED #################################|
| This function simulates a keypress when passed a character code              |
\******************************************************************************/
function simulatekeypress(charCode) {
  var evt = document.createEvent("KeyboardEvent");
  evt.initKeyEvent ("keypress", true, true, window,
                    0, 0, 0, 0,
                    0, charCode) 
  var canceled = !document.getElementById("inputbox").dispatchEvent(evt);
  
  if(canceled) {
    // A handler called preventDefault
    //alert("canceled");
  } else {
    // None of the handlers called preventDefault
    //alert("not canceled");
  }
  //alert("simulated");
}

/******************************* MOVE INPUT BOX *******************************\
| This function moves the input box to a specified cell, given the x and y for |
| the cell. It then resizes the input box to fit the cell                      |
\******************************************************************************/
function moveInputBox (xcell,ycell) {
  var pixelx = getCellOffsetLeft(xcell,getScrollXCell());
  var pixely = getCellOffsetTop(ycell,getScrollYCell());
  //get the 
  var menuHeight = document.getElementById("framecontain").offsetTop;
  //move the cell
  document.getElementById("datain").style.top  = pixely+menuHeight-0.5+"px";
  document.getElementById("datain").style.left = pixelx - 0.5 +"px";
  //resize the cell
  document.getElementById("datain").style.width = getCellWidth(xcell) - 2.5 + "px";
  document.getElementById("datain").style.height = getCellHeight(ycell) - 2.5 + "px";
  //set border color
  document.getElementById("datain").style.border = "2px solid green";
}
/***************************** SET INPUT BOX VALUE ****************************\
| This function sets the value of the input box and initilizes the function    |
| bar to be the same as the value that the input box is set to. It also        |
| handles if values are invalid                                                |
\******************************************************************************/
function setInputBoxValue(value) {
  if (value == undefined) value = "";
  document.getElementById("inputbox").value = value;
  document.getElementById("functionbox").value = document.getElementById("inputbox").value;
}

function focusInputBox() {
  document.getElementById("inputbox").focus();
}
function inputBoxOnFocus() {
  document.getElementById("inputCornerBox").style.display="none";
}
function blurInputBox() {
  document.getElementById("inputCornerBox").style.display="inline";
}


function syncFunctionBar() {
  document.getElementById("functionbox").value = document.getElementById("inputbox").value;
  data[startSelectionX + "," +startSelectionY] = document.getElementById("inputbox").value;
}
function syncInputBox() {
  document.getElementById("inputbox").value = document.getElementById("functionbox").value;
  data[startSelectionX+","+startSelectionY] = document.getElementById("functionbox").value;
}


  //////////////////////////////////////////////////////////////////////////////
 //////////////////////////////// MOUSE EVENTS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/********************************* MOUSE DOWN *********************************\
| 
\******************************************************************************/
function mousePress (event) {
  // nothing yet
  
}
/********************************** MOUSE UP **********************************\
|
\******************************************************************************/
function mouseRelease (event) {
  // nothing yet
  // for now assume a non drag
  var menuHeight = document.getElementById("framecontain").offsetTop;
  var celly = findCellFromY(event.pageY-menuHeight);
  var cellx = findCellFromX(event.pageX);
  
  //TODO these need to be actual drag values, in comparison with the mousepress functions
  var dragx = cellx;
  var dragy = celly;
  
  
  if (celly < 1 || cellx < 1) {
    if (celly < 1) {
      celly = getScrollYCell();
      dragy = -1;
    }
    if (cellx < 1) {
      cellx = getScrollXCell();
      dragx = -1;
    }
  }
  
  // if the cell is allready selected
  if (celly == startSelectionY && cellx == startSelectionX && dragx == endSelectionX && dragy == endSelectionY) return;
  
  
  setInputBoxValue(data[cellx+','+celly]);
  moveInputBox(cellx,celly);
  blurInputBox();
  
  startSelectionX = cellx;
  startSelectionY = celly;
  
  endSelectionX = dragx;
  endSelectionY = dragy;
  
  redrawFrame();
}
/********************************* MOUSE MOVE *********************************\
| The mouse move function is only used for dragging 
\******************************************************************************/

  //////////////////////////////////////////////////////////////////////////////
 ///////////////////////////// INTERFACE RESIZING /////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/******************************** RESIZE WINDOW *******************************\
|
\******************************************************************************/
function resizeWindow () {
  // do all of the resizeing functions here
  redrawFrame();
  resizeFunctionBar();
}
/***************************** RESIZE FUNCTION BAR ****************************\
| This function resizes the function bar that is under the menu bar so that it |
| occupies the full length of the screen while not passing the edge of the     |
| screen to avoid scroll bars from being created                               |
\******************************************************************************/
function resizeFunctionBar() {
  var leftOffset = document.getElementById("functionbox").offsetLeft;
  var pageWidth = window.innerWidth;
  document.getElementById("functionbox").style.width = pageWidth - leftOffset + "px";
}
  //////////////////////////////////////////////////////////////////////////////
 //////////////////////////////// CELL SIZE API ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/******************************* GET CELL WIDTH *******************************\
|
\******************************************************************************/
function getCellWidth(xCoord) {
  //return (xCoord%50)+100;
  return defaultCellWidth;
}
/******************************* GET CELL HEIGHT ******************************\
|
\******************************************************************************/
function getCellHeight(yCoord) {
  //return (yCoord%10)+15;
  if (yCoord == 10) return 2*defaultCellHeight;
  return defaultCellHeight;
}
  //////////////////////////////////////////////////////////////////////////////
 ////////////////////////////// CELL POSITION API /////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/**************************** GET CELL OFFSET LEFT ****************************\
|
\******************************************************************************/
function getCellOffsetLeft (xCoord) {
  var leftScreenOffset = getScrollXCell();
  if (leftScreenOffset > xCoord) return -100;
  var offset = labelCellWidth;
  for (var i = leftScreenOffset; i < xCoord; i++) {
    offset += getCellWidth(i);
  }
  return offset;
}
/***************************** GET CELL OFFSET TOP ****************************\
| Get the number of pixels from the top that the current cell is at            |
\******************************************************************************/
function getCellOffsetTop (yCoord) {
  var topScreenOffset = getScrollYCell();
  if (topScreenOffset > yCoord) return -100;
  var offset = labelCellHeight;
  for (var i = topScreenOffset; i < yCoord; i++) {
    offset += getCellHeight(i);
  }
  return offset;
}
/****************************** FIND CELL FROM Y ******************************\
| 
\******************************************************************************/
function findCellFromY (pixelY) {
  var offset = labelCellHeight;
  var cellCount = getScrollYCell();
  if (offset > pixelY) return -1;
  while (offset < pixelY) {
    offset+= getCellHeight(cellCount);
    if (offset >= pixelY) break;
    cellCount += 1;
  }
  return cellCount;
}
/****************************** FIND CELL FROM X ******************************\
|
\******************************************************************************/
function findCellFromX (pixelX) {
  var offset = labelCellWidth;
  var cellCount = getScrollXCell();
  if (offset > pixelX) return -1;
  while (offset < pixelX) {
    offset += getCellWidth(cellCount);
    if (offset >= pixelX) break;
    cellCount += 1;
  }
  return cellCount;
}
  //////////////////////////////////////////////////////////////////////////////
 /////////////////////////////// SCROLL BAR API ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/**************************** GET SCROLL X POSITION ***************************\
| reading the scroll bar this returns the leftmost cell position
\******************************************************************************/
function getScrollXCell () {  
  var scrollX = document.getElementById("scrollbar").scrollLeft;
  return ~~(scrollX / defaultCellWidth)+1;
}

/**************************** GET SCROLL Y POSITION ***************************\
| reading the scroll bar this returns the topmost cell position
\******************************************************************************/
function getScrollYCell () {
  var scrollY = document.getElementById("scrollbar").scrollTop;
  return ~~(scrollY / defaultCellHeight)+1; 
}

/******************************* TO LETTER LABEL ******************************\
| This converts a number (starting at 1) to a letter or multi letter           |
| representation that can be used as an ID, if the number is greater then 26   |
| (Z) then multiple letters are use (AA, AB, AC, etc)                          |
\******************************************************************************/
function toLetterLabel(number) {
  number= number - 1;
  var output = "";
  while (number >= 26) {
    output = String.fromCharCode(65+number%26) + output;
    number = (number-+number%26) / 26 -1;
  }
  output = String.fromCharCode(65+number%26) + output;
  return output;
}
