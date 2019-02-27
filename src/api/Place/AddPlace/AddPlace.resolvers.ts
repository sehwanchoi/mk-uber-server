import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        AddPlace: privateResolver(async(_, args, {req}) => {
            ""
        })
    }
};

export default resolvers;
