import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number | null = null;

  @IsNotEmpty()
  @IsString()
  title: string | null = null;

  @IsNotEmpty()
  @IsString()
  body: string | null = null;
}
