// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var section;
var timeout;

function onYouTubeIframeAPIReady() {
    player = new YT.Player(
      'player',
      {
        height: 2 * window.outerHeight / 3,
        width: window.outerWidth,
        videoId: id,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      }
    );

    $("#next").click(function() {
        section = getNextPart();
        player.seekTo(section.start);
        // console.log(section)
    });
    $("#prev").click(function() {
        section = getPrevPart();
        player.seekTo(section.start);
        // console.log(section)
    });

    $("#inputTxt").keydown(function(e) {
        $("#wordcount").html((wordCount($(this).val()) + "/" + wordCount(section.text)));        
        if (e.which == 13) {
            // Re-enable input
            // $('#inputTxt').off('keypress');
            // Get text
            var res = match($(this).val(), section.text);
            $("#result").html($("#result").html() + "<br><br>" + section.text + "<br>" + res.resultText + " (" + res.correct + ")");
            $(this).val("");
            $("#result").scrollTop($("#result")[0].scrollHeight);
            $("#next").click();
        }
    })
}

function wordCount(str) {
    let pattern = /[\s\.\,\:\?]+/;
    return str.split(pattern).filter(v => v != '').length;
}

function onPlayerReady(event) {
    if (typeof getScriptList() === "undefined") {
        setTimeout(onPlayerReady, 50, event);
    } else {
        section = getNextPart();
        player.seekTo(section.start);
        player.playVideo();
    }
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    var duration = section.end - section.start + 1;
    // console.log(duration);
    $("#transcript").html(section.text);
    timeout = setTimeout(restartVideoSection, duration * 1000);
  } else {
      clearTimeout(timeout);
      player.seekTo(section.start);
    //   player.playVideo();
  }
}

function restartVideoSection() {
    player.pauseVideo();
    setTimeout(function () {
        player.seekTo(section.start);
        player.playVideo();
    }, 2000);
}