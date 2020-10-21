import React, { PureComponent } from "react";
import {Checkbox,Row,Col,Divider} from 'antd';

class OptionsComponentFirst extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    if(data.length>0){
      if(typeof data[0] ==='string'){
        let vDOM = [];
        data.forEach((cur)=>{
          vDOM.push(<Col key={Math.random()} span={8}>
                <Checkbox style={{color: '#e2e2e2'}} value={cur}>{cur}</Checkbox>
              </Col>)
        });
        return <Checkbox.Group style={{width:'100%'}} value={this.props.checkedValues} onChange={(values)=>{this.handleCheckGroup(values,"")}}><Row>{vDOM}</Row></Checkbox.Group>;
      } else {
        let vDOM = [];
        data.forEach((cur)=>{
          let {children_title,children_desc,children_flag,checkedValues,subset_flag,children_options} = cur;
          let checkDOM=[];
          if(children_options.length>0 && typeof children_options[0] ==='string'){
            children_options.forEach((item)=>{
              checkDOM.push(<Col key={Math.random()} span={8}>
                <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
              </Col>);
            });
            vDOM.push(<div key={Math.random()}>
              <Row>
                <Checkbox checked={children_flag} style={{color:"#e2e2e2"}} onChange={(e)=>{this.handleTagCheckboxChange(e,children_title)}}>{children_title}</Checkbox>
              </Row>
              <div style={subset_flag ? {display:"block",marginTop: "10px"}:{display:"none",marginTop: "10px"}}>
                <p style={{color: '#dbdbdb', fontSize: '10px', marginBottom: '4px',}}>{children_desc}</p>
                <Checkbox.Group style={{width:'100%'}} value={checkedValues} onChange={(values)=>{this.handleCheckGroup(values,children_title)}}><Row>{checkDOM}</Row></Checkbox.Group>
              </div>
              {subset_flag && <Divider style={{margin: '0', background: '#585858'}}/>}
            </div>)
          }
        });
        return vDOM;
      }
    } else {
      return [];
    }
  }
  handleCheckGroup=(checkedValues,childrenTitle)=>{
    let {option_title,step_name,model_name} = this.props;
    console.info(`checkedValues: ${JSON.stringify(checkedValues)}`);
    this.props.handleOptions(checkedValues,childrenTitle,option_title,step_name,model_name);
  };
  handleTagCheckboxChange=(e,childrenTitle)=>{
    let {option_title,step_name,model_name} = this.props;
    console.info(`checked: ${e.target.checked}`);
    this.props.handleChangeOption(e.target.checked,childrenTitle,option_title,step_name,model_name);
  };
  render() {
    return (
      <div>
        {this.renderDOM()}
      </div>
    );
  }
}
export default OptionsComponentFirst;
