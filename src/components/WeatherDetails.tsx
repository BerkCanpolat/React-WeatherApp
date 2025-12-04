import type { WeatherData } from "@/Api/Core/Weather.types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface WeatherDetailsProps {
  weatherDetails: WeatherData;
};

const WeatherDetails = ({ weatherDetails }: WeatherDetailsProps) => {
  const { wind, main, sys } = weatherDetails;

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg})°`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <section className="grid grid-cols-2 mt-5 gap-4">
      {details.map((det, i) => {
        return (
        <Card key={i} className="hover:bg-gray-200 dark:hover:bg-white/10">
          <CardContent>
            <div className="flex items-center gap-3.5">
                <det.icon className={`w-8 h-8 ${det.color}`} />
                <div>
                    <p className="font-medium">{det.title}</p>
                    <p className="text-muted-foreground text-sm">{det.value}</p>
                </div>
            </div>
          </CardContent>
        </Card>
        )
      })}
    </section>
  );
};

export default WeatherDetails;
