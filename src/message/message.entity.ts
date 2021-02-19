import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

}