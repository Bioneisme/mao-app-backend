import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class DrugFoodDescriptions {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @Property({type: "string"})
    med_description_ru_body!: string;

    @Property({type: "string"})
    med_description_ru_ref!: string;

    @Property({type: "string"})
    consumer_description_ru!: string;

    constructor(id: number, med_description_ru_body: string, med_description_ru_ref: string, consumer_description_ru: string) {
        this.id = id;
        this.med_description_ru_body = med_description_ru_body;
        this.med_description_ru_ref = med_description_ru_ref;
        this.consumer_description_ru = consumer_description_ru;
    }
}