import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import './style.less';

import { Upload, Icon, message, notification, Button } from 'antd';
const Dragger = Upload.Dragger;

const ButtonGroup = Button.Group;

export default connect()(class Home extends React.Component {
  handleChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      const { code, filename, message: msg } = info.file.response;
      if (code === 0){
        message.success(`${info.file.name} file uploaded successfully.`);
      }else {
        message.error(`${info.file.name} ${msg}.`);
      }
    } else if (status === 'error') {
      const { code, filename, message: msg } = info.file.response;
      message.error(`${info.file.name} ${msg}.`);
    }
  };
  render() {
    const props = {
      name: 'file',
      multiple: true,
      showUploadList: true,
      action: '/index.php/PC/Confirm/upload',
      onChange: this.handleChange,
      onPreview: (file) => {
        if(file.status !== 'error'){
          this.props.dispatch(routerRedux.push(`/write/${file.response.filename}`))
        }
      }
    };
    return (
      <div style={{ marginTop: 16, height: 180 }}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此处</p>
          <p className="ant-upload-hint">点击下方文件列表下载或编辑</p>
        </Dragger>
      </div>
    );
  }
})
