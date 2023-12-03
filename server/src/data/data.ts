import { createConnection, set } from "mongoose";
import { config } from "../config/config";
const makeDBConnection = (uri: string) => {
    const db = createConnection(uri);

    db.on('error', function (error:any) {
        console.log(`MongoDB :: connection ${db.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${db.name}`));
    });

    db.on('connected', function () {
        console.log(`MongoDB :: connected ${db.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${db.name}`);
    });

    return db;
}

export const database = makeDBConnection(config.dburl);