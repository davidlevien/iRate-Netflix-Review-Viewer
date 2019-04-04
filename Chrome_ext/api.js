const call = "http://www.omdbapi.com/?t=blade+runner&apikey=da898670";
let xPos;
let yPos;

function findScreenCoords(mouseEvent){
  var xpos;
  var ypos;
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
        console.log('rendering popup');
        //create new DOM element <div></div>
        let popupWindow = document.createElement('div')
        popupWindow.setAttribute('top','250');
        popupWindow.setAttribute('left','250');
        popupWindow.setAttribute('position','fixed');
        popupWindow.setAttribute('background-color','white');
        popupWindow.setAttribute('border-style','solid');
        popupWindow.setAttribute('width','200px');
        popupWindow.setAttribute('height','200px');
        popupWindow.setAttribute('z-index','50');
        document.body.appendChild(popupWindow);
        //set new DOM element to mouse coordinates

        // $.get(`https://www.omdbapi.com/?t=${lookup}&apikey=da898670`,(data)=>{
        //     console.log(data.Plot);
        //     //loop over ratings and get the source and val on each object element in the array
        //     //console.log(data.Ratings);
        //     data.Ratings.forEach(obj => {
        //         console.log(`${obj.Source}: ${obj.Value}`)
        //     })
        // });
    }

    setInterval(()=>{
        console.log(xPos,',',yPos);
        if(currentDiv != null && currentDiv.className === 'bob-play-hitzone'){
            tvShow = currentDiv.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].childNodes[0]['innerText'];
            //console.log("child:",currentDiv,"grandparent:",newDiv);
        //if the new show is NOT equal to the prev show
            //update the prev show 
            //call function
        if (tvShow != tvShowPrevious) {
            tvShowPrevious = tvShow;
            lookupShow(tvShow);
        };
    }
    },5000);
    
})