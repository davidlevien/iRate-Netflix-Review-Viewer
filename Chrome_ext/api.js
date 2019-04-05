const call = "http://www.omdbapi.com/?t=blade+runner&apikey=da898670";
let xPos;
let yPos;

function findScreenCoords(mouseEvent){
  let xpos;
  let ypos;
  xpos = mouseEvent.screenX;
  ypos = mouseEvent.screenY;
  xPos = xpos;
  yPos = ypos;
}



$(document).ready(()=>{

    document.body.onmousemove = findScreenCoords;
    let tvShow = '';
    let tvShowPrevious = '';
    let currentDiv = null;

    $('body').mousemove(function(event){
      currentDiv = event.target;
    });


    function lookupShow(show) {

        lookup = show.split(" ").join("+");
        let appWindow = document.getElementById('appMountPoint');
        let popupWindow = document.createElement('div');
        popupWindow.setAttribute('id','popupWindow');
        appWindow.appendChild(popupWindow);
        let window = document.querySelector('#popupWindow');
        window.setAttribute('style', `display: none; padding: 10px 10px; box-shadow: 10px 10px 40px 3px white; border-radius: 10px; background-color: #22abbd; font-family: Lucida Console, Monaco, monospace; font-size: 0.75vw; border-style: solid; border-color: black; width: 250px; height: auto; position: fixed; top: ${yPos}px; left:${xPos}px`);
        $('#popupWindow').fadeIn(250);
        
        
        $.get(`https://www.omdbapi.com/?t=${lookup}&apikey=da898670`,(data)=>{
            if (!data.Error) {
                window.innerHTML = '';
                window.innerHTML += data.Plot.italics() + "<br>";
                data.Ratings.forEach(obj => {
                    window.innerHTML += "<br>" + `${obj.Source}: ${obj.Value.bold()}` + "<br>"
                })
                window.innerHTML += `<br><div font-size = '0.4vw' !important>Awards: ${data.Awards}</div>`
            } else {
                window.innerHTML = 'No data for selection';
            }; 
        });
    }

    setInterval(()=>{
        if(currentDiv != null && currentDiv.className === 'bob-play-hitzone'){
            tvShow = currentDiv.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].childNodes[0]['innerText'];
        if (tvShow != tvShowPrevious) {
            tvShowPrevious = tvShow;
            lookupShow(tvShow);
        };
    }
    },500);
    
})