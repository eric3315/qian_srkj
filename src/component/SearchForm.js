import React from 'react';
import {Row, Col, Form, Select, Button} from 'antd';
import styles from "../page/test/index.less";

const {Option} = Select;
class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domainArr: ["ali-cloud.com1", "ali-cloud.com2", "ali-cloud.com3", "ali-cloud.com4"],
        }
    }
    handleClick=()=>{
        let { form: { getFieldsValue } } = this.props;
        let feild = getFieldsValue();
        console.log(feild)
        this.props.handleSearchClick(feild)
    };
    // getDomain = (value) => {
    //   this.props.handleDomain(value)
    // };
    // getIsp = (value) => {
    //   console.log(value)
    //   this.props.handleIsp(value)
    // };
    // renderSource = () => {
    //   const {sourceBtnArr} = this.props;
    //   let vDOM = [];
    //   sourceBtnArr.forEach(item => {
    //     vDOM.push(<Col key={Math.random()} style={{marginRight: '4px'}}>
    //       <Button onClick={(e) => this.props.handleClickLn(e, item)} type={`${item.type}`}
    //               size="small">{item.val}</Button>
    //     </Col>)
    //   });
    //   return vDOM;
    // };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {domainArr,ispArr,operatorArr} = this.props;
        return (<div>
                <Form className={styles.pkForm} layout="inline" >
                    <Row>
                        <Col>
                            <Form.Item>
                                {getFieldDecorator('flow', {
                                    initialValue: "100Mbps",
                                })(
                                    <Select
                                        allowClear
                                        showSearch
                                        placeholder="请选择"
                                        style={{width: '100px'}}
                                    >
                                        <Option key={1} value="1">100Mbps</Option>
                                        <Option key={2} value="2">500Mbps</Option>
                                        <Option key={3} value="3">1Gbps</Option>
                                        <Option key={4} value="4">10Gbps</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="域名">
                                {getFieldDecorator('domain', {
                                })(
                                    <Select
                                        allowClear
                                        showSearch
                                        placeholder="域名"
                                        style={{width: '140px'}}
                                    >
                                        {
                                            domainArr.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="区域运营商">
                                {getFieldDecorator('operator', {
                                })(
                                    <Select
                                        allowClear
                                        showSearch
                                        placeholder="区域运营商"
                                        style={{width: '140px'}}
                                    >
                                        {
                                            ispArr.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="节点">
                                {getFieldDecorator('isp', {
                                })(
                                    <Select
                                        allowClear
                                        showSearch
                                        placeholder="节点"
                                        style={{width: '140px'}}
                                    >
                                        {
                                            operatorArr.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item}>{item}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                <span className={styles.searchBtn}>
                  <Button icon="search" type="primary" htmlType="button" style={{width: '82px'}} onClick={this.handleClick}>查询</Button>
                </span>
                        </Col>
                    </Row>
                    <Row style={{float: 'right'}}>
                        <Col>
                            <Form.Item>
                                {getFieldDecorator('time', {
                                })(
                                    <Select
                                        allowClear
                                        showSearch
                                        placeholder="最近一天"
                                        style={{width: '120px'}}
                                    >

                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default (Form.create()(SearchForm)) ;

