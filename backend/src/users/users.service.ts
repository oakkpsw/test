import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CreateUserDto } from './dto/createUsers.dto';
import { UpdateUserDto } from './dto/updateUsers.dto';
import { ReplaceUserDto } from './dto/replaceUsers.dto';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { buildUserDataObject, returnUserDataObject } from '../util';
import * as bcrypt from 'bcrypt';
import { handlePrismaError } from '../handlePrismaError';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users/';
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    const response = await axios.get(this.serviceUrl);
    return response.data;
  }

  async getUsersById(id: number) {
    const response = await axios.get(this.serviceUrl + id);
    return response.data;
  }

  async createUsers(user: CreateUserDto) {
    const response = await axios.post(this.serviceUrl, user);
    return response.data;
  }

  async updateUsers(id: number, user: ReplaceUserDto) {
    const response = await axios.put(this.serviceUrl + id, user);
    return response.data;
  }

  async updateUsersPatch(id: number, user: UpdateUserDto) {
    const response = await axios.patch(this.serviceUrl + id, user);
    return response.data;
  }

  async deleteUsers(id: number) {
    const response = await axios.delete(this.serviceUrl + id);
    return response.data;
  }

  async getUserbyUserID(id: number) {
    const response = await axios.get(this.serviceUrl + '?id=' + id);
    return response.data;
  }

  // prisma service conenect mssql
  async getAllUsersFromDB(): Promise<User[]> {
    try {
      const users = await this.prismaService.user.findMany();
      const transformedUsers = users.map((user) => returnUserDataObject(user));
      return transformedUsers;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async getUsersByIdFromDB(id: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: Number(id) },
      });
      return returnUserDataObject(user);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async createUsersToDB(user: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, roundsOfHashing);
      user.password = hashedPassword;
      const newUser = await this.prismaService.user.create({
        data: buildUserDataObject(user),
        // return this.prismaService.user.create({ createuserDTO });
      });

      return returnUserDataObject(newUser);
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async replaceUserToDB(id: number, user: ReplaceUserDto): Promise<User> {
    try {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, roundsOfHashing);
      }
      const replaceUser = await this.prismaService.user.update({
        where: { id: Number(id) },
        data: buildUserDataObject(user),
      });
      return returnUserDataObject(replaceUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async updateUsersToDB(id: number, user: UpdateUserDto): Promise<User> {
    try {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, roundsOfHashing);
      }
      const updatedUser = await this.prismaService.user.update({
        where: { id: Number(id) },
        data: buildUserDataObject(user),
      });
      return returnUserDataObject(updatedUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async deleteUsersFromDB(id: number) {
    try {
      const user = await this.prismaService.user.delete({
        where: { id: Number(id) },
      });

      return 'User deleted successfully';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async getUsersWithPosts(id: number) {
    try {
      const userWithPosts = await this.prismaService.user.findMany({
        where: {
          id: Number(id),
        },
        include: {
          posts: true,
        },
      });
      return userWithPosts[0]?.posts || [];
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async getUsersByEmailFromDB(email: string) {
    try {
      const user = await this.prismaService.user.findFirst({ where: { email: email } });
      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
