import {Router} from "express";
import medController from "../controllers/medController";

const router: Router = Router();

router.get('/getCatalogue', medController.getCatalogue);
router.get('/getDrugFoodInteractions', medController.getDrugFoodInteractions);
router.get('/getDrugDrugInteractions', medController.getDrugDrugInteractions);

router.post('/drugFoodInteraction', medController.drugFoodInteraction);
router.post('/drugDrugInteraction', medController.drugDrugInteraction);

export default router;