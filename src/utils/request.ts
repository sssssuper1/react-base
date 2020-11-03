import { stringify } from 'query-string';

export type Responese = Promise<{ err: Error | null; data: any }>;

export interface ICheckStatusProps {
  response: Response;
  options?: any;
  url?: string;
}

interface ErrorWithResponse extends Error {
  response?: Response;
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error: ErrorWithResponse = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response: Response) {
  return response.json();
}

export default function request(url: string, options: RequestInit) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function get(url: string, params: any = {}) {
  const _url = `${url}?${stringify(params, { arrayFormat: 'comma', skipEmptyString: true })}`;
  return request(_url, {
    method: 'GET',
  });
}

export function post(url: string, params: any = {}, form = false) {
  let body;
  if (form) {
    const formData = new FormData();
    Object.keys(params).forEach(key => params[key] && formData.append(key, params[key]));
    body = formData;
  } else {
    body = params;
  }
  return request(url, {
    method: 'POST',
    body,
  });
}
