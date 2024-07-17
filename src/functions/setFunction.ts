import {IncomingMessage} from 'http'

export const setFunctions = (req:any, res:any) => {
    res.json = (data: any) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
}



export const setQuery = (url: string) => {
    const obj: { [key: string]: string } = {};
    const queryString = url.split('?')[1];

    if (queryString) {
        queryString.split('&').forEach(keyValue => {
            const [key, value] = keyValue.split('=');
            obj[key] = value;
        });
    }

    return obj;
};


export const setParams = (url: string) => {
    const params: { name?: string; id?: number } = {};
    const parts = url.startsWith("/") ? url.slice(1).split("/") : url.split("/");

    if (parts.length >= 2) {
        params.name = parts[0];
        params.id = parseInt(parts[1], 10); // Convert the id to a number

    }

    return params;
};

export const getBody = (req: IncomingMessage): Promise<any> => {
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
