import { Request, Response } from "express";
import { UserModel } from "../data/models/user.model";

export const getOnlineUsers = async (req:Request,res:Response) => {
    try {
        const data = await UserModel.find({role:'user',status:true});
        res.status(200).json({status:200,data})
    } catch (error:any) {
        res.status(400).json({status:400,message:error.message})
    }
}
