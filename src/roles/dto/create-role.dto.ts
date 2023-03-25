import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'როლის დასახელება არ უნდა იყოს ცარიელი!' })
  rolename: string;
}
