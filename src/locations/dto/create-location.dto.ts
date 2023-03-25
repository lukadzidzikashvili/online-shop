import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty({ message: 'ქვეყნის ველი არ უნდა იყოს ცარიელი!' })
  country: string;

  @IsNotEmpty({ message: 'ქალაქის ველი არ უნდა იყოს ცარიელი!' })
  city: string;

  @IsNotEmpty({ message: 'მისამართის ველი არ უნდა იყოს ცარიელი!' })
  address: string;
}
