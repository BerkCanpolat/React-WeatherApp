import type { Coordinates, ForecastData, WeatherData } from "../Core/Weather.types";

export interface IWeatherService {
    getCurrentWeather(coords: Coordinates): Promise<WeatherData>;
    getForecast(coords: Coordinates): Promise<ForecastData>;
}