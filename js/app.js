(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.imdbid}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.imdbid);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  var button = $(".btn-large"); //setting of variable for trigger

  button.click(function(event) { //trigger for event is click of button
    event.preventDefault(); //ensure that the page doesn't reload upon "resubmit"
    var cap = $("#search").val(); //create capsul to store data ref the class and adding validator function.
    $.getJSON(`http://omdbapi.com/?t=${cap}`).done(function(fun) { //calling on api address to retrieve data and enter it in cap.
      var movie = {}; //new object made from api call
      for (var key in fun) { //forIn loop to convert object into array
        movie[key.toLowerCase()] = fun[key]; //setting movie[key] to fun[key] and converting to lowerCase to process into array
      }
      movies.push(movie); //push movie array into movies

      renderMovies();
    });
  });

})();
