import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InfinityPaginationResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  hasNextPage: boolean;
}

export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    total: number;

    @ApiProperty({
      type: Number,
      example: 1,
    })
    page: number;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
