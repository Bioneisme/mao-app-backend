import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {DrugDrugNames} from "./drugDrugName";
import {DrugDrugDescriptions} from "./drugDrugDescription";

@Entity()
export class DrugDrugInteractions {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @ManyToOne({type: DrugDrugNames})
    drug_drug_names!: DrugDrugNames;

    @ManyToOne({type: DrugDrugDescriptions})
    drug_drug_descriptions!: DrugDrugDescriptions;

    @Property({type: "string"})
    general_value!: string;

    @Property({type: "string"})
    general_degree!: string;

    @Property({type: "string"})
    type!: string;

    constructor(id: number, drug_drug_names_id: DrugDrugNames, drug_drug_descriptions_id: DrugDrugDescriptions, general_value: string, general_degree: string, type: string) {
        this.id = id;
        this.drug_drug_names = drug_drug_names_id;
        this.drug_drug_descriptions = drug_drug_descriptions_id;
        this.general_value = general_value;
        this.general_degree = general_degree;
        this.type = type;
    }
}