import { Schema } from "mongoose";
import { database } from "../data";

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true ,index:true},
    message: { type: String }
}, { timestamps: true })

const conversationSchema = new Schema({
    members:[{ type: Schema.Types.ObjectId, ref: 'user', required: true ,index:true}],
    messages: [{ type: messageSchema }]
}, { timestamps: true })

export const ConversationModel = database.model('conversation', conversationSchema);
