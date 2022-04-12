/* Global Variables */
const baseUrl ='https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey ='e125135df7b47733c22a3a825894ad2a'
const feelings = document.getElementById('feelings');
const zip = document.getElementById('zip');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// event listener
const generate = document.getElementById('generate');
generate.addEventListener('click' , performAction);

//callback function by event listner
function performAction(e) {
    e.preventDefault();
    getWeather(baseUrl,zip,apiKey)
    .then(function(data){ 
        postData('/add',{temp: data.main.temp , date: newDate , feelings: feelings.value})
    })
    .then(()=>
    updateUI()
    ).catch(function(error){
        console.log(error);
        alert('The zip is invalid, Enter US zip only');
    });
}

// get weather function
const getWeather = async (baseUrl,zip,apiKey)=>{
    const res = await fetch(`${baseUrl}${zip.value}&appid=${apiKey}`)
    try {
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

// post data function

const postData = async ( url = '/add', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  })
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

//  update UI dynamically function
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      
      document.getElementById('date').innerHTML = "DATE: " + allData.date;
      document.getElementById('temp').innerHTML = "TEMP: " + allData.temp;
      document.getElementById('content').innerHTML = "NOTE: "+ allData.feelings;
  
  }catch(error){
      console.log("error", error);
    }
  }