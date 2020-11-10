import React, {PureComponent} from 'react';
import {Tabs, Select, Form, Row, Col} from 'antd';
import DressContent from "../../component/DressContent";
import RightDress from '../../component/RightDress';
import StyleListCard from '../../component/styleListCard';
import axios from "../../util/axios";
import {covertSVG2Image} from "../../util/utils";
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
    photoGroup:[],
    patternImg:'',
    zoomVal: 50,
    rotateVal:0,
    fillColor:"#ffffff",
    imageW:383,
    imageH:450,
    patternImgW:240,
    patternImgH:339.2,
    circulationFlag:1,   //1.全循环  2.垂直循环  3.水平循环  4.无循环
    scaleVal:0,
    matrixArr:"",
    rotate:'0, 0 0',
    scale:1,
    translate:'0,0'
  };
  componentDidMount() {
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
  handleCoalesceData=async (item,type)=>{
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
  handlePatternImgOperation=async (type,val)=>{
    if(type ==='clear'){
      this.setState({ patternImg:''});
    } else if(type ==='upload'){
      let index = val.lastIndexOf("\/"),
        imgName = val.substr(index + 1, val.length);
        window.open(`http://106.14.210.21:8811/design/getPatternImgUpload?img=${imgName}`)
    } else if(type ==='zoom'){
      const {rotateVal,translate} = this.state;
      let newTranslateArr = translate.split(',');
      let scale = val/50;
      let position={
        "x": 0,
        "y": 0
      },size={
        "width": 191.5,
        "height": 225
      };
      if(this.state.circulationFlag === 1){
        position={
          "x": 383 - (383 * scale),
          "y": 450 - (450 * scale)
        };
        size={
          "width": (383 * scale) / 2,
          "height": (450 * scale) / 2
        };
      } else if(this.state.circulationFlag === 2){
        position={
          "x": 120 - (143 * scale),
          "y": 450 - (450 * scale)
        };
        size={
          "width": (143 * scale) / 2,
          "height": (450 * scale) / 2
        };
      } else if(this.state.circulationFlag  === 3){
        position={
          "x": 383 - (383 * scale),
          "y": 160 - (140 * scale)
        };
        size={
          "width": (383 * scale) / 2,
          "height": (140 * scale) / 2
        };
      } else if(this.state.circulationFlag  === 4){
        position ={
          "x": (383 / 2) - ((383 / 3) * scale / 2),
          "y": (450 / 2) - ((450 / 3) * scale / 2)
        };
        size={
          "width": (383 / 2) - ((383 / 3) * scale),
          "height": (450 / 2) - ((450 / 3) * scale)
        };
      }
      console.info(position)
      console.info(size)
      newTranslateArr[0] = position.x;
      newTranslateArr[1] = position.y;
      this.setState({
        zoomVal:val,
        scale:val/50,
        translate:`${newTranslateArr[0]},${newTranslateArr[1]}`
      },()=>{
        let str ="",rotate="";
        if(this.state.circulationFlag  === 4){
          str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${rotateVal},${size.width/3} ${size.height/3})`;
          rotate = `${rotateVal},${size.width/3} ${size.height/3}`;
        } else {
          str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${rotateVal},${size.width} ${size.height})`;
        }
        this.setState({
          rotate,
          matrixArr:str
        },()=>{
          console.info(`rotate-------->${this.state.rotate}`)
        });
      })
    }
    else if(type ==='rotate'){
      // const {zoomVal} = this.state;
      // let scale = zoomVal/50;
      // let size={
      //   "width": 191.5,
      //   "height": 225
      // };
      // if(val === 1){
      //   size={
      //     "width": (383 * scale) / 2,
      //     "height": (450 * scale) / 2
      //   };
      // } else if(val === 2){
      //   size={
      //     "width": (143 * scale) / 2,
      //     "height": (450 * scale) / 2
      //   };
      // } else if(val === 3){
      //   size={
      //     "width": (383 * scale) / 2,
      //     "height": (140 * scale) / 2
      //   };
      // } else if(val === 4){
      //   size={
      //     "width": (383 / 2) * scale,
      //     "height": (450 / 2) * scale
      //   };
      // }
      // let str ="",rotate="";
      // if(this.state.circulationFlag  === 4){
      //   str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${val},${size.width/3} ${size.height/3})`;
      //   rotate = `${val},${size.width/3} ${size.height/3}`;
      // } else {
      //   str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${val},${size.width/3} ${size.height/3})`;
      //   rotate =`${val},${size.width} ${size.height}`
      // }
      // this.setState({
      //   rotateVal:val,
      //   rotate,
      //   matrixArr:str
      // },()=>{
      //   console.info(`rotate-------->${this.state.rotateVal}`)
      // });



      let size={
        "width": 191.5,
        "height": 225
      };
     if(this.state.circulationFlag === 4){
        let str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${val},${size.width/3} ${size.height/3})`;
        this.setState({
          rotateVal:val,
          rotate:`${val},${size.width/3} ${size.height/3}`,
          matrixArr:str
        },()=>{
          console.info(`rotate-------->${this.state.rotateVal}`)
        });
      } else {
        if(this.state.circulationFlag === 2){
          size={
            "width": 71.5,
            "height": 225
          };
        } else if(this.state.circulationFlag === 3){
          size={
            "width": 191.5,
            "height": 70
          };
        }
       let str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${val},${size.width} ${size.height})`;
       this.setState({
         rotateVal:val,
         rotate:`${val},${size.width} ${size.height}`,
         matrixArr:str
       },()=>{
         console.info(`rotate-------->${this.state.rotateVal}`)
       });
     }
    }
  };
  handleChangeFillColor=(val)=>{
    this.setState({
      fillColor:val
    },()=>{
      console.info(`更新fillColor：${this.state.fillColor}`)
    })
  };
  handleChangeCirculation=async (e,val)=>{
    e.preventDefault();
    this.setState({
      translate:'0,0'
    },()=>{
      const {zoomVal,rotateVal,translate} = this.state;
      let newTranslateArr = translate.split(',');
      let scale = zoomVal/50;
      let position={
        "x": 0,
        "y": 0
      },size={
        "width": 191.5,
        "height": 225
      };
      if(val === 1){
        position={
          "x": 383 - (383 * scale),
          "y": 450 - (450 * scale)
        };
        size={
          "width": (383 * scale) / 2,
          "height": (450 * scale) / 2
        };
      } else if(val === 2){
        position={
          "x": 120 - (143 * scale),
          "y": 450 - (450 * scale)
        };
        size={
          "width": (143 * scale) / 2,
          "height": (450 * scale) / 2
        };
      } else if(val === 3){
        position={
          "x": 383 - (383 * scale),
          "y": 160 - (140 * scale)
        };
        size={
          "width": (383 * scale) / 2,
          "height": (140 * scale) / 2
        };
      } else if(val === 4){
        position ={
          "x": (383 / 2) - ((383 / 3) * scale / 2),
          "y": (450 / 2) - ((450 / 3) * scale / 2)
        };
        size={
          "width": (383 / 2) - ((383 / 3) * scale),
          "height": (450 / 2) - ((450 / 3) * scale)
        };
      }
      newTranslateArr[0] = position.x;
      newTranslateArr[1] = position.y;
      this.setState({
        circulationFlag:val,
        translate:`${newTranslateArr[0]},${newTranslateArr[1]}`
      },()=>{
        console.info(`translate--->:${this.state.translate}`);
        console.info(`更新circulationFlag：${this.state.circulationFlag}`);
        let str ="",rotate="";
        if(this.state.circulationFlag  === 4){
          str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${rotateVal},${size.width/3} ${size.height/3})`;
          rotate = `${rotateVal},${size.width/3} ${size.height/3}`;
        } else {
          str = `translate(${this.state.translate})  scale(${this.state.scale})  rotate(${rotateVal},${size.width} ${size.height})`;
          rotate = `${rotateVal},${size.width} ${size.height}`;
        }
        this.setState({
          rotate,
          matrixArr:str
        },()=>{
          console.info(`rotate-------->${this.state.rotate}`)
        });
      });
    })
  };
  handleRectDown=(evn)=>{
    evn.preventDefault();
    const _self = this;
    // 获取原始鼠标距离body的x和y
    let positionArr = _self.state.translate.split(',');// 图片初始位置
    const sourceMouseX = evn.pageX - positionArr[0]/1;
    const sourceMouseY = evn.pageY - positionArr[1]/1;
    const moveHandler = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      // 获取鼠标最新坐标点到body的x和y
      const currentMouseX = evt.pageX;
      const currentMouseY = evt.pageY;

      // 获取鼠标的偏移量
      const offsetX = currentMouseX - sourceMouseX;
      const offsetY = currentMouseY - sourceMouseY;

      let str = `translate(${offsetX},${offsetY})  scale(${_self.state.scale})  rotate(${_self.state.rotate})`;
      _self.setState({
        matrixArr:str,
        translate:`${offsetX},${offsetY}`
      })
    };
    const upHandler = function () {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };
  handleSVGUpload=async (e)=>{
    e.preventDefault();
    await covertSVG2Image(this.svgDOM,"try_makeup","500","800");
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
    const {photoGroup,fillColor,imageW,imageH} = this.state;
    let vDOM=[];
    photoGroup.forEach(item=>{
      let {bgImg,fImg,wbgImg} = item;
      vDOM.push(
        <div key={Math.random()} style={{
          margin: "20px auto",
          width: "383px",
          height: "450px"
        }}>
          <svg width="383px" height="450px">
            <defs>
              <mask id="mask1">
                <image href={wbgImg} preserveAspectRatio="none"  x="0" y="0" width={imageW} height={imageH}/>
              </mask>
            </defs>
            <image href={bgImg} preserveAspectRatio="none"  x="0" y="0" width={imageW} height={imageH}/>
            <image href={wbgImg} preserveAspectRatio="none"  x="0" y="0" width={imageW} height={imageH}/>
            <rect x="0" y="0" width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
            <image href={fImg} preserveAspectRatio="none"  x="0" y="0" width={imageW} height={imageH}/>
          </svg>
        </div>
        );
    });
    return vDOM;
  }
  renderSvgCoalesce(){
    const {photoGroup,patternImg,fillColor,imageW,imageH,patternImgW,patternImgH,circulationFlag,matrixArr} = this.state;
    let vDOM=[];
    if(circulationFlag ===1){
      photoGroup.forEach(item=>{
        let {bgImg,fImg,wbgImg} = item;
        vDOM.push(
          <div key={Math.random()} style={{
            margin: "20px auto",
            width: "383px",
            height: "450px"
          }}>
            <svg ref={(ref)=>this.svgDOM=ref} width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}} style={{cursor: "pointer"}}>
              <defs>
                <pattern width={patternImgW} height={patternImgH} patternUnits="userSpaceOnUse" id="pattern1"
                         viewBox={`0 0 ${patternImgW} ${patternImgH}`} patternTransform={matrixArr}>
                  <image href={patternImg} preserveAspectRatio="none" width={patternImgW} height={patternImgH}/>
                </pattern>
                <mask id="mask1">
                  <image href={wbgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
                </mask>
              </defs>
              <image href={bgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
              <rect width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
              <g width={imageW} height={imageH}>
                <rect width={imageW} height={imageH} fill="url('#pattern1')" mask="url('#mask1')"/>
              </g>
              <image href={fImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
            </svg>
          </div>
        );
      });
    }
    else if(circulationFlag ===2){
      photoGroup.forEach(item=>{
        let {bgImg,fImg,wbgImg} = item;
        vDOM.push(
          <div key={Math.random()} style={{
            margin: "20px auto",
            width: "383px",
            height: "450px"
          }}>
            <svg  ref={(ref)=>this.svgDOM=ref} width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}  style={{cursor: "pointer"}}>
              <defs>
                <pattern width={patternImgW} height={patternImgH} patternUnits="userSpaceOnUse" id="pattern1"
                         viewBox={`0 0 ${patternImgW} ${patternImgH}`} patternTransform={matrixArr}>
                  <image href={patternImg} preserveAspectRatio="none" width={patternImgW} height={patternImgH}/>
                </pattern>
                <mask id="mask1">
                  <image href={wbgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
                </mask>
              </defs>
              <image href={bgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
              <rect width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
              <g width={imageW} height={imageH}>
                <rect x="120" y="0"  width={imageW-240} height={imageH} fill="url('#pattern1')" mask="url('#mask1')"/>
              </g>
              <image href={fImg} preserveAspectRatio="none"  width={imageW} height={imageH}/>
            </svg>
          </div>);
      });
    }
    else if(circulationFlag ===3){
      photoGroup.forEach(item=>{
        let {bgImg,fImg,wbgImg} = item;
        vDOM.push(
          <div key={Math.random()} style={{
            margin: "20px auto",
            width: "383px",
            height: "450px"
          }}>
            <svg  ref={(ref)=>this.svgDOM=ref} width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}  style={{cursor: "pointer"}}>
                <defs>
                  <pattern width={patternImgW} height={patternImgH} patternUnits="userSpaceOnUse" id="pattern1"
                           viewBox={`0 0 ${patternImgW} ${patternImgH}`} patternTransform={matrixArr}>
                    <image href={patternImg} preserveAspectRatio="none" width={patternImgW} height={patternImgH}/>
                  </pattern>
                  <mask id="mask1">
                    <image href={wbgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
                  </mask>
                </defs>
                <image href={bgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
                <rect width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
                <g width={imageW} height={imageH}>
                  <rect x="0" y="160"  width={imageW} height={imageH-310} fill="url('#pattern1')" mask="url('#mask1')"/>
                </g>
                <image href={fImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
            </svg>
          </div>);
      });
    }
    else if(circulationFlag ===4){
      photoGroup.forEach(item=>{
        let {bgImg,fImg,wbgImg} = item;
        vDOM.push(
          <div key={Math.random()} style={{
            margin: "20px auto",
            width: "383px",
            height: "450px"
          }}>
            <svg  ref={(ref)=>this.svgDOM=ref} width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}  style={{cursor: "pointer"}}>
              <defs>
                <mask id="mask1">
                  <image href={wbgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
                </mask>
              </defs>
              <image href={bgImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
              <rect width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
              <g width={imageW} height={imageH} mask="url('#mask1')">
                <image href={patternImg} preserveAspectRatio="none" width={imageW/3} height={imageH/3}
                       transform={matrixArr}/>
              </g>
              <image href={fImg} preserveAspectRatio="none" width={imageW} height={imageH}/>
            </svg>
          </div>);
      });
    }
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
              handleChangeFillColor={this.handleChangeFillColor}
              zoomVal={this.state.zoomVal}
              rotateVal={this.state.rotateVal}
              circulationFlag={this.state.circulationFlag}
              handleChangeCirculation={this.handleChangeCirculation}
              handleSVGUpload={this.handleSVGUpload}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Fitting;
