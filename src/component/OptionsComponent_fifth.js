import React, { PureComponent } from "react";
import {Card,Radio} from 'antd';
import ProgressComponentFifth from './ProgressComponent_fifth';
import style from "../page/intelligentDesign/design.less";

const RadioGroup = Radio.Group;
class OptionsComponentFifth extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    let vDOM=[];
    if(data.length>0){
      data.forEach(item=>{
        let {model_name, step_name, parameters} = item;
        parameters.forEach(cur=>{
          let kaijinvDOM=[],lingzivDOM=[],koudaivDOM=[];
          let {option_title,values} = cur;
          if(typeof cur.options!=='undefined' && option_title==='开襟'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              kaijinvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
            vDOM.push(<div key={Math.random()}>
              <Card className={style.rightCard} title={
                <div>
                  <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>开襟</p>
                </div>
              }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
                <RadioGroup value={values} onChange={(e)=>{this.props.handleOptionsFifth(e.target.value,option_title,step_name,model_name)}}>
                  {kaijinvDOM}
                </RadioGroup>
              </Card>
            </div>);
          } else if(typeof cur.options!=='undefined' && option_title==='领子'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              lingzivDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
            vDOM.push(<div key={Math.random()}>
              <Card className={style.rightCard} title={
                <div>
                  <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>领子</p>
                </div>
              }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
                <RadioGroup value={values}  onChange={(e)=>{this.props.handleOptionsFifth(e.target.value,option_title,step_name,model_name)}}>
                  {lingzivDOM}
                </RadioGroup>
              </Card>
            </div>);
          } else {
            if(option_title ==='口袋'){
              let optionsArr =cur.options;
              optionsArr.forEach(c=>{
                if(values ===c.children_title){
                  koudaivDOM.push(
                    <div key={Math.random()} style={{marginBottom: "10px"}}>
                      <div>
                        <Radio key={Math.random()} value={c.children_title}>{c.children_title}</Radio>
                      </div>
                      <div>
                        <ProgressComponentFifth
                          modelName={model_name}
                          stepName={step_name}
                          optionTitle={c.children_title}
                          values={c.values}
                          handleOptionsFifth={this.props.handleOptionsFifth}
                        />
                      </div>
                    </div>
                  );
                } else {
                  koudaivDOM.push(
                    <div key={Math.random()}>
                      <div>
                        <Radio key={Math.random()} value={c.children_title}>{c.children_title}</Radio>
                      </div>
                    </div>
                  );
                }
              });
              vDOM.push(<div key={Math.random()}>
                <Card className={style.rightCard} title={
                  <div>
                    <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>口袋</p>
                  </div>
                }
                  size="small"
                  headStyle={{color: 'white'}}
                  bordered={false}
                  style={{background: "none"}}>
                  <RadioGroup value={values}  onChange={(e)=>{this.props.handleOptionsFifth(e.target.value,option_title,step_name,model_name)}}>
                    {koudaivDOM}
                  </RadioGroup>
                </Card>
              </div>);
            }
          }
        });
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
export default OptionsComponentFifth;
