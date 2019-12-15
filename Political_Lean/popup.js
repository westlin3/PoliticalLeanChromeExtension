
// url of cloud code
const api_url = "https://us-central1-braided-upgrade-262021.cloudfunctions.net/function-1";

// Button trigger to send out url of current tab api_url
var button = document.getElementById("button");
button.addEventListener('click', function(e) {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    // grab url to send out
    var url = tabs[0].url;
    chrome.extension.getBackgroundPage().console.log(url);
  fetch(api_url, {
    method: 'POST',
    body: url,
    headers:{
      'Content-Type': 'application/json'
    } })
  .then(data => {
    data = data.text()
    return data })
  .then(lean => {
    // Edits output image based on url and makes it visible
    switch (lean) {
    case "L":
        document.getElementById('politicaLean').src='images/L.png'
      break;
    case "C":
        document.getElementById('politicaLean').src='images/C.png'
      break;
    case "R":
        document.getElementById('politicaLean').src='images/R.png'
        break;
    case "CL":
        document.getElementById('politicaLean').src='images/CL.png'
        break;
    case "CR":
      document.getElementById('politicaLean').src='images/CR.png'
      break;
    } 
    var c = document.getElementById("politicaLean") 
    c.style.visibility = 'visible'
  }
    )
  .catch(error => console.error('Error:', error));
});
})
