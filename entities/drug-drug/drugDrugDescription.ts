import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class DrugDrugDescriptions {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @Property({type: "string"})
    description_med_description_ru_body!: string;

    @Property({type: "string"})
    description_med_description_ru_ref!: string;

    @Property({type: "string"})
    description_consumer_description_ru!: string;

    constructor(id: number, description_med_description_ru_body: string, description_med_description_ru_ref: string, description_consumer_description_ru: string) {
        this.id = id;
        this.description_med_description_ru_body = description_med_description_ru_body;
        this.description_med_description_ru_ref = description_med_description_ru_ref;
        this.description_consumer_description_ru = description_consumer_description_ru;
    }
}