import type { QueryParams } from "./Weather.types";

export class HTTPClient {
    private baseURL: string;
    
    constructor( baseURL: string) {
        this.baseURL = baseURL;
    };

    private buildUrl(endpoint: string, params?: QueryParams): string {
        const url = new URL(endpoint, this.baseURL);

        if(params) {
            Object.entries(params).forEach(([key,value]) => {
                if(value !== undefined) {
                    url.searchParams.append(key, value.toString());
                }
            });
        }

        return url.toString();
    }

    async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
        const fullURL = this.buildUrl(endpoint, params);

        const response = await fetch(fullURL);

        if(!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    }
}