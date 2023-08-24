import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password?: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  address?: AddressDto;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  website?: string;

  company?: CompanyDto;
}

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  street?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  suite?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  city?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  zipcode?: string;

  geo?: GeoDto;
}

export class GeoDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lat?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lng?: string;
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
