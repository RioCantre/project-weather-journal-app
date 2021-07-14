// Global variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=bdcb79216f4d1d2144e53892f4e49b12';


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
    
document.getElementById('generate').addEventListener('click', generateEntry);

function generateEntry(event) {
    event.preventDefault();
    let city = document.getElementById('city').value;
    let emotion = document.getElementById('emotion').value;
    let feelings = document.getElementById('feelings').value;

    getWeather(baseURL, city, apiKey)
        .then((data) => {
            console.log(data);
            postData('/addEntry', {
                data: data,
                mood: emotion,
                entry: feelings

            });
            defaultDisplay();
            updateUI();
                
        });
}

const getWeather = async (baseURL, city, apiKey) => {
    const res = await fetch(baseURL+city+apiKey);
    const data = await res.json();
    try {
        console.log(data)
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

const postData = async(url = '', data = {}) => {
    console.log(data);
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

const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        console.log(allData);

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