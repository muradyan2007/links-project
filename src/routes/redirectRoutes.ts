import { IncomingMessage, ServerResponse } from 'http';
import { redirect } from '../controllers/redirectController';
import { parse } from 'url';

export const redirectRoutes = (req: IncomingMessage, res: ServerResponse) => {

    if (req.method === 'GET') {
        redirect(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
