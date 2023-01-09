import {NextFunction, Request, Response} from "express";
import logger from "../config/logger";
import {DI} from "../index";
import {Catalogue, DrugDrugInteractions, DrugDrugNames, DrugFoodInteractions, DrugFoodNames} from "../entities";

class MedController {
    async getCatalogue(req: Request, res: Response, next: NextFunction) {
        try {
            const catalogue = await DI.em.find(Catalogue, {}, {orderBy: {id: 'ASC'}, populate: true});
            if (!catalogue) return res.status(400).send("Catalogue not found");
            res.status(200).json({catalogue});
            return next();
        } catch (e) {
            logger.error(`getCatalogue: ${e}`);
        }
    }

    async getDrugFoodInteractions(req: Request, res: Response, next: NextFunction) {
        try {
            const interactions = await DI.em.find(DrugFoodInteractions, {}, {orderBy: {id: 'ASC'}, populate: true});
            if (!interactions) return res.status(400).send("Interactions not found");
            res.status(200).json({interactions});
            return next();
        } catch (e) {
            logger.error(`getDrugFoodInteractions: ${e}`);
        }
    }

    async getDrugDrugInteractions(req: Request, res: Response, next: NextFunction) {
        try {
            const interactions = await DI.em.find(DrugDrugInteractions, {}, {orderBy: {id: 'ASC'}, populate: true});
            if (!interactions) return res.status(400).send("Interactions not found");
            res.status(200).json({interactions});
            return next();
        } catch (e) {
            logger.error(`getDrugDrugInteractions: ${e}`);
        }
    }

    async drugFoodInteraction(req: Request, res: Response, next: NextFunction) {
        try {
            const {data} = req.body;

            const names = await DI.em.find(DrugFoodNames, {
                drug_eng: {
                    $in: data
                },
                food_eng: {
                    $in: data
                }
            }, {populate: true});
            if (!names) return res.status(400).send("Names not found");
            const interaction = await DI.em.find(DrugFoodInteractions, {drug_food_names: names},
                {populate: true});

            if (!interaction) return res.status(400).send("Interaction not found");
            res.status(200).json({interaction});
            return next();
        } catch (e) {
            logger.error(`drugFoodInteraction: ${e}`);
        }
    }

    async drugDrugInteraction(req: Request, res: Response, next: NextFunction) {
        try {
            const {data} = req.body;

            const names = await DI.em.find(DrugDrugNames, {
                drug1_eng: {
                    $in: data
                },
                drug2_eng: {
                    $in: data
                }
            }, {populate: true});
            if (!names) return res.status(400).send("Names not found");
            const interaction = await DI.em.find(DrugDrugInteractions, {drug_drug_names: names},
                {populate: true});

            if (!interaction) return res.status(400).send("Interaction not found");
            res.status(200).json({interaction});
            return next();
        } catch (e) {
            logger.error(`drugDrugInteraction: ${e}`);
        }
    }
}

export default new MedController();