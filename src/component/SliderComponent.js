import React, { PureComponent } from "react";
import {Slider, Icon} from 'antd';
import "./sliderComponent.less";

class SliderComponent extends PureComponent {
    state = {
        sliderValue: 0,
    };
    componentDidMount() {
        const {sliderValue} = this.props;
        this.setState({
            sliderValue
        })
    }

    increase = () => {
        let {modelName,stepName,optionTitle,handleOptionsFourth,max,cardinal} = this.props;
        let sliderValue = this.state.sliderValue + cardinal;
        if (sliderValue > max) {
            sliderValue = max;
        }
        this.setState({ sliderValue });
        handleOptionsFourth(sliderValue,optionTitle,stepName,modelName);
    };

    decline = () => {
        let {modelName,stepName,optionTitle,handleOptionsFourth,min,cardinal} = this.props;
        let sliderValue = this.state.sliderValue - cardinal;
        if (sliderValue < min) {
            sliderValue = min;
        }
        this.setState({ sliderValue });
        handleOptionsFourth(sliderValue,optionTitle,stepName,modelName);
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
                    verticalAlign: "middle",
                    lineHeight: "1.5"
                }}/></span>
                <div style={{
                    display: "inline-block",
                    width:'100px',
                    marginLeft:"10px",
                    marginTop: "15px"
                }} >
                    <Slider
                        marks={this.props.marks}
                        min={this.props.min}
                        max={this.props.max}
                        step={null}
                        tooltipVisible={false}
                        value={this.state.sliderValue}
                    /></div>
                {/*<span style={{fontSize: "10px", marginLeft: "10px", width: "35px", height:"20px", display: "inline-block"}}>{this.props.sliderValue}{this.props.unit}</span>*/}
                <span onClick={this.increase}>
                    <Icon type="plus-circle" style={{
                        fontSize: "20px",
                        color: "#ffffff",
                        marginLeft:"10px",
                        verticalAlign: "middle",
                        lineHeight: "1.5"
                    }}/>
                </span>
            </div>
        )
    }
}
export default SliderComponent;

