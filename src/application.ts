import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { applicationRouter } from './routes/application.router.js';


export class Application {
    private server: Express;

    constructor() {
        this.server = express();
        this.server.set('host', process.env.EXPRESS_SERVER_HOST || 'localhost');
        this.server.set('port', process.env.EXPRESS_SERVER_PORT || 3000);
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(cors());
        this.server.use(applicationRouter);
    }

    public startServer(): void {
        const host: string = this.server.get('host');
        const port: number = this.server.get('port');
        this.server.listen(port, host, () => {
            console.log(`Express server running at http://${host}:${port}`)
        });
    }
}
