export const API_CONFIG = {
    WEATHER_BASE: "https://api.openweathermap.org/data/2.5/",
    GEO_BASE: "http://api.openweathermap.org/geo/1.0",
    KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
    DEFAULT_PARAMS: {
        units: "metric",
    },
} as const;