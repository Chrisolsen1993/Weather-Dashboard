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
    var city = input.val();
    CurrentWeather(city);
    Forecast(city);
    input.val("");
}});
//when you click
function citySearch(event){
    event.preventDefault();
    var city = input.val();
    var storage1=localStorage.getItem("cityname")
    localStorage.setItem("cityname", city);
    $(".list-group").append(storage1)
    console.log(storage1)
    CurrentWeather(city);
    forecast(city);
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
        var windSpeed = data.wind.speed;
        $("#current-wind").text("wind: "+ windSpeed +"mph")
        // document.getElementById('current-wind').innerText = windSpeed;
        var tempCurrent = data.main.temp;
        $("#current-temp").text("Temp: "+ k2f(tempCurrent)+"*F")
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

            if (0<= roundedUvi <=2){
              $("#current-uv").append( roundedUvi).attr("style", "background-color: green; " )
          
            }
            else if (3<= roundedUvi <=7){
              $("#current-uv").append( roundedUvi).attr("style", "background-color: yellow; height: 10px;" )
            }
            else if( roundedUvi >7){
              $("#current-uv").append( roundedUvi).attr("style", "background-color: red; height: 10px;" )
            }
        })
      
        //   // Setting the text of link and the href of the link
        //   link.textContent = data[i].html_url;
        //   console.log(link.textContent)
        //   link.href = data[i].html_url;
        //   console.log(link.href)
  
          // Appending the link to the tabledata and then appending the tabledata to the tablerow
          // The tablerow then gets appended to the tablebody
        //  tableData.appendChild(link);
        //   createTableRow.appe ndChild(tableData);
        //   tableBody.appendChild(createTableRow);
        
      });
  }
  //convert the weather into fahrenheit
  function k2f(K) { return Math.floor((K - 273.15) *1.8 +32);  }

  //fetch for the forecast city
  
function forecast(city){

var requestUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=5ec79846ae2fb1a4571dea79f4797492"

fetch(requestUrl1)
 .then(function (response) {
  return response.json();
})
.then(function(data){
  console.log(data)
})


  }