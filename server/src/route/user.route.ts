import { Router } from "express";
import { create_user } from "../controller/user.controller";
const user_router = Router();

user_router.post('/',create_user);

export default user_router;