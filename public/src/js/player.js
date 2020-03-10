var myPlayer;
var lyric = "";
var timeId;
var preLyric;
var turn = 0;
var nowLyric;
var song = ['sqt8WiKOG1g', 'YtYVPZHQe58', 'kDO3Lt0gE4A'];
var songId = 0;

function onYouTubeIframeAPIReady() {
    myPlayer = new YT.Player('ytplayer', {
        videoId: song[songId], //Youtube videoId 
        events: {
            'onStateChange': onPlayerStateChange //play stage
        }
    });
}



//import lyric
async function foo() {
    let respon = await fetch("src/lyric/song.json");
    let data = await respon.json();
    return data;
};

//read lyric
foo().then(
    function(data) {
        for (let i = 0; i < data.song[songId].lyric.length; i++) {
            lyric = lyric + "<div class='lyric' data-time = '" + data.song[songId].time[i] + "'>" + data.song[songId].lyric[i] + "</div>";
        }
        document.getElementById('top').innerHTML = data.song[songId].name;
        document.getElementById('right').innerHTML = lyric;
    });


function startLyric() {
    timeId = setInterval(frame, 100);

    function frame() {
        //format time
        let minutes = Math.floor(myPlayer.getCurrentTime() / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        let seconds = myPlayer.getCurrentTime() - minutes * 60;
        seconds = (seconds >= 10) ? seconds.toFixed(2) : "0" + seconds.toFixed(2);
        let timeFormat = minutes + ":" + seconds;

        //lyric's time and video time
        let myLyric = document.getElementsByClassName('lyric');
        if (turn == 0) {
            nowLyric = myLyric[0];
            preLyric = myLyric[0];
            turn++;
        }
        if (myLyric[0].dataset.time > timeFormat) {
            nowLyric.style.color = null;
        } else {
            for (let i = 0; i < myLyric.length; i++) {
                if (myLyric[i].dataset.time < timeFormat) {
                    nowLyric = myLyric[i];
                }
                if (myLyric[i].dataset.time > timeFormat) {
                    break;
                }
            }
            if (nowLyric.dataset.time != preLyric.dataset.time) {
                nowLyric.style.color = "red";
                preLyric.style.color = null;
                preLyric = nowLyric;
            }
        }

    }

}

function onPlayerStateChange(event) {
    if (event.data == 0) {
        myPlayer.playVideo();
    }
    if (event.data == 1) {
        startLyric();
    } else {
        clearInterval(timeId);
    }
}

//refesh song and lyric
function playerRefresh() {
    if (songId > song.length - 1) {
        songId = 0;
    } else if (songId < 0) {
        songId = song.length - 1;
    }
    myPlayer.loadVideoById(song[songId]);
    lyric = "";
    foo().then(function(data) {
        for (let i = 0; i < data.song[songId].lyric.length; i++) {

            lyric = lyric + "<div class='lyric' data-time = '" + data.song[songId].time[i] + "'>" + data.song[songId].lyric[i] + "</div>";
        }
        document.getElementById('top').innerHTML = data.song[songId].name;
        document.getElementById('right').innerHTML = lyric;
    });
}

//next song
function nextSong() {
    songId += 1;
    playerRefresh();
}

//previous song
function preSong() {
    songId -= 1;
    playerRefresh();
}