import {  IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReplacePostDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  userId: number | null = null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string | null = null;

  @IsOptional()
  @IsString()
  body: string | null = null;
}
