import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class Pagination {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(250)
  pagesize: number;

  constructor(page?: number, pagesize?: number) {
    if (page !== undefined && page >= 0) this.page = page;
    if (pagesize !== undefined && pagesize > 0) this.pagesize = pagesize;
  }
}
