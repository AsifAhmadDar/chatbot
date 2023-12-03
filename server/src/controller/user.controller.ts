import { Request, Response } from "express";
import { UserModel } from "../data/models/user.model";

export const create_user = async (req:Request, res:Response) => {
    try {
        const user = new UserModel(req.body);
        const user_exists = await UserModel.findOne({email:user.email});
        if(user_exists){
            return res.status(200).json({status:209,message:`success`,data:user_exists})
        } 
       await user.save(); 
       return res.status(200).json({status:200,message:`success`,data:user})
    } catch (error:any) {
        return res.status(400).json({status:400,message:error.message})
    }
}
