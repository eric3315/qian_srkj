import React, {PureComponent} from 'react';
import { MODEL_STEP } from '../../util/model_step';
import TagCheckbox from '../../component/tagCheckbox';
import {Card,Select,Menu,Badge} from 'antd';
import {
  LeftCircleOutlined,
  RightCircleOutlined
} from '@ant-design/icons';
import style from './design.less';

const { Option } = Select;
class IntelligentDesign extends PureComponent {
  state = {
    visible: false,
    placement: 'left',
    leftWidth:"260px",
    checkStep:'',
    steps:[],
    parameters:[],
    submitData:[]
  };

  showDrawer = () => {
    this.setState({
      // visible: true,
      leftWidth:"30px",
    });
  };
  showRightaway= () => {
    this.setState({
      rightWidth:0
    });
  };
  showRightUnfold = () => {
    this.setState({
      rightWidth:'260px'
    });
  };
  showUnfold = () => {
    this.setState({
      leftWidth:"260px",
      rightWidth:'260px'
    });
  };

  handleModelStep=(value)=>{
    let stepArr =[];
    for(let i=0;i<MODEL_STEP.length;i++){
      let {model_name,steps} = MODEL_STEP[i];
      if(value ===model_name){
        steps.forEach((cur)=>{
          let {step_key,step_name} = cur;
          stepArr.push({model_name,step_key,step_name})
        });
        break;
      }
    }
    this.setState({
      steps:stepArr
    },()=>{
      console.info(`输出steps:${JSON.stringify(this.state.steps)}`)
    })
  };
  handleClickMenu=(e,modelName)=>{
    let parametersArr=[];
    for(let i=0;i<MODEL_STEP.length;i++){
      let {model_name,steps} = MODEL_STEP[i];
      if(model_name === modelName){
        for(let j=0;j<steps.length;j++){
          let {step_key,step_name,parameters} = steps[j];
          if(parseInt(e.keyPath[0]) === parseInt(step_key)){
            parametersArr.push({model_name,step_name,parameters});
            break;
          }
        }
      }
    }
    this.setState({
      parameters: parametersArr,
      checkStep: e.keyPath[0]
    },()=>{
      console.info(`checkStep:${this.state.checkStep}`);
      console.info(`获取右侧json:${JSON.stringify(this.state.parameters)}`);
    })
  };
  handleChangeOption=(isChecked,optionName,childrenTitle,optionTitle,stepName,modelName)=>{
    let {parameters} = this.state;
    let newParameters = JSON.parse(JSON.stringify(parameters));
    newParameters.forEach(item=>{
      let {model_name,step_name,parameters} = item;
      if(model_name === modelName && step_name === stepName){
        parameters.forEach(item=>{
          let {option_title,options} = item;
          if(option_title === optionTitle){
            if(typeof options[0] ==='object'){
              for(let i=0;i<options.length;i++){
                let {children_title,children_options} =options[i];
                if(children_title === childrenTitle){
                  for(let j=0;j<children_options.length;j++){
                    let {option_name} = children_options[j];
                    if(option_name === optionName){
                      children_options[j].silhouette_flag = isChecked;
                    }
                  }
                }
              }
            }
          }
        });
      }
    });
    this.setState({
      parameters: newParameters
    },()=>{
      console.info(`更新:${JSON.stringify(this.state.parameters)}`);
    })
  };
  handleGatherCondition=(values,optionName,childrenTitle,optionTitle,stepName,modelName)=>{
    let {submitData} = this.state;
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    if(newSubmitData.length<=0){
      let parameters=[];
      if(typeof values ==='string'){
        parameters.push({
          optionTitle,
          childrenTitle,
          optionName,
          values
        });
      } else {
        parameters.push({
          optionTitle,
          values
        });
      }
      newSubmitData.push({
        modelName,stepName,parameters
      });
    } else {
      for(let i=0;i<newSubmitData.length;i++){
        if(modelName === newSubmitData[i].modelName && stepName === newSubmitData[i].stepName){
          let {parameters} = newSubmitData[i];
          if(parameters.length>0){
            if(typeof values ==='string'){
              for(let j=0;j<parameters.length;j++){
                if(parameters[j].optionTitle ===optionTitle && parameters[j].childrenTitle ===childrenTitle && parameters[j].optionName ===optionName){
                  parameters[j].values=values;
                }
              }
            } else {
              for(let j=0;j<parameters.length;j++){
                if(parameters[j].optionTitle ===optionTitle){
                  parameters[j].values=values;
                }
              }
            }
          }
        }
      }
    }
    this.setState({
      submitData: newSubmitData
    },()=>{
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    })
  };
  renderStep(){
    let vDOM=[],{steps} = this.state;
    steps.forEach(item=>{
      let {model_name,step_key,step_name} = item;
      vDOM.push(<Menu
          mode="inline"
          theme="dark"
          selectedKeys={[this.state.checkStep]}
          key={Math.random()}
          onClick={(e)=>{this.handleClickMenu(e,model_name)}}
        >
          <Menu.Item key={step_key}>
            <Badge count={step_key} style={{
              fontWeight: "bold",
              fontSize: "15px",
              boxShadow: "0 0 0 2px #fff",
              background: "none"
            }}/>
            <span style={{
              marginLeft: "13px",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#fff"
            }}>
                    {step_name}
            </span>
          </Menu.Item>
        </Menu>
      );
    });
    return vDOM;
  };
  renderParameters(){
    let vDOM=[],{parameters} = this.state;
    parameters.forEach(item=>{
      let {model_name,step_name,parameters} = item;
      parameters.forEach(item=>{
        let {option_title,option_desc,option_type,options} = item;
        if(option_type ==='多选'){
          if(typeof options[0] ==='string'){
            let {checkedArr} = item;
            vDOM.push(
              <div key={Math.random()}>
                <div>{option_title}</div>
                <div>{option_desc}</div>
                <TagCheckbox
                  option_title={option_title}
                  model_name={model_name}
                  step_name={step_name}
                  data={options}
                  checkedArr={checkedArr}
                  handleChangeOption={this.handleChangeOption}
                  handleGatherCondition={this.handleGatherCondition}
                />
              </div>
            );
          } else {
            vDOM.push(
              <div key={Math.random()}>
                <div>{option_title}</div>
                <div>{option_desc}</div>
                <TagCheckbox
                  option_title={option_title}
                  model_name={model_name}
                  step_name={step_name}
                  data={options}
                  handleChangeOption={this.handleChangeOption}
                  handleGatherCondition={this.handleGatherCondition}
                />
              </div>
            );
          }
        }
      })
    });
    return vDOM;
  };


