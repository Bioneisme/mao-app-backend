import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {DrugFoodNames} from "./drugFoogName";
import {DrugFoodDescriptions} from "./drugFoodDescription";

@Entity()
export class DrugFoodInteractions {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @ManyToOne({type: DrugFoodNames})
    drug_food_names!: DrugFoodNames;

    @ManyToOne({type: DrugFoodDescriptions})
    drug_food_descriptions!: DrugFoodDescriptions;

    @Property({type: "string"})
    general_value!: string;

    @Property({type: "string"})
    general_degree!: string;

    @Property({type: "string"})
    type!: string;

    constructor(id: number, drug_food_names_id: DrugFoodNames, drug_food_descriptions_id: DrugFoodDescriptions, general_value: string, general_degree: string, type: string) {
        this.id = id;
        this.drug_food_names = drug_food_names_id;
        this.drug_food_descriptions = drug_food_descriptions_id;
        this.general_value = general_value;
        this.general_degree = general_degree;
        this.type = type;
    }
}