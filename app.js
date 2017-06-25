var apiKey = "aab9f418748eca61da414fdda5aad191";
$(function() {
  var loc;
  //Getting coordinates from ipinfo.io
  $.getJSON("https://ipinfo.io/json", function(data) {
    console.log("assigning data...");
    loc = data.loc.split(",");
    console.log(loc);
    //Calling the weather API
    $.getJSON(
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
      loc[0] +
      "&lon=" +
      loc[1] +
      "&appid=" +
      apiKey,
      function(weatherData) {
        console.log("received the data...", weatherData);
        var currentLocation = weatherData.name;
        var currentWeather = weatherData.weather[0].description;
        var weatherPic = weatherData.weather[0].main;
        var currentTemp = weatherData.main.temp;
        var temp = {
          fahrenheit: Math.round(weatherData.main.temp) + "°F",
          celsius: Math.round((weatherData.main.temp - 32) * 5 / 9) + "°C"
        };
        var fahrenheit = Math.round(weatherData.main.temp) + "°F";
        var celsius = Math.round((weatherData.main.temp - 32) * 5 / 9) + "°C";
        var highTemp = weatherData.main.temp_max;
        var lowTemp = weatherData.main.temp_min;
        var windSpeed = weatherData.wind.speed;
        var metSpeed = Math.round(weatherData.wind.speed * 1.6) + " K.P.H.";
        var impSpeed = Math.round(weatherData.wind.speed) + " M.P.H.";

        //Inputting the API data into the application
        $("#currLoc").html(currentLocation);
        $("#currTemp").html(fahrenheit);
        $("#high").html(highTemp);
        $("#low").html(lowTemp);
        $("#windSpeed").html(impSpeed);
        $("#currentWeather").html(currentWeather);
        // Console log to test that the temp is working
        console.log(temp.celsius);

        //To make the background picture change depending on the weather
        if (weatherPic == "Clear") {
          $("body").css(
            "background-image",
            "url(https://i.ytimg.com/vi/JHebC3inT6Q/maxresdefault.jpg)"
          );
        } else if (weatherPic == "Clouds") {
          $("body").css(
            "background-image",
            "url(http://www.footwa.com/wp-content/uploads/2010/05/Solitary-bird-in-the-sky.jpg)"
          );
        } else if (weatherPic == "Snow") {
          $("body").css(
            "background-image",
            "url(http://hddesktopwallpapers.in/wp-content/uploads/2015/09/snowy-background.jpg)"
          );
        } else if (weatherPic == "Rain") {
          $("body").css(
            "background-image",
            "url(https://danielphounsavan.files.wordpress.com/2013/10/rain_drops_keep_falling_wallpaper-wide.jpg)"
          );
        } else if (weatherPic == "Mist") {
          $("body").css(
            "background-image",
            "url(https://vignette1.wikia.nocookie.net/gameknight999/images/f/f5/Mist.jpg/revision/latest?cb=20170112011652)"
          );
        }
        //To toggle between fahrenheit and celsius by pushing the button
        var tempConvert = true;
        $("#conversion").click(function() {
          if (tempConvert === true) {
            $("#currTemp").html(celsius);
            tempConvert = false;
          } else {
            $("#currTemp").html(fahrenheit);
            tempConvert = true;
          }
        });
        var windConvert = true;
        $("#conversion").click(function() {
          if (windConvert === true) {
            $("#windSpeed").html(metSpeed);
            windConvert = false;
          } else {
            $("#windSpeed").html(impSpeed);
            windConvert = true;
          }
        });
      }
    );
  });
});
