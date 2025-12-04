import type { ForecastData, WeatherData } from "@/Api/Core/Weather.types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from 'date-fns';
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface ForecastWeatherProps {
    forecastWeather: ForecastData;
    currentWeather: WeatherData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const ForecastWeather = ({ forecastWeather, currentWeather }: ForecastWeatherProps) => {

    const {
    weather: [weatherCondition],
  } = currentWeather;


    const dailyForcasts = forecastWeather.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForcasts).slice(0,6);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;


  return (
    <section>
      <Card className="pb-10">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="w-full md:w-[720px]">
            {nextDays.map((day,i) => {
                return <div key={i} className="w-full min-w-full border rounded-[10px] mb-5 p-4 flex flex-col items-center md:flex-row md:items-center md:justify-between hover:bg-gray-200 dark:hover:bg-white/5 md:h-25">
                        <div className="max-w-[100px] md:max-w-[50px] max-sm:mb-2 md:mr-1.5">
                        <img src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@4x.png`}  alt={weatherCondition.description} className="w-full object-contain" />
                        </div>

                    <div className="max-sm:mb-3.5 flex-1">
                    <p className="text-sm md:font-medium">{format(new Date(day.date *  1000), "EEE, MMM d")}</p>
                    <p className="text-muted-foreground text-xs md:text-sm mt-0.5">{day.weather.description}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2 font-medium flex-1 max-sm:mb-3.5">
                    <p className="flex items-center gap-1 text-blue-500 max-sm:text-sm"><ArrowDown className="h-3 w-3"/> {formatTemp(day.temp_min)}</p>
                    <p className="flex items-center gap-1 text-red-500 max-sm:text-sm"><ArrowUp className="h-3 w-3"/> {formatTemp(day.temp_max)}</p>
                    </div>

                    <div className="flex items-center justify-center gap-7.5 flex-1">
            <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="flex flex-col gap-1">
                    <p className="text-xs md:text-sm">{day.humidity}%</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500"/>
                <div>
                    <p className="text-xs md:text-sm">{day.wind} m/s</p>
                </div>
            </div>

            </div>
                </div>
            })}
        </CardContent>
      </Card>
    </section>
  );
};

export default ForecastWeather;
