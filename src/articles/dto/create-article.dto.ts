import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  published?: boolean = false;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  body: string;
}
