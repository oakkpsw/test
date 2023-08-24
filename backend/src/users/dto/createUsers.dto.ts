import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
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
  email: string;

  address: AddressDto;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  company: CompanyDto;
}

export class AddressDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  suite: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  zipcode: string;

  geo: GeoDto;
}

export class GeoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lat: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lng: string;
}

export class CompanyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  catchPhrase: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bs: string;
}
