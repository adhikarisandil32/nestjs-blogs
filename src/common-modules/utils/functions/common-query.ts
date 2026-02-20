import { ILike } from 'typeorm';
import { ICommonOptions } from '../interfaces/common-query.interface';

export async function findAllPaginatedData<Entity>(
  options: ICommonOptions<Entity>,
): Promise<[Entity[], number]> {
  const sorting = {};
  const search = {};

  const alias = 'repo';
  const qb = options.repo.createQueryBuilder(alias);

  if (options.validSortFields.includes(options.sortField as keyof Entity)) {
    // sorting[options.sortField] =
    //   options.sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const columnName = `${alias}.${options.sortField}`;
    qb.orderBy(columnName, options.sortOrder);
  }

  const tsvSearchField = options.validSearchFields
    .filter(
      (validSf: string) =>
        validSf.includes(options.searchField) && validSf.startsWith('@@'),
    )
    .map((sf: string) => sf.replace('@@', ''))[0];

  if (tsvSearchField && options.search?.trim().length > 0) {
    const columnName = `${alias}.${tsvSearchField}`;
    qb.orWhere(`${columnName} @@ to_tsquery('english', :search)`, {
      search: options.search
        .split(/\s+/) // because split on " " fails on multiple spaces
        .map((word) => `${word.trim()}:*`)
        .join(' & '),
    });
  }

  if (options.validSearchFields.includes(options.searchField as keyof Entity)) {
    // search[options.searchField] = ILike(`%${options.search ?? ''}%`);
    const columnName = `${alias}.${options.searchField}`;
    qb.where(`${columnName} ILIKE :search`, {
      search: `%${options.search ?? ''}%`,
    });
  }

  const currentPage = +(options.page ?? 1) > 1 ? +(options.page ?? 1) : 1;
  const limit = (options.limit ?? 10) < 10 ? 10 : (options.limit ?? 10);
  const offset = (currentPage - 1) * limit;

  options.queryOptions = {
    ...options.queryOptions,
    where: { ...(options.queryOptions.where ?? {}), ...search },
    order: { ...sorting },
    ...(options.skipPagination ? {} : { take: limit, skip: offset }),
  };

  // console.log(options.queryOptions);

  return await qb.getManyAndCount();
}
