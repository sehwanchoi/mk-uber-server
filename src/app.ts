import cors from 'cors';
import { NextFunction, Response } from 'express';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import decodeJWT from './utils/decodeJWT';

class App {
    public app: GraphQLServer
    constructor() {
        // context api is passed into the server and available across all resolvers in the app 
        this.app = new GraphQLServer({ 
            schema,
            context: req => {
                return {
                    req: req.request 
                }
            }
        });
        this.middlewares();
    }

    private middlewares = (): void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
    }

    // custom middleware to open jw token 
    private jwt = async(req, res: Response, next: NextFunction) : Promise<void> => {
        const token = req.get("X-JWT"); // from header
        if (token) {
            // find user id in token and get the user - utils/decodeJWT
            const user = await decodeJWT(token);
            if (user) { 
                // attach user to req and pass req as context api in graphql server above 
                req.user = user
            } else {
                req.user = undefined;
            }
        }
        next();
    }
}

export default new App().app; 

