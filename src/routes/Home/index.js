import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import './style.less';

import { Upload, Icon, message, notification, Button } from 'antd';
const Dragger = Upload.Dragger;

const ButtonGroup = Button.Group;
function mapStateToProps({ file: { fileList }, loading }) {
  return {
    fileList,
    loading: loading.effects['file/fetch'],
  }
}
export default connect(mapStateToProps)(class Home extends React.Component {
  handleChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      const { code, filename, message: msg } = info.file.response;
      if (code === 0){
        message.success(`${info.file.name} file uploaded successfully.`);
        this.props.dispatch({ type: 'file/save', payload: { fileList: info.fileList}});
      }else {
        message.error(`${info.file.name} ${msg}.`);
      }
    } else if (status === 'error') {
      const { code, filename, message: msg } = info.file.response;
      message.error(`${info.file.name} ${msg}.`);
    } else if (status === 'removed') {
      this.props.dispatch({ type: 'file/save', payload: { fileList: info.fileList }});
    }
  };
  render() {
    const props = {
      name: 'file',
      defaultFileList: this.props.fileList.map((item, index) => ({name: item.name, uid: index, status: 'done'})),
      multiple: true,
      showUploadList: true,
      action: '/index.php/PC/Confirm/upload',
      onChange: this.handleChange,
      onPreview: (file) => {
        if(file.status !== 'error'){
          let name = file.name;
          this.props.dispatch(routerRedux.push(`/write/${name}`))
        }
      }
    };
    return (
      <div style={{ marginTop: 16, height: 180 }}>
        {
          this.props.loading ||
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此处</p>
              <p className="ant-upload-hint">点击下方文件列表下载或编辑</p>
            </Dragger>
        }
      </div>
    );
  }
})
