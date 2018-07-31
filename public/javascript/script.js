const input = document.getElementById('location-autocomplete');
const autocomplete = new google.maps.places.Autocomplete(input, {
  types: ['(cities)']
});
