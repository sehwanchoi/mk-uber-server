import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import {  EmailSignUpMutationArgs, EmailSignUpResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import createJWT from '../../../utils/createJWT';
import { sendVerificationEmail } from '../../../utils/sendEmail';



const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async(_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
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
                    // check phone is verified first
                    const phoneVerification = await Verification.findOne({
                        payload: args.phoneNumber,
                        verified: true 
                    })
                    if (phoneVerification) { // do email verification
                        const newUser = await User.create({...args}).save();
                        if (newUser.email) {
                            const emailVerification = await Verification.create({
                                payload: email,
                                target: 'EMAIL'
                            });
                            console.log(emailVerification);
                            await sendVerificationEmail(newUser.fullName, emailVerification.key);
                        }
                        const token = createJWT(newUser.id)
                        return {
                            ok: true,
                            error: null,
                            token
                        }
                    } else {
                        return {
                            ok: false,
                            error: "You haven't verified your phone number",
                            token: null
                        }
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