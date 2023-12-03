import { Request, Response } from "express";
import { UserModel } from "../data/models/user.model";
import { ConversationModel } from "../data/models/conversation.model";
import { Types } from "mongoose";

export const create_user = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const user_create = await UserModel.findOneAndUpdate({ email: payload.email }, payload, { upsert: true, new: true });
        return res.status(200).json({ status: 200, message: `success`, data: user_create })
    } catch (error: any) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}

export const get_user_conversation = async (req: Request, res: Response) => {
    const { user, agent } = req.query;
    try {
        const conversation = await ConversationModel.aggregate([
            {
                $match: {
                    members: {
                        $all: [
                            { $elemMatch: { $eq: new Types.ObjectId(user?.toString()) } },
                            { $elemMatch: { $eq: new Types.ObjectId(agent?.toString()) } }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    messages:
                    {
                        $sortArray: {
                            input: "$messages",
                            sortBy: { createdAt: 1 }
                        }
                    }

                }
            },
            {
                $unwind:"$messages"
            },
            {
                $replaceRoot: { newRoot: "$messages" }
            }
        ])
        if (!conversation) {
            return res.status(200).json({ status: 204, data: [], message: 'no content' })
        }
        return res.status(200).json({ status: 200, data: conversation, message: 'success' })
    } catch (error: any) {
        res.status(400).json({ status: 400, message: error.message })
    }
}
