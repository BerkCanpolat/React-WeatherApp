import type { Coordinates } from "@/Api/Core/Weather.types";
import { serviceManager } from "@/Api/ServiceManager";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    reverse: (coords: Coordinates) => ["reverse", coords] as const,
} as const;

export function useWeatherQuery(coords: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coords ?? {lat: 0, lon: 0}),
        queryFn: () => coords ? serviceManager.weather.getCurrentWeather(coords) : null,
        enabled: !!coords
    });
}

export function useForeacstQuery(coords: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coords ?? {lat: 0, lon: 0}),
        queryFn: () => coords ? serviceManager.weather.getForecast(coords) : null,
        enabled: !!coords
    });
}

export function useReverseQuery(coords: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.reverse(coords ?? {lat: 0, lon: 0}),
        queryFn: () => coords ? serviceManager.geocoding.reverse(coords) : null,
        enabled: !!coords
    });
}