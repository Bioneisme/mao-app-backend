import {Router} from "express";
import protectedRoute from "../middleware/authMiddleware";
import userController from "../controllers/userController";

const router: Router = Router();

router.post("/login", userController.login);

router.get("/getMe", protectedRoute, userController.getCurrentUser);
router.post("/validate", userController.validate);

router.post("/register", userController.register);
router.delete("/deleteUser/:id", userController.deleteUser);
router.patch("/editUser", userController.editUser);
router.get("/getUser/:id", userController.getUser);
router.get("/getUsers", userController.getUsers);

export default router;