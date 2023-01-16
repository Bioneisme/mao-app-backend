import {Entity, Property} from "@mikro-orm/core";
import {baseEntity} from "./baseEntity";

@Entity()
export class Users extends baseEntity {
    @Property({type: "string"})
    email!: string;

    @Property({type: "string"})
    password!: string;

    @Property({type: "string", nullable: true})
    full_name?: string;

    @Property({type: "date", nullable: true})
    date_of_birth?: Date;

    @Property({type: "string", nullable: true})
    region?: string;

    @Property({type: "string", nullable: true})
    city?: string;

    @Property({type: "string", nullable: true})
    specialization?: string;

    constructor(email: string, password: string, full_name?: string, date_of_birth?: Date,
                region?: string, city?: string, specialization?: string) {
        super();
        this.email = email;
        this.password = password;
        this.full_name = full_name;
        this.date_of_birth = date_of_birth;
        this.region = region;
        this.city = city;
        this.specialization = specialization;
    }
}