import CityWeather from './CityWeather';

function CityList({ cities, removeCity }: { cities: string[], removeCity: (city: string) => void }) {
    // bulk_queries_not_supported_on_plan
    return cities.map((city, index) => (

        <div className='city' key={index}>
            <CityWeather key={index} city={city} removeCity={removeCity} />
        </div>

    ))
}



export default CityList;