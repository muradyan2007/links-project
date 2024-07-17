import { IncomingMessage} from 'http';
import { ServerResponse } from '../type/type';
import { Link } from '../models/linksModel';
import { parse } from 'url';
import { setParams } from '../functions/setFunction';

export const redirect = (req: IncomingMessage, res: ServerResponse): void => {

    const {name, id} = setParams(req.url);

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
