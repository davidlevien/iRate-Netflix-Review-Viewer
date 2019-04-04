const call = "http://www.omdbapi.com/?t=blade+runner&apikey=da898670";

console.log('hello');

$(document).ready(function(){
  $('#test').append("<p>test</p>");
  $.get(call,data =>{
    console.log(data);
  })
});
