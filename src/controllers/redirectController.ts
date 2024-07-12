import { IncomingMessage, ServerResponse } from 'http';
import { Link } from '../models/linksModel';
import { parse } from 'url';

export const redirect = (req: IncomingMessage, res: ServerResponse): void => {
    const parsedUrl = parse(req.url || '', true);
    const id = parsedUrl.pathname?.split('/')[2];

    if (!id) {
        res.statusCode = 402;
        res.end('ID is required');
        return;
    }

    const link = Link.getOne(Number(id));

    if (link) {
        res.statusCode = 302;
        res.setHeader('Location', link.longLink);
        res.end();
    } else {
        res.statusCode = 404;
        res.end('Link not found');
    }
};
