# Weather Dashboard

A simple Weather Dashboard application built with React that allows users to view the current weather for multiple cities. The application integrates with the Weatherstack API to fetch weather data.

## Features

- Display the current weather for user-specified cities, including temperature, humidity, and wind speed.
- Add and remove cities from the dashboard.
- Retry mechanism with exponential backoff for fetching API data.
- User's city selection is persisted across sessions using local storage.

## To Do
We can temporarily store API responses for each city for some time (30 mins) and minimize API calls on every rerender. 

## Technologies Used

- React and Typescript
- Axios for API requests
- OpenWeatherMap API for weather data

## Setup Instructions

To run the Weather Dashboard application on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/ParagDineshGupta/weather-dashboard-app.git
cd weather-dashboard-app
```

### Install Dependencies

install the required dependencies:

```
npm install
```

### Set Up Environment Variables

Create a file named .env in the root of the project.
Add your WeatherStack API key to the .env file:

```
VITE_API_KEY= <Key>
```

### Start the Development Server

```
npm run dev
```


https://weather-dashboard-4w0and73o-paragdineshguptas-projects.vercel.app/
![image](https://github.com/user-attachments/assets/8d93bf21-0602-425a-9af8-0defa48d4f56)
![image](https://github.com/user-attachments/assets/9ad77718-9d5c-48fc-9fa0-8cd559d3f08d)
