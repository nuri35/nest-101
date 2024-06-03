import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class LookupSchedulesDto {
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  limit: number;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  page: number;
}
