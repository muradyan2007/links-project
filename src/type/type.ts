import { ServerResponse as HttpServerResponse } from 'http';

export interface ServerResponse extends HttpServerResponse {
    json(data: any): void
}
