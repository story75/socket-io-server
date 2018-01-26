import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

export class App {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;

    constructor(private port: number | string) {
        this.app = express();
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    listen(): void {
        this.server.listen(
            this.port,
            () => console.log('App server is listening on port: ' + this.port)
        );

        this.io.on('connect', (socket: any) => {
            console.log('Client connected!');

            socket.on('message', (msg: any) => {
                console.log('Received message: ' + JSON.stringify(msg, null, 4));
                this.io.emit('message', msg);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected!');
            });
        });
    }
}
