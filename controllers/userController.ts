import logger from "../config/logger";
import {DI} from "../index";
import {generateJWT, verifyJWT} from "../helpers/jwt";
import {wrap} from "@mikro-orm/core";
import {Request, Response} from "express";
import {UserRequest} from "../types";
import bcryptjs from "bcryptjs";
import {Users} from "../entities";

class userController {
    async register(req: Request, res: Response) {
        try {
            const {email, password, full_name, date_of_birth, region, city, specialization} = req.body;

            if (!email || !password) {
                res.status(400).json({error: true, message: "Missing email or password"});
                return;
            }

            const existingUser = await DI.em.findOne(Users, {email});

            if (existingUser) {
                res.status(400).json({error: true, message: "User already exists"});
                return;
            }

            const slat = bcryptjs.genSaltSync(10);
            const hashedPassword = await bcryptjs.hash(password, slat);

            const user = DI.em.create(Users, {
                email,
                password: hashedPassword,
                full_name,
                date_of_birth,
                region,
                city,
                specialization
            });

            await DI.em.persistAndFlush(user);

            if (!user) {
                res.status(500).json({error: true, message: "Something went wrong"});
                return;
            }

            res.status(201).send({...user, token: generateJWT(user.id)});
        } catch (e) {
            logger.error(`Register: ${e}`);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                res.status(400).json({error: true, message: "Missing email or password"});
                return;
            }

            const user = await DI.em.findOne(Users, {email});

            if (!user) {
                res.status(400).json({error: true, message: "User not found"});
                return;
            }

            const isPasswordValid = await bcryptjs.compare(password, user.password);

            if (!isPasswordValid) {
                res.status(400).json({error: true, message: "Invalid password"});
                return;
            }

            res.status(200).send({...(user), token: generateJWT(user.id)});
        } catch (e) {
            logger.error(`Login: ${e}`);
        }
    }

    async getCurrentUser(req: Request, res: Response) {
        try {
            const id = (req as UserRequest).user?.id;
            const user = await DI.em.findOne(Users, {id});

            if (!user) {
                res.status(404).json({error: true, message: "User not found"});
                return;
            }

            res.status(200).send(user);
        } catch (e) {
            logger.error(`getCurrentUser: ${e}`);
        }
    }

    async validate(req: Request, res: Response) {
        try {
            const {token} = req.body;
            const decoded = verifyJWT(token);

            const id: number = (decoded as { id: number }).id;

            const user = await DI.em.findOne(Users, {id});
            if (!user) return res.status(400).json({error: true, message: "User not found"});
            (req as UserRequest).user = user;

            return res.status(200).json({...(user), token: generateJWT(user.id)});
        } catch (e) {
            logger.error(`getCurrentUser: ${e}`);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const user = await DI.em.findOne(Users, {id: +id});
            if (!user) return res.status(400).json({error: true, message: "User not found"});

            await DI.em.removeAndFlush(user);

            return res.status(200).json('OK');
        } catch (e) {
            logger.error(`deleteUser: ${e}`);
        }
    }

    async editUser(req: Request, res: Response) {
        try {
            const {id, email, full_name} = req.body;
            if (!id || !email || !full_name) {
                res.status(400).json({error: true, message: "Missing id, email or full_name"});
                return;
            }

            const user = await DI.em.findOne(Users, {id});
            if (!user) return res.status(400).json({error: true, message: "User not found"});

            wrap(user).assign({
                email,
                full_name
            });

            await DI.em.persistAndFlush(user);

            return res.status(200).json({user});
        } catch (e) {
            logger.error(`editUser: ${e}`);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const user = await DI.em.findOne(Users, {id: +id});
            if (!user) return res.status(400).json({error: true, message: "User not found"});

            return res.status(200).json({user});
        } catch (e) {
            logger.error(`getUser: ${e}`);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await DI.em.find(Users, {});
            if (!users) return res.status(400).json({error: true, message: "Users not found"});

            return res.status(200).json({users});
        } catch (e) {
            logger.error(`getUsers: ${e}`);
        }
    }

}

export default new userController();