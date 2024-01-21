// main.js

function getWeather() {
  const cityName = document.getElementById('cityInput').value;

  $.ajax({
    type: 'POST',
    url: '/weather',
    contentType: 'application/json',
    data: JSON.stringify({ city: cityName }),
    success: function (data) {
      displayWeather(data);
      displayMap(data);
      const country = data.current.sys.country;
      fetchCountryInfo(country);
      fetchTimeZoneInfo(data.current.coord.lat, data.current.coord.lon);
    },
    error: function (error) {
      console.error(error);
    }
  });
}

function displayWeather(data) {
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = '';

  const currentWeather = data.current;
  const forecastData = data.forecast;

  const temperature = currentWeather.main.temp;
  const description = currentWeather.weather[0].description;
  const icon = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;

  const weatherInfo = `
    <p><strong>Temperature:</strong> ${temperature}°C</p>
    <p><strong>Description:</strong> ${description}</p>
    <img src="${icon}" alt="Weather Icon">
    <p><strong>Coordinates:</strong> Latitude ${currentWeather.coord.lat}, Longitude ${currentWeather.coord.lon}</p>
    <p><strong>Feels Like:</strong> ${currentWeather.main.feels_like}°C</p>
    <p><strong>Humidity:</strong> ${currentWeather.main.humidity}%</p>
    <p><strong>Pressure:</strong> ${currentWeather.main.pressure} hPa</p>
    <p><strong>Wind Speed:</strong> ${currentWeather.wind.speed} m/s</p>
    <p><strong>Country Code:</strong> ${currentWeather.sys.country}</p>
    <p><strong>Rain in Last 3 Hours:</strong> ${forecastData.list[0].rain ? forecastData.list[0].rain['3h'] : 'No data'} mm</p>
  `;

  resultDiv.innerHTML = weatherInfo;
}

function fetchCountryInfo(countryCode) {
  const restCountriesApiEndpoint = `https://restcountries.com/v3/alpha/${countryCode}`;
  
  $.get(restCountriesApiEndpoint, function (data) {
    displayCountryInfo(data);
  })
  .fail(function(error) {
    console.error('Error fetching country information:', error);
    $('#country-info').html('<p>Error fetching country information</p>');
  });
}

function displayCountryInfo(countryData) {
  const countryInfoDiv = $('#country-info');
  if (!countryInfoDiv) {
    console.error('Country info div not found');
    return;
  }

  const name = countryData[0].name.common;
  const population = countryData[0].population;
  const currencies = countryData[0].currencies;
  const currencyInfo = Object.values(currencies).map(currency => {
    return `${currency.name} (${currency.code} - ${currency.symbol})`;
  }).join(', ');   
  const languages = Object.values(countryData[0].languages).join(', ');

  countryInfoDiv.html(`
    <h2>Country Information</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Currencies:</strong> ${currencyInfo}</p>
    <p><strong>Languages:</strong> ${languages}</p>
  `);
}

function fetchTimeZoneInfo(latitude, longitude) {
  const timezoneDbApiEndpoint = `http://api.timezonedb.com/v2.1/get-time-zone?key=VGUAKFVL6SWI&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  $.get(timezoneDbApiEndpoint, function (data) {
    displayTimeZoneInfo(data);
  })
  .fail(function(error) {
    console.error('Error fetching time zone information:', error);
    $('#timezone-info').html('<p>Error fetching time zone information</p>');
  });
}

function displayTimeZoneInfo(timezoneData) {
  const timezoneInfoDiv = $('#timezone-info');
  if (!timezoneInfoDiv) {
    console.error('Timezone info div not found');
    return;
  }

  const timeZoneName = timezoneData.zoneName;
  const timeZoneOffsetSeconds = timezoneData.gmtOffset;

  const timeZoneOffsetHours = timeZoneOffsetSeconds / 3600;
  const offsetSign = timeZoneOffsetHours >= 0 ? '+' : '-';

  timezoneInfoDiv.html(`
    <h2>Time Zone Information</h2>
    <p><strong>Time Zone:</strong> ${timeZoneName}</p>
    <p><strong>GMT Offset:</strong> ${offsetSign}${Math.abs(timeZoneOffsetHours)} hours</p>
  `);
}

function displayMap(data) {
  const mapContainer = L.DomUtil.get('map');

  if (mapContainer != null) {
    mapContainer._leaflet_id = null;
  }

  const map = L.map('map').setView([data.current.coord.lat, data.current.coord.lon], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([data.current.coord.lat, data.current.coord.lon]).addTo(map)
    .bindPopup(`<b>${data.current.name}</b><br>Temperature: ${data.current.main.temp}°C`)
    .openPopup();
}
$(document).ready(function () {
});

