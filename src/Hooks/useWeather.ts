import type { Coordinates } from "@/Api/Core/Weather.types";
import { serviceManager } from "@/Api/ServiceManager";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
} as const;

export function useWeatherQuery(coords: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coords ?? {lat: 0, lon: 0}),
        queryFn: () => coords ? serviceManager.weather.getCurrentWeather(coords) : null,
        enabled: !!coords
    });
}