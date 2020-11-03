import React, { PureComponent } from "react";
import {Row, Col,Button} from 'antd';
import { SketchPicker,AlphaPicker  } from 'react-color';

class ColourAtla extends PureComponent {
  state = {
    background: '',
    color: {
      a: 1,
      h: 0,
      l: 1,
      s: 0
    }
  };
  componentDidMount(){
    const {background} = this.props;
    this.setState({background});
  }
  handleChangeComplete = (color) => {
    this.setState({
      background: color.hex,
      color:color.hsl
    });
    this.props.handleChangeFillColor(color.hex);
  };
  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col span={14}>
          <SketchPicker disableAlpha={true} pointer={AlphaPicker} width={140} color={this.state.background}
                        onChangeComplete={this.handleChangeComplete}/>
        </Col>
        <Col span={4}>
          <AlphaPicker direction='vertical' height='100%' width={12} color={ this.state.color }
                       onChangeComplete={ this.handleChangeComplete }/>
        </Col>
        <Button style={{width: '100%', margin: '18px 18px 0 18px'}}>下载试衣效果</Button>
      </Row>
    )
  }
}

export default ColourAtla;
