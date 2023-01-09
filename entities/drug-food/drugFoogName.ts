import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class DrugFoodNames {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @Property({type: "string"})
    drug_kaz!: string;

    @Property({type: "string"})
    drug_ru!: string;

    @Property({type: "string"})
    drug_eng!: string;

    @Property({type: "string"})
    food_kaz!: string;

    @Property({type: "string"})
    food_ru!: string;

    @Property({type: "string"})
    food_eng!: string;

    constructor(id: number, drug_kaz: string, drug_ru: string, drug_eng: string, food_kaz: string, food_ru: string, food_eng: string) {
        this.id = id;
        this.drug_kaz = drug_kaz;
        this.drug_ru = drug_ru;
        this.drug_eng = drug_eng;
        this.food_kaz = food_kaz;
        this.food_ru = food_ru;
        this.food_eng = food_eng;
    }
}