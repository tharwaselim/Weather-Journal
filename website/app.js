/* Global Variables */
let d = new Date();
let newDate = (d.getMonth() + 1 )+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = 'b97ce951104ac29ef65111fab11c8e65'; 
const zipCode = document.getElementById('zip');
const url = 'http://api.openweathermap.org/data/2.5/weather';

 //event listener
const clickButton = document.getElementById('generate');
clickButton.addEventListener('click', whenClick);

//Click generate button function
function whenClick() {
      if (zipCode.value !== ''&& feelings.value!== '') {
          weatherData(url,zipCode.value,apiKey)
          .then(function(data) {
            console.log(data.main.temp)
            postData('/add', {
                temp: data.main.temp,
                date: newDate,
                content: document.getElementById("feelings").value,
            })
            .then(()=>updateUI());
        }) .catch(function(error) {
            console.log(error);
            alert('The zip code is invalid in USA. Try again');
        });
      }else if(feelings.value=== '') {
        alert("Please enter your feeling");
      }
      else {
        clickButton.classList.add('invalid');
        alert("Please enter valid zip code");
      }  
  }
//get weather data using the apikey and the zip code
const weatherData = async(url) => {
    const response = await fetch(url+`?zip=${zipCode.value}&appid=${apiKey}&units=metric`);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error', error);
    }
};
//post data function
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(data)
    });
    try {
      let newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };

//update the UI function
const updateUI = async() => {
  const request = await fetch('/all');
  try {
      const data = await request.json();
      document.getElementById('date').innerHTML =' ' + data.date;
      document.getElementById('temp').innerHTML = "  "+ data.temp + '°C';
      document.getElementById('content').innerHTML = "  "+ data.content;
  } catch (error) {
      console.log('error', error);
  }
};
