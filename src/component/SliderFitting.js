import React, { PureComponent } from "react";
import {Slider, Icon} from 'antd';

class SliderFitting extends PureComponent {
  state = {
    sliderValue: 0,
  };
  componentDidMount() {
    const {values} = this.props;
    this.setState({
      sliderValue:values
    })
  }

  increase = (e) => {
    let {type,handlePatternImgOperation} = this.props;
    const {sliderValue} = this.state;
    if(type ==='zoom'){
      let newSliderValue=100;
      if(sliderValue < 100){
        newSliderValue = sliderValue + 1;
      }
      this.setState({sliderValue: newSliderValue});
      handlePatternImgOperation(e,type,newSliderValue);
    } else if(type ==='rotate'){
      let newSliderValue=360;
      if(sliderValue < 360){
        newSliderValue = sliderValue + 1;
      }
      this.setState({sliderValue: newSliderValue});
      handlePatternImgOperation(e,type,newSliderValue);
    }
  };

  decline = (e) => {
    let {type,handlePatternImgOperation} = this.props;
    const {sliderValue} = this.state;
    if(type ==='zoom'){
      let newSliderValue=0;
      if(sliderValue > 0){
        newSliderValue = sliderValue - 1;
      }
      this.setState({sliderValue: newSliderValue});
      handlePatternImgOperation(e,type,newSliderValue);
    } else if(type ==='rotate'){
      let newSliderValue=1;
      if(sliderValue > 1){
        newSliderValue = sliderValue - 1;
      }
      this.setState({sliderValue: newSliderValue});
      handlePatternImgOperation(e,type,newSliderValue);
    }
  };

  render() {
    const {type,optionTitle,values} = this.props;
    return (
      <div>
        <span style={{fontSize: '15px', color: '#778899', fontWeight: "bold"}}>{optionTitle}</span>
        {
          values >= 10 &&
          <span style={{marginLeft: "5px"}}>{values}%</span>
        }
        {
          values < 10 &&
          <span style={{marginLeft: "14px"}}>{values}%</span>
        }
        <span onClick={(e)=>{this.decline(e)}}><Icon type="minus-circle" style={{
          fontSize: "20px",
          color: "#778899",
          marginLeft:"10px",
          verticalAlign: "middle"
        }}/></span>
        <div style={{
          display: "inline-block",
          width:'105px',
          marginLeft:"10px",
          marginTop: "15px"
        }} >
          {
            type ==='zoom' &&
              <Slider
                max={100}
                min={1}
                tooltipVisible={false}
                value={this.state.sliderValue}
              />
          }
          {
            type ==='rotate' &&
            <Slider
              max={360}
              min={1}
              tooltipVisible={false}
              value={this.state.sliderValue}
            />
          }
        </div>
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
export default SliderFitting;

