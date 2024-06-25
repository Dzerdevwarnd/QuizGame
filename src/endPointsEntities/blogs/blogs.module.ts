import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaBlogsController } from '../sa/sa.blogs.contorller';
import { BlogsPgSqlRepository } from './blogs.PgSqlRepository';
import { BlogsController } from './blogs.controller';
import { BlogsEntity } from './blogs.entity';
import { Blog, BlogSchema } from './blogs.mongo.scheme';
import { BlogsMongoRepository } from './blogs.mongoRepository';
import { BlogsTypeOrmRepository } from './blogs.typeOrmRepository';
import { DeleteBlogUseCase } from './use-cases/deleteBlog';
import { FindBlogByIdUseCase } from './use-cases/findBlogById';
import { PostBlogUseCase } from './use-cases/postBlog';
import { ReturnBlogsWithPaginationUseCase } from './use-cases/returnBlogsWithPagination';
import { UpdateBlogUseCase } from './use-cases/updateBlog';

const useCases = [
  ReturnBlogsWithPaginationUseCase,
  DeleteBlogUseCase,
  FindBlogByIdUseCase,
  PostBlogUseCase,
  UpdateBlogUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogsEntity]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [
    BlogsMongoRepository,
    BlogsPgSqlRepository,
    BlogsTypeOrmRepository,
    ,
    ...useCases,
  ],
  controllers: [BlogsController, SaBlogsController],
  exports: [...useCases],
})
export class BlogsModule {}
//
