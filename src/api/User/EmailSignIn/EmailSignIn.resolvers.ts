import User from '../../../entities/User';
import { EmailSignInMutationArgs, EmailSignInResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
    Mutation: {
        EmailSignIn: async(_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
            try {
                const { email, password } = args;
                const user = await User.findOne({ email })
                if (!user) {
                    return {
                        ok: false,
                        error: "No User with that email",
                        token: null
                    };         
                }
                const checkPassowrd = await user.comparePassword(password);
                if(checkPassowrd) {
                    return {
                        ok: true,
                        error: null,
                        token: "Coming Soon"
                    }
                } else {
                    return {
                        ok: false,
                        error: "Wrong password",
                        token: null
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