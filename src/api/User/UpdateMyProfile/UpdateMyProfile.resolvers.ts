import User from "../../../entities/User";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers : Resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolver(async(_, args: UpdateMyProfileMutationArgs, { req }) : Promise<UpdateMyProfileResponse> => {
            const user: User = req.user;
            const notNull: any = CleanNullArgs(args)
            // update user with only none null values
            if(notNull.password !== null) { // Cahnge from args to notNull
                user.password = args.password;
                user.save();
                delete notNull.password;
            }
            try {
                await User.update({id: user.id}, {...notNull});
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers;