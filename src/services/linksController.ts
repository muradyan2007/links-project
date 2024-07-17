import { ServerRequest, ServerResponse } from '../type/type';
import { Link } from '../models/linksModel';
import { getBody } from '../functions/setFunction';



export const getOne = (req: ServerRequest, res: ServerResponse, id: number): void => {
    const link = id ? Link.getOne(Number(id)) : null;
    if (link) {
        res.json(link)
    } else {
        res.statusCode = 404;
        res.end('Link not found');
    }
};

export const getAll = (req: ServerRequest, res: ServerResponse) => {
    const links = Link.getAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(links));
};

export const createOne = async (req: ServerRequest, res: ServerResponse) => {
    try {
        const { longLink } = req.body;
        if (!longLink) {
            res.statusCode = 400;
            res.end('Long link is required');
            return;
        }
        const createdLink = Link.createOne(longLink);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(createdLink));
    } catch (error) {
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
};

export const deleteOne = (req: ServerRequest, res: ServerResponse, id: number): void => {
    const deleted = id ? Link.deleteOne(Number(id)) : false;
    if (deleted) {
        res.json(deleted)
    } else {
        res.statusCode = 404;
        res.end('Link not found');
    }
};

export const updateOne = async (req: ServerRequest, res: ServerResponse, id: number) => {
    try {
        const { longLink } = await getBody(req);
        if (!longLink) {
            res.statusCode = 400;
            res.end('Long link is required');
            return;
        }
        const updated = id ? Link.updateOne(Number(id), longLink) : null;
        if (updated) {
            res.json(updated)
        } else {
            res.statusCode = 404;
            res.end('Link not found');
        }
    } catch (error) {
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
};