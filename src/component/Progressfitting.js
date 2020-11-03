import React, { PureComponent } from "react";
import {Progress, Icon} from 'antd';

class ProgressFitting extends PureComponent {
  state = {
    percent: 0,
  };
  componentDidMount() {
    const {values} = this.props;
    this.setState({
      percent:values
    })
  }

  increase = (e) => {
    let {type,handlePatternImgOperation} = this.props;
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
    handlePatternImgOperation(e,type,percent);
  };

  decline = (e) => {
     let {type,handlePatternImgOperation} = this.props;
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
    handlePatternImgOperation(e,type,percent);
  };

  render() {
    const {optionTitle} = this.props;
    return (
      <div>
        <span style={{fontSize: '15px', color: '#778899', fontWeight: "bold"}}>{optionTitle}</span>
        <span onClick={(e)=>{this.decline(e)}}><Icon type="minus-circle" style={{
          fontSize: "20px",
          color: "#778899",
          marginLeft:"10px",
          verticalAlign: "middle"
        }}/></span>
        <div style={{
          display: "inline-block",
          width:'125px',
          marginLeft:"10px",
          marginTop: "15px"
        }} ><Progress percent={this.state.percent}/></div>
        <span onClick={(e)=>{this.increase(e)}}><Icon type="plus-circle" style={{
          fontSize: "20px",
          color: "#778899",
          marginLeft:"5px",
          verticalAlign: "middle"
        }}/></span>
      </div>
    )
  }
}
export default ProgressFitting;

