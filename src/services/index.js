import request from '../utils/request';

export async function fetchInfo() {
  return request('/Home/Confirm');
}


export async function loginHandle({ userName, password}) {
  return request('/PC/index.php/User', {
    method: 'POST',
    mode: "cors",
    credentials: 'include',
    body: `userName=${userName}&password=${password}`,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}


export async function fetchTableData({ id }) {
  return request('/PC/index.php/ShowFileInfo/tableData', {
    method: 'POST',
    mode: "cors",
    credentials: 'include',
    body: `id=${id}`,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}
