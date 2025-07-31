export interface IPaginationMetadata {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
  nextPage: number | null;
  prevPage: number | null;
  skipPagination: boolean;
}