  render() {
    const modelStepOptions = MODEL_STEP.map((province) => {
      return <Option key={province.model_name}>{province.model_name}</Option>;
    });
    const {leftWidth, rightWidth,step_key} = this.state;
    const sizeWidth=parseInt(leftWidth)+parseInt(rightWidth);
    let mainWidth = `calc(100% - ${sizeWidth}px)`;
    return (
      <Card  bordered={false} bodyStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 5,
      }}>
      <div className={style.designWrapper}>
        <div className={style.leftWrapper} style={{width: leftWidth}}>
          {
            leftWidth==='260px'&&
            <LeftCircleOutlined onClick={this.showDrawer} className={style.selecshow}/>
          }
          {
            leftWidth==='30px'&&
            <RightCircleOutlined onClick={this.showUnfold} className={style.showUnfold}/>
          }
          <div className={style.leftMain} style={{width: leftWidth}}>
            <Select
              showSearch
              style={{width: '100%'}}
              onChange={this.handleModelStep}
            >
              {modelStepOptions}
            </Select>
            {
              this.state.steps.length>0 &&
              this.renderStep()
            }
          </div>
        </div>
        <div className={style.mainWrapper} style={{width: mainWidth,marginLeft:leftWidth}}>
          内容
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>

        <div className={style.rightWrapper} style={{width: rightWidth}}>
          {
            rightWidth==='260px'&&
            <div className={style.selecRightshow} onClick={this.showRightaway}/>
          }
          {
            rightWidth===0 &&
            <div className={style.selecRightshow} onClick={this.showRightUnfold} />
          }

          <div className={style.rightMain} style={{width: rightWidth}}>
            {/*<p>Some contents...</p>*/}
            {/*<p>Some contents...</p>*/}
            {/*<p>Some contents...</p>*/}
            {
              this.state.parameters.length>0 &&
              this.renderParameters()
            }
          </div>
        </div>
      </div>
      </Card>
    );
  }
}

export default IntelligentDesign;
