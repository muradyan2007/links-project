import http, { IncomingMessage } from 'http';
import { linksRoutes } from '../routes/linksRoutes';
import { redirectRoutes } from '../routes/redirectRoutes';
import { ServerRequest, ServerResponse } from '../type/type';

export const setRoutes = (req: ServerRequest, res:ServerResponse) => {
    try {
        linksRoutes(req, res);
        redirectRoutes(req, res);
    } catch (error) {
        res.statusCode = 500;
        res.end('Server Error');
        console.error(error);
    }   
}