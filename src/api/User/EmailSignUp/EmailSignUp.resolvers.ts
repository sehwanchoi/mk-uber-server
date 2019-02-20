import {  EmailSignInMutationArgs, EmailSignInResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import User from '../../../entities/User';


const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async(_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
            const { email } = args;
            try {
                const existingUser = await User.findOne({ email })
                if(existingUser) {
                    return {
                        ok: false,
                        error: "Email already exist. Please Sign In",
                        token: null
                    }
                } else { // create new user 
                    await User.create({...args}).save();
                    return {
                        ok: true,
                        error: null,
                        token: "coming soon!"
                    }
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