import { Request, Response } from "express";
import db from '../models';
import { decodeToken, jwtSign } from "../helpers/user";

const { User } = db;

export const login = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login, password } });

        if (!user) {
            res.status(401);
            throw new Error('Login or password is incorrect');
        }

        const token = jwtSign(user);
        res.json({ user, token });
    } catch(e: any) {
        res.json({ message: e.message });
    }
}

export const checkToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        const user = decodeToken(token as string);

        if (!user) {
            res.status(401);
            throw new Error('Invalid token');
        }

        res.status(200);
        res.json({ user });
    } catch (e: any) {
        res.json({ message: e.message })
    }
}
