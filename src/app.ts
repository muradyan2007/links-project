import http from 'http';
import { ServerRequest, ServerResponse } from './type/type';
import { getBody, setFunctions } from './functions/setFunction'; 
import { setRoutes } from './routes/setRoutes';

const port = 3000;
const server = http.createServer<typeof ServerRequest, typeof ServerResponse>(async (req, res) => {
    setFunctions(req, res);

    req.body = await getBody(req);

    setRoutes(req,res);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
