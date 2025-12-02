import type { Coordinates, GeocodingResponse } from "../Core/Weather.types";

export interface IGecocodingService {
    reverse(coords: Coordinates): Promise<GeocodingResponse[]>;
    search(query: string): Promise<GeocodingResponse[]>;
}