import {baseEntity} from "./baseEntity";
import {Users} from "./userEntity";
import {Catalogue} from "./catalogue";
import {General} from "./general";
import {DrugFoodDescriptions} from "./drug-food/drugFoodDescription";
import {DrugFoodNames} from "./drug-food/drugFoogName";
import {DrugFoodInteractions} from "./drug-food/drugFoodInteraction";
import {DrugDrugDescriptions} from "./drug-drug/drugDrugDescription";
import {DrugDrugNames} from "./drug-drug/drugDrugName";
import {DrugDrugInteractions} from "./drug-drug/drugDrugInteraction";
import {Posts} from "./postEntity";

export {baseEntity, Users, General, Posts, Catalogue, DrugFoodDescriptions, DrugFoodNames, DrugFoodInteractions, DrugDrugNames, DrugDrugInteractions, DrugDrugDescriptions};

export default [baseEntity, Users, General, Posts, Catalogue, DrugFoodDescriptions, DrugFoodNames, DrugFoodInteractions, DrugDrugNames, DrugDrugDescriptions, DrugDrugInteractions];