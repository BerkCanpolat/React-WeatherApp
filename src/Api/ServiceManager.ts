import { GeocodingService } from "./Services/GeocodingService";
import { WeatherService } from "./Services/WeatherService";

export const serviceManager = {
    weather: new WeatherService(),
    geocoding: new GeocodingService(),
} as const;