import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class LookupSchedulesDto {
  @ApiProperty({
    description: 'The number of items to return per page',
    default: 10,
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  limit: number;

  @ApiProperty({
    description: 'The page number',
    default: 1,
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  page: number;
}
