import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsInt()
  @Min(0)
  price!: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;
}