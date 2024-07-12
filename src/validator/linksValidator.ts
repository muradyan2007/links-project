import { IncomingMessage, ServerResponse } from 'http';

const getRequestBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
};

export const validateCreateOne = async (req: IncomingMessage, res: ServerResponse, next: Function) => {
    try {
        const { longLink } = await getRequestBody(req);
        if (!longLink) {
            res.statusCode = 400;
            res.end('Long link is required');
            return;
        }
        next(null, { longLink });
    } catch (error) {
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
};

export const validateUpdateOne = async (req: IncomingMessage, res: ServerResponse, next: Function) => {
    try {
        const { longLink } = await getRequestBody(req);
        if (!longLink) {
            res.statusCode = 400;
            res.end('Long link is required');
            return;
        }
        next(null, { longLink });
    } catch (error) {
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
};
