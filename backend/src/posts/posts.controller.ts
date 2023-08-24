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
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/createPost.dto';
import { ReplacePostDTO } from './dto/replacePost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { Post as PostModule } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(@Query('userId') userId?: number) {
    if (userId === undefined || userId === null) {
      return this.postsService.getAllPosts();
    } else {
      return this.postsService.getPostsByUserId(userId);
    }
  }

  @Get('db')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getAllPostsFromDB(@Res() res: Response) {
    try {
      const post = await this.postsService.getAllPostsFromDB();
      res.status(HttpStatus.CREATED).json(post);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to get post' });
    }
  }

  @Get('db/:id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getPostByIdDB(@Param('id') id: number, @Res() res: Response) {
    try {
      const post = await this.postsService.getPostsByIdFromDB(id);
      res.status(HttpStatus.CREATED).json(post);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to get post' });
    }
  }

  @Get('db/post-with-user/:id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getPostWithUser(@Param('id') id: number, @Res() res: Response) {
    try {
      const post = await this.postsService.getPostWithUser(id);
      res.status(HttpStatus.CREATED).json(post);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to get post' });
    }
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() post: CreatePostDTO) {
    return this.postsService.createPost(post);
  }

  @Post('db')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createPostDB(@Body() post: CreatePostDTO, @Res() res: Response) {
    try {
      const newPost = await this.postsService.createPostToDB(post);
      res.status(HttpStatus.CREATED).json(newPost);
    } catch (error) {
      console.log(error)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Put(':id')
  async replacePost(@Param('id') id: number, @Body() post: ReplacePostDTO) {
    return this.postsService.replacePost(id, post);
  }
  @Put('db/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async replacePostDB(@Param('id') id: number, @Body() post: ReplacePostDTO) {
    return this.postsService.replacePostToDB(id, post);
  }

  @Patch(':id')
  async updatePostPatch(@Param('id') id: number, @Body() post: UpdatePostDTO) {
    return this.postsService.updatePost(id, post);
  }

  @Patch('db/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateUser(
    @Param('id') id: number,
    @Body() post: UpdatePostDTO,
  ): Promise<PostModule> {
    return this.postsService.updatePostToDB(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }

  @Delete('db/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteUsersFromDB(@Param('id') id: number, @Res() res: Response) {
    try {
      const post = await this.postsService.deletePostFromDB(id);
      res.status(HttpStatus.OK).json(post);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to deleted post' });
    }
  }
}
