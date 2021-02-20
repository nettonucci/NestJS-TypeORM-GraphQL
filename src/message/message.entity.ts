import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    userId: number

    @ManyToOne(type => User, user => user.Messages)
    @JoinColumn({name: "userId"})
    User: User;

}