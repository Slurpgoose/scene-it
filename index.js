$(document).ready(function() {
    $('.results').append(createMoviePosters())
    $( "#search-form" ).submit(element => {searchMovie(element)});
})

function createMoviePosters() {
    let posters = movieData.map(element => {return moviePoster(element)}).join("")
    return posters
}

function moviePoster(movie) {
    return `
    <div class="card hidden" style="width: 18rem;" id="${movie.Title}">
    <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
    <div class="card-body">
      <h5 class="card-title">${movie.Title}</h5><span><p>(${movie.Year})</p></span>
      <a href="#" class="btn btn-primary">Add!</a>
    </div>
  </div>`
}

function searchMovie(event) {
    event.preventDefault();
    search_key = $('.search-bar').val();
    returnMovieResults(search_key);
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
}