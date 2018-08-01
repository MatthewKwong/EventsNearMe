
const input = document.getElementById('location-autocomplete');
const autocomplete = new google.maps.places.Autocomplete(input, {
  types: ['(cities)']
});

//  Start Time
$(document).ready(() => {
  $('#startTime-textfield > #startTime').click(() => {
    $('#startTime-textfield > #startTime').css('color', 'white');
  });
});

// End Time
$(document).ready(() => {
  $('#endTime-textfield > #endTime').click(() => {
    $('#endTime-textfield > #endTime').css('color', 'white');
  });
});


// Padding on the last rows
