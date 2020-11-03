import React, {PureComponent} from 'react';
import router from 'umi/router';
import {Tabs, Select, Form, Row, Col} from 'antd';
import DressContent from "../../component/DressContent";
import RightDress from '../../component/RightDress';
import StyleListCard from '../../component/styleListCard';
import axios from "../../util/axios";
import style from './index.less';
import sty from "../../component/dressContent.less";

const {TabPane} = Tabs;
const {Option} = Select;
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
    styleTypeArr: [],
    styleArr: [],
    patternTypeArr: [],
    patternArr: [],
    svgX:0,
    photoGroup:[],
    patternImg:''
  };

  componentDidMount() {
    let cWidth = this.dressTopDom.clientWidth;
    let svgX = cWidth / 2 -191.5;
    this.setState({svgX});
    this.queryPatternType();
    this.queryStyleByGender({
      gender: this.state.tabIndex
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
  handleTabChange = (key) => {
    this.setState({
      tabIndex: key,
      styleTypeArr: [],
      styleArr: []
    }, async () => {
      this.queryStyleByGender({
        gender: this.state.tabIndex
      });
    })
  };
  handleStyleTypeChange = (value) => {
    const {tabIndex} = this.state;
    this.setState({
      styleArr: []
    }, async () => {
      await this.queryStyleList({
        gender: tabIndex,
        style: value
      });
    })
  };
  handlePatternTypeChange = (value) => {
    this.setState({
      patternArr: []
    }, async () => {
      await this.queryPatternList({
        patternType: value
      });
    })
  };
  handleCoalesceData=(item,type)=>{
    console.info(`${type}-------->item:${JSON.stringify(item)}`);
    if(type ==='style'){
      this.setState({
        photoGroup:[item]
      },()=>{
        console.info(`更新photoGroup---${JSON.stringify(this.state.photoGroup)}`)
      })
    } else if(type ==='pattern'){
      this.setState({
        patternImg:item
      },()=>{
        console.info(`更新patternImg---${JSON.stringify(this.state.patternImg)}`)
      })
    }
  };
  handlePatternImgOperation=async (e, type,img)=>{
    e.preventDefault();
    if(type ==='clear'){
      this.setState({ patternImg:''});
    } else if(type ==='upload'){
      console.info('下载');
      let sourceIndex = img.lastIndexOf("\/"),
        sourceImgName = img.substr(sourceIndex + 1, img.length);
      console.info(sourceImgName);
      window.open(`http://106.14.210.21:8811/design/getPatternImgUpload?img=${sourceImgName}`)
    }
  };

  renderStyleTab(){
    let vDOM=[];
    const {styleTypeArr} = this.state;
    vDOM.push(<TabPane tab="女装模板" key="women">
      <div className={style.formWrapper}>
        <Form {...layout} name="control-hooks">
          <Form.Item name="gender" label="款式分类">
            <Select placeholder="请选择" allowClear onChange={this.handleStyleTypeChange}>
              {styleTypeArr.map(item => {
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
    </TabPane>);
    vDOM.push(<TabPane tab="男装模板" key="men">
      <div className={style.formWrapper}>
        <Form {...layout} name="control-hooks">
          <Form.Item name="gender" label="款式分类">
            <Select placeholder="请选择" allowClear onChange={this.handleStyleTypeChange}>
              {styleTypeArr.map(item => {
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
    </TabPane>);
    vDOM.push(<TabPane tab="童装模板" key="kids">
      <div className={style.formWrapper}>
        <Form {...layout} name="control-hooks">
          <Form.Item name="gender" label="款式分类">
            <Select placeholder="请选择" allowClear onChange={this.handleStyleTypeChange}>
              {styleTypeArr.map(item => {
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
    </TabPane>);
    return  <Tabs onChange={this.handleTabChange} type="card" activeKey={this.state.tabIndex}>{vDOM}</Tabs>
  }
  renderStyleArr() {
    let vDOM = [];
    let {styleArr} = this.state;
    styleArr.forEach(item => {
      let {sourceImg} = item;
      vDOM.push(
        <Col key={Math.random()} style={{marginLeft: '10px', marginTop: '10px'}}>
          <StyleListCard
            picAddress={sourceImg}
            item={item}
            type="style"
            handleCoalesceData={this.handleCoalesceData}
          />
        </Col>
      )
    });
    return <Row type="flex">{vDOM}</Row>;
  }
  renderSvgInit(){
    const {photoGroup,svgX} = this.state;
    let vDOM=[];
    photoGroup.forEach(item=>{
      let {bgImg,fImg,wbgImg} = item;
      vDOM.push(<svg key={Math.random()} style={{ width: "100%",height:"100%"}}>
          <defs>
            <mask id="mask1">
              <image xlinkHref={wbgImg} preserveAspectRatio="none" x={svgX} y="10" width="383" height="450"/>
            </mask>
          </defs>
          <image xlinkHref={bgImg} preserveAspectRatio="none" x={svgX} y="10" width="383" height="450"/>
          <image xlinkHref={wbgImg} preserveAspectRatio="none" x={svgX} y="10" width="383" height="450"/>
          <rect x={svgX} y="10" width="383" height="450" fill="#ffffff" mask="url('#mask1')"/>
          <image xlinkHref={fImg} preserveAspectRatio="none" x={svgX} y="10" width="383" height="450"/>
      </svg>);
    });
    return vDOM;
  }
  renderSvgCoalesce(){
    const {photoGroup,svgX,patternImg} = this.state;
    let vDOM=[];
    photoGroup.forEach(item=>{
      let {bgImg,fImg,wbgImg} = item;
      vDOM.push(<svg key={Math.random()} style={{ width: "100%",height:"100%"}}>
        <defs>
          <pattern x="0" y="0" width="240" height="339.20000000000005" patternUnits="userSpaceOnUse" id="pattern1"
                   viewBox="0 0 240 339.20000000000005" patternTransform="matrix(1,0,0,1,0,0)">
            <image xlinkHref={patternImg} preserveAspectRatio="none" x="0" y="0" width="240" height="339.20000000000005"/>
          </pattern>
          <mask id="mask1">
            <image xlinkHref={wbgImg} preserveAspectRatio="none" x={svgX} y="10" width="383" height="450"/>
          </mask>
        </defs>
        <image xlinkHref={bgImg} preserveAspectRatio="none" x={svgX} y="10" width="383" height="450"/>
        <rect x={svgX} y="10" width="383" height="450" fill="#ffffff" mask="url('#mask1')"/>
        <g x={svgX} y="10" width="383" height="450">
          <rect x={svgX} y="10" width="383" height="450" fill="url('#pattern1')" mask="url('#mask1')"/>
        </g>
        <image xlinkHref={fImg} preserveAspectRatio="none" x={svgX} y="10" width="383" height="450"/>
      </svg>);
    });
    return vDOM;
  }

  render() {
    const {leftWidth, rightWidth,photoGroup,patternImg} = this.state;
    const sizeWidth = parseInt(leftWidth) + parseInt(rightWidth);
    let mainWidth = `calc(100% - ${sizeWidth}px)`;
    return (
      <div className={style.dressWrapper}>
        <div className={style.leftWrapper} style={{width: leftWidth}}>
          <div className={style.leftMain} style={{width: leftWidth}}>
            {this.renderStyleTab()}
            {
              this.state.styleArr.length > 0 &&
              this.renderStyleArr()
            }
          </div>
        </div>
        <div style={{width: mainWidth, marginLeft: leftWidth}}>
          <div style={{padding: '24px', background: '#2f2f2f'}}>
            <div className={sty.dressContent}>
              <div className={sty.dressTop}  ref={(c) => {
                this.dressTopDom = c;
              }}>
                {
                  photoGroup.length>0 && patternImg==='' &&
                    this.renderSvgInit()
                }
                {
                  photoGroup.length>0 && patternImg!=='' &&
                  this.renderSvgCoalesce()
                }
              </div>
              {
                this.state.patternTypeArr.length > 0 &&
                <DressContent
                  patternTypeArr={this.state.patternTypeArr}
                  handlePatternTypeChange={this.handlePatternTypeChange}
                  patternArr={this.state.patternArr}
                  handleCoalesceData={this.handleCoalesceData}
                />
              }
            </div>
          </div>
        </div>
        <div className={style.rightWrapper} style={{width: rightWidth}}>
          <div className={style.rightMain} style={{width: rightWidth}}>
            <RightDress
              patternImg={this.state.patternImg}
              handlePatternImgOperation={this.handlePatternImgOperation}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Fitting;
