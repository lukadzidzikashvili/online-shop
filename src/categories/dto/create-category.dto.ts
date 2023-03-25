import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'კატეგორიის დასახელება არ უნდა იყოს ცარიელი!' })
  name: string;

  parentId: number;
}
