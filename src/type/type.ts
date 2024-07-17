import { IncomingMessage, ServerResponse as HttpServerResponse } from 'http';

export class ServerRequest extends IncomingMessage {
    body: any;
    params: any;
    query: any;
}

// export interface ServerResponse extends HttpServerResponse {
//     json(data: any): void;
// }
export class ServerResponse<Request extends IncomingMessage = IncomingMessage> extends HttpServerResponse<Request> {
    constructor(req: Request) {
        super(req);
    }

    json(data: any): void {
    }
}