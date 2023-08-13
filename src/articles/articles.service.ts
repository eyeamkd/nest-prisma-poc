import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  async create(createArticleDto: CreateArticleDto) {
    const result = await this.prisma.article.create({ data: createArticleDto });
    if (!result) throw new BadRequestException('Could not create article');
    return result;
  }

  findAll() {
    return this.prisma.article.findMany({
      where: { published: true },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.article.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return result;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }

  async findAllDrafts() {
    return this.prisma.article.findMany({
      where: { published: false },
    });
  }
}
