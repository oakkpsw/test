import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export class ReplaceUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string | null = null;

  address?: AddressDto;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone?: string | null = null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  website?: string | null = null;

  company?: CompanyDto;
}

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  street?: string | null = null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  suite?: string | null = null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  city?: string | null = null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  zipcode?: string | null = null;
  
  geo?: GeoDto;
}

export class GeoDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lat?: string | null = null;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lng?: string | null = null;
}

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  catchPhrase?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  bs?: string;
}
