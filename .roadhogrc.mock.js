
export default {
  'GET /Home/Confirm': require('./mock/file.json'),
  'POST /PC/index.php/ShowFileInfo/tableData': require('./mock/fileDetail.json'),
  'POST /PC/index.php/User': {
    code: 0,
    message: "",
    data: {
      url: "http://mgq.jblog.info/"
    }
  },
};
