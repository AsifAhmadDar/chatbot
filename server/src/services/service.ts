import { Socket } from "socket.io";
import { UserModel } from "../data/models/user.model";
import { ConversationModel } from '../data/models/conversation.model'
import { config } from './../config/config';
import { Types } from "mongoose";

interface SocketRef extends Socket {

}

export const join_room = async (data: any, socket: SocketRef) => {
    socket.to(config.agents_room).emit('join-room', data);
    await UserModel.findByIdAndUpdate(data._id, { $set: { status: true } })
}
export const leave_room = async (user: any, socket: SocketRef) => {
    user.status = false;
    socket.to(config.agents_room).emit('leave-room', user);
    await UserModel.findByIdAndUpdate(user._id, { $set: { status: false } })
}

export const agent_joined = async (data: any, socket: SocketRef) => {
    const { room, agent } = data
    socket.broadcast.to(room).emit('agent-joined', agent);
    await create_conversation(agent, room);
}

export const send_message = async (data: any, socket: SocketRef) => {
    const { room,agent, message, sender } = data;
    socket.broadcast.to(room).emit('recieve', message);
    await save_message(room,agent,message,sender)
}

export const save_message = async (user: string, agent: string, message: string, sender: string) => {
    try {
        const message_model = { sender, message };
        const conversation_update = await ConversationModel.findOneAndUpdate(
            {
                members: {
                    $all: [
                        { $elemMatch: { $eq: new Types.ObjectId(user) } },
                        { $elemMatch: { $eq: new Types.ObjectId(agent) } }
                    ]
                }
            },
            { $addToSet: { messages: message_model } },
            { upsert: true, new: true });
        return conversation_update;
    } catch (error: any) {
        return error.message
    }
}

export const create_conversation = async (agent: any, user: string) => {
    try {
        const conversation = await ConversationModel.findOneAndUpdate(
            {
                members: {
                    $all: [
                        { $elemMatch: { $eq: new Types.ObjectId(user) } },
                        { $elemMatch: { $eq: new Types.ObjectId(agent._id) } }
                    ]
                }
            },
            {
                $setOnInsert: {
                    members: [user, agent._id]
                }
            },
            { upsert: true })
        return conversation;
    } catch (error: any) {
        return error.message
    }
}