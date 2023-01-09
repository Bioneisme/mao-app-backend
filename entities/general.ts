import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class General {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @Property({type: "string"})
    name_eng!: string;

    @Property({type: "string"})
    name_kaz!: string;

    @Property({type: "string"})
    name_ru!: string;

    @Property({type: "string"})
    class_eng!: string;

    @Property({type: "string"})
    class_kaz!: string;

    @Property({type: "string"})
    class_ru!: string;

    @Property({type: "string"})
    group!: string;

    constructor(id: number, name_ru: string, name_kaz: string, name_eng: string, class_ru: string, class_kaz: string,
                class_eng: string, group: string) {
        this.id = id;
        this.name_ru = name_ru;
        this.name_kaz = name_kaz;
        this.name_eng = name_eng;
        this.class_ru = class_ru;
        this.class_kaz = class_kaz;
        this.class_eng = class_eng;
        this.group = group;
    }
}