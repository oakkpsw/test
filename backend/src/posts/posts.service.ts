import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CreatePostDTO } from './dto/createPost.dto';
import { ReplacePostDTO } from './dto/replacePost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { Post as PostModule, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { PostsModule } from './posts.module';
import { handlePrismaError } from '../handlePrismaError';

@Injectable()
export class PostsService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/posts/';
  constructor(private prismaService: PrismaService) {}
  async getAllPosts() {
    const response = await axios.get(this.serviceUrl);
    return response.data;
  }

  async getPostsByUserId(userId: number) {
    const response = await axios.get(this.serviceUrl + '?userId=' + userId);
    return response.data;
  }

  async getPostById(id: number) {
    const response = await axios.get(this.serviceUrl + id);
    return response.data;
  }

  async createPost(post: CreatePostDTO) {
    const response = await axios.post(this.serviceUrl, post);
    return response.data;
  }

  async replacePost(id: number, post: ReplacePostDTO) {
    const response = await axios.put(this.serviceUrl + id, post);
    return response.data;
  }

  async updatePost(id: number, post: UpdatePostDTO) {
    const response = await axios.patch(this.serviceUrl + id, post);
    return response.data;
  }

  async deletePost(id: number) {
    const response = await axios.delete(this.serviceUrl + id);
    return response.data;
  }

  // prisma service conenect mssql
  async getAllPostsFromDB(): Promise<PostModule[]> {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async getPostsByIdFromDB(id: number): Promise<PostModule> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id: Number(id) },
      });
      return post;
    } catch (error) {
      console.log(error);
      handlePrismaError(error);
    }
  }

  async createPostToDB(post: CreatePostDTO): Promise<PostModule> {
    try {
      const newPost = await this.prismaService.post.create({
        data: {
          ...post,
          id: undefined,
        },
      });
      return newPost;
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async replacePostToDB(id: number, post: ReplacePostDTO): Promise<PostModule> {
    try {
      const replacePost = await this.prismaService.post.update({
        data: {
          id: undefined,
          title: post.title ?? null,
          body: post.body ?? null,
          userId: Number(post.userId) ?? null,
        },
        where: { id: Number(id) },
      });

      return replacePost;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async updatePostToDB(id: number, post: UpdatePostDTO): Promise<PostModule> {
    try {
      const updatedPost = await this.prismaService.post.update({
        where: { id: Number(id) },
        data: { ...post, id: undefined },
      });
      return updatedPost;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async deletePostFromDB(id: number) {
    try {
      const deletedPost = await this.prismaService.post.delete({
        where: { id: Number(id) },
      });

      return 'Post deleted successfully';
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async getPostWithUser(id: number) {
    const postsWithUser = await this.prismaService.post.findMany({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    return postsWithUser[0] || [];
  }
}
