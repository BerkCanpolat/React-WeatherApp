import CurrentWeather from "@/components/CurrentWeather";
import ForecastWeather from "@/components/ForecastWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import { useGeolocation } from "@/Hooks/useGeolocation"
import { useForeacstQuery, useReverseQuery, useWeatherQuery } from "@/Hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const WeatherHome = () => {

    const { 
        coordinates,
        error: locationError,
        getLocation,
        isLoading: locationLoading
     } = useGeolocation();

     
     const weatherQuery = useWeatherQuery(coordinates);
     const forecastQuery = useForeacstQuery(coordinates);
     const reverseQuery = useReverseQuery(coordinates);
     
     console.log(weatherQuery.data);
     
     const handleRefresh = () => {
        getLocation();
     }


     if(locationLoading) {
    return <LoadingSkeleton/>
  }

  if(locationError) {
    return (
    <Alert variant={"destructive"}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="h-4 w-4">Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

  if(!coordinates) {
    return (
    <Alert variant={"destructive"}>
      <AlertTitle className="h-4 w-4">Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

  const reverseName = reverseQuery.data?.[0];

  if(weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant={"destructive"}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="h-4 w-4">Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data. Please try again.</p>
        <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
          <RefreshCw className="mr-2 h-4 w-4"/>
          Retry
        </Button>
      </AlertDescription>
    </Alert>
    );
  }

  if(!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <section className="flex flex-col md:flex-row items-start gap-15">

        {/* left */}
        <div className="w-full px-5 md:flex-1 md:px-0">
            <CurrentWeather currentWeather={weatherQuery.data} reverseName={reverseName}/>
            <WeatherDetails weatherDetails={weatherQuery.data}/>
            <HourlyTemperature hourlyForecast={forecastQuery.data}/>
        </div>

        {/* right */}
        <div className="w-full md:flex-1 px-5 md:px-0">
            <ForecastWeather forecastWeather={forecastQuery.data} currentWeather={weatherQuery.data} />
        </div>
    </section>
  )
}

export default WeatherHome