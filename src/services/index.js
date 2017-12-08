import request from '../utils/request';

export async function fetchInfo() {
  return request('/index.php/PC/Confirm');
}


export async function loginHandle({ userName, password }) {
  return request('/index.php/PC/User', {
    method: 'POST',
    withCredentials: true,
    data: JSON.stringify({ userName, password }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}


export async function fetchTableData({ id }) {
  return request('/index.php/PC/ShowFileInfo/tableData', {
    method: 'POST',
    withCredentials: true,
    data: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function fetchTableData2({ id }) {
  return request('/index.php/PC/Confirm/fileLoad', {
    method: 'POST',
    withCredentials: true,
    data: JSON.stringify({ filename: id }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function submitHandle(data) {
  return request('/index.php/PC/ShowFileInfo/checkFileContent', {
    method: 'POST',
    withCredentials: true,
    data: JSON.stringify({ ...data }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
}
