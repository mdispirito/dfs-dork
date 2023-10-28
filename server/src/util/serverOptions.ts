import { ServerOptions } from 'https';
import { PathLike, readFileSync } from 'fs';


export function getServerOptions(keyPath?: PathLike, certPath?: PathLike): ServerOptions {
    // TODO - handle case where pem files aren't found

    if (keyPath === undefined) {
        keyPath = '~/cert/key.pem';
    }

    if (certPath === undefined) {
        certPath = '~/cert/cert.pem';
    }

    return {
        key: readFileSync(keyPath),
        cert: readFileSync(certPath)
    };
}
