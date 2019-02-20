import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (_, args: CompletePhoneVerificationMutationArgs)
        : Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            try {
                const verificiation = await Verification.findOne({
                    payload: phoneNumber,
                    key
                })
                if(!verificiation) {
                    return {
                        ok: false,
                        error: "Invalid Verification Key",
                        token: null
                    };
                } else {
                    verificiation.verified = true;
                    verificiation.save();
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

            // Passed try and catch block above - user has verified phone number and key so we now search ours db
            try {
                const user = await User.findOne({phoneNumber})
                if(user) {
                    user.verifiedPhoneNumber = true 
                    user.save();
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        token
                    };
                } else { // phone number has been verified but there is no user with that phone number   
                    return { // react app will use this returned value to decide which route to take 
                        ok: true,
                        error: null,
                        token: null
                    };
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

        }
    }
};

export default resolvers;
