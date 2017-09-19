import request from '../utils/request';

export async function fetchInfo() {
  return request('/Home/Confirm');
}
