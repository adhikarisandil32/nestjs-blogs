import { ILike } from 'typeorm';
import { ICommonOptions } from '../interfaces/common-query.interface';

export async function findAllPaginatedData<Entity>(
  options: ICommonOptions<Entity>,
): Promise<[Entity[], number]> {
  const sorting = {};
  const search = {};

  if (options.validSortFields.includes(options.sortField as keyof Entity)) {
    sorting[options.sortField] =
      options.sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }

  if (options.validSearchFields.includes(options.searchField as keyof Entity)) {
    search[options.searchField] = ILike(`%${options.search ?? ''}%`);
  }

  const currentPage = +(options.page ?? 1) > 1 ? +(options.page ?? 1) : 1;
  const limit = +(options.limit ?? 10);
  const offset = (currentPage - 1) * limit;

  options.queryOptions = {
    ...options.queryOptions,
    where: { ...(options.queryOptions.where ?? {}), ...search },
    order: { ...sorting },
    ...(options.skipPagination ? {} : { take: limit, skip: offset }),
  };

  return await options.repo.findAndCount(options.queryOptions);
}
