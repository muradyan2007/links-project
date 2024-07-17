import { IncomingMessage } from 'http';
import { ServerResponse } from '../type/type';
import { getOne, getAll, createOne, deleteOne, updateOne } from '../services/linksController';
import { validateCreateOne, validateUpdateOne } from '../validator/linksValidator';
import { handleRequest } from '../functions/handleRequest';
import { setParams } from '../functions/setFunction';

export const linksRoutes = (req: IncomingMessage, res: ServerResponse) => {
    const { name, id } = setParams(req.url);

    if (req.url === '/links' && req.method === 'GET') {
        handleRequest({ req, res, controller: getAll });
    } else if (id !== undefined && req.url === `/links/${id}` && req.method === 'GET') {
        handleRequest({ req, res, controller: getOne, id });
    } else if (req.url === '/links' && req.method === 'POST') {
        handleRequest({ req, res, validator: validateCreateOne, controller: createOne });
    } else if (id !== undefined && req.url === `/links/${id}` && req.method === 'DELETE') {
        handleRequest({ req, res, controller: deleteOne, id });
    } else if (id !== undefined && req.url === `/links/${id}` && req.method === 'PUT') {
        handleRequest({ req, res, validator: validateUpdateOne, controller: updateOne, id });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
