import { Socket } from "socket.io";
import { UserModel } from "../data/models/user.model";
import { ConversationModel } from '../data/models/conversation.model'
import { config } from './../config/config';

interface SocketRef extends Socket {

}

export const join_room = async (data: any, socket: SocketRef) => {
    const { user } = data;
    socket.to(config.agents_room).emit('join-room', { user });
    await UserModel.findByIdAndUpdate(user._id, { $set: { status: true } })
}
export const leave_room = async (user: any, socket: SocketRef) => {
    user.status = false;
    socket.to(config.agents_room).emit('leave-room', user);
    await UserModel.findByIdAndUpdate(user._id, { $set: { status: false } })
}

export const agent_joined = async (data: any, socket: SocketRef) => {
    const { room, agent } = data
    socket.broadcast.to(room).emit('agent-joined', { agent });
    await create_conversation(agent, room);
}

export const send_message = async (data: any, socket: SocketRef) => {
    const { room, message } = data;
    socket.broadcast.to(room).emit('recieve', message);
}

export const save_message = async (user: string, agent: string, message: string, sender: string) => {
    try {
        const members = [user, agent];
        const message_model = { sender, message };
        const conversation_update = await ConversationModel.findOneAndUpdate(
            { members: { $all: [user, agent] } },
            { $addToSet: { messages: message_model } },
            { upsert: true, new: true });
        return conversation_update;
    } catch (error: any) {
        return error.message
    }
}

export const create_conversation = async (agent: string, user: string) => {
    try {
        debugger
        const members = [user, agent];
        const conversation = await ConversationModel.findOne(
            { members: { $all: [user, agent] } },
            { $set: { members } }, { upsert: true, new: true })
        if (!conversation) {
            return 'created';
        }
        return 'exists'
    } catch (error: any) {
        return error.message
    }
}