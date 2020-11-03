import React, {PureComponent} from 'react';
import router from 'umi/router';
import {Form, message, Modal, Button, Card, Input} from 'antd';
import ResearchTable from "../../component/ResearchTable";
import axios from "../../util/axios";
import "./researchList.less";

const FormItem = Form.Item;

class ResearchList extends PureComponent {
  state = {
    researchData: [],
    modelVisible: false,
  };

  componentDidMount() {
    this.queryList();
  }
  queryList = async () => {
    let result = await axios({
      method: "GET",
      url: `/design/getResearch`,
    });
    const {data} = result;
    let dataList = [];
    for (const [index, val] of data.entries()) {
      const obj = {key: (index + 1)};
      Object.assign(val, obj);
      dataList.push(val);
    }
    this.setState({
      researchData: dataList
    });
  };
  handleModelAdd = (e) => {
    e.preventDefault();
    this.setState({
      modelVisible: true
    });
    this.props.form.resetFields(['modelName']);
  };
  handleModelCancel = () => {
    this.setState({
      modelVisible: false
    });
    this.props.form.resetFields(['modelName']);
  };
  handleModelSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (typeof values.modelName !== 'undefined' && values.modelName !== '') {
        let result = await axios({
          method: "POST",
          url: "/design/saveResearch",
          data: {
            modelName: values.modelName
          }
        });
        const {code, msg} = result;
        if (code === 200) {
          message.success(msg);
          this.setState({modelVisible: false});
          this.props.form.resetFields(['modelName']);
          await this.queryList();
        } else {
          message.error(msg);
        }
      } else {
        return false;
      }
    });
  };
  handleModelEdit = (record) => {
    this.setState({
      modelVisible: true,
    }, () => {
      this.props.form.setFieldsValue({
        modelName: record.model_name
      });
    });
  };
  handleModelDel = (record) => {
    const _this = this;
    Modal.confirm({
      title: '确认要删除吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        let result = await axios({
          method: "POST",
          url: "/design/delResearch",
          data: {
            modelName: record.model_name,
          }
        });
        const {code, msg} = result;
        if (code === 200) {
          message.success(msg);
          await _this.queryList();
        } else {
          message.error(msg);
        }
      },
    });
  };
  handleFollow = (e, modelName) => {
    e.preventDefault();
    router.push(`/follow?modelName=${modelName}`);
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{marginTop: "23px"}}>
        <Card bordered={false}>
          <div style={{marginTop: 16}}>
            <Button type="primary" onClick={(e) => {
              this.handleModelAdd(e)
            }}>新增</Button>
          </div>
          <ResearchTable
            data={this.state.researchData}
            handleModelEdit={this.handleModelEdit}
            handleModelDel={this.handleModelDel}
            handleFollow={this.handleFollow}
          />
          <Modal
            title="编辑"
            visible={this.state.modelVisible}
            onCancel={this.handleModelCancel}
            okText="保存"
            onOk={this.handleModelSubmit}
          >
            <Form layout="vertical" style={{marginTop: 8}}>
              <FormItem
                labelCol={{span: 5}}
                wrapperCol={{span: 15}}
                label="主题研发名称"
              >
                {getFieldDecorator('modelName', {
                  rules: [
                    {required: true, message: '请输入主题研发名称!'},
                  ],
                })(
                  <Input placeholder="请输入主题研发名称"/>
                )}
              </FormItem>
            </Form>
          </Modal>
        </Card>
      </div>
    );
  }
}

export default (Form.create()(ResearchList));
