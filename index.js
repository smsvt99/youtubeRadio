//index within a genre
let i = 0;
//index for themes
let j = 0
//index between genres
let k = 0

let playing = true;
let hidden;
let genre;
let genreNamesArray = [];
let genres = {}
let timeout;
let interval;


// let jazz = ['NsB2eya4nFA', 'rNg90PU7Y1s', '2ccaHpy5Ewo', 'zab985qDgnU', 'oQg4VCw24Qo']
// let lofi = ['hHW1oY26kxQ','vFtX7iqnKUk','5AEbq6X33A8','c_IVcbEez8o','2L9vFNMvIBE']
// let cartoons = ['01ecIQdpjWk','1FUjJzJ4V-I','itX0a6-OVpk','6bRO7nFroYc']
let themes = ['lighthouse.mp4','turntable.mp4', 'city.webm', 'river.mp4', 'grass.mp4', 'camp.mp4', ]

let stations = [
    ['NsB2eya4nFA', "Night of Smooth Jazz Radio", 'jazz'],
    ['rNg90PU7Y1s', 'Autumn Jazz Radio', 'jazz'],
    ['2ccaHpy5Ewo', 'Relaxing Jazz and Bossa Nova Radio', 'jazz'],
    ['zab985qDgnU', 'Relaxing Rainy Jazz Radio', 'jazz'],
    ['oQg4VCw24Qo', 'Morning Jazz and Bossa Nova Radio', 'jazz'],
    ['GsE5nhj-nm4', 'Morning Coffee Jazz and Bossa Nova', 'jazz'],
    ['hHW1oY26kxQ', 'Lofi Hip Hop Radio', 'lofi'],
    ['vFtX7iqnKUk', 'Lofi Hip Hop Radio for Study', 'lofi'],
    ['5AEbq6X33A8', '24/7 Lofi Hip Hop Radio', 'lofi'],
    ['c_IVcbEez8o', 'Lofi Hip Hop for Sleep Radio', 'lofi'],
    ['2L9vFNMvIBE', '24/7 Smooth Beats Radio', 'lofi']
]
function readCookies(){
    let cookies = Cookies.get();
    for (let cookie in cookies){
        stations.push(JSON.parse(cookies[cookie]));
    }
}
readCookies()
function sortStations(){
    for (let i = 0; i < stations.length; i++){
        if (genres[stations[i][2]] == undefined){
            genres[stations[i][2]] = [];
        }
        genres[stations[i][2]].push(stations[i])
    }
}
sortStations();

function makeGenreNamesArray(){
    for (key in genres){
        if (!genreNamesArray[key]){
            genreNamesArray.push(key)
        }
    }
}
makeGenreNamesArray();

function setGenre(){
    genre = genres[genreNamesArray[k]]
}
setGenre();

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', options);
}

function onPlayerReady(event) {
    options.videoId = genre[i];
    event.target.playVideo()
//   document.getElementById('jazzButton').click()
}

function stopVideo() {
    player.stopVideo();
}

let options = {
    height: '0px',
    width: '0px',
    videoId: 'NsB2eya4nFA',
    events: {
        'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
    },
    autoplay: 1,
    mute: 0,
}
function next() {
    player.stopVideo()
    if (genre[i+1]){
        i = i + 1;
    } else {
        i = 0;
    }
    options.videoId = genre[i];
    player.cueVideoById({
        'videoId' : genre[i]
    })
    // onYouTubeIframeAPIReady();
    player.playVideo();
    showNowPlaying();
    console.log(options.videoId);
    showGenre()
}

function previous(){
    player.stopVideo()
    if (genre[i-1]){
        i = i - 1;
    } else {
        i = genre.length -1;
    }
    options.videoId = genre[i];
    player.cueVideoById({
        'videoId' : genre[i]
    })
    // onYouTubeIframeAPIReady();
    player.playVideo();
    showNowPlaying();
    console.log(options.videoId);
    showGenre()
}

function pausePlay(){
    if (playing === true){
        playing = false;
        player.stopVideo();
        document.getElementById('square').style.fontSize = "40px";
        document.getElementById('square').innerHTML = "&#x25BA;";
        document.getElementById('square').style.lineHeight = "2.1";
    } else if (playing === false){
        playing = true;
        player.playVideo();
        document.getElementById('square').style.fontSize = "70px";
        document.getElementById('square').innerHTML = "&#x25a0;";
        document.getElementById('square').style.lineHeight = "1.2";

    } 
}

//Make buttons dissappear and reappear with mouse movement
$(document).ready(function(){
    hideButtons = setTimeout(function(){
        $(".button").addClass('animated fadeOutDown');
        $("#hamburger").addClass('animated fadeOutDown')
    }, 5000)
    window.addEventListener('mousemove', function(){
        if(hidden){
            hidden = false
            $(".button").removeClass('animated fadeOutDown')
            $(".button").addClass('animated fadeInUp')
            $("#hamburger").removeClass('animated fadeOutRight')
            $("#hamburger").addClass('animated fadeInRight')
        }
        clearTimeout(hideButtons)
        hideButtons = setTimeout(function(){
            $(".button").addClass('animated fadeOutDown')
            $("#hamburger").addClass('animated fadeOutRight')
        hidden = true}, 3000)
    })
})

function showDropdown(){
    if (document.getElementById('dropdown').style.display === 'flex'){
    document.getElementById('dropdown').style.display = 'none';}
    else {
    document.getElementById('dropdown').style.display = 'flex';}
    }

function changeTheme(){
    if (themes[j+1]){
        j = j + 1
        document.getElementById('background').src = themes[j]
    } else {
        j = 0
        document.getElementById('background').src = themes[j]
    }
}

function animateTitle(){
   interval = setInterval(function(){
    $("#relax").removeClass('animated fadeInDown fadeOutUp')
    $("#relax").addClass('animated fadeOutUp')
    timeout = setTimeout(function(){
        if (document.getElementById('relax').textContent === 'Relax'){
        document.getElementById("relax").innerHTML = `${genre[i][1]}`
    } else {
        document.getElementById('relax').textContent = 'Relax'
    }
        $("#relax").removeClass('animated fadeOutUp fadeInDown')
       $("#relax").addClass('animated fadeInDown')
    },1000)
    }, 8000)
};
animateTitle();

function changeGenre(){
    i = 0
    if (genres[genreNamesArray[k + 1]]){
        k = k + 1
    } else {
        k = 0
    }
    setGenre()
    player.cueVideoById({
        'videoId' : genre[i]
    });
    showNowPlaying()
    showGenre()
    player.playVideo();
}

function showNowPlaying(){
    clearTimeout(timeout);
    clearInterval(interval);
    document.getElementById('relax').innerHTML = `${genre[i][1]}`;
    $("#relax").removeClass('animated fadeInDown fadeOutUp');
    $("#relax").addClass('animated fadeInDown');
    animateTitle();
}

function showForm(){
    document.getElementById('formDiv').style.display='block'
}
function hideForm(){
    document.getElementById('formDiv').style.display='none'
}

function submitForm(){
    let array = [];
    array.push(document.getElementById('url').value);
    array.push(document.getElementById('title').value);
    array.push(document.getElementById('genre').value);

    document.getElementById('url').value = "";
    document.getElementById('title').value = "";
    document.getElementById('genre').value = "";
    
    hideForm();

    Cookies.set(array[1], array, { expires: 1000 });
    
    readCookies();
    sortStations();
    makeGenreNamesArray();
    setGenre();
    showNowPlaying();
}
function showGenre(){
    document.getElementById('genreDisplay').textContent = genreNamesArray[k] + ' ' + (i + 1) + '/' + genre.length
}
showGenre()