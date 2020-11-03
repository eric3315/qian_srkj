import React, {PureComponent} from 'react';
import router from 'umi/router';
import {Tabs, Select, Form,Row, Col} from 'antd';
import DressContent from "../../component/DressContent";
import RightDress from '../../component/RightDress';
import StyleListCard from '../../component/styleListCard';

import axios from "../../util/axios";
import style from './index.less';

const {TabPane} = Tabs;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

class Fitting extends PureComponent {
  state = {
    leftWidth: "275px",
    rightWidth: '275px',
    tabIndex: "women",
    styleTypeArr:[],
    styleArr:[],
    patternTypeArr:[],
    patternArr:[]
  };
  componentDidMount(){
    this.queryPatternType();
    this.queryStyleByGender({
      gender:this.state.tabIndex
    });
  };
  queryStyleByGender = async (param) => {
    let result = await axios({
      method: "GET",
      url: `/design/getStyleByGender?gender=${param.gender || ''}`,
    });
    const {data} = result;
    this.setState({
      styleTypeArr: data
    });
  };
  queryStyleList = async (param) => {
    let result = await axios({
      method: "GET",
      url: `/design/getStyleList?gender=${param.gender || ''}&style=${param.style || ''}`,
    });
    const {data} = result;
    this.setState({
      styleArr: data
    });
  };
  queryPatternType = async () => {
    let result = await axios({
      method: "GET",
      url: `/design/getPatternType`,
    });
    const {data} = result;
    this.setState({
      patternTypeArr: data
    });
  };
  queryPatternList = async (param) => {
    let result = await axios({
      method: "GET",
      url: `/design/getPatternList?patternType=${param.patternType || ''}`,
    });
    const {data} = result;
    this.setState({
      patternArr: data
    });
  };
  handleTabChange=(key)=>{
    this.setState({
      tabIndex:key,
      styleTypeArr:[],
      styleArr:[]
    },async ()=>{
      this.queryStyleByGender({
        gender:this.state.tabIndex
      });
    })
  };
  handleStyleTypeChange=(value)=>{
    const {tabIndex} = this.state;
    this.setState({
      styleArr:[]
    },async ()=>{
      await this.queryStyleList({
        gender: tabIndex,
        style: value
      });
    })
  };
  handlePatternTypeChange=(value)=>{
    this.setState({
      patternArr:[]
    },async ()=>{
      await this.queryPatternList({
        patternType: value
      });
    })
  };
  renderStyleArr(){
    let vDOM=[];
    let {styleArr} = this.state;
    styleArr.forEach(item=>{
    let {sourceImg} = item;
      vDOM.push(
        <Col key={Math.random()} style={{marginLeft: '10px',marginTop: '10px'}}>
          <StyleListCard
            picAddress={sourceImg}
          />
        </Col>
      )
    });
    return <Row type="flex">{vDOM}</Row>;
  }
  render() {
    const {leftWidth, rightWidth,styleTypeArr} = this.state;
    const sizeWidth = parseInt(leftWidth) + parseInt(rightWidth);
    let mainWidth = `calc(100% - ${sizeWidth}px)`;
    return (
        <div className={style.dressWrapper}>
          <div className={style.leftWrapper} style={{width: leftWidth}}>
            <div className={style.leftMain} style={{width: leftWidth}}>
              <Tabs onChange={this.handleTabChange} type="card" activeKey={this.state.tabIndex}>
                <TabPane tab="女装模板" key="women">
                  <div className={style.formWrapper}>
                    <Form {...layout} name="control-hooks" >
                      <Form.Item name="gender" label="款式分类">
                        <Select placeholder="请选择" allowClear onChange={this.handleStyleTypeChange}>
                          {styleTypeArr.map(item=>{
                            return (
                              <Option key={Math.random()} value={item}>
                                {item}
                              </Option>
                            )
                          })
                          }
                        </Select>
                      </Form.Item>
                    </Form>
                  </div>
                </TabPane>
                <TabPane tab="男装模板" key="men">
                  <div className={style.formWrapper}>
                    <Form {...layout} name="control-hooks" >
                      <Form.Item name="gender" label="款式分类">
                        <Select placeholder="请选择" allowClear onChange={this.handleStyleTypeChange}>
                          {styleTypeArr.map(item=>{
                            return (
                              <Option key={Math.random()} value={item}>
                                {item}
                              </Option>
                            )
                          })
                          }
                        </Select>
                      </Form.Item>
                    </Form>
                  </div>
                </TabPane>
                <TabPane tab="童装模板" key="kids">
                  <div className={style.formWrapper}>
                    <Form {...layout} name="control-hooks" >
                      <Form.Item name="gender" label="款式分类">
                        <Select placeholder="请选择" allowClear onChange={this.handleStyleTypeChange}>
                          {styleTypeArr.map(item=>{
                            return (
                              <Option key={Math.random()} value={item}>
                                {item}
                              </Option>
                            )
                          })
                          }
                        </Select>
                      </Form.Item>
                    </Form>
                  </div>
                </TabPane>
              </Tabs>
              {/*模板*/}
              {
                this.state.styleArr.length>0 &&
                this.renderStyleArr()
              }
            </div>
          </div>
          <div style={{width: mainWidth, marginLeft: leftWidth}}>
            {
              this.state.patternTypeArr.length>0 &&
              <DressContent
                patternTypeArr={this.state.patternTypeArr}
                handlePatternTypeChange={this.handlePatternTypeChange}
                patternArr={this.state.patternArr}
              />
            }
          </div>
          <div className={style.rightWrapper} style={{width: rightWidth}}>
            <div className={style.rightMain} style={{width: rightWidth}}>
              <RightDress/>
            </div>
          </div>
        </div>
    )
  }
}
export default Fitting;
