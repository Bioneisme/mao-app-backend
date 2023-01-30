import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Posts extends baseEntity {
    @Property({type: "string"})
    author!: string;

    @Property({type: "string"})
    title!: string;

    @Property({type: "string"})
    text?: string;

    @Property({type: "string", nullable: true})
    image_url?: string;

    constructor(author: string, title: string, text?: string, image_url?: string) {
        super();

        this.author = author;
        this.title = title;
        this.text = text;
        this.image_url = image_url;
    }
}