import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Message } from "src/message/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(type => Message, message => message.userId)
    Messages: Message[];

}