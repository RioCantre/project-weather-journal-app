// Global variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=bdcb79216f4d1d2144e53892f4e49b12';

// Date format
let showDateFormat = () => {
    let day = new Date();
    let currentDate = day.getDate(); 
    
    let completeMonths = [
        "January", 
        "Febuary", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September",
        "November",
        "December"]
        
        let currentMonth = completeMonths[day.getMonth()];
        let currentYear = day.getFullYear();
        if (currentDate < 10) {
            currentDate = `0${currentDate}`;
        }
        
        let fullDateToday = `${currentMonth} ${currentDate}, ${currentYear}`;
        return  fullDateToday;
}

// Click event listener to generate the input values
document.getElementById('generate').addEventListener('click', generateEntry);

// function called by event listener
function generateEntry(event) {
    event.preventDefault();
    let city = document.getElementById('city').value;
    let emotion = document.getElementById('emotion').value;
    let feelings = document.getElementById('feelings').value;

    getWeather(baseURL, city, apiKey)
        .then((data) => {
            postData('/addEntry', {
                data: data,
                mood: emotion,
                entry: feelings

            });
            defaultDisplay();
            updateUI();
                
        });
}

// Function to GET Web API Data
const getWeather = async (baseURL, city, apiKey) => {
    const res = await fetch(baseURL+city+apiKey);
    const data = await res.json();
    try {
        return {
            city: data.name,
            dt: showDateFormat(),
            icon: data.weather[0].icon,
            temp: Math.floor(data.main.temp - 273.15),
            description: data.weather[0].description,
            mood: document.getElementById('emotion').value,
            entry: document.getElementById('feelings').value
        };
    } catch (error) {
        console.log('error', error);
    }
}

// Function to POST data
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const getData = await res.json();
        return getData;
    } catch (error) {
        console.log('error', error);
    }

}

// Function to display default setting
const defaultDisplay = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();

        document.getElementById('location').textContent = `${allData.data.city}`;
        document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${allData.data.icon}@2x.png">`;
        document.getElementById('date').textContent = `${allData.data.dt}`;
        document.getElementById('temp').textContent = `${allData.data.temp}℃`;
        document.getElementById('description').textContent = `It's ${allData.data.description}!`;
        document.getElementById('log-entry').textContent = `Today was such a great day!`;

    }catch (error) {
        console.log('error', error);
    }
}

defaultDisplay();

// Function to update the UI with the all requested data of the project
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();


        document.getElementById('location').textContent = `${allData.data.city}`;
        document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${allData.data.icon}@2x.png">`;
        document.getElementById('date').textContent = `${allData.data.dt}`;
        document.getElementById('temp').textContent = `${allData.data.temp}℃`;
        document.getElementById('description').textContent = `It's ${allData.data.description}!`;
        document.getElementById('current-emotion').textContent = `Your ${allData.data.mood} today!`;
        document.getElementById('log-entry').textContent = `${allData.data.entry}`;

    } catch (error) {
        console.log('error', error);
    }

}

