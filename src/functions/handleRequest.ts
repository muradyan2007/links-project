import {IncomingMessage} from 'http';
import { ServerResponse } from '../type/type';

interface HandleRequestParams {
    req: IncomingMessage;
    res: ServerResponse;
    validator: Function;
    controller: Function;
    id?: number;
    body?: any;
}


export const handleRequest = ({
    req,
    res,
    validator,
    controller,
    id
}: {
    req: IncomingMessage,
    res:ServerResponse,
    validator?:Function,
    controller: Function,
    id?:number
}) => {
    if (validator) {
        validator(req, res, (err: Error | null, body: any) => {
            if (err) {
                res.statusCode = 400;
                res.end(err.message);
                return;
            }
        });
    }
    controller(req, res, id);
};

