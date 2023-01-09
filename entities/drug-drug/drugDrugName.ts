import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class DrugDrugNames {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @Property({type: "string"})
    drug1_kaz!: string;

    @Property({type: "string"})
    drug1_ru!: string;

    @Property({type: "string"})
    drug1_eng!: string;

    @Property({type: "string"})
    drug2_kaz!: string;

    @Property({type: "string"})
    drug2_ru!: string;

    @Property({type: "string"})
    drug2_eng!: string;

    constructor(id: number, drug1_kaz: string, drug1_ru: string, drug1_eng: string, drug2_kaz: string, drug2_ru: string, drug2_eng: string) {
        this.id = id;
        this.drug1_kaz = drug1_kaz;
        this.drug1_ru = drug1_ru;
        this.drug1_eng = drug1_eng;
        this.drug2_kaz = drug2_kaz;
        this.drug2_ru = drug2_ru;
        this.drug2_eng = drug2_eng;
    }
}