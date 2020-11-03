import React, {PureComponent} from 'react';
import {Card, Divider, Row, Col,Button,Progress} from 'antd';
import { ChromePicker  } from 'react-color';
import {
  SyncOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import sty from './rightDress.less'


class RightDress extends PureComponent {
  state = {
    percent: 50,
    background: '#fff',
  };


  handleChangeComplete = (color) => {
    console.log(color)
    this.setState({ background: color.hex });
  };
  handleClick = (e) => {
    console.log(e)
  }
  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  };

  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  };

  render() {
    return (<div className={sty.rightContent}>
        <Card title={<p style={{marginBottom: '1px', fontWeight: 'bold'}}>图案应用</p>} size="small" bordered={false}
              style={{background: "none"}}>
          <Row className={sty.iconWrapper}>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px'}}>
              <SyncOutlined spin className={sty.iconCol} onClick={this.handleClick}/>
              <p className={sty.iconDes}>全循环</p>
            </Col>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px'}}>
              <SyncOutlined className={sty.iconCol}/>
              <p className={sty.iconDes}>垂直循环</p>
            </Col>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px'}}>
              <SyncOutlined className={sty.iconCol}/>
              <p className={sty.iconDes}>水平循环</p>
            </Col>
            <Col className={sty.iconColR} style={{textAlign: 'center', margin: '0 4px'}}>
              <SyncOutlined className={sty.iconCol}/>
              <p className={sty.iconDes}>恶循环</p>
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
                    <Button style={{width:'100%',background:'#cac7c7'}} onClick={(e)=>{this.props.handlePatternImgOperation(e,'clear',this.props.patternImg)}}>不使用图案</Button>
                  </Col>
                  <Col style={{position: 'absolute',bottom:'0', width: '100%'}}>
                    <Button type="danger" style={{width:'100%'}} onClick={(e)=>{this.props.handlePatternImgOperation(e,'upload',this.props.patternImg)}}>下载图案</Button>
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
              style={{background: "none"}}>
          <Row type="flex" style={{flexDirection:'row'}}>
            <Col>
              <span>缩放调整：</span>
              <MinusCircleOutlined onClick={this.decline}/>
              <Progress percent={this.state.percent} trailColor="red"/>
              <PlusCircleOutlined onClick={this.increase}/>
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
          <Row type="flex" justify="space-between">
            <Col span={14}>
              <ChromePicker  width={140}  onChangeComplete={ this.handleChangeComplete }/>
            </Col>
            <Col span={4}>
              <div style={{width:'12px',height:'100%',background:'blue'}}/>
            </Col>
            <Button  style={{width:'100%',margin:'18px 18px 0 18px'}}>下载试衣效果</Button>
          </Row>
        </Card>
      </div>
    );
  }
}

export default RightDress;
