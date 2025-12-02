import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/Hooks/useGeolocation"
import { useWeatherQuery } from "@/Hooks/useWeather";
import { AlertTriangle, MapPin } from "lucide-react";

const WeatherHome = () => {

    const { 
        coordinates,
        error: locationError,
        getLocation,
        isLoading: locationLoading
     } = useGeolocation();

     
     const weatherQuery = useWeatherQuery(coordinates);
     
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

  return (
    <div>
        <h1>Deneme</h1>
    </div>
  )
}

export default WeatherHome