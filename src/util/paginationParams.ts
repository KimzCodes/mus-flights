const paginationParams = (
  paginationQuery: URLSearchParams,
  pageSize: number
) => {
  const params = new URLSearchParams(paginationQuery);
  const urlSize = (params.get("size") ?? pageSize) as number;
  const urlSelectedPage = (params.get("page") ?? 1) as number;

  return { urlSize, urlSelectedPage };
};

export default paginationParams;
