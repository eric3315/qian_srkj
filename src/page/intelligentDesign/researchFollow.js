import React, {PureComponent} from 'react';
import router from 'umi/router';
import OptionsComponentFirst from '../../component/OptionsComponent_first';
import {Select, Menu, Badge,Card,Divider} from 'antd';
import {LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons';
import style from './design.less';
import axios from "../../util/axios";

class ResearchFollow extends PureComponent {
  state = {
    visible: false,
    placement: 'left',
    leftWidth: "260px",
    rightWidth: "260px",
    checkStep: '',
    steps: [],
    parameters: [],
    submitData: []
  };

  componentDidMount() {
    let query = this.props.location.query;
    if (typeof query.modelName !== 'undefined' && query.modelName !== '') {
      this.queryStep({
        modelName: query.modelName
      });
      if(typeof query.step !== 'undefined' && query.step !== ''){
        this.setState({
          checkStep: query.step ||''
        });
        router.push(`/follow?modelName=${query.modelName ||''}&step=${query.step ||''}`);
        this.queryParameters({
          stepKey:query.step,
          modelName:query.modelName
        });
      }
    }
  };
  queryStep = async (param) => {
    let result = await axios({
      method: "GET",
      url: `/design/getStep?modelName=${param.modelName || ''}`,
    });
    const {data} = result;
    this.setState({
      steps: data
    });
  };
  queryParameters = async (param) =>{
    let result = await axios({
      method: "GET",
      url: `/design/getParameters?stepKey=${param.stepKey || ''}&modelName=${param.modelName || ''}`,
    });
    const {data} = result;
    this.setState({
      parameters: data,
      checkStep: param.stepKey
    }, () => {
      console.info(`checkStep:${this.state.checkStep}`);
      console.info(`获取右侧json:${JSON.stringify(this.state.parameters)}`);
    });
  };
  showDrawer = () => {
    this.setState({
      leftWidth: "30px",
    });
  };
  showRightaway = () => {
    this.setState({
      rightWidth: 0
    });
  };
  showRightUnfold = () => {
    this.setState({
      rightWidth: '260px'
    });
  };
  showUnfold = () => {
    this.setState({
      leftWidth: "260px",
    });
  };
  handleClickMenu = async (e, modelName) => {
    router.push(`/follow?modelName=${modelName ||''}&step=${e.keyPath[0] ||''}`);
    await this.queryParameters({
      stepKey:e.keyPath[0],
      modelName
    });
  };
  handleOptionsFirst=(values, childrenTitle, optionTitle, stepName, modelName)=>{
    let {parameters, submitData} = this.state;
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    let newParameters = JSON.parse(JSON.stringify(parameters));
    for (let i = 0; i < newParameters.length; i++) {
      let {model_name, step_name, parameters} = newParameters[i];
      if (model_name === modelName && step_name === stepName) {
        for (let i = 0; i < parameters.length; i++) {
          let {option_title,options} = parameters[i];
          if (option_title === optionTitle && options.length>0 && typeof options[0] ==='string') {
            parameters[i].checkedValues = values;
          } else {
            for(let i=0;i<options.length;i++){
              let {children_title} =options[i];
              if(children_title === childrenTitle){
                options[i].checkedValues = values;
              }
            }
          }
        }
      }
    }
    if (newSubmitData.length <= 0) {
      newSubmitData.push({
        modelName, stepName, parameters: [{
          optionTitle, childrenTitle, values
        }]
      });
    } else {
      for (let i = 0; i < newSubmitData.length; i++) {
        if (modelName === newSubmitData[i].modelName && stepName === newSubmitData[i].stepName) {
          let {parameters} = newSubmitData[i];
          if(childrenTitle!==''){
            let flag=parameters.some(item=>{return item.optionTitle === optionTitle && item.childrenTitle === childrenTitle});
            if(flag){
              for (let j = 0; j < parameters.length; j++) {
                if(parameters[j].optionTitle === optionTitle && parameters[j].childrenTitle === childrenTitle){
                  parameters[j].values = values;
                }
              }
            } else {
              if(values.length>0){
                newSubmitData[i].parameters.push({
                  optionTitle, childrenTitle, values
                })
              }
            }
          } else {
            let flag=parameters.some(item=>{return item.optionTitle === optionTitle});
            if(flag){
              for (let j = 0; j < parameters.length; j++) {
                if(parameters[j].optionTitle === optionTitle){
                  parameters[j].values = values;
                }
              }
            } else {
              if(values.length>0){
                newSubmitData[i].parameters.push({
                  optionTitle, childrenTitle, values
                })
              }
            }
          }
        } else {
          newSubmitData.push({
            modelName, stepName, parameters: [{
              optionTitle, childrenTitle, values
            }]
          });
        }
      }
    }
    this.setState({
      submitData: newSubmitData,
      parameters: newParameters
    }, () => {
      console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    })
  };
  handleChangeOption = (isChecked, childrenTitle, optionTitle, stepName, modelName) => {
    let {parameters, submitData} = this.state;
    let newParameters = JSON.parse(JSON.stringify(parameters));
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    newParameters.forEach(item => {
      let {model_name, step_name, parameters} = item;
      if (model_name === modelName && step_name === stepName) {
        parameters.forEach(item => {
          let {option_title, options} = item;
          if (option_title === optionTitle) {
            if (options.length > 0 && typeof options[0] === 'object') {
              for (let i = 0; i < options.length; i++) {
                let {children_title} = options[i];
                if (children_title === childrenTitle) {
                  options[i].children_flag = isChecked;
                  options[i].subset_flag = isChecked;
                }
              }
            }
          }
        });
      }
    });
    if (newSubmitData.length <= 0) {
      newSubmitData.push({
        modelName, stepName,
        parameters: [
          {
            optionTitle,
            childrenTitle
          }
        ]
      });
    } else {
      for (let i = 0; i < newSubmitData.length; i++) {
        if (modelName === newSubmitData[i].modelName && stepName === newSubmitData[i].stepName) {
          let {parameters} = newSubmitData[i];
          if (parameters.length > 0) {
            let flag = parameters.some(item => {
              return item.optionTitle === optionTitle && item.childrenTitle === childrenTitle
            });
            if (flag && !isChecked) {
              for (let i = 0; i < parameters.length; i++) {
                if (parameters[i].optionTitle === optionTitle && parameters[i].childrenTitle === childrenTitle) {
                  parameters[i] = parameters[parameters.length - 1];
                  parameters.length--;
                  i--;
                }
              }
            } else {
              newSubmitData[i].parameters.push({
                optionTitle,
                childrenTitle
              })
            }
          } else {
            newSubmitData[i].parameters.push({
              optionTitle,
              childrenTitle
            })
          }
        }
      }
    }
    this.setState({
      parameters: newParameters,
      submitData: newSubmitData
    }, () => {
      console.info(`更新:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    })
  };
  renderStep() {
    let vDOM = [], {steps} = this.state;
    steps.forEach(item => {
      let {model_name, step_key, step_name} = item;
      vDOM.push(<Menu
          mode="inline"
          theme="dark"
          selectedKeys={[this.state.checkStep]}
          key={Math.random()}
          onClick={(e) => {
            this.handleClickMenu(e, model_name)
          }}
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
  renderParameters() {
    let vDOM = [], {parameters} = this.state;
    parameters.forEach(item => {
      let {model_name, step_name, parameters} = item;
      parameters.forEach((item,index) => {
        let {option_title, option_desc, option_type, options} = item;
        if(index < parameters.length-1){
          vDOM.push(
            <div key={Math.random()}>
              <Card className={style.rightCard} title={
                <div>
                  <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>{option_title}</p>
                  <span style={{fontSize: '10px', color: '#dbdbdb'}}>{option_desc}</span>
                </div>
              }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
                <OptionsComponentFirst
                  checkedValues={typeof options[0]==='string' ? item.checkedValues : ''}
                  option_title={option_title}
                  step_name={step_name}
                  model_name={model_name}
                  data={options}
                  handleOptionsFirst={this.handleOptionsFirst}
                  handleChangeOption={this.handleChangeOption}
                />
              </Card>
              <Divider style={{margin: '0', background: '#585858'}}/>
            </div>
          );
        } else {
          vDOM.push(
            <Card key={Math.random()} className={style.rightCard} title={
              <div>
                <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>{option_title}</p>
                <span style={{fontSize: '10px', color: '#dbdbdb'}}>{option_desc}</span>
              </div>
            }
              size="small"
              headStyle={{color: 'white'}}
              bordered={false}
              style={{background: "none"}}>
              <OptionsComponentFirst
                checkedValues={typeof options[0]==='string' ? item.checkedValues : ''}
                option_title={option_title}
                model_name={model_name}
                step_name={step_name}
                data={options}
                handleOptionsFirst={this.handleOptionsFirst}
                handleChangeOption={this.handleChangeOption}
              />
            </Card>
          );
        }
      })
    });
    return vDOM;
  };
  render() {
    const {leftWidth, rightWidth, step_key} = this.state;
    const sizeWidth = parseInt(leftWidth) + parseInt(rightWidth);
    let mainWidth = `calc(100% - ${sizeWidth}px)`;
    return (
      <div className={style.designWrapper}>
        <div className={style.leftWrapper} style={{width: leftWidth}}>
          {
            leftWidth === '260px' &&
            <LeftCircleOutlined onClick={this.showDrawer} className={style.selecshow}/>
          }
          {
            leftWidth === '30px' &&
            <RightCircleOutlined onClick={this.showUnfold} className={style.showUnfold}/>
          }
          <div className={style.leftMain} style={{width: leftWidth}}>
            {
              this.state.steps.length > 0 &&
              this.renderStep()
            }
          </div>
        </div>
        <div className={style.mainWrapper} style={{width: mainWidth, marginLeft: leftWidth}}>
          内容
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
        <div className={style.rightWrapper} style={{width: rightWidth}}>
          {
            rightWidth === '260px' &&
            <div className={style.selecRightshow} onClick={this.showRightaway}/>
          }
          {
            rightWidth === 0 &&
            <div className={style.selecRightshow} onClick={this.showRightUnfold}/>
          }
          <div className={style.rightMain} style={{width: rightWidth}}>
            {
              this.state.parameters.length > 0 &&
              this.renderParameters()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ResearchFollow;
