import request from '../utils/request';

export async function fetchInfo() {
  return request('/index.php/PC/Confirm');
}


export async function loginHandle({ userName, password }) {
  return request('/index.php/PC/User', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ userName, password}),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}


export async function fetchTableData({ id }) {
  return request('/index.php/PC/ShowFileInfo/tableData', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}



export async function submitHandle(data) {
  return request('/index.php/PC/ShowFileController/checkFileContent', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({...data}),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
