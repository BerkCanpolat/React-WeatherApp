import { API_CONFIG } from "../API_CONFIG";
import { BaseService } from "../Core/BaseService";
import type { Coordinates, WeatherData, ForecastData } from "../Core/Weather.types";
import type { IWeatherService } from "../Interfaces/IWeatherService";

export class WeatherService extends BaseService implements IWeatherService {
    constructor() {
        super(API_CONFIG.WEATHER_BASE);
    }


    getCurrentWeather(coords: Coordinates): Promise<WeatherData> {
        return this.http.get("weather", {
            lat: coords.lat,
            lon: coords.lon,
            units: API_CONFIG.DEFAULT_PARAMS.units,
            appid: API_CONFIG.KEY
        });
    }


    getForecast(coords: Coordinates): Promise<ForecastData> {
        return this.http.get("forecast", {
            lat: coords.lat,
            lon: coords.lon,
            units: API_CONFIG.DEFAULT_PARAMS.units,
            appid: API_CONFIG.KEY
        });
    }
}