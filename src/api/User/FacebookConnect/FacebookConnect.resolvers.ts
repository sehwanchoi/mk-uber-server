import { Resolvers } from '../../../types/resolvers';
import { FacebookConnectMutationArgs, FacebookConnectResponse } from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
    Query: {
        user: (parent, args, context) => {
            console.log(context)
            return ""
        }
    },
    Mutation: {
        FacebookConnect: async(
            _, 
            args: FacebookConnectMutationArgs 
            ) : Promise<FacebookConnectResponse> => {
                // Create user with response using typeorm 
                const {fbId} = args; 
                try {
                    // check if user exists first
                    const existingUser = await User.findOne({ fbId });
                    if (existingUser) {
                        const token = createJWT(existingUser.id)
                        return {
                            ok: true,
                            error: null,
                            token
                        }
                    }  
                } catch(error) {
                    return {
                        ok: false,
                        error: error.message,
                        token: null
                    }
                }
                // create a new user with try and catch
                try {
                    const newUser = await User.create({...args, profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square` }).save();
                    const token = createJWT(newUser.id)
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                } catch(error) {
                    return {
                        ok: false,
                        error: error.message,
                        token: null
                    }
                }
            }
    }
}

export default resolvers;