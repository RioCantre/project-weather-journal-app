// Global variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '3312911a0b7ca102a3fa47c9257e12fa';


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