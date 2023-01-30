import {Request, Response} from "express";
import logger from "../config/logger";
import {DI} from "../index";
import {Posts} from "../entities";
import {wrap} from "@mikro-orm/core";


class postController {
    async createPost(req: Request, res: Response) {
        try {
            const {title, text, author, image_url} = req.body;
            if (!title || !text || !author) {
                res.status(400).json({error: true, message: "Missing some fields"});
                return;
            }
            const post = DI.em.create(Posts, {title, text, author, image_url});
            await DI.em.persistAndFlush(post);
            return res.status(200).json({post});
        } catch (e) {
            logger.error(`createPost: ${e}`);
        }
    }

    async getPost(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const post = await DI.em.findOne(Posts, {id: +id});
            if (!post) return res.status(400).json({error: true, message: "Post not found"});
            return res.status(200).json({post});
        } catch (e) {
            logger.error(`getPost: ${e}`);
        }
    }

    async getPosts(req: Request, res: Response) {
        try {
            const posts = await DI.em.find(Posts, {});
            if (!posts) return res.status(400).json({error: true, message: "Posts not found"});
            return res.status(200).json({posts});
        } catch (e) {
            logger.error(`getPosts: ${e}`);
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const post = await DI.em.findOne(Posts, {id: +id});
            if (!post) return res.status(400).json({error: true, message: "Post not found"});
            await DI.em.removeAndFlush(post);
            return res.status(200).json('OK');
        } catch (e) {
            logger.error(`deletePost: ${e}`);
        }
    }

    async editPost(req: Request, res: Response) {
        try {
            const {id, title, text, author, image_url} = req.body;
            if (!id || !title || !text || !author) {
                res.status(400).json({error: true, message: "Missing some fields"});
                return;
            }
            const post = await DI.em.findOne(Posts, {id});
            if (!post) return res.status(400).json({error: true, message: "Post not found"});
            wrap(post).assign({
                title,
                text,
                author,
                image_url
            });
            await DI.em.persistAndFlush(post);
            return res.status(200).json({post});
        } catch (e) {
            logger.error(`editPost: ${e}`);
        }
    }
}

export default new postController();