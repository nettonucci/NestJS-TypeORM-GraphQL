import { InputType } from "@nestjs/graphql";
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateUserInput {
    @IsString()
    @IsNotEmpty({message: "Esse campo nåo pode estar vazio"})
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsNotEmpty({message: "Esse campo nåo pode estar vazio"})
    @IsOptional()
    email?: string;
}