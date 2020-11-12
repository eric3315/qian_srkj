import React, {PureComponent} from 'react';
import {Card, Divider, Row, Col,Button} from 'antd';
import SliderFitting  from '../component/SliderFitting';
import ColourAtla from '../component/colourAtla';
import sty from './rightDress.less'
import iconFont from '../font/iconfont.css';


class RightDress extends PureComponent {

  render() {
    return (<div className={sty.rightContent}>
        <Card title={<p style={{marginBottom: '1px', fontWeight: 'bold'}}>图案应用</p>} size="small" bordered={false}
              style={{background: "none"}}>
          <Row className={sty.iconWrapper}>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px',cursor: "pointer"}}>
              <span className={`${iconFont.iconfont} ${iconFont.icon_xunhuan}`}
                    style={this.props.circulationFlag ===1 ? {display: "inline-block", color: "#1890ff"}:{display: "inline-block"}}
                    onClick={(e)=>{this.props.handleChangeCirculation(e,1)}}
              />
              <p className={sty.iconDes} style={this.props.circulationFlag ===1 ? {color: "#1890ff"}:null}>全循环</p>
            </Col>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px',cursor: "pointer"}}>
              <span className={`${iconFont.iconfont} ${iconFont.icon_icon_xunhuangoto}`}
                    style={this.props.circulationFlag ===2 ? {transform: "rotate(88deg)", display: "inline-block",color: "#1890ff"}:{transform: "rotate(88deg)", display: "inline-block"}}
                    onClick={(e)=>{this.props.handleChangeCirculation(e,2)}}
              />
              <p className={sty.iconDes}  style={this.props.circulationFlag ===2 ? {color: "#1890ff"}:null}>垂直循环</p>
            </Col>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px',cursor: "pointer"}}>
              <span className={`${iconFont.iconfont} ${iconFont.icon_icon_xunhuangoto}`}
                    style={this.props.circulationFlag ===3 ? {display: "inline-block",color: "#1890ff"}:{display: "inline-block"}}
                    onClick={(e)=>{this.props.handleChangeCirculation(e,3)}}
              />
              <p className={sty.iconDes}  style={this.props.circulationFlag ===3 ? {color: "#1890ff"}:null}>水平循环</p>
            </Col>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px',cursor: "pointer"}}>
              <span className={`${iconFont.iconfont} ${iconFont.icon_jinzhi}`}
                    style={this.props.circulationFlag ===4 ? {display: "inline-block",color: "#1890ff"}:{display: "inline-block"}}
                    onClick={(e)=>{this.props.handleChangeCirculation(e,4)}}
              />
              <p className={sty.iconDes}  style={this.props.circulationFlag ===4 ? {color: "#1890ff"}:null}>无循环</p>
            </Col>
          </Row>
        </Card>
        <Divider style={{margin: '0', background: '#e1e1e1'}}/>
        <Card title={<p style={{marginBottom: '1px', fontWeight: 'bold'}}>当前图案</p>}
              size="small"
              bordered={false}
              style={{background: "none"}}>
          {
            this.props.patternImg!=='' &&
            <Row type="flex" justify="space-around">
              <Col span={9}>
                <div style={{
                  width: "100px",
                  height: "80px",
                  border: "1px solid #d6e0d6"
                }}>
                  <img src={this.props.patternImg} alt="" style={{width:'100%',height:'80px'}}/>
                </div>
              </Col>
              <Col span={9} style={{display:'flex',flexDirection:'row'}}>
                <Row>
                  <Col className={sty.buttonType}>
                    <Button style={{width:'100%',background:'#cac7c7'}} onClick={async (e)=>{
                      e.preventDefault();
                      await this.props.handlePatternImgOperation('clear',this.props.patternImg)
                    }}>不使用图案</Button>
                  </Col>
                  <Col style={{position: 'absolute',bottom:'0', width: '100%'}}>
                    <Button type="danger" style={{width:'100%'}} onClick={async (e)=>{
                      e.preventDefault();
                      await this.props.handlePatternImgOperation('upload',this.props.patternImg)
                    }}>下载图案</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          }
          {
            this.props.patternImg==='' &&
            <Row type="flex" justify="space-around">
              <Col span={9}>
                <div style={{
                  width: "100px",
                  height: "80px",
                  border: "1px solid #d6e0d6"
                }}/>
              </Col>
            </Row>
          }
        </Card>
        <Divider style={{margin: '0', background: '#e1e1e1'}}/>
        <Card title={<p style={{marginBottom: '4px', fontWeight: 'bold'}}>图案调整</p>}
              size="small"
              bordered={false}
              bodyStyle={{paddingTop: 0}}
              style={{background: "none"}}>
          <Row type="flex" style={{flexDirection:'row'}}>
            <Col>
              <SliderFitting
                optionTitle="缩放"
                values={this.props.zoomVal}
                type="zoom"
                unit="%"
                handlePatternImgOperation={this.props.handlePatternImgOperation}
              />
            </Col>
            <Col>
              <SliderFitting
                optionTitle="旋转"
                values={this.props.rotateVal}
                type="rotate"
                unit="°"
                handlePatternImgOperation={this.props.handlePatternImgOperation}
              />
            </Col>
          </Row>
        </Card>
        <Divider style={{margin: '0', background: '#e1e1e1'}}/>
        <Card title={<p style={{marginBottom: '4px', fontWeight: 'bold'}}>底色调整</p>}
              size="small"
              bordered={false}
              style={{background: "none",paddingBottom:'20px'}}>
          <div style={{width:'120px'}}>

          </div>
          <div style={{width:'12px',height:'100%',background:'blue'}}/>
          <ColourAtla
            handleChangeFillColor={this.props.handleChangeFillColor}
            handleSVGUpload={this.props.handleSVGUpload}
          />
        </Card>
      </div>
    );
  }
}

export default RightDress;
