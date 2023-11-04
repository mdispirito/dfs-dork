import * as dotenv from 'dotenv';
import { ModuleOptions } from 'simple-oauth2';

dotenv.config();


export function getYahooApiConfig(): ModuleOptions {
    // TODO - handle env variables not found
    const yahooClientID = process.env.YAHOO_CLIENT_ID as string;
    const yahooClientSecret = process.env.YAHOO_CLIENT_SECRET as string;

    return {
        client: {
            id: yahooClientID,
            secret: yahooClientSecret
        },
        auth: {
            tokenHost: 'https://api.login.yahoo.com',
            tokenPath: '/oauth2/get_token',
            authorizePath: '/oauth2/request_auth'
        }
    }
}
