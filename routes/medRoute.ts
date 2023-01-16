import {Router} from "express";
import medController from "../controllers/medController";

const router: Router = Router();

router.get('/getCatalogue', medController.getCatalogue);
router.get('/getGeneral', medController.getGeneral);
router.get('/getDrugFoodInteractions', medController.getDrugFoodInteractions);
router.get('/getDrugDrugInteractions', medController.getDrugDrugInteractions);
router.get('/getDrugFoodNames', medController.getDrugFoodNames);
router.get('/getDrugDrugNames', medController.getDrugDrugNames);
router.get('/getAllInteractNames', medController.getAllInteractNames);
router.get('/getDrugFoodInteractionById/:id', medController.getDrugFoodInteractionById);
router.get('/getDrugDrugInteractionById/:id', medController.getDrugDrugInteractionById);
router.get('/getDrugFoodNameById/:id', medController.getDrugFoodNameById);
router.get('/getDrugDrugNameById/:id', medController.getDrugDrugNameById);

router.post('/drugFoodInteraction', medController.drugFoodInteraction);
router.post('/drugDrugInteraction', medController.drugDrugInteraction);
router.post('/allInteractions', medController.allInteractions);

export default router;