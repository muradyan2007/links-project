import { IncomingMessage } from 'http';
import { ServerResponse } from '../type/type';
import { handleRequest } from '../functions/handleRequest';
import { getOne } from '../services/linksController';
import { setParams } from '../functions/setFunction';

export const redirectRoutes = (req: IncomingMessage, res: ServerResponse) => {
    const { name, id } = setParams(req.url);

    if (req.url === '/l' && req.method === 'GET' && id !== undefined) {
        handleRequest({ req: req, res: res, controller: getOne, id});
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
