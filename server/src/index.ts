import { Application } from './application.js';
import * as dotenv from 'dotenv';

dotenv.config();

const dfsDork: Application = new Application();
dfsDork.startServer();
