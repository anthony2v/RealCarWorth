import { IsEmail, IsOptional, IsString, isString } from "class-validator";

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email!: string;

    @IsString()
    @IsOptional()
    password!: string;
}
