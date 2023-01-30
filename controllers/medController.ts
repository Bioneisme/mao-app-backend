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
import {wrap} from "@mikro-orm/core";

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

    async getMedicament(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const medicament = await DI.em.findOne(Catalogue, {id: +id}, {populate: true});
            if (!medicament) return res.status(400).send("Medicament not found");
            res.status(200).json({medicament});
            return next();
        } catch (e) {
            logger.error(`getMedicament: ${e}`);
        }
    }

    async createMedicament(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                id, name_ru, name_kaz, name_eng, class_ru, class_kaz, class_eng, group,
                pd_ru, pk_ru, indications, side_effects_ru, contraindications_ru,
                pregnancy, liver_disorders_ru, kidneys_disorders_ru, children_ru, notice, elders_ru
            } = req.body;
            const general = DI.em.create(General, {
                id,
                name_ru,
                name_kaz,
                name_eng,
                class_ru,
                class_kaz,
                class_eng,
                group
            });
            await DI.em.persistAndFlush(general).catch(e => {
                logger.error(`createMedicament: ${e}`);
                res.status(400).send(`General not created: ${e}`);
                return next();
            });
            const medicament = DI.em.create(Catalogue, {
                id,
                general,
                pd_ru,
                pk_ru,
                indications,
                side_effects_ru,
                contraindications_ru,
                pregnancy,
                liver_disorders_ru,
                kidneys_disorders_ru,
                children_ru,
                notice,
                elders_ru
            });

            await DI.em.persistAndFlush(medicament).catch(e => {
                logger.error(`createMedicament: ${e}`);
                res.status(400).send(`Medicament not created: ${e}`);
                return next();
            });

            res.status(200).json({medicament});
            return next();
        } catch (e) {
            logger.error(`createMedicament: ${e}`);
        }
    }

    async deleteMedicament(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            const medicament = await DI.em.findOne(Catalogue, {id: +id}, {populate: true});
            if (!medicament) return res.status(400).send("Medicament not found");
            await DI.em.removeAndFlush(medicament);

            const general = await DI.em.findOne(General, {id: +id});
            if (!general) return res.status(400).send("General not found");
            await DI.em.removeAndFlush(general);

            res.status(200).send('OK');
            return next();
        } catch (e) {
            logger.error(`deleteMedicament: ${e}`);
        }
    }

    async editMedicament(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                id, name_ru, name_kaz, name_eng, class_ru, class_kaz, class_eng, group,
                pd_ru, pk_ru, indications, side_effects_ru, contraindications_ru,
                pregnancy, liver_disorders_ru, kidneys_disorders_ru, children_ru, notice, elders_ru
            } = req.body;
            const general = await DI.em.findOne(General, {id: +id});
            if (!general) return res.status(400).send("General not found");

            wrap(general).assign({
                name_ru,
                name_kaz,
                name_eng,
                class_ru,
                class_kaz,
                class_eng,
                group
            });

            await DI.em.persistAndFlush(general).catch(e => {
                logger.error(`editMedicament: ${e}`);
                res.status(400).send(`General not edited: ${e}`);
                return next();
            });

            const medicament = await DI.em.findOne(Catalogue, {id: +id}, {populate: true});
            if (!medicament) return res.status(400).send("Medicament not found");
            wrap(medicament).assign({
                pd_ru,
                pk_ru,
                indications,
                side_effects_ru,
                contraindications_ru,
                pregnancy,
                liver_disorders_ru,
                kidneys_disorders_ru,
                children_ru,
                notice,
                elders_ru
            });

            await DI.em.persistAndFlush(medicament).catch(e => {
                logger.error(`editMedicament: ${e}`);
                res.status(400).send(`Medicament not edited: ${e}`);
                return next();
            });

            res.status(200).json({medicament});
            return next();
        } catch (e) {
            logger.error(`editMedicament: ${e}`);
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