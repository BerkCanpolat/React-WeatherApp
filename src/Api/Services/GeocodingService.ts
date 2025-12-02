import { API_CONFIG } from "../API_CONFIG";
import { BaseService } from "../Core/BaseService";
import type { Coordinates, GeocodingResponse } from "../Core/Weather.types";
import type { IGecocodingService } from "../Interfaces/IGeocodingService";

export class GeocodingService extends BaseService implements IGecocodingService{
    constructor() {
        super(API_CONFIG.GEO_BASE);
    }

    reverse(coords: Coordinates): Promise<GeocodingResponse[]> {
        return this.http.get("/reverse", {
            lat: coords.lat,
            lon: coords.lon,
            limit: 1,
            appid: API_CONFIG.KEY
        });
    }

    search(query: string): Promise<GeocodingResponse[]> {
        return this.http.get("/direct", {
            q: query,
            limit: 5,
            appid: API_CONFIG.KEY
        });
    }


}