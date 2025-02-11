import axios from "axios";
import { useState } from "react";

export const Weather = () => {
    const [city, setCity] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getWeatherData = async (e) => {
        e.preventDefault();

        if (!city.trim()) {
            setError("Enter a valid city name");
            return;
        }

        try {
            const result = await axios.post(`http://localhost:3000/weather`,{city});
            setData(result.data);
            setError(null);
        } catch (error) {
            console.log(error);
            setData(null);
            setError("City not found or API error. Try again.");
        }
    };

    return (
        <>
            <div>
                <h1>WEATHER APP</h1>
                <form onSubmit={getWeatherData}>
                    <input
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                {/* Display error message if any */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Display weather data if available */}
                {data && (
                    <div>
                        <h3>Weather in {data?.name}🖼️</h3>
                        <p>Temperature: {data?.main?.temp}°C 🌡️</p>
                        <p>Humidity: {data?.main?.humidity}% 🌥️</p>
                        <p>Description: {data?.weather?.[0]?.description} ☔️</p>
                    </div>
                )}
            </div>
        </>
    );
};



