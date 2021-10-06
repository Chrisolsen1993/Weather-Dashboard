var currentDay = moment();
$("#date").text(currentDay.format("dddd,  MM-DD-YYYY"));
var futurDay1 = moment().add(1, "d");
$("#date1").text(futurDay1.format("MM-DD-YYYY"));
var futurDay2 = moment().add(2, "d");
$("#date2").text(futurDay2.format("MM-DD-YYYY"));
var futurDay3 = moment().add(3, "d");
$("#date3").text(futurDay3.format("MM-DD-YYYY"));
var futurDay4 = moment().add(4, "d");
$("#date4").text(futurDay4.format("MM-DD-YYYY"));
var futurDay5 = moment().add(5, "d");
$("#date5").text(futurDay5.format("MM-DD-YYYY"));
 
var searchBtn =  $("#search-button").on("click",citySearch)
var input = $("#input-city")
// when you press enter
input.on("keypress", function (event){
    if (event.keyCode===13){
    var city = input.val().trim();
    CurrentWeather(city);
    
    input.val("");
}});
//when you click
function citySearch(event){
    event.preventDefault();
    var city = input.val().trim();
    // var storage1=localStorage.getItem("cityname")
    // localStorage.setItem("cityname", city);
    // $(".list-group").append(storage1)
    // console.log(storage1)
    CurrentWeather(city);
    
    input.val("");
    
}

function CurrentWeather(city) {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5ec79846ae2fb1a4571dea79f4797492";
   
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var cityName = data.name;
        console.log(cityName);
        // document.querySelector("#cityNew").innerText = cityName;
        $("#city-name").text(cityName);
        var windSpeed0 = data.wind.speed;
        $("#current-wind").text("wind: "+ windSpeed0 +"mph")
        // document.getElementById('current-wind').innerText = windSpeed;
        var tempCurrent = data.main.temp;
        $("#current-temp").text("Temp: "+ convert(tempCurrent)+"*F")
        var humidityCurrent = data.main.humidity
        $("#current-humidity").text("Humidity: "+ humidityCurrent + "%")

        //Loop over the data to generate a table, each table row will have a link to the repo url
        for (var i = 0; i < data.weather.length; i++) {
       
            var iconName = data.weather[i].icon;
          console.log(iconName)
          $(".icon").attr("src","https://openweathermap.org/img/w/"+ iconName +".png");
        }
        var latitude = data.coord.lat
        var longitude = data.coord.lon
          console.log(latitude)
          console.log(longitude)
        var requestUrl1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=5ec79846ae2fb1a4571dea79f4797492";
        fetch(requestUrl1)
        .then(function(response){
          return response.json();
        })
        .then(function (data1){
          console.log(data1)
          var uviCurent = data1.current.uvi;
          console.log(uviCurent)
            roundedUvi = Math.round(uviCurent)

            if ( roundedUvi <=2){
              $("#current-uv").append( roundedUvi).attr("style", "background-color: green; padding:0px 10px 0px 10px;" )
          
            }
            else if (roundedUvi <=7){
              $("#current-uv").append( roundedUvi).attr("style", "background-color: yellow; padding:0px 10px 0px 10px;" )
            }
            else if(roundedUvi >7){
              $("#current-uv").append( roundedUvi).attr("style", "background-color: red; padding:0px 10px 0px 10px;" )
            }

            // working on the fide days forcast
            // day one of five
            var humidity1 = data1.daily[1].humidity
            console.log(humidity1)
           $("#forecast-humidity1").text("Humidity: "+ humidity1 + "%")
           var wind1 = data1.daily[1].wind_speed
           console.log(wind1)
           $("#current-wind1").text("wind: "+ wind1 +"mph")
           var temp1 = data1.daily[1].temp.day
           $("#forecast-temp1").text("Temp: "+ convert(temp1)+"*F")
           var iconImage1= data1.daily[1].weather[0].icon

           $(".icon1").attr("src","https://openweathermap.org/img/w/"+ iconImage1 +".png");

           // day 2 of five
            var humidity2 = data1.daily[2].humidity
            console.log(humidity2)
           $("#forecast-humidity2").text("Humidity: "+ humidity2 + "%")
           var wind2 = data1.daily[2].wind_speed
           console.log(wind2)
           $("#current-wind2").text("wind: "+ wind2 +"mph")
           var temp2 = data1.daily[2].temp.day
           $("#forecast-temp2").text("Temp: "+ convert(temp2)+"*F")
           var iconImage2= data1.daily[2].weather[0].icon
           $(".icon2").attr("src","https://openweathermap.org/img/w/"+ iconImage2 +".png");

          // day 3 of five
            var humidity3 = data1.daily[3].humidity
            console.log(humidity3)
           $("#forecast-humidity3").text("Humidity: "+ humidity3 + "%")
           var wind3 = data1.daily[3].wind_speed
           console.log(wind3)
           $("#current-wind3").text("wind: "+ wind3 +"mph")
           var temp3 = data1.daily[3].temp.day
           $("#forecast-temp3").text("Temp: "+ convert(temp3)+"*F")
           var iconImage3= data1.daily[3].weather[0].icon

           $(".icon3").attr("src","https://openweathermap.org/img/w/"+ iconImage3 +".png");

           // day 4 of five
            var humidity4 = data1.daily[4].humidity
            console.log(humidity4)
           $("#forecast-humidity4").text("Humidity: "+ humidity4 + "%")
           var wind4 = data1.daily[4].wind_speed
           console.log(wind4)
           $("#current-wind4").text("wind: "+ wind4 +"mph")
           var temp4 = data1.daily[4].temp.day
           $("#forecast-temp4").text("Temp: "+ convert(temp4)+"*F")
           var iconImage4= data1.daily[4].weather[0].icon

           $(".icon4").attr("src","https://openweathermap.org/img/w/"+ iconImage4 +".png");


           //  last day of forecast
           var humidity5 = data1.daily[5].humidity
           console.log(humidity5)
          $("#forecast-humidity5").text("Humidity: "+ humidity5 + "%")
          var wind5 = data1.daily[5].wind_speed
          console.log(wind5)
          $("#current-wind5").text("wind: "+ wind5 +"mph")
          var temp5 = data1.daily[5].temp.day
          $("#forecast-temp5").text("Temp: "+ convert(temp5)+"*F")
          var iconImage5= data1.daily[5].weather[0].icon

          $(".icon5").attr("src","https://openweathermap.org/img/w/"+ iconImage5 +".png");


        })
      
        //   // Setting the text of link and the href of the link
        //   link.textContent = data[i].html_url;
        //   console.log(link.textContent)
        //   link.href = data[i].html_url;
        //   console.log(link.href)w
  
          // Appending the link to the tabledata and then appending the tabledata to the tablerow
          // The tablerow then gets appended to the tablebody
        //  tableData.appendChild(link);
        //   createTableRow.appe ndChild(tableData);
        //   tableBody.appendChild(createTableRow);
        
      });
  }
  //convert the weather into fahrenheit
  function convert(K) { return Math.floor((K - 273.15) *1.8 +32);  }

  $("#clear-history").on("click",localStorage.clear())
