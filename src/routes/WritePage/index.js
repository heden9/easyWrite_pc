import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import { message, Input, Icon, Modal, Form, Spin, Button } from 'antd';
import './style.less';

const FormItem = Form.Item;
const opeC = [{ title: '操作', dataIndex: 'ope', width: 70 }];
const userAgent = navigator.userAgent;
const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //android终端
const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
class WritePage extends React.PureComponent {
  state = {
    columns: [],
    dataSource: [],
    modalVisible: false,
    modalData: null,
  };
  componentWillMount() {
    this.props.dispatch({type: 'tableData/fetch', payload: { id: this.props.id }})
  }

  componentWillReceiveProps({ data }) {
    if (data == null) {
      return;
    }
    this.setState({
      columns: data.columns.map(item => ({ ...item, width: 70 })),
      dataSource: data.dataSource,
    });
  }
  _editModal = (item) => {
    this.setState({
      modalData: item,
      modalVisible: true,
    });
  };
  _toggleModal = (modalVisible) => {
    this.setState({
      modalVisible,
    });
  };
  _submitHandle = (values) => {
    this.setState({
      modalVisible: false,
      dataSource: this.state.dataSource.map((item) => {
        if (item.index === this.state.modalData.index) {
          return {
            ...item,
            ...values,
          };
        } else {
          return item;
        }
      }),
    }, () => {
      message.success('修改成功！');
      this.props.dispatch({type: 'tableData/save', payload: {
        [this.props.id]: {
          status: this.props.data.status,
          fileName: this.props.data.fileName,
          version: this.props.data.version,
          dataSource: this.state.dataSource,
          columns: this.state.columns
        }
      }})
    });
  };
  render() {
    const {loading, data} = this.props;
    if (data) {
      const newColumns = data.status === 0 ? this.state.columns.concat(opeC) : this.state.columns;
      const newDataSource = this.state.dataSource.map((item, index) => ({
        ...item,
        ope: <a onClick={this._editModal.bind(null, item)}><Icon type="edit" />修改</a>,
      }));
      return (
        <div className="table-container">
          <Helmet>
            <title>{data.fileName}</title>
            {
              isAndroid &&
              <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0"/>
            }
          </Helmet>
          {
            data.status === 0 &&
            <Button type="primary" className="submit-button" loading={loading}>
              提交
            </Button>
          }
          {
            this.state.modalData &&
            <NewModalForm
              key={`modal${this.state.modalData.index}`}
              columns={this.state.columns}
              _submitHandle={this._submitHandle}
              _toggleModal={this._toggleModal}
              modalData={this.state.modalData}
              modalVisible={this.state.modalVisible}
            />
          }
          <table
            className="table-body"
            style={{ width: this.state.columns.length * 70 + 100 }}
          >
            <tbody>
            <tr>
              {
                newColumns.map((item) => {
                  return (
                    <th key={item.title} style={{ width: item.width }}>{item.title}</th>
                  );
                })
              }
            </tr>
            {
              newDataSource.map((trItem, index) => {
                return (
                  <tr key={`tr${index}`} className="row-section">
                    {
                      newColumns.map((tdItem, index) => {
                        return (
                          <td key={tdItem.dataIndex + index}>{trItem[tdItem.dataIndex]}</td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      );
    }else{
      return (
        <Spin size={'large'}/>
      )
    }
  }
}


function ModalForm(props) {
  const { modalData, columns, modalVisible, _toggleModal, _submitHandle } = props;
  const { getFieldDecorator } = props.form;
  const submitHandle = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        _submitHandle && _submitHandle(values);
      }
    });
  };
  return (
    <Modal
      maskClosable={false}
      title={`修改第${modalData.index}行数据`}
      wrapClassName="vertical-center-modal"
      visible={modalVisible}
      onOk={submitHandle}
      onCancel={_toggleModal.bind(null, false)}
    >
      <Form>
        {
          columns.map((item) => {
            if (item.dataIndex !== 'index') {
              return (
                <FormItem
                  key={item.title}
                  label={item.title}
                >
                  {getFieldDecorator(item.dataIndex, {
                    initialValue: modalData[item.dataIndex],
                  })(
                    <Input />,
                  )}
                </FormItem>
              );
            }
          })
        }
      </Form>
    </Modal>
  );
}
const NewModalForm = Form.create()(ModalForm);
function mapStateToProps({ loading: { models: { tableData } }, tableData: data }, { match: { params } }) {
  return {
    loading: tableData,
    data: data[params.id],
    id: params.id
  };
}

export default connect(mapStateToProps)(WritePage);
