import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {General} from "./general";

@Entity()
export class Catalogue {
    @PrimaryKey({type: "integer", autoincrement: true})
    id!: number;

    @ManyToOne({type: General})
    general_id!: General;

    @Property({type: "string"})
    pd_ru!: string;

    @Property({type: "string"})
    pk_ru!: string;

    @Property({type: "string"})
    indications!: string;

    @Property({type: "string"})
    side_effects_ru!: string;

    @Property({type: "string"})
    contraindications_ru!: string;

    @Property({type: "string"})
    pregnancy!: string;

    @Property({type: "string"})
    liver_disorders_ru!: string;

    @Property({type: "string"})
    kidneys_disorders_ru!: string;

    @Property({type: "string"})
    children_ru!: string;

    @Property({type: "string"})
    elders_ru!: string;

    @Property({type: "string"})
    notice!: string;

    constructor(id: number, general_id: General, pd_ru: string, pk_ru: string, indications: string, side_effects_ru: string,
                contraindications_ru: string, pregnancy: string, liver_disorders_ru: string, kidneys_disorders_ru: string,
                children_ru: string, elders_ru: string, notice: string) {
        this.id = id;
        this.general_id = general_id;
        this.pd_ru = pd_ru;
        this.pk_ru = pk_ru;
        this.indications = indications;
        this.side_effects_ru = side_effects_ru;
        this.contraindications_ru = contraindications_ru;
        this.pregnancy = pregnancy;
        this.liver_disorders_ru = liver_disorders_ru;
        this.kidneys_disorders_ru = kidneys_disorders_ru;
        this.children_ru = children_ru;
        this.elders_ru = elders_ru;
        this.notice = notice;
    }
}