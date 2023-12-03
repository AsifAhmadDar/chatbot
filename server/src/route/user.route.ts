import { Router } from "express";
import { create_user, get_user_conversation } from "../controller/user.controller";
const user_router = Router();

user_router.post('/',create_user);
user_router.get('/conversation',get_user_conversation);

export default user_router;