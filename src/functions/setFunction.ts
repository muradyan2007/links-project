export const setFunctions = (req:any, res:any) => {
    res.json = (data: any) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
}

