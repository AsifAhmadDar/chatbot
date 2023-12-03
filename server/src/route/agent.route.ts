import { getOnlineUsers } from "../controller/agent.controller";
import { Router } from "express";
const agent_router = Router();

agent_router.get('/users',getOnlineUsers);

export default agent_router;