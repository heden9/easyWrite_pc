
export default {
  'GET /Home/Confirm': {
    code: 0,
    message: "",
    data: require('./mock/file.json')
  },
  'POST /PC/index.php/ShowFileInfo/tableData': {
    code: 0,
    message: "",
    data: require('./mock/fileDetail.json')

  },
  'POST /PC/index.php/ShowFileController/checkFileContent': {
    code: 0,
    message: "",
    data: {
      url: "http://mgq.jblog.info/"
    }
  },
  'POST /PC/index.php/User': {
    code: 0,
    message: "",
    data: {
      username: '谷田'
    }
  },
};
