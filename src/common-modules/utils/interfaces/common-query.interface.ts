import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { FindManyOptions, Repository } from 'typeorm';

export interface ICommonOptions<T> extends PaginatedQueryDto {
  repo: Repository<T>;
  queryOptions: FindManyOptions<T>;
  validSearchFields: (keyof T)[];
  validSortFields: (keyof T)[];
}
