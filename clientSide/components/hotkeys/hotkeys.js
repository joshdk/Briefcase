/******************************************************************************\
|                                     ,,                                       |
|                    db             `7MM                                       |
|                   ;MM:              MM                                       |
|                  ,V^MM.    ,pP"Ybd  MMpMMMb.  .gP"Ya `7Mb,od8                |
|                 ,M  `MM    8I   `"  MM    MM ,M'   Yb  MM' "'                |
|                 AbmmmqMA   `YMMMa.  MM    MM 8M""""""  MM                    |
|                A'     VML  L.   I8  MM    MM YM.    ,  MM                    |
|              .AMA.   .AMMA.M9mmmP'.JMML  JMML.`Mbmmd'.JMML.                  |
|                                                                              |
|                                                                              |
|                                ,,    ,,                                      |
|                     .g8"""bgd `7MM    db        `7MM                         |
|                   .dP'     `M   MM                MM                         |
|                   dM'       `   MM  `7MM  ,p6"bo  MM  ,MP'                   |
|                   MM            MM    MM 6M'  OO  MM ;Y                      |
|                   MM.    `7MMF' MM    MM 8M       MM;Mm                      |
|                   `Mb.     MM   MM    MM YM.    , MM `Mb.                    |
|                     `"bmmmdPY .JMML..JMML.YMbmd'.JMML. YA.                   |
|                                                                              |
\******************************************************************************/
/******************************************************************************\
| Copyright (c) 2012, Asher Glick                                              |
| All rights reserved.                                                         |
|                                                                              |
| Redistribution and use in source and binary forms, with or without           |
| modification, are permitted provided that the following conditions are met:  |
|                                                                              |
| * Redistributions of source code must retain the above copyright notice,     |
|   this list of conditions and the following disclaimer.                      |
| * Redistributions in binary form must reproduce the above copyright notice,  |
|   this list of conditions and the following disclaimer in the documentation  |
|   and/or other materials provided with the distribution.                     |
|                                                                              |
| THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"  |
| AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE    |
| IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE   |
| ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE    |
| LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR          |
| CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF         |
| SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS     |
| INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN      |
| CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)      |
| ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE   |
| POSSIBILITY OF SUCH DAMAGE.                                                  |
\******************************************************************************/
/******************************************************************************\
| The purpose of hotkey.js is to have a library that hotkeys can be bound to,  |
| where each hotkey combination is linked to a function. Multiple scripts will |
| be able to use it and not have to deal with overwriting each other's         |
| interrupt functions                                                          |
\******************************************************************************/
var _HOT_KEY_UP_LIST_ = new Array();
var _HOT_KEY_DOWN_LIST_ = new Array();

var regKeysReverse={48: "0",49: "1",50: "2",51: "3",52: "4",53: "5",54: "6",55: "7",56: "8",57: "9",59: ";",61: "=",65: "A",66: "B",67: "C",68: "D",69: "E",70: "F",71: "G",72: "H",73: "I",74: "J",75: "K",76: "L",77: "M",78: "N",79: "O",80: "P",81: "Q",82: "R",83: "S",84: "T",85: "U",86: "V",87: "W",88: "X",89: "Y",90: "Z"};
var regKeys={"0": 48,"1": 49,"2": 50,"3": 51,"4": 52,"5": 53,"6": 54,"7": 55,"8": 56,"9": 57,";": 59,"=": 61,"A": 65,"B": 66,"C": 67,"D": 68,"E": 69,"F": 70,"G": 71,"H": 72,"I": 73,"J": 74,"K": 75,"L": 76,"M": 77,"N": 78,"O": 79,"P": 80,"Q": 81,"R": 82,"S": 83,"T": 84,"U": 85,"V": 86,"W": 87,"X": 88,"Y": 89,"Z": 90};


var KeyObject = function (value) {
  this.shiftKey = false;
  this.metaKey = false;
  this.altKey = false;
  this.ctrlKey = false;
  this.keyCode = 0;
  this.charCode = 0;
  this.string = function () {
    var output = "";
    var char = String.fromCharCode(this.keyCode)+"("+this.keyCode+")"; 
    if (this.shiftKey) {output += "Shift+";}
    if (this.ctrlKey) {output += "Ctrl+";}
    if (this.altKey) {output += "Alt+";}
    if (this.metaKey) {output += "Meta+";}
    output += char;
    return output;
  }
  
  // parse the input value
  if (typeof(value) == 'string') {
    alert("stringman!");
  }
  else if (value.toString() == '[object KeyboardEvent]') {
    this.charCode = value.charCode;
    this.keyCode = value.keyCode;
    this.altKey = value.altKey;
    this.ctrlKey = value.ctrlKey;
    this.shiftKey = value.shiftKey;
  }
  else {
    console.log("Error, " + value.toString() + " is not a valid keytype");
  }
}
// Shift + Ctrl + Alt + Mod + Del

function addKeyDown(hotkey,functioncall) {
  
}
function addKeyUp(hotkey,functioncall) {
  
}

document.onkeydown = function (event) {
  
}
document.onkeyup = function (event) {
}
