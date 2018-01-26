import { createServer, Server } from 'http';
import * as express from 'express';

export class App {
    private app: express.Application;
    private server: Server;

    constructor(private port: number | string) {
        this.app = express();
        this.server = createServer(this.app);
    }

    listen(): void {
        this.server.listen(this.port, () => console.log('App is listening on port: ' + this.port));
    }
}
