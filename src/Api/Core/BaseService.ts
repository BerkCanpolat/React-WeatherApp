import { HTTPClient } from "./HttpClient";

export abstract class BaseService {
    protected http: HTTPClient;

    constructor(baseURL: string) {
        this.http = new HTTPClient(baseURL);
    }
}