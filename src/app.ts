import http from 'http';
import { routes } from './routes/linksRoutes';
import { redirectRoutes } from './routes/redirectRoutes';
import { setFunctions } from './functions/setFunction';

const port = process.env.API_URL;


const server = http.createServer((req, res) => {
    setFunctions(req, res);

    routes(req, res);


    redirectRoutes(req, res);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    
});

