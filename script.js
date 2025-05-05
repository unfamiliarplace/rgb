// TODO
// instead of setting hover via js, add a class via js, and set it to black or white (the only contrasts...)

let colour = '#000000';
let contrast = '#ffffff';

$(document).ready(e => {
  $('#swRandom').click();
  draw();  
});

$('.hex')
  .change(e => {draw()})
  .keyup(e => {draw()})
  .mouseup(e => {draw()})

$('#output')
  .change(e => {changeHex(e)});

$(document).keypress(e => {
  
  if (['KeyR', 'KeyG', 'KeyL', 'KeyW', 'KeyK', 'KeyX', 'KeyH', 'KeyM'].includes(e.code)) {
    e.preventDefault();
  }
  
  if (e.code === 'KeyR') {
    $('#redHex').select();
    
  } else if (e.code === 'KeyG') {
    $('#greenHex').select();
    
  } else if (e.code === 'KeyL') {
    $('#blueHex').select();
    
  } else if (e.code === 'KeyW') {
    $('#swWhite').click();
    
  } else if (e.code === 'KeyK') {
    $('#swBlack').click();
  
  } else if (e.code === 'KeyM') {
    $('#swRandom').click();
    
  } else if (e.code === 'KeyX') {
    $('#copyOutput').click();
  
  } else if (e.code === 'KeyH') {
    $('#output').select();
    
  }  
});

$("#copyOutput").click((e) => {
  let val = $("#output").val();
  if (val[0] === '#') {
    val = val.substring(1);
  }
  copyToClipboard(val);
  pingCopy("#copyOutput");
});

function draw() {
  let red = $('#redHex').val();
  let green = $('#greenHex').val();
  let blue = $('#blueHex').val();
  
  red = parseInt(red);
  green = parseInt(green);
  blue = parseInt(blue);
  
  if (Number.isNaN(red)) {red = 0};
  if (Number.isNaN(green)) {green = 0};
  if (Number.isNaN(blue)) {blue = 0};
  
  if (red > 255) { red = 255; }
  if (green > 255) { green = 255; }
  if (blue > 255) { blue = 255; }  
  
  let redHex = red.toString(16).padStart(2, '0');
  let greenHex = green.toString(16).padStart(2, '0');
  let blueHex = blue.toString(16).padStart(2, '0');
  
  colour = `#${redHex}${greenHex}${blueHex}`;
  contrast = getContrast(red, green, blue);

  $('body').css({
    'background': colour,
    'color': contrast
  });
  
  $('button').css({
    'background': colour,
    'color': contrast,
    'border-color': contrast
  });
  
  $('input').css({
    'background': colour,
    'color': contrast,
    'border-color': contrast
  });
  
  $("button").hover(function() {
    $(this).css({
      "background-color": `${contrast} !important`,
      "color": `${colour} !important`
    });
    }, function(){
    $(this).css({
      "background-color": `${colour} !important`,
      "color": `${contrast} !important`,
    });
});
  
  $('#output').val(colour);
}

$('#swWhite').click(e => {
  $('#redHex').val(255);
  $('#greenHex').val(255);
  $('#blueHex').val(255);
  draw();
});

$('#swBlack').click(e => {
  $('#redHex').val(0);
  $('#greenHex').val(0);
  $('#blueHex').val(0);
  draw();
});

$('#swRandom').click(e => {
  $('#redHex').val(Math.round(Math.random() * 255));
  $('#greenHex').val(Math.round(Math.random() * 255));
  $('#blueHex').val(Math.round(Math.random() * 255));
  draw();
});

function changeHex() {
  let hex = $('#output').val();
  while (hex[0] === '#') {
    hex = hex.slice(1);
  }
  
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  while (hex.length < 6) {
    hex = '0' + hex;
  }
  
  hex = hex.replace(/[^\da-fA-F]/g, '');
  
  hex = '#' + hex;
  $('#output').val(hex);
  
  let matches = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let red = parseInt(matches[1], 16);
  let green = parseInt(matches[2], 16);
  let blue = parseInt(matches[3], 16);
  
  $('#redHex').val(red);
  $('#greenHex').val(green);
  $('#blueHex').val(blue);
  
  draw();
}

function pingCopy(selector) {
  $('.copyButton').removeClass('copied');
  $('.copyButton').removeClass('fade');
  
  $(selector).addClass("copied");
  setTimeout(() => {
    $(selector).removeClass("copied");
    $(selector).addClass("fade");
  }, 1000);
  setTimeout(() => {
    $(selector).removeClass("fade");
  }, 2000);
}

// https://www.30secondsofcode.org/js/s/copy-to-clipboard
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

// https://stackoverflow.com/questions/35969656
function getContrast(red, green, blue) {
  
  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    return '#000000';
  } else {
    return '#FFFFFF';
  }
}