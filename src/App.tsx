import { useEffect, useState } from 'react';
import './App.css';
import CityInput from './CityInput.tsx';
import CityList from './CityList';

const getSavedCities = () => { // we can move this to utils
  try {
    const list = localStorage.getItem('cities')
    return list ? JSON.parse(list) || [] : []
  }
  catch (error) {
    console.error('Error getting saved cities', error);
    return [];
  }

}
const saveCities = (cities: string[]) => {
  try {
    localStorage.setItem('cities', JSON.stringify(cities));
  }
  catch (error) {
    console.error('Error saving cities', error);
  }
}

function App() {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    // localStorage.clear();
    const savedCities = getSavedCities();
    setCities(savedCities);
  }, []);

  const addCity = (city: string) => {
    if (!cities.includes(city)) {
      const newCities = [...cities, city];
      setCities(newCities);
      saveCities(newCities);
    }
  };

  const removeCity = (cityToRemove: string) => {
    const newCities = cities.filter(city => city !== cityToRemove);
    setCities(newCities);
    saveCities(newCities);
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <CityInput addCity={addCity} />
      <div className="citylist">
        <CityList cities={cities} removeCity={removeCity} />
      </div>

    </div>
  );
}

export default App;