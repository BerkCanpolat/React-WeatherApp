import type { GeocodingResponse, WeatherData } from "@/Api/Core/Weather.types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  currentWeather: WeatherData;
  reverseName?: GeocodingResponse;
}

const CurrentWeather = ({ currentWeather, reverseName }: CurrentWeatherProps) => {
  const {
    weather: [weatherCondition],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = currentWeather;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="p-5 md:p-0">
      <CardContent className="md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">

          <div>
            
            <div className="flex items-end gap-1 mb-1.5">
              <h1 className="text-3xl font-semibold">{reverseName?.name}</h1>
              {reverseName?.state && (
                  <p className="text-sm text-muted-foreground font-bold">, {reverseName.state}</p>
              )}
            </div>

            <p className="text-muted-foreground">{reverseName?.country}</p>

            <div className="flex items-center gap-3 mt-3 mb-3.5">
                <h1 className="text-6xl font-bold">{formatTemp(temp)}</h1>
                <div>
                    <p className="mb-1 text-muted-foreground text-sm">Feels Like {formatTemp(feels_like)}</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                    <p className="flex items-center gap-1 text-blue-500"><ArrowDown className="h-3 w-3"/> {formatTemp(temp_min)}</p>
                    <p className="flex items-center gap-1 text-red-500"><ArrowUp className="h-3 w-3"/> {formatTemp(temp_max)}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-7.5">
            <div className="flex items-center gap-3">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm">Humidity</p>
                    <p className="text-muted-foreground text-sm">{humidity}%</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Wind className="h-4 w-4 text-blue-500"/>
                <div>
                    <p className="font-bold text-sm">Wind</p>
                    <p className="text-muted-foreground text-sm">{speed} m/s</p>
                </div>
            </div>

            </div>

          </div>

          <div className="flex flex-col items-center justify-center">
            <img src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@4x.png`}  alt={weatherCondition.description} className="w-full h-40 object-contain" />
            <p className="text-center font-bold capitalize">{weatherCondition.description}</p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
