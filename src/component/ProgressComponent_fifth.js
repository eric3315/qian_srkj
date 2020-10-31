import React, { PureComponent } from "react";
import {Progress, Icon} from 'antd';

class ProgressComponentFifth extends PureComponent {
  state = {
    percent: 0,
  };
  componentDidMount() {
    const {values} = this.props;
    this.setState({
      percent:values
    })
  }

  increase = () => {
    let {modelName,stepName,optionTitle,handleOptionsFifth} = this.props;
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
    handleOptionsFifth(percent,optionTitle,stepName,modelName);
  };

  decline = () => {
     let {modelName,stepName,optionTitle,handleOptionsFifth} = this.props;
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
    handleOptionsFifth(percent,optionTitle,stepName,modelName);
  };

  render() {
    const {optionTitle} = this.props;
    return (
      <div>
        <span style={{fontSize: '15px', color: '#ffffff', fontWeight: "bold"}}>{optionTitle}</span>
        <span onClick={this.decline}><Icon type="minus-circle" style={{
          fontSize: "20px",
          color: "#ffffff",
          marginLeft:"10px",
          verticalAlign: "middle"
        }}/></span>
        <div style={{
          display: "inline-block",
          width:'125px',
          marginLeft:"10px",
          marginTop: "15px"
        }} ><Progress percent={this.state.percent} /></div>
        <span onClick={this.increase}><Icon type="plus-circle" style={{
          fontSize: "20px",
          color: "#ffffff",
          marginLeft:"5px",
          verticalAlign: "middle"
        }}/></span>
      </div>
    )
  }
}
export default ProgressComponentFifth;

