import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        EditPlace: privateResolver(async(_, args: EditPlaceMutationArgs, {req}) : Promise<EditPlaceResponse>=> {
            const user: User = req.user 

            try {
                // if we want to populate relations, then we can call them as place.user - like we populate in MongoDB 
                // const place = await Place.findOne({id: args.placeId}, { relations: ["user"]});
                // but since we only need user id, we will modify place entity to have userId property

                const place = await Place.findOne({ id: args.placeId });
                if (place) {
                    if(place.userId === user.id) {
                        const notNull:any = cleanNullArgs(args);
                        if(notNull.placeId !== null){
                            delete notNull.placeId;
                        }
                        await Place.update({ id: args.placeId }, { ...notNull });
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Not Authorized"
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Place not found"
                    }
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
