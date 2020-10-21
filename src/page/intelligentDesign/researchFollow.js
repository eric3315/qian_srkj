import React, {PureComponent} from 'react';
import router from 'umi/router';

import image from '../../assets/image.png';
import image_1 from '../../assets/image_1.png';
import image_2 from '../../assets/image_2.png';
import image_3 from '../../assets/image_3.png';
import image_4 from '../../assets/image_4.png';
import image_5 from '../../assets/image_5.png';
import image_6 from '../../assets/image_6.png';
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  UndoOutlined,
  RedoOutlined,
  ArrowRightOutlined,
  SaveOutlined
} from '@ant-design/icons';
import OptionsComponentFirst from '../../component/OptionsComponent_first';
import {Menu, Badge,Card,Divider,Row,Col} from 'antd';
import style from './design.less';
import sty from './mainContent.less'
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
    submitData: [],
    themeName:'',
    operateRecord: [],
    operateRecordPre: [],
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
      leftWidth: 0,
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
    let {parameters, submitData,operateRecord} = this.state;
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    let newParameters = JSON.parse(JSON.stringify(parameters));
    let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
    if(newOperateRecord.length<=0){
      newOperateRecord.push({
        id:1, values, childrenTitle, optionTitle, stepName, modelName
      })
    } else {
      newOperateRecord.sort((a,b)=>{return b.id - a.id});
      let id =newOperateRecord[0].id;
      newOperateRecord.push({
        id:id+1, values, childrenTitle, optionTitle, stepName, modelName
      });
    }
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
    newOperateRecord.sort((a,b)=>{return a.id - b.id});
    this.setState({
      submitData: newSubmitData,
      parameters: newParameters,
      operateRecord:newOperateRecord
    }, () => {
      console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
      console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    })
  };
  handleChangeOption = (isChecked, childrenTitle, optionTitle, stepName, modelName) => {
    let {parameters, submitData,operateRecord} = this.state;
    let themeName="";
    if(isChecked && optionTitle ==='主题设定'){
      themeName=childrenTitle;
    }
    let newParameters = JSON.parse(JSON.stringify(parameters));
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
    if(newOperateRecord.length<=0){
      newOperateRecord.push({
        id:1, isChecked, childrenTitle, optionTitle, stepName, modelName
      });
    } else {
     newOperateRecord.sort((a,b)=>{return b.id - a.id});
     let id =newOperateRecord[0].id;
     newOperateRecord.push({
        id:id+1, isChecked, childrenTitle, optionTitle, stepName, modelName
     });
    }
    newParameters.forEach(item => {
      let {model_name, step_name, parameters} = item;
      if (model_name === modelName && step_name === stepName) {
        parameters.forEach(item => {
          let {option_title,option_type, options} = item;
          if (option_title === optionTitle && option_type ==='单选') {
            if (options.length > 0 && typeof options[0] === 'object') {
              for (let i = 0; i < options.length; i++) {
                options[i].children_flag = false;
                options[i].subset_flag = false;
              }
              for (let i = 0; i < options.length; i++) {
                let {children_title} = options[i];
                if (children_title === childrenTitle) {
                  options[i].children_flag = isChecked;
                  options[i].subset_flag = isChecked;
                }
              }
            }
          } else if(option_title === optionTitle && option_type ==='多选'){
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
            if(optionTitle ==="主题设定"){
              for (let i = 0; i < parameters.length; i++) {
                if (parameters[i].optionTitle === optionTitle && optionTitle ==="主题设定") {
                  parameters[i] = parameters[parameters.length - 1];
                  parameters.length--;
                  i--;
                }
              }
              newSubmitData[i].parameters.push({
                optionTitle,
                childrenTitle
              })
            } else {
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
    newOperateRecord.sort((a,b)=>{return a.id - b.id});
    this.setState({
      parameters: newParameters,
      submitData: newSubmitData,
      themeName,
      operateRecord:newOperateRecord
    }, () => {
      console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
      console.info(`主题:${JSON.stringify(this.state.themeName)}`);
      console.info(`更新:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    })
  };
  renderStep() {
    let vDOM = [], {steps} = this.state;
    let modelName=steps[0].model_name;
    steps.forEach(item => {
      let {step_key, step_name} = item;
      vDOM.push(<Menu.Item key={step_key}>
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
      );
    });
    return <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[this.state.checkStep]}
            style={{marginTop: "20px"}}
            onClick={(e) => {this.handleClickMenu(e, modelName)}}>{vDOM}
        </Menu>;
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
    return <div style={{marginTop: "20px"}}>{vDOM}</div>;
  };
  renderMainContent(){
    let vDOM=[];
    vDOM.push(<div style={{padding:"24px"}} key={Math.random()}>
      <ul className={sty.editWrapper}>
        <li>
          <UndoOutlined className={sty.iconComm}/>
          <p>撤销</p>
        </li>
        <li>
          <RedoOutlined className={sty.iconComm}/>
          <p>重做</p>
        </li>
        <li>
          <SaveOutlined className={sty.iconComm}/>
          <p>保存</p>
        </li>
        <li>
          <ArrowRightOutlined className={sty.iconComm}/>
          <p>执行</p>
        </li>

      </ul>
      <div className={sty.themeWrapper}>
        <h3 style={{textAlign: 'center',  color: 'white', padding: '20px', fontWeight: "bold", fontSize: "20px"}}>主题:{this.state.themeName}</h3>
        <div>
          <div className={sty.pic}>
            <img src={image} alt="图片不存在" style={{width: '100%'}}/>
          </div>
          <p style={{marginTop: '20px',fontSize: "20px"}}>突破时空的大胆幻想与缤纷的物质现实以绚烂的姿态结合在一起，映射出对当代都市生活的近距离观察，展现出非凡的视觉效果，以及对现代社会冷静而细致的观察与反思。</p>
        </div>
        {/*色彩分析*/}
        <div>
          <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>色彩分析</h3>
          <div className={sty.colorWrapper}>
            <div style={{width: '100%', padding: '20px'}}>
              <img src={image_1} alt="图片有误" style={{width: '100%'}}/>
            </div>
          </div>
          <p style={{marginTop: '20px',fontSize: "20px"}}>2020/21秋冬色彩分为两大不同主题：一个主打黄色、棕色、红色等原始天然色调；另一个则为饱和的科技色彩。在这两大主题中，蓝色和绿色的冷调平衡了偏热烈的色调。从深墨色到具有人造质感的鲜艳色调，呈现广泛百搭属性。</p>
        </div>
        {/*面料分析*/}
        <div>
          <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>面料分析</h3>

          <div className={sty.pic}>
            <img src={image_2} alt="图片不存在" style={{width: '100%'}}/>
          </div>
          <p style={{marginTop: '20px',fontSize: "20px"}}>古旧和精致的花呢面料仍为关键，并以拉绒结构打造。杂色线、间染和圈结花式线等可打造出混杂的纹理效果。采用羊毛、马海毛、亚麻和合成混纺面料以大规格尺寸呈现千鸟格、花格纹和斜条纹。</p>
        </div>
        {/*图案*/}
        <div>
          <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>图案分析</h3>
          <div className={sty.pic}>
            <img src={image_3} alt="图片不存在" style={{width: '100%'}}/>
          </div>
          <p style={{marginTop: '20px',fontSize: "20px"}}>以现代感的线条进行重构，化繁为简的达成极简艺术和商业时尚的完美融合。抽象而流畅的笔触、未完成感的勾线彩绘、精致利落的几何层叠，透过艺术化的象征性表现，打造出优雅干练、浪漫松弛的视觉效果，更让精致生活充满温度。</p>
        </div>
        {/*风格*/}
        <div>
          <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>风格分析</h3>
          <Row type="flex" justify="space-around"
               style={{marginBottom: '20px', marginTop: '20px'}}>
            <Col span={6.5} order={1}
                 style={{ paddingTop: '5px', paddingBottom: '5px', height: '350px'}}>
              <img style={{width: '100%', height: '100%'}} src={image_4} alt=""/>
              <p style={{
                textAlign: "center",
                marginTop: "10px"
              }}>优雅</p>
            </Col>
            <Col span={6.5} order={1}
                 style={{paddingTop: '5px', paddingBottom: '5px', height: '350px'}}>
              <img style={{width: '100%', height: '100%'}} src={image_5} alt=""/>
              <p style={{
                textAlign: "center",
                marginTop: "10px"
              }}>古典</p>
            </Col>
            <Col span={6.5} order={1}
                 style={{paddingTop: '5px', paddingBottom: '5px', height: '350px'}}>
              <img style={{width: '100%', height: '100%'}} src={image_6} alt=""/>
              <p style={{
                textAlign: "center",
                marginTop: "10px"
              }}>前卫</p>
            </Col>
          </Row>
        </div>
      </div>
    </div>);
    return vDOM;
  }
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
            leftWidth === 0 &&
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
          {this.state.themeName && this.renderMainContent()}
        </div>
        {
          this.state.checkStep!=='' &&
          <div className={style.rightWrapper} style={{width: rightWidth}}>
            {
              rightWidth === '260px' && <RightCircleOutlined className={style.selecRightshow} onClick={this.showRightaway}/>
            }
            {
              rightWidth === 0 && <LeftCircleOutlined className={style.selecRightLeft} onClick={this.showRightUnfold}/>
            }
            <div className={style.rightMain} style={{width: rightWidth}}>
              {
                this.state.parameters.length > 0 &&
                this.renderParameters()
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ResearchFollow;
