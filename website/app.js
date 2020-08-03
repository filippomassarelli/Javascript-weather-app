// ------------
// Event Listeners
// both hitting enter after typing in the city, and clicking the button shpould trigger the same action

document.getElementById("generate").addEventListener("click", handleClick);

document.getElementById("city").addEventListener("keyup", function (e) {
  // Number 13 is the "Enter" key on the keyboard
  if (e.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("generate").click();
  }
});

document.getElementById("feelings").addEventListener("keyup", function (e) {
  // Number 13 is the "Enter" key on the keyboard
  if (e.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("generate").click();
  }
});

// ------------
// Handle Event
// using chained promises we respond to the user search by fetching data from the openweather api, storing it to server, and using it to update the user interface

// Create a new date instance dynamically with JS

function handleClick(e) {
  const userCity =
    document.getElementById("city").value === ""
      ? "London"
      : document.getElementById("city").value;

  getWeather(baseUrl, units, apiKey, userCity)
    // .then((data) => addFeeling(data))
    .then((data) => {
      let d = new Date();
      let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

      postData("/projectData", {
        ...data,
        feeling: document.getElementById("feelings").value,
        date: newDate,
      });
    })
    .then(() => updateUI());
}

// Define helper functions

//1. Fetch weather data from API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const units = "&units=metric";
// const apiKey = "&appid=" + process.env.API_KEY;
const apiKey = "&appid=" + "f68acfdd8f3c0ea46c672f4d7e1d5d1a";

const getWeather = async (baseUrl, units, key, city) => {
  const response = await fetch(baseUrl + city + key + units);

  try {
    const data = await response.json();
    console.log("getWeather successful", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//2. Post request to /addData route

const postData = async (url = "", data = {}) => {
  console.log(data);

  const response = await fetch(url, {
    method: "Post",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log("postDataWorked", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//3. get the projectData

const getRecent = async (url = "") => {
  const request = await fetch(url);

  try {
    const allData = await request.json();
    console.log("getRecent successful:", allData);
  } catch (err) {
    console.log("error", err);
  }
};

//4. Update user interface with new data

let dateField = document.getElementById("date");
let tempField = document.getElementById("temp");
let contentField = document.getElementById("content");
let titleField = document.getElementById("title");

let iconField = document.getElementById("icon");
let icon = document.createElement("img");
iconField.appendChild(icon);

const updateUI = async () => {
  const request = await fetch("/projectData");

  try {
    const allData = await request.json();
    console.log("from updateUI:", allData);

    dateField.innerHTML = allData.date;
    tempField.innerHTML = allData.temp + " °C";
    contentField.innerHTML =
      "Expecting " + allData.description + " and feeling " + allData.feeling;
    titleField.innerHTML = allData.city;
    icon.src = `http://openweathermap.org/img/wn/${allData.icon}@2x.png`;

    iconField.appendChild(img);
  } catch (error) {
    console.log("error", error);
  }
};

// window.onload = () => {
//   document.getElementById("generate").click();
// };
