

//  Google Maps
// const input = document.getElementById('location-autocomplete');
// const autocomplete = new google.maps.places.Autocomplete(input, {
//   types: ['(cities)']
// });

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


$(document).ready(() => {
  if (window.location.pathname === '/search') {
    // remove boxes here
    $('.box-container').hide();
  }
})

$(document).ready(() => {
  if (window.location.pathname === '/none') {
    // remove boxes here
    $('.box-container').hide();
  }
})


// function showPosition(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;
//
//
//   console.log(latitude);
//   console.log(longitude);

  $('#sports').click(() => {
    $('#eventType').val('sports')
    const queryString = $('#form').formSerialize();
    window.location.href = '/search?location=san+francisco&' + queryString;
    console.log(queryString);
  })

  $('#food').click(() => {
    $('#eventType').val('food')
    const queryString = $('#form').formSerialize();
    window.location.href = '/search?location=san+francisco&' + queryString;
    console.log(queryString);
  })

  $('#art').click(() => {
    $('#eventType').val('art')
    const queryString = $('#form').formSerialize();
    window.location.href = '/search?location=san+francisco&' + queryString;
    console.log(queryString);
  })

  $('#music').click(() => {
    $('#eventType').val('music')
    const queryString = $('#form').formSerialize();
    window.location.href = '/search?location=san+francisco&' + queryString;
    console.log(queryString);
  })

  // Fast quick cards - longitude and latitude
//   navigator.geolocation.getCurrentPosition(showPosition);
// }
// Banner Slideshow
let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName('slide');
  let dots = document.getElementsByClassName('dot');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className + 'active';
  setTimeout(showSlides, 10000);
}

showSlides();
