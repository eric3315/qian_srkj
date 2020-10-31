import React, { PureComponent } from "react";
import {Card} from 'antd';
import ProgressComponent from './ProgressComponent';
import style from "../page/intelligentDesign/design.less";

class OptionsComponentFourth extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    let vDOM=[];
    if(data.length>0){
      data.forEach(item=>{
        let {model_name, step_name, parameters} = item;
        console.info(JSON.stringify(item));
        let lenVDOM=[],jiebuvDOM=[],yaotouvDOM=[],dibaivDOM=[];
        parameters.forEach(cur=>{
            let {option_title,option_type,values} = cur;
            if(option_title ==='衣长' && option_type ==='进度条'){
              lenVDOM.push(
                <div key={Math.random()}>
                  <ProgressComponent
                    optionTitle={option_title}
                    values={values}
                    modelName={model_name}
                    stepName={step_name}
                    handleOptionsFourth={this.props.handleOptionsFourth}
                  />
                </div>
              );
            } else if(option_title ==='肩部' && option_type ==='进度条'){
              jiebuvDOM.push(
                <div key={Math.random()}>
                  <ProgressComponent
                    optionTitle={option_title}
                    values={values}
                    modelName={model_name}
                    stepName={step_name}
                    handleOptionsFourth={this.props.handleOptionsFourth}
                  />
                </div>
              );
            } else if(option_title ==='腰头' && option_type ==='进度条'){
              yaotouvDOM.push(
                <div key={Math.random()}>
                  <ProgressComponent
                    optionTitle={option_title}
                    values={values}
                    modelName={model_name}
                    stepName={step_name}
                    handleOptionsFourth={this.props.handleOptionsFourth}
                  />
                </div>
              );
            } else if(option_title ==='底摆' && option_type ==='进度条'){
              dibaivDOM.push(
                <div key={Math.random()}>
                  <ProgressComponent
                    optionTitle={option_title}
                    values={values}
                    modelName={model_name}
                    stepName={step_name}
                    handleOptionsFourth={this.props.handleOptionsFourth}
                  />
                </div>
              );
             }
        });
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>长度</p>
            </div>
          }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
            <div>{lenVDOM}</div>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
            <Card className={style.rightCard} title={
              <div>
                <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>松紧</p>
                <span style={{fontSize: '10px', color: '#dbdbdb'}}>局部松紧尺度与廓形相关，将限制调整的尺寸</span>
              </div>
            }
                  size="small"
                  headStyle={{color: 'white'}}
                  bordered={false}
                  style={{background: "none"}}>
              <div>{jiebuvDOM}</div>
              <div>{yaotouvDOM}</div>
              <div>{dibaivDOM}</div>
            </Card>
          </div>);
      });
    }
    return vDOM;
  }
  render() {
    return (
      <div>
        {this.renderDOM()}
      </div>
    );
  }
}
export default OptionsComponentFourth;
