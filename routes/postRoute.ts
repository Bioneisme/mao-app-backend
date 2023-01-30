import {Router} from "express";
import postController from "../controllers/postController";

const router: Router = Router();

router.post('/createPost', postController.createPost);
router.get('/getPost/:id', postController.getPost);
router.get('/getPosts', postController.getPosts);
router.delete('/deletePost/:id', postController.deletePost);
router.patch('/editPost', postController.editPost);

export default router;