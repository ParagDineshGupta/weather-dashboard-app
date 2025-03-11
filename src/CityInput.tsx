import { FormEvent, useState } from 'react';

function CityInput({ addCity }: any) {
    const [city, setCity] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (city) {
            addCity(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name here..."
                required
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default CityInput;