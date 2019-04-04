
///UPDATE: CHANGE TO TURN ON/OFF BUTTON INSTEAD OF COLOR CHOICE


'use strict';
// redefine to activate/deactivate functionality
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

// redefine to active function
changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

// add function for 'onMouseOver' to create popup window when ext. is active