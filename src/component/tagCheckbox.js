import React, { PureComponent } from "react";
import { Checkbox,Radio } from 'antd';

const RadioGroup = Radio.Group;

class TagCheckbox extends PureComponent {
  renderCheckbox(){
    let {data} = this.props;
    if(data.length>0){
      if(typeof data[0] ==='string'){
        let vDOM = [];
        data.forEach((cur)=>{
          vDOM.push(<Checkbox key={Math.random()} value={cur}  style={{color:"#ffffff"}}>{cur}</Checkbox>)
        });
        return <Checkbox.Group style={{width:'100%'}} onChange={this.handleCheckGroup}>{vDOM}</Checkbox.Group>;
      } else {
        let vDOM = [];
        data.forEach((cur)=>{
          let {children_title,children_options} = cur;
          let checkDOM=[];
          if(children_options.length>0){
            children_options.forEach((item)=>{
              let {option_name,silhouette_flag,silhouettes} = item;
              let radioDOM=[];
              if(silhouettes.length>0){
                silhouettes.forEach((item)=>{
                  radioDOM.push(<Radio key={Math.random()} value={item} style={{color:"#ffffff"}}>{item}</Radio>)
                })
              }
              checkDOM.push(<div key={Math.random()}>
                    <div>
                      <Checkbox checked={silhouette_flag} onChange={(e)=>{this.handleTagCheckboxChange(e,option_name,children_title,this.props.option_title,this.props.step_name,this.props.model_name)}}  style={{color:"#ffffff"}}>{option_name}</Checkbox>
                    </div>
                    <div style={silhouette_flag ? {display:"block"}:{display:"none"}}>
                      <RadioGroup onChange={(e)=>{this.handleRadioGroup(e,option_name,children_title)}}>
                        {radioDOM}
                      </RadioGroup>
                    </div>
                  </div>)
            });
          }
          vDOM.push(<div key={Math.random()}>
            <span>{children_title}</span>
            {checkDOM}
          </div>)
        });
        return vDOM;
      }
    } else {
      return [];
    }
  }

  handleCheckGroup=(checkedValues)=>{
    let {option_title,step_name,model_name} = this.props;
    console.info(`checkedValues: ${JSON.stringify(checkedValues)}`);
    console.info(option_title)
    console.info(step_name)
    console.info(model_name)
    // this.props.handleGatherCondition(checkedValues,"","",option_title,step_name,model_name);
  };
  handleRadioGroup=(e,optionName,childrenTitle)=>{
    let {option_title,step_name,model_name} = this.props;
    console.log('radio checked', e.target.value);
    console.info(optionName)
    console.info(option_title)
    console.info(step_name)
    console.info(model_name)
    this.props.handleGatherCondition(e.target.value,optionName,childrenTitle,option_title,step_name,model_name);
  };
  handleTagCheckboxChange=(e,optionName,childrenTitle,optionTitle,stepName,modelName)=>{
    this.props.handleChangeOption(e.target.checked,optionName,childrenTitle,optionTitle,stepName,modelName);
  };

  render() {
    return (
      <div>
        {this.renderCheckbox()}
      </div>
    );
  }
}
export default TagCheckbox;
