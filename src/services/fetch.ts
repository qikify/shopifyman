import type { IFetchOptions } from '../types';

const parseJSON = (response: any) => {
  let data = {};

  try {
    data = JSON.parse(response && response.responseText || response);
  } catch (error) {
    data = { error };
  }

  return data;
};

const responseInterceptor = (response: any) => {
  const data = {
    statusCode: response.status,
    ok: response.ok,
  };

  return new Promise(resolve => response.text()
    .then((res: any) => resolve({
      ...data,
      json: response.status === 302 ? {} : parseJSON(res),
    }))
    .catch((error: any) => resolve({ json: error })),
  );
};

const customFetch = async (endpoint: string, options?: IFetchOptions): Promise<any> => {
  const token = await window.shopify.idToken();
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  let queryString = '';

  if (options?.query) {
    const { query } = options;

    Object.keys(query).forEach(key => query[key] === undefined && delete query[key]);
    queryString = `?${new URLSearchParams(query)}`;
  }

  return new Promise((resolve, reject) => {
    fetch(`${endpoint}${queryString}`, {
      ...(options || {}),
      headers: {
        ...defaultHeaders,
        ...(options?.headers || {}),
      },
    })
      .then(responseInterceptor)
      .then((response: any) => {
        if (response.ok) {
          return resolve(response);
        }

        return reject(response);
      })
      .catch((error: Record<string, any>) => {
        console.log('Request error', error);
        reject(new Error(error.message));
      });
  });
};

const _get = (endpoint: string, options?: IFetchOptions) => customFetch(endpoint, options);

const _post = (endpoint: string, options?: IFetchOptions) => customFetch(endpoint, {
  ...options,
  method: 'POST',
});

const _put = (endpoint: string, options?: IFetchOptions) => customFetch(endpoint, {
  ...options,
  method: 'PUT',
});

const _patch = (endpoint: string, options?: IFetchOptions) => customFetch(endpoint, {
  ...options,
  method: 'PATCH',
});

const _delete = (endpoint: string, options?: IFetchOptions) => customFetch(endpoint, {
  ...options,
  method: 'DELETE',
});

export const graphql = async ({ query, variables }: {query: string, variables?: Record<string, any>}) => {
  try {
    const url = 'shopify:admin/api/2024-10/graphql.json';

    const data = await _post(url, {
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    return data;
  } catch (_) {
    throw new Error('GraphQL not response');
  }
};

export const fetchFunction = {
  get: _get,
  post: _post,
  put: _put,
  patch: _patch,
  delete: _delete,
  graphql,
};
