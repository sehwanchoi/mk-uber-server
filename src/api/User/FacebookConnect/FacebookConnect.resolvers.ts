import { Resolvers } from '../../../types/resolvers';
import { FacebookConnectMutationArgs, FacebookConnectResponse } from '../../../types/graph';
import User from '../../../entities/User';

const resolvers: Resolvers = {
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
                        return {
                            ok: true,
                            error: null,
                            token: "Coming soon, already"
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
                    await User.create({...args, profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square` }).save();
                    return {
                        ok: true,
                        error: null,
                        token: "Coming soon, created"
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