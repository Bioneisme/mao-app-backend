import {NextFunction, Request, Response} from "express";
import logger from "../config/logger";
import {DI} from "../index";
import {
    Catalogue,
    DrugDrugInteractions,
    DrugDrugNames,
    DrugFoodInteractions,
    DrugFoodNames,
    General
} from "../entities";

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

    async getGeneral(req: Request, res: Response, next: NextFunction) {
        try {
            const general = await DI.em.find(General, {}, {orderBy: {id: 'ASC'}});
            if (!general) return res.status(400).send("General not found");
            res.status(200).json({general});
            return next();
        } catch (e) {
            logger.error(`getGeneral: ${e}`);
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

    async allInteractions(req: Request, res: Response, next: NextFunction) {
        try {
            const {data} = req.body;

            const drugFoodNames = await DI.em.find(DrugFoodNames, {
                drug_eng: {
                    $in: data
                },
                food_eng: {
                    $in: data
                }
            }, {populate: true});

            const drugDrugNames = await DI.em.find(DrugDrugNames, {
                drug1_eng: {
                    $in: data
                },
                drug2_eng: {
                    $in: data
                }
            }, {populate: true});

            const drugDrugInteractions = await DI.em.find(DrugDrugInteractions, {drug_drug_names: drugDrugNames},
                {populate: true});

            const drugFoodInteraction = await DI.em.find(DrugFoodInteractions, {drug_food_names: drugFoodNames},
                {populate: true});

            res.status(200).json({drugDrugInteractions, drugFoodInteraction});
            return next();
        } catch (e) {
            logger.error(`allInteractions: ${e}`);
        }
    }

    async getDrugFoodNames(req: Request, res: Response, next: NextFunction) {
        try {
            const names = await DI.em.find(DrugFoodNames, {}, {orderBy: {id: 'ASC'}});
            if (!names) return res.status(400).send("Names not found");
            res.status(200).json({names});
            return next();
        } catch (e) {
            logger.error(`getDrugFoodNames: ${e}`);
        }
    }

    async getDrugDrugNames(req: Request, res: Response, next: NextFunction) {
        try {
            const names = await DI.em.find(DrugDrugNames, {}, {orderBy: {id: 'ASC'}});
            if (!names) return res.status(400).send("Names not found");
            res.status(200).json({names});
            return next();
        } catch (e) {
            logger.error(`getDrugDrugNames: ${e}`);
        }
    }

    async getAllInteractNames(req: Request, res: Response, next: NextFunction) {
        try {
            const drugFoodNames = await DI.em.find(DrugFoodNames, {}, {orderBy: {id: 'ASC'}});
            const drugDrugNames = await DI.em.find(DrugDrugNames, {}, {orderBy: {id: 'ASC'}});
            if (!drugFoodNames || !drugDrugNames) return res.status(400).send("Names not found");

            res.status(200).json({drugFoodNames, drugDrugNames});
            return next();
        } catch (e) {
            logger.error(`getAllInteractNames: ${e}`);
        }
    }

    async getDrugFoodInteractionById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const interaction = await DI.em.findOne(DrugFoodInteractions, {id: +id}, {populate: true});
            if (!interaction) return res.status(400).send("Interaction not found");

            res.status(200).json({interaction});
            return next();
        } catch (e) {
            logger.error(`getDrugFoodInteractionById: ${e}`);
        }
    }

    async getDrugDrugInteractionById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const interaction = await DI.em.findOne(DrugDrugInteractions, {id: +id}, {populate: true});
            if (!interaction) return res.status(400).send("Interaction not found");

            res.status(200).json({interaction});
            return next();
        } catch (e) {
            logger.error(`getDrugDrugInteractionById: ${e}`);
        }
    }

    async getDrugFoodNameById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const name = await DI.em.findOne(DrugFoodNames, {id: +id}, {populate: true});
            if (!name) return res.status(400).send("Name not found");

            res.status(200).json({name});
            return next();
        } catch (e) {
            logger.error(`getDrugFoodNameById: ${e}`);
        }
    }

    async getDrugDrugNameById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const name = await DI.em.findOne(DrugDrugNames, {id: +id}, {populate: true});
            if (!name) return res.status(400).send("Name not found");

            res.status(200).json({name});
            return next();
        } catch (e) {
            logger.error(`getDrugDrugNameById: ${e}`);
        }
    }
}

export default new MedController();