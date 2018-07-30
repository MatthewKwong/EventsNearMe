// the function which handles the input field logic
function getUserName() {
  let startTime = document.getElementById('startTime').value;
  let result = document.getElementById('result');

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //  months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newdate = year + "/" + month + "/" + day + "T" + startTime + ":00Z";

  //  remove this line to not appear on screen
  result.textContent = 'utc time is: ' + newdate;
  console.log(newdate);
}

// use an eventlistener for the event
let subButton = document.getElementById('submit');
subButton.addEventListener('click', getUserName, false);
