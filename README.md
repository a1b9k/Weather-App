Weather Information App
Overview
Welcome to the Weather Information App! This web application provides users with real-time weather updates for a specified city. It includes features such as displaying current weather conditions, country information, time zone details, and a map showcasing the user's selected location.

How to Use
Search for a City:

Enter the name of the desired city in the search bar on the webpage.
View Weather Information:

Click the "Get Weather" button to fetch and display current weather details for the specified city.
Explore Additional Information:

Along with weather details, explore additional information such as country details, time zone information, and a map indicating the selected city's location.
Features
Current Weather Details
Displays real-time information on temperature, description, and other weather parameters.
Provides an icon representing the current weather.
Country Information
Fetches additional details about the country associated with the selected city.
Presents information such as country name, population, currencies, and languages.
Time Zone Details
Retrieves time zone information for the selected city using the TimeZoneDB API.
Displays the time zone name and GMT offset.
Map Display
Utilizes Leaflet.js library to display a map with the selected city's location marker.
Allows users to visualize the geographical coordinates (latitude and longitude) of the city.
Dependencies
jQuery: Used for making asynchronous HTTP requests and DOM manipulation.
Leaflet.js: Enables the display of an interactive map.
Axios: Used for making HTTP requests in the Node.js server.
Clone the repository:
git clone https://github.com/a1b9k/Weather-App.git
Install dependencies:
npm install
Obtain API keys:
OpenWeatherMap API: Get API Key
TimeZoneDB API: Get API Key
Replace the placeholder API keys in server.js with your actual keys.
Run the application:
node server.js
Open the web browser and navigate to http://localhost:3000 to use the Weather Information App.
