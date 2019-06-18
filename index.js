const watch_list = [];

$(document).ready(function() {
    $( "#search-form" ).submit(element => {searchMovie(element)});
    $('.add').click(function (){saveToWatchlist($(this))})
    if (localStorage.getItem("watchlist") === null) {
        localStorage.setItem('watchlist', '[]')
      }
});

function createMoviePosters(data) {
    let posters = data.map(element => {return moviePoster(element)}).join("")
    return posters
};

function moviePoster(movie) {
    return `
    <div class="card hidden" style="width: 18rem;" id="${movie.Title}">
    <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
    <div class="card-body">
      <h5 class="card-title">${movie.Title}</h5><span><p>(${movie.Year})</p></span>
      <button href="#" id="${movie.imdbID}" class="btn btn-primary add">Add!</button>
    </div>
  </div>`
};

function searchMovie(event) {
    event.preventDefault();
    search_key = $('.search-bar').val();
    returnAPIResults(search_key)
        .then(result => {
            resultHtml = createMoviePosters(result)
            $('.results').html(resultHtml);
        });
};

var result = '';

function returnAPIResults(search_key) {
    search_key = encodeURIComponent(search_key);
    var URL = `http://www.omdbapi.com/?apikey=3430a78&s=${search_key}`;
    return $.get(URL).then(function( data ) {
        return data['Search']
    });
}

function returnMovieResults(search) {
    const cards = $('.card');
    search = search.split(' ').join('').toLowerCase();
    for (i = 0; i < cards.length; i++){
        let movie = cards[i].id.split(' ').join('').toLowerCase();
        if(movie.includes(search)) {
            $(cards[i]).removeClass('hidden');
        }
        else if (!$(cards[i]).hasClass('hidden')) {
            $(cards[i]).addClass('hidden');
        }
    }
};


function saveToWatchlist(element) {
    let id = $(element).attr('id')
    watch_list.push(id);
    movie = movieData.find(function(element){return element.imdbID == id});
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    watchlist.push(id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist.unique()))
}


Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}
