const beginBtn = $('#button-begin');
const reloadBtn = $('#button-reload');

const numDivs = 36;
const maxHits = 10;

let hits = 0;
let wrongHits = 0;
let gameBeginTime = 0;

function endGame() {
  
  let timePlayedSec = Number(timePlayed / 1000).toPrecision(3);
  $('#total-time-played').text(timePlayedSec);

  wrongHitsTotal = wrongHits - hits;

  $('#wrong-hits-result').text(wrongHitsTotal);

  $('.game-wrapper').addClass('d-none');

  $('#win-message').removeClass('d-none');
};

function wrongClick() {
  wrongField = $('.game-field');
  wrongField.click(function() {
    $(this).addClass('miss');
    wrongHits += 1;
  });
}


function handleClick() {
  if ($(event.target).hasClass('target')) {
    hits = hits + 1;
    $(divSelector).text('');
    $(divSelector).removeClass('target');
    $(wrongField).removeClass('miss');

    round();
  }
};

function round() {
  divSelector = randomDivId();

  $(divSelector).addClass('target');

  $(divSelector).text(hits + 1);

  $('.game-field').click(handleClick);

  if (hits === maxHits) {
    timePlayed = getTimestamp() - gameBeginTime;
    endGame();
  }
};

function gameBegin() {
   gameBeginTime = getTimestamp();
   wrongHits = 0;
   $(wrongField).removeClass('miss');
   round();
};

function init() {
  beginBtn.click(gameBegin);

  beginBtn.click(function() {
    beginBtn.addClass('d-none');
  });

  wrongClick();

  reloadBtn.click(function() {
    location.reload(true);
  });
};

$(document).ready(init);