import axios from 'axios';
import { message } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await axios(url, options);
  console.log('v 2.0.0');
  checkStatus(response);
  const { data, code } = response;
  if (code === 2) {
    location.href = '/';
  }
  const ret = {
    ...data,
    headers: {},
  };

  return ret;
}
