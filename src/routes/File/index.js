import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import './style.less';
import { Table,Input, Button, message, notification } from 'antd';
const openNotification = (type,message,description) => {
  notification[type]({
    message,
    description
  });
};
class Home extends React.PureComponent{
  state = {
    selectedRows: [],
    data: [],
    searchText: '',
    filtered: false,
    downloading: false
  };
  componentWillReceiveProps(nextProps) {
    if(this.props.version === nextProps.version){
      return;
    }
    let data = [];
    switch (this.props.params.id){
      case '1':
        data = [ ...nextProps['unwrite'].data ];break;
      case '2':
        data = [ ...nextProps['unconfirm'].data ];break;
      case '3':
        data = [ ...nextProps['unchecked'].data ];break;
      case '4':
        data = [ ...nextProps['finished'].data ];break;
    }
    this.dataSource = data;
    this.setState({
      data
    });
    message.success('数据已更新 :)');
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filtered: !!searchText,
      data: this.dataSource.map((record) => {
        const match = record['file_name'].match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record['file_name'].split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  checkDownload = () => {
    if(this.state.selectedRows.length === 0){
      openNotification('error', '导出失败 TnT', '请勾选文件');
      return;
    }
    this.setState({
      downloading: true
    });
    setTimeout(()=>{
      openNotification('success', '导出成功 :)', '');
      this.setState({
        downloading: false
      });
    },1000);
  };
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows: [...selectedRows]
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    const columns = [{
      title: '文件名称',
      dataIndex: 'file_name',
      render: (data, record) => (
        <Link to={`write/${record.id}`}>{data}</Link>
      )
    }, {
      title: '填写时间',
      dataIndex: 'submit_time',
    }, {
      title: '截止时间',
      dataIndex: 'task_time',
    }, {
      title: '备注',
      dataIndex: 'remark'
    }, {
      title: '状态',
      dataIndex: 'status',
      render: data => (
        <span className={'status'+this.props.params.id}>{data}</span>
      )
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: data => (
        <Link>{data}</Link>
      )
    }];
    const { loading } = this.props;
    return (
      <div id="home-container">
        <div className="filter-input">
          <Input
            placeholder="输入表名查询"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>查询</Button>
          <Button type="primary" className='download-btn'>打印</Button>
          <Button
            type="primary"
            loading={this.state.downloading}
            onClick={this.checkDownload}
            className='download-btn'>导出</Button>
        </div>
        <Table
          locale={{
            filterConfirm: '确定',
            emptyText: '暂无数据'
          }}
          rowSelection={rowSelection}
          loading={loading}
          columns={columns}
          bordered={true}
          rowClassName={()=>'rowClass'}
          rowKey={data=>data['file_name']+data['id']}
          dataSource={this.state.data} />
      </div>
    )
  }
}
function mapStateToProps({ loading: { models: { notify } }, notify: state}) {
  return {
    loading: notify,
    ...state
  }
}

export default connect(mapStateToProps)(Home);
