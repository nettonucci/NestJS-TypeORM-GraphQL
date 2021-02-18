import { InputType } from "@nestjs/graphql";
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
    @IsString()
    @IsNotEmpty({message: "Esse campo nåo pode estar vazio"})
    name: string;

    @IsEmail()
    @IsNotEmpty({message: "Esse campo nåo pode estar vazio"})
    email: string;
}