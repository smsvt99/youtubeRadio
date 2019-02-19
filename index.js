//index within a genre
let i = 0;
//index for themes
let j = 0
//index between genres
let k = 0

let playing = true;
let hidden = false;
let genre;
let genreNamesArray = [];
let genres = {}
let timeout;
let interval;


// let jazz = ['NsB2eya4nFA', 'rNg90PU7Y1s', '2ccaHpy5Ewo', 'zab985qDgnU', 'oQg4VCw24Qo']
// let lofi = ['hHW1oY26kxQ','vFtX7iqnKUk','5AEbq6X33A8','c_IVcbEez8o','2L9vFNMvIBE']
// let cartoons = ['01ecIQdpjWk','1FUjJzJ4V-I','itX0a6-OVpk','6bRO7nFroYc']
let themes = ['lighthouse.mp4', 'grass.mp4', 'lakeTahoe.mp4', 'turntable.mp4', 'river.mp4',  'camp.mp4']

let stations = [
    ['hHW1oY26kxQ', 'Lofi Hip Hop Radio', 'lofi'],
    ['bebuiaSKtU4', 'Chill/Study Beats Radio', 'lofi'],
    ['KC3sfZBmn-o', 'Beats to Study/ Game/ Relax Radio', 'lofi'],
    ['DHB42n9n6pA', 'Beats to Sleep/ Relax to Radio', 'lofi'],
    ['g-pqmuYPHPs', 'Lofi and Jazz Hip Hop Radio', 'lofi'],

    ['DSGyEsJ17cI', 'Relaxing Jazz and Bossa Nova Radio Radio', 'jazz'],
    ['Dx5qFachd3A', "Relaxing Jazz Piano Radio", 'jazz'],
    ['mqWdCpecKpw', 'Night of Smooth Jazz Radio', 'jazz'],
    ['3SakCDX_fGA', 'Relaxing Jazz for Work and Study Radio', 'jazz'],
    ['IVYOZfWF1cY', 'Morning Jazz and Bossa Nova Radio Radio', 'jazz'],
    ['I6sj-2GRXVQ', 'Morning Coffee Jazz and Bossa Nova Radio', 'jazz']
]


function initialize(){
    //add stations from cookies to seed stations
    readCookies()
    //create genres array from stations
    sortStations();
    //user genres array to make array of genre names
    makeGenreNamesArray();
    // genre = genres[genreNamesArray[k]], k = 0.
    setGenre();
    // ${genre[i][1]}, i = 0
    animateTitle();
    // genreNamesArray[k] + ' ' + (i + 1) + '/' + genre.length
    showGenre()
}



function readCookies(){
    stations = [
        ['hHW1oY26kxQ', 'Lofi Hip Hop Radio', 'lofi'],
        ['bebuiaSKtU4', 'Chill/Study Beats Radio', 'lofi'],
        ['KC3sfZBmn-o', 'Beats to Study/ Game/ Relax Radio', 'lofi'],
        ['DHB42n9n6pA', 'Beats to Sleep/ Relax to Radio', 'lofi'],
        ['g-pqmuYPHPs', 'Lofi and Jazz Hip Hop Radio', 'lofi'],
    
        ['DSGyEsJ17cI', 'Relaxing Jazz and Bossa Nova Radio Radio', 'jazz'],
        ['Dx5qFachd3A', "Relaxing Jazz Piano Radio", 'jazz'],
        ['mqWdCpecKpw', 'Night of Smooth Jazz Radio', 'jazz'],
        ['3SakCDX_fGA', 'Relaxing Jazz for Work and Study Radio', 'jazz'],
        ['IVYOZfWF1cY', 'Morning Jazz and Bossa Nova Radio Radio', 'jazz'],
        ['I6sj-2GRXVQ', 'Morning Coffee Jazz and Bossa Nova Radio', 'jazz']
    ]
    
    let cookies = Cookies.get();
    for (let cookie in cookies){
        stations.push(JSON.parse(cookies[cookie]));
    }
}

function sortStations(){
    genres = {}
    for (let i = 0; i < stations.length; i++){
        //the the genres object does not already contain an array, the key of which is the genre title at this index in the stations array, create it before pushing into it.
        if (genres[stations[i][2]] == undefined){
            genres[stations[i][2]] = [];
        }
        genres[stations[i][2]].push(stations[i])
    }
}

function makeGenreNamesArray(){
    genreNamesArray = []
    for (key in genres){
        if (!genreNamesArray[key]){
            genreNamesArray.push(key)
        }
    }
}

function setGenre(){
    genre = genres[genreNamesArray[k]]
}

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
    videoId: 'hHW1oY26kxQ',
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
    let hideButtons = setTimeout(function(){
        $(".button").addClass('fadeOutDown');
        hidden = true;
    }, 5000)
    $('#body').bind('mousemove mouseover mouseenter mousein', function(){
        if(hidden){
            hidden = false
            $(".button").removeClass('fadeOutDown');
            $(".button").addClass('fadeInUp');
        }
        clearTimeout(hideButtons)
        hideButtons = setTimeout(function(){
            $(".button").addClass('fadeOutDown');
            hidden = true;
        },3000)
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

    Cookies.set(array[1], array, { expires: 10000 });
    
    readCookies();
    sortStations();
    makeGenreNamesArray();
    setGenre();
    showNowPlaying();
  
}
function showGenre(){
    document.getElementById('genreDisplay').textContent = genreNamesArray[k] + ' ' + (i + 1) + '/' + genre.length
}

function removalForm(){
    document.getElementById('removalDiv').style.display = 'block';
    let cookies = Cookies.get();
    for (let cookie in cookies){
        let array = JSON.parse(cookies[cookie])
        let item = document.createElement('li')
        item.textContent = array[1]
        item.setAttribute('class', 'removable')
        item.setAttribute('onclick', 'removeItem(this)')
        document.getElementById('list').appendChild(item)
    }
}

function removeItem(target){
Cookies.remove(target.textContent)
target.style.textDecoration = 'line-through'
}

function refresh(){
    document.getElementById('removalDiv').style.display = 'none';
    readCookies();
    sortStations();
    makeGenreNamesArray();
    setGenre();
    showNowPlaying();
    let stationNames = document.getElementsByClassName('removable')
    for (let i = 0; i < stationNames.length; i++){
        document.getElementById('list').removeChild(stationNames[i])
    }
}

initialize();