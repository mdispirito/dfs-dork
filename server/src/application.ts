import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { ServerOptions, createServer } from 'https';

import { applicationRouter } from './routes/application.router.js';
import { authRouter } from './routes/auth.router.js';
import { getServerOptions } from './util/serverOptions.js';


export class Application {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.set('host', process.env.EXPRESS_SERVER_HOST || 'localhost');
        this.app.set('port', process.env.EXPRESS_SERVER_PORT || 3000);
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(applicationRouter);
        this.app.use(authRouter);
    }

    public startServer(): void {
        const host: string = this.app.get('host');
        const port: number = this.app.get('port');
        const serverOptions: ServerOptions = getServerOptions();

        createServer(serverOptions, this.app).listen(port, () => {
            console.log(`Express server running at https://${host}:${port}`)
        });
    }
}
