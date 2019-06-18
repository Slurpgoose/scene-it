const watch_list = [];

$(document).ready(function() {
    $('.results').append(createMoviePosters())
    $('.remove').click(function (){saveToWatchlist($(this))})
});

function createMoviePosters() {
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    let posters = watchlist.map(element => {return moviePoster(element)}).join("")
    return posters
};

function moviePoster(id) {
    movie = movieData.find(function(element){return element.imdbID == id});
    return `
    <div class="card" style="width: 18rem;" id="${movie.imdbID}">
    <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
    <div class="card-body">
      <h5 class="card-title">${movie.Title}</h5><span><p>(${movie.Year})</p></span>
      <button href="#" id="${movie.imdbID}" class="btn btn-primary remove">Remove</button>
    </div>
  </div>`
};

function searchMovie(event) {
    event.preventDefault();
    search_key = $('.search-bar').val();
    returnMovieResults(search_key);
};

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
    movie = movieData.find(function(element){return element.imdbID == id});
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    watchlist =watchlist.remove(id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    $(`#${id}`).remove();
}


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var ary = ['three', 'seven', 'eleven'];

ary.remove('seven');