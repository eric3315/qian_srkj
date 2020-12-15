import React, { PureComponent } from 'react';
import {Row, Col, Icon, Modal, Tabs, Radio, Card, Spin} from 'antd';
import ReactHighcharts from 'react-highcharts';
import style from './chartsPublic.less';

const {TabPane} = Tabs;

class HighChartsP extends PureComponent {
    state ={
        visible: false,
        loading: false,
        datePickerShow: false,
        customizeShow: false,
        config:{}
    };
    componentDidMount(){
        this.initChart()
    }

    initChart=()=>{
        let {optionsData:{data,name,type}}=this.props;
        let config = {
            title: {
                text: null,
                    useHTML: true,
                    align: 'left',
                    style: {"color": "#333333", "fontSize": "12px"}
            },
            xAxis: {
                type: 'datetime',
                    dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%m-%d',
                        week: '%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                }
            },
            tooltip: {
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%Y-%m-%d',
                        week: '%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                }
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                type,
                name,
                data
            }],
            credits: {
                enabled: false
            }
        };
        this.setState({
            config
        })
    };

    handleChartsClick = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({
            visible: false,
        });
    };
    onModelChange = () => {

    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    handleRadioChange = (e) => {
        if (e.target.value && e.target.value === '自定义') {
            this.setState({
                datePickerShow: true
            })
        } else if (e.target.value && e.target.value === '自定义对比日期') {
            this.setState({
                customizeShow: true
            })
        }
    };
    renderTitle(name,decName){
        return <p>{name} <span style={{color: '#949494', fontSize: '12px'}}>({decName})</span></p>
    }
    render() {
        const {optionsData} = this.props;
        const {visible, datePickerShow, customizeShow} = this.state;
        return (<div style={{marginTop: '20px'}}>
                <Row type="flex" justify="space-between" style={{marginBottom: '10px'}}>
                    <Col>
                        <p>{optionsData.name}<span style={{color: '#949494', fontSize: '12px'}}>({optionsData.decName})</span></p>
                    </Col>
                    <Col>
                        <Icon type="search" className={style.curveIcon} style={{fontSize: '12px'}}
                              onClick={this.handleChartsClick.bind(this)}/>
                        <Modal
                            width='1000px'
                            title={this.renderTitle(optionsData.name,optionsData.decName)}
                            visible={visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            bodyStyle={{padding: '6px 12px 12px'}}
                        >
                            <Tabs defaultActiveKey="1" onChange={this.onModelChange}>
                                <TabPane tab="区间对比" key="1">
                                    <Row type='flex' justify="space-between" style={{marginTop: '16px'}}>
                                        <Col>
                                            <span>时间：</span>
                                            <Radio.Group defaultValue="3小时" buttonStyle="outline" onChange={this.handleRadioChange}>
                                                <Radio.Button value="3小时">3小时</Radio.Button>
                                                <Radio.Button value="12小时">12小时</Radio.Button>
                                                <Radio.Button value="一天">一天</Radio.Button>
                                                <Radio.Button value="自定义">自定义</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                        {datePickerShow &&
                                        <Col>
                                            <p>我是自定义时间选择</p>
                                        </Col>
                                        }
                                    </Row>
                                    <Card style={{marginTop: '14px', borderRadius: ' 2px'}}>
                                        <Spin spinning={this.state.loading} delay={500}>
                                            <ReactHighcharts config={this.state.config}/>
                                        </Spin>
                                    </Card>
                                </TabPane>
                                <TabPane tab="时间对比" key="2">
                                    <Row type="flex" justify="space-between" style={{marginTop: '16px'}}>
                                        <Col>
                                            <span>对比：</span>
                                            <Radio.Group defaultValue="昨天同比" buttonStyle="outline" onChange={this.handleRadioChange}>
                                                <Radio.Button value="昨天同比">昨天同比</Radio.Button>
                                                <Radio.Button value="上周同比">上周同比</Radio.Button>
                                                <Radio.Button value="自定义对比日期">自定义对比日期</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                        {customizeShow &&
                                        <Col>
                                            <p>我是自定义对比时间选择</p>
                                        </Col>
                                        }
                                    </Row>
                                    <Card style={{marginTop: '14px', borderRadius: ' 2px'}}>
                                        <Spin spinning={this.state.loading} delay={500}>
                                            <ReactHighcharts config={this.state.config}/>
                                        </Spin>
                                    </Card>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                </Row>
                <ReactHighcharts config={this.state.config}/>
            </div>
        );
    }
}

export default HighChartsP;
