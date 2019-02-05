import { ConnectionOptions} from "typeorm";

const ConnectionOptions: ConnectionOptions = {
    type: "postgres",
    database: "uberserver",
    synchronize: true,
    logging: true,
    entities: [
        "entities/**/*.*"
    ],
    host: process.env.DB_ENDPOINT || "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || "sehwan",
    password: process.env.DB_PASSWORD || ""
};

export default ConnectionOptions;

// https://github.com/typeorm/typeorm