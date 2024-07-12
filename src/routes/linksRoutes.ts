import { IncomingMessage, ServerResponse } from 'http';
import { getOne, getAll, createOne, deleteOne, updateOne } from '../controllers/linksController';
import { validateCreateOne, validateUpdateOne } from '../validator/linksValidator';

const handleRequest = (req: IncomingMessage, res: ServerResponse, validator: Function, controller: Function, id?: number) => {
    validator(req, res, (err: Error | null, body: any) => {
        if (err) {
            res.statusCode = 400;
            res.end(err.message);
            return;
        }
        controller(req, res, id, body);
    });
};

export const routes = (req: IncomingMessage, res: ServerResponse) => {
    const urlParts = req.url?.split('/') || [];
    const id = urlParts.length > 2 ? parseInt(urlParts[2], 10) : null;

    if (req.url === '/links' && req.method === 'GET') {
        getAll(req, res);
    } else if (id !== null && req.url === `/links/${id}` && req.method === 'GET') {
        getOne(req, res, id);
    } else if (req.url === '/links' && req.method === 'POST') {
        handleRequest(req, res, validateCreateOne, createOne);
    } else if (id !== null && req.url === `/links/${id}` && req.method === 'DELETE') {
        deleteOne(req, res, id);
    } else if (id !== null && req.url === `/links/${id}` && req.method === 'PUT') {
        handleRequest(req, res, validateUpdateOne, updateOne, id);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
};
