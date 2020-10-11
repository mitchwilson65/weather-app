document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=02de6e723694a3175d2d990d5592144f";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<h2 id="weatherIn">Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += '<h3>Feels like: ' + json.main.feels_like + " &deg;F</h3>"
      results += "<h3>Humidity: " + json.main.humidity + "%</h3>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1) results += ", "
      }
     results += "</p>";
     results += "<p>Wind: " + json.wind.speed + " mph;  " + json.wind.deg + " &deg;</p><hr>";
     document.getElementById("weatherResults").innerHTML = results;
    });

  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=02de6e723694a3175d2d990d5592144f";
  fetch(url2)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    let forecast = "";
    for (let i=0; i < json.list.length; i++) {
       forecast += '<div id="divisor">'
       forecast += "<h2 id='top-header'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
	     forecast += "<p id='main-temp'>Temperature: " + json.list[i].main.temp + "</p>";
       forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"  id="sublogo"/>'
       forecast += "<p>Feels like: " + json.list[i].main.feels_like + "</p>"
       forecast += "<p>Max: " + json.list[i].main.temp_max + "</p>"
       forecast += "<p>Min: " + json.list[i].main.temp_min + "</p>"
       forecast += "</div>"
    }
    document.getElementById("forecastResults").innerHTML = forecast;
  });

});
