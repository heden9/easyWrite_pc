
export default {
  'GET /index.php/PC/Confirm': {
    code: 0,
    message: "",
    data: require('./mock/file.json')
  },
  'POST /index.php/PC/ShowFileInfo/tableData': {
    code: 0,
    message: "",
    data: require('./mock/fileDetail.json')

  },
  'POST /index.php/PC/ShowFileController/checkFileContent': (req, res) =>{
    res.send({
      code: 1,
      message: "错误",
      data: {
        url: "http://mgq.jblog.info/"
      }
    })
  },
  'POST /index.php/PC/User': {
    code: 1,
    message: "账号密码错误",
    data: {
      username: '谷田'
    }
  },
};
