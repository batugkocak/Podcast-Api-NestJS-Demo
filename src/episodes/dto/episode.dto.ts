import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateEpisodeDTO {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}
