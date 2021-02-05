const request = new XMLHttpRequest();

$(document).ready(function(){
  $("form").submit(function(e){
    e.preventDefault();

    const text = $("#textBox").val();
    getJoke(text);
  })
});

function getJoke(term) {
  const page = 1;
  const endpoint = `https://icanhazdadjoke.com/search?term=${term}&page=${page}&limit=30`;

  request.open("GET", endpoint);
  request.responseType = 'text';
  request.setRequestHeader("Accept", "application/json");

  request.onload = function() {
    const data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      let joke = "";

      if (data.results.length > 0) {
        let index = Math.floor(Math.random() * data.results.length);
        joke = (data.results[index].joke);
      } else {
        joke = "No jokes for you!";
      }
      $("#jokeText").html(joke);
    } else {
      alert("An error has occured.");
    }
  }
  request.send();
}
