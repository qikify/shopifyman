export type IFetchOptions = {
  params?: Record<string, string>,
  query?: Record<string, string>,
  headers?: Record<string, string>,
  body?: any,
  method?: string,
}
