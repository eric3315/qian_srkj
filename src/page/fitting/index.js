import React, {PureComponent} from 'react';
import {Tabs, Select, Form, Row, Col} from 'antd';
import DressContent from "../../component/DressContent";
import RightDress from '../../component/RightDress';
import StyleListCard from '../../component/styleListCard';
import axios from "../../util/axios";
import {getMatrix} from "../../util/utils";
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
    svgY:10,
    photoGroup:[],
    patternImg:'',
    zoomVal: 50,
    rotateVal:1,
    fillColor:"#ffffff",
    imageW:383,
    imageH:450,
    patternImgW:240,
    patternImgH:339.2,
    circulationFlag:1,   //1.全循环  2.垂直循环  3.水平循环  4.无循环
    dragX:0,
    dragY:0,
    scaleVal:0,
    matrixArr:[0.9998476951563913,0.01745240643728351,-0.01745240643728351,0.9998476951563913,-91.79404217406014,-115.80786724292781]
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
  querySVGUpload = async (param) => {
    let result = await axios({
      method: "POST",
      url: `/design/getSVGUpload`,
      data:{
        svg: param.svg
      }
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
      const {rotateVal,circulationFlag} = this.state;
      if(circulationFlag === 4){
        let position={
          "x": 0,
          "y": 0
        };
        let scale=1;
        let size={
          "width": 69,
          "height": 69.6
        };
        let matrix = await getMatrix(rotateVal,scale,position,size);
        this.setState({
          matrixArr:[matrix[0][0],matrix[1][0],matrix[0][1],matrix[1][1],matrix[0][2],matrix[1][2]]
        },()=>{
          console.info(`matrixArr-------->${this.state.matrixArr}`)
        });
      }

      this.setState({
        patternImg:item
      },()=>{
        console.info(`更新patternImg---${JSON.stringify(this.state.patternImg)}`)
      })
    }
  };
  handlePatternImgOperation=async (e, type,val)=>{
    e.preventDefault();
    if(type ==='clear'){
      this.setState({ patternImg:''});
    } else if(type ==='upload'){
      console.info('下载');
      let index = val.lastIndexOf("\/"),
        imgName = val.substr(index + 1, val.length);
        window.open(`http://106.14.210.21:8811/design/getPatternImgUpload?img=${imgName}`)
    } else if(type ==='zoom'){
      let newPatternImgW=this.state.patternImgW;
      let newPatternImgH=this.state.patternImgH;
      let newScaleVal = this.state.scaleVal;
      if(this.state.zoomVal < val){
        newPatternImgW = newPatternImgW + 6;
        newPatternImgH = newPatternImgH + 6;
        newScaleVal = newScaleVal - 3;
      } else if(this.state.zoomVal > val){
        newPatternImgW = newPatternImgW - 6;
        newPatternImgH = newPatternImgH - 6;
        newScaleVal = newScaleVal + 3;
      }
      this.setState({
        zoomVal:val,
        patternImgW:newPatternImgW,
        patternImgH:newPatternImgH,
        scaleVal: newScaleVal
      },()=>{
        console.info(`zoom-------->${this.state.zoomVal}`)
      });
    } else if(type ==='rotate'){
      const {circulationFlag} = this.state;
      let position={
        "x": 0,
        "y": 0
      };
      let size={
        "width": 191.5,
        "height": 225
      };
      let scale=1;
      if(circulationFlag === 4){
        position={
          "x": 0,
          "y": 0
        };
        scale=1;
        size={
          "width": 69,
          "height": 69.6
        };
      }
      let matrix = await getMatrix(val,scale,position,size);
      this.setState({
        rotateVal:val,
        matrixArr:[matrix[0][0],matrix[1][0],matrix[0][1],matrix[1][1],matrix[0][2],matrix[1][2]]
      },()=>{
        console.info(`rotate-------->${this.state.rotateVal}`)
      });
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
    if(val === 4){
      const {rotateVal} = this.state;
      let position={
        "x": 0,
        "y": 0
      };
      let scale=1;
      let size={
        "width": 69,
        "height": 69.6
      };
      let matrix = await getMatrix(rotateVal,scale,position,size);
      this.setState({
        matrixArr:[matrix[0][0],matrix[1][0],matrix[0][1],matrix[1][1],matrix[0][2],matrix[1][2]]
      },()=>{
        console.info(`matrixArr-------->${this.state.matrixArr}`)
      });
    }
    this.setState({
      circulationFlag:val
    },()=>{
      console.info(`更新circulationFlag：${this.state.circulationFlag}`)
    })
  };
  handleRectDown=(evn)=>{
    evn.preventDefault();
    const _self = this;
    let maskDOM = _self.maskDOM;
    console.dir(maskDOM)
    let drag = evn.currentTarget;
    // 获取原始鼠标距离body的x和y
    const sourceMouseX = evn.pageX;
    const sourceMouseY = evn.pageY;

    const moveHandler = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      if (drag) {
        // 获取鼠标最新坐标点到body的x和y
        const currentMouseX = evt.pageX;
        const currentMouseY = evt.pageY;
       console.info(evt.currentTarget)
        // 获取鼠标的偏移量
        const offsetX = currentMouseX - sourceMouseX;
        const offsetY = currentMouseY - sourceMouseY;

        console.info(`offsetX---:${offsetX}`);
        console.info(`offsetY---:${offsetY}`);

        const {matrixArr} = _self.state;
        let newMatrixArr=JSON.parse(JSON.stringify(matrixArr));
        newMatrixArr[4] = offsetX;
        newMatrixArr[5] = offsetY;
        _self.setState({
          matrixArr:newMatrixArr
        })
      }
    };
    const upHandler = function (evt) {
      if (drag) {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
      }
      drag = null;
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };
  handleSVGUpload=async (e)=>{
    e.preventDefault();
    await this.querySVGUpload({
      svg:``
    });
    // let svgDOM= this.svgDOM;
    // console.info(svgDOM.innerHTML);
    // let image = new Image();
    // image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">{svgDOM.innerHTML}</svg>))); //给图片对象写入base64编码的svg流
    // image.onload = function () {
    //   let canvas = document.createElement('canvas');  //准备空画布
    //   canvas.width = this.state.imageW;
    //   canvas.height = this.state.imageH;
    //
    //   let context = canvas.getContext('2d');  //取得画布的2d绘图上下文
    //   context.drawImage(image, 0, 0);
    //
    //   let a = document.createElement('a');
    //   a.href = canvas.toDataURL('image/png');  //将画布内的信息导出为png图片数据
    //   a.download = "MapByMathArtSys";  //设定下载名称
    //   a.click(); //点击触发下载
    // };

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
    const {photoGroup,patternImg,fillColor,imageW,imageH,patternImgW,patternImgH,rotateVal,circulationFlag,dragX,dragY,matrixArr} = this.state;
    let vDOM=[];
    let sxCos=1,sySin=0,sxSin=0,syCos=1;
    if(rotateVal >0){
        sxCos = syCos =(Math.cos(rotateVal / (180 / Math.PI))).toFixed(4);
        sySin = sxSin =(Math.sin(rotateVal / (180 / Math.PI))).toFixed(4);
    }
    if(circulationFlag ===1){
      photoGroup.forEach(item=>{
        let {bgImg,fImg,wbgImg} = item;
        vDOM.push(
          <div key={Math.random()} style={{
            margin: "20px auto",
            width: "383px",
            height: "450px"
          }}>
            <svg width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}>
              <defs>
                <pattern x="0" y="0" width={patternImgW} height={patternImgH} patternUnits="userSpaceOnUse" id="pattern1"
                         viewBox={`0 0 ${patternImgW} ${patternImgH}`} patternTransform={`matrix(${matrixArr[0]},${matrixArr[1]},${matrixArr[2]},${matrixArr[3]},${matrixArr[4]},${matrixArr[5]})`}>
                  <image href={patternImg} preserveAspectRatio="none" x="0" y="0" width={patternImgW} height={patternImgH}/>
                </pattern>
                <mask id="mask1" ref={(ref)=>this.maskDOM=ref}>
                  <image href={wbgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
                </mask>
              </defs>
              <image href={bgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
              <rect x="0" y="0"  width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
              <g x="0" y="0"  width={imageW} height={imageH}>
                <rect x="0" y="0"  width={imageW} height={imageH} fill="url('#pattern1')" mask="url('#mask1')"/>
              </g>
              <image href={fImg} preserveAspectRatio="none" x="0" y="0"  width={imageW} height={imageH}/>
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
            <svg width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}>
              <defs>
                <pattern x="0" y="0" width={patternImgW} height={patternImgH} patternUnits="userSpaceOnUse" id="pattern1"
                         viewBox={`0 0 ${patternImgW} ${patternImgH}`} patternTransform={`matrix(${matrixArr[0]},${matrixArr[1]},${matrixArr[2]},${matrixArr[3]},${matrixArr[4]},${matrixArr[5]})`}>
                  <image href={patternImg} preserveAspectRatio="none" x="0" y="0" width={patternImgW} height={patternImgH}/>
                </pattern>
                <mask id="mask1">
                  <image href={wbgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
                </mask>
              </defs>
              <image href={bgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
              <rect x="0" y="0"  width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
              <g x="0" y="0"  width={imageW} height={imageH}>
                <rect x="120" y="0"  width={imageW-240} height={imageH} fill="url('#pattern1')" mask="url('#mask1')"/>
              </g>
              <image href={fImg} preserveAspectRatio="none" x="0" y="0"  width={imageW} height={imageH}/>
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
            <svg width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}>
                <defs>
                  <pattern x="0" y="0" width={patternImgW} height={patternImgH} patternUnits="userSpaceOnUse" id="pattern1"
                           viewBox={`0 0 ${patternImgW} ${patternImgH}`} patternTransform={`matrix(${matrixArr[0]},${matrixArr[1]},${matrixArr[2]},${matrixArr[3]},${matrixArr[4]},${matrixArr[5]})`}>
                    <image href={patternImg} preserveAspectRatio="none" x="0" y="0" width={patternImgW} height={patternImgH}/>
                  </pattern>
                  <mask id="mask1">
                    <image href={wbgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
                  </mask>
                </defs>
                <image href={bgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
                <rect x="0" y="0"  width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
                <g x="0" y="0"  width={imageW} height={imageH}>
                  <rect x="0" y="160"  width={imageW} height={imageH-310} fill="url('#pattern1')" mask="url('#mask1')"/>
                </g>
                <image href={fImg} preserveAspectRatio="none" x="0" y="0"  width={imageW} height={imageH}/>
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
            <svg width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}>
              <defs>
                <mask id="mask1">
                  <image href={wbgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
                </mask>
              </defs>
              <image href={bgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
              <rect x="0" y="0"  width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
              <g x="0" y="0"  width={imageW} height={imageH} mask="url('#mask1')">
                <image href={patternImg} preserveAspectRatio="none" width={patternImgW-102} height={patternImgH-200}
                       transform={`matrix(${matrixArr[0]},${matrixArr[1]},${matrixArr[2]},${matrixArr[3]},${matrixArr[4]},${matrixArr[5]})`}/>
              </g>
              <image href={fImg} preserveAspectRatio="none" x="0" y="0"  width={imageW} height={imageH}/>
            </svg>
          </div>);
        // if(rotateVal === 0){
        //   vDOM.push(
        //     <div key={Math.random()} style={{
        //       margin: "20px auto",
        //       width: "383px",
        //       height: "450px"
        //     }}>
        //       <svg width="383px" height="450px" onMouseDown={(e)=>{this.handleRectDown(e)}}>
        //         <defs>
        //           <mask id="mask1">
        //             <image href={wbgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
        //           </mask>
        //         </defs>
        //         <image href={bgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
        //         <rect x="0" y="0"  width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
        //         <g x="0" y="0"  width={imageW} height={imageH} mask="url('#mask1')">
        //           <image href={patternImg} preserveAspectRatio="none"  x="125" y="170" width={patternImgW-102} height={patternImgH-200}
        //                  transform={`matrix(${matrixArr[0]},${matrixArr[1]},${matrixArr[2]},${matrixArr[3]},${matrixArr[4]},${matrixArr[5]})`}/>
        //         </g>
        //         <image href={fImg} preserveAspectRatio="none" x="0" y="0"  width={imageW} height={imageH}/>
        //       </svg>
        //     </div>);
        // }
        // else {
        //   vDOM.push(
        //     <div key={Math.random()} style={{
        //       margin: "20px auto",
        //       width: "500px",
        //       height: "500px"
        //     }}>
        //       <svg width="500px" height="500px" onMouseDown={(e)=>{this.handleRectDown(e)}}>
        //         <defs>
        //           <mask id="mask1">
        //             <image href={wbgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
        //           </mask>
        //         </defs>
        //         <image href={bgImg} preserveAspectRatio="none" x="0" y="0" width={imageW} height={imageH}/>
        //         <rect x="0" y="0"  width={imageW} height={imageH} fill={fillColor} mask="url('#mask1')"/>
        //         <g x="0" y="0"  width={imageW} height={imageH} mask="url('#mask1')">
        //           <image href={patternImg} preserveAspectRatio="none" width={patternImgW-102} height={patternImgH-200}
        //                  transform={`matrix(${matrixArr[0]},${matrixArr[1]},${matrixArr[2]},${matrixArr[3]},${matrixArr[4]},${matrixArr[5]})`}/>
        //         </g>
        //         <image href={fImg} preserveAspectRatio="none" x="0" y="0"  width={imageW} height={imageH}/>
        //       </svg>
        //     </div>);
        // }
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
