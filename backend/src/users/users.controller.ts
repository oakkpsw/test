import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  Query,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUsers.dto';
import { UpdateUserDto } from './dto/updateUsers.dto';
import { ReplaceUserDto } from './dto/replaceUsers.dto';
import { User } from '@prisma/client';
import { ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'id', type: Number, required: false })
  async getUsers(@Query('id') id?: number) {
    if (id === undefined) {
      return this.usersService.getAllUsers();
    } else {
      return this.usersService.getUserbyUserID(id);
    }
  }

  @Get('db')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getAllUsersFromDB(@Res() res: Response) {
    try {
      const user = await this.usersService.getAllUsersFromDB();
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error });
    }
  }

  @Get('db/:id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getUsersByIdFromDB(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.getUsersByIdFromDB(id);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error });
    }
  }

  // @Get(':id/posts')
  // async getUsersWithPosts(@Param('id') id: number, @Res() res: Response) {
  //   return this.usersService.getUsersWithPosts(id);
  // }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUsersById(id);
  }

  @Post()
  async createUsers(@Body() user: CreateUserDto) {
    return this.usersService.createUsers(user);
  }

  @Post('db')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async createUser(@Body() user: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.createUsersToDB(user);
      res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Put(':id')
  async updateUsers(@Param('id') id: number, @Body() user: ReplaceUserDto) {
    console.log('ccc')
    return this.usersService.updateUsers(id, user);
  }

  @Put('db/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async replaceUser(
    @Param('id') id: number,
    @Body() user: ReplaceUserDto,
    @Res() res: Response,
  ) {
    console.log(user)
    return this.usersService.replaceUserToDB(id, user);
  }

  @Patch(':id')
  async updateUsersPatch(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateUsersPatch(id, user);
  }

  @Patch('db/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
    @Res() res: Response,
  ): Promise<User> {
    return this.usersService.updateUsersToDB(id, user);
  }
  @Delete(':id')
  async deleteUsers(@Param('id') id: number) {
    return this.usersService.deleteUsers(id);
  }

  @Delete('db/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteUsersFromDB(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.deleteUsersFromDB(id);
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to deleted user' });
    }
  }
}
