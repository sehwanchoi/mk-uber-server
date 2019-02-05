import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'graphql-yoga';
import app from './app';
// connect to typeorm - db 
import { createConnection } from "typeorm"
import ConnectionOptions from './ormConfig';

// console.log(process.env)

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";

const appOptions : Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
}

const handleAppStart = () => console.log(`listening on port ${PORT}`)

// create connection to db first then start the app 
createConnection(ConnectionOptions)
    .then(()=> {
        app.start(appOptions, handleAppStart);
    })
    .catch(error => console.log(error))

