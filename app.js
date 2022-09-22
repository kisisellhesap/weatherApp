let weatherContainer = document.querySelector(".weather-container");
let countryInput = document.querySelector(".countryInput");

let locationBtn = document.querySelector(".location");


countryInput.addEventListener("input", function () {
  if (countryInput.value == "") {
    weatherContainer.textContent = "";
  }

  setTimeout(() => {
    getUrl(countryInput.value);
  }, 500);
});

async function getUrl(countryName) {

  try {
    let url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=c915d3409b8050bc24e69e955339ecb1&units=metric`
    );

    if (!url.ok) {
      console.log("error");
      throw new Error("there is no such a city");
    }
    else {
      console.log(url);
      console.log(url.status);

      const data = await url.json();
      console.log(data);
      displayCountry(data);
    }



  } catch (error) {

    if (countryInput.value.length !== 0) {
      weatherContainer.innerHTML = `<h1>${error}</h1>`;
    }

  }





  // resim,text,hissedilen hava, normal hava,update, humdty
}
//  <h3><span> Beklenen </span>  <p>${data.weather[0].description} </p></h3>
function displayCountry(data) {
  weatherContainer.textContent = "";
  let feels = `${data.main.feels_like}`;
  let temp = `${data.main.temp}`;


  let html = `
  <div class="w-html">
  <h4> <i class="fa-solid fa-location-dot"></i> <span> ${data.sys.country}</span> </h4>
                      <h2>${data.name}</h2>
                     <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" class="weather-icon">
                     <h3>${data.weather[0].main}</h3>
                 
              <div class="d-property">
                    <div> <span> Felt temperature   : </span><p>${feels.slice(0, 2)} °C </p>  </div>
                    <div><span>	Temperature : </span> <p>${temp.slice(0, 2)} °C</p>  </div>
                    <div><span> Humidity  : </span>  <p> ${data.main.humidity} %</p>  </div>
              </div>
                     </div>
    `;

  weatherContainer.insertAdjacentHTML("beforeend", html);
}



locationBtn.addEventListener("click", function () {
  if (navigator.geolocation) {
    countryInput.value = "";
    navigator.geolocation.getCurrentPosition(getPosition, err);
  }


});



async function getPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;


  const key = "a4bc4019b9ae4d0bb22a4d38fe0bf573";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${key}`;

  const response = await fetch(url);
  const data = await response.json();
  const country = data.results[0].components.province;

  countryInput.value = country;
  getUrl(country);

}


function err(err) {
  console.log(err);
}