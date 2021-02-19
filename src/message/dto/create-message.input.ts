import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateMessageInput {
    @IsString()
    @IsNotEmpty({message: "Esse campo nåo pode estar vazio"})
    title: string;

    @IsString()
    @IsNotEmpty({message: "Esse campo nåo pode estar vazio"})
    content: string;
}