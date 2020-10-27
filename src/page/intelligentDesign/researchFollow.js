import React, {PureComponent} from 'react';
import router from 'umi/router';
import {LeftCircleOutlined, RightCircleOutlined, UndoOutlined, RedoOutlined, ArrowRightOutlined, SaveOutlined} from '@ant-design/icons';
import OptionsComponentFirst from '../../component/OptionsComponent_first';
import OptionsComponentSecond from '../../component/OptionsComponent_second';
import OptionsComponentFourth from '../../component/OptionsComponent_fourth';
import OptionsComponentFifth from '../../component/OptionsComponent_fifth';
import OptionsComponentSixth from '../../component/OptionsComponent_sixth';
import SingleImgCard  from "../../component/singleImgCard";
import DesginSingleImgCard  from "../../component/desginSingleImgCard";
import {Menu, Collapse, Badge,Card,Divider,Row,Col} from 'antd';
import style from './design.less';
import sty from './mainContent.less'
import axios from "../../util/axios";


const { Panel } = Collapse;
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
    themesArr:[],
    stylesArr:[],
    seriesArr:[],
    kxsjArr:[],
    kxsjDesginArr:[],
  };
  componentDidMount() {
    let query = this.props.location.query;
    if (typeof query.modelName !== 'undefined' && query.modelName !== '') {
      this.queryStep({
        modelName: query.modelName
      });
      if(typeof query.step !== 'undefined' && query.step !== '' && query.step === '1'){
        if(query.step === '1'){
          router.push(`/follow?modelName=${query.modelName ||''}&step=${query.step ||''}`);
          this.queryParameters({
            stepKey:query.step,
            modelName:query.modelName
          });
          this.setState({
            checkStep: query.step ||''
          });
        } else if(query.step === '4' || query.step === '5' || query.step === '6'){
          router.push(`/follow?modelName=${query.modelName ||''}&step=${query.step ||''}&themeName=${query.themeName||''}&seriesName=${query.seriesName||''}`);
          this.queryParameters({
            stepKey:query.step,
            modelName:query.modelName
          });
          this.setState({
            rightWidth: 0,
            checkStep: query.step ||''
          });
        } else if(query.step === '2'){
          router.push(`/follow?modelName=${query.modelName ||''}&step=${query.step ||''}&themeName=${query.themeName||''}`);
          if(typeof query.themeName !== 'undefined' && query.themeName !== ''){
            this.querySeries({
              themeName: query.themeName
            });
          }
          this.setState({
            rightWidth: 0,
            checkStep: query.step ||''
          });
        }
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
  queryThemes = async (param) =>{
    let result = await axios({
      method: "GET",
      url: `/design/getThemes?themeName=${param.themeName || ''}`,
    });
    const {data} = result;
    this.setState({
      themesArr: data
    }, () => {
      console.info(`获取主题信息:${JSON.stringify(this.state.themesArr)}`);
    });
  };
  queryStyles = async (param) =>{
    let result = await axios({
      method: "GET",
      url: `/design/getStyles?styles=${param.styles || ''}`,
    });
    const {data} = result;
    this.setState({
      stylesArr: data
    }, () => {
      console.info(`获取风格信息:${JSON.stringify(this.state.stylesArr)}`);
    });
  };
  querySeries = async (param) =>{
    let result = await axios({
      method: "GET",
      url: `/design/getSeries?themeName=${param.themeName || ''}`,
    });
    const {data} = result;
    let dataList = [];
    for (const [index, val] of data.entries()) {
      const obj = {
        key: (index + 1),
        card_info : 'card_info',
        card_actions : 'card_actions',
        picCheck : false
      };
      Object.assign(val, obj);
      dataList.push(val);
    }
    this.setState({
      seriesArr: dataList
    }, () => {
      console.info(`获取系列信息:${JSON.stringify(this.state.seriesArr)}`);
    });
  };
  queryKxsj = async (param) =>{
    let result = await axios({
      method: "POST",
      url: `/design/getKxsj`,
      data:{
        paramArr: param.paramArr
      }
    });
    const {data} = result;
    let dataList = [];
    let themeName="",seriesNameArr=[];
    themeName =data[0].theme_name;
    data.forEach(item=>{
      let {series_name} = item;
      let seriesNameFlag =seriesNameArr.some(item=>{return item.seriesName ===series_name});
      if(!seriesNameFlag){
        seriesNameArr.push({seriesName:series_name,dressStyleArr:[]});
      }
    });
    if(seriesNameArr.length>0){
      for(let i=0;i<seriesNameArr.length;i++){
        for(let j=0;j<data.length;j++){
          let {series_name,dress_style} =data[j];
          if(seriesNameArr[i].seriesName === series_name){
            let flag =seriesNameArr[i].dressStyleArr.some(item=>{return item.dressStyle ===dress_style});
            if(!flag){
              seriesNameArr[i].dressStyleArr.push({dressStyle:dress_style,designData:[]});
            }
          }
        }
      }
    }
    if(seriesNameArr.length>0){
      seriesNameArr.forEach(item=>{
        let {seriesName,dressStyleArr} = item;
        if(dressStyleArr.length>0){
          dressStyleArr.forEach(cur=>{
            let {dressStyle,designData} = cur;
            for(let j=0;j<data.length;j++){
              let {series_name,dress_style,silhouette,craft,mountings} =data[j];
              if(seriesName === series_name && dressStyle === dress_style){
                let flag =designData.some(item=>{return item.dress_style ===dress_style &&
                  item.silhouette ===silhouette &&
                  item.craft === craft &&
                  item.mountings ===mountings});
                if(!flag){
                  data[j].card_info='card_info';
                  data[j].card_actions='card_actions';
                  data[j].picCheck=false;
                  designData.push(data[j]);
                }
              }
            }
          });
          dataList.push({
            themeName,seriesName,dressStyleArr
          })
        }
      })
    }
    this.setState({
      kxsjArr: dataList
    }, () => {
      console.info(`获取系列信息:${JSON.stringify(this.state.kxsjArr)}`);
    });
  };
  showDrawer = () => {
    this.setState({
      leftWidth: 10,
    });
  };
  showRightAway = () => {
    this.setState({
      rightWidth: 10
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
  handleOptions=async (values, childrenTitle, optionTitle, stepName, modelName)=>{
    let {parameters, submitData,operateRecord} = this.state;
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    let newParameters = JSON.parse(JSON.stringify(parameters));
    let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));

    if(optionTitle ==='品牌风格' && values.length>0){
      await this.queryStyles({
        styles: values.join(',')
      });
    }
    if(optionTitle ==='品牌风格' && values.length<=0){
      this.setState({stylesArr:[]});
    }
    if(newOperateRecord.length<=0){
      newOperateRecord.push({
        id:1, values, childrenTitle, optionTitle, stepName, modelName
      })
    } else {
      newOperateRecord.sort((a,b)=>{return b.id - a.id});
      let id =newOperateRecord[0].id;
      newOperateRecord.push({
        id:id+1, values, childrenTitle, optionTitle, stepName, modelName,
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
      operateRecord:newOperateRecord,
      operateRecordPre:newOperateRecord
    }, () => {
      console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
      console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    })
  };
  handleChangeOption = async (isChecked, childrenTitle, optionTitle, stepName, modelName) => {
    let {parameters, submitData,operateRecord} = this.state;
    let themeName="";
    if(isChecked && optionTitle ==='主题设定'){
      themeName=childrenTitle;
      await this.queryThemes({
        themeName:childrenTitle
      });
    }
    if(!isChecked && optionTitle ==='主题设定'){
      this.setState({
        themesArr:[]
      })
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
                  options[i].checkedValues =[];
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
      operateRecord:newOperateRecord,
      operateRecordPre:newOperateRecord
    }, () => {
      console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
      console.info(`主题:${JSON.stringify(this.state.themeName)}`);
      console.info(`更新:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    })
  };
  handleDataIntegration =(operateRecordArr,newSubmitData,newParameters)=>{
    if(operateRecordArr.length>0){
      operateRecordArr.forEach(async item=>{
        if(typeof item.values!=='undefined'){
          let {values, childrenTitle, optionTitle, stepName, modelName} = item;
          if(optionTitle ==='品牌风格' && values.length>0){
            await this.queryStyles({
              styles: values.join(',')
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
        } else if(typeof item.isChecked!=='undefined'){
          let {isChecked, childrenTitle, optionTitle, stepName, modelName} = item;
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
                        options[i].checkedValues =[];
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
        }
      });
    }
  };
  handleSeriesData = (seriesId,seriesName,newPicCheck,newCardInfo,newCardActions) => {

    let {seriesArr,operateRecord} = this.state;
    let newSeriesArr = JSON.parse(JSON.stringify(seriesArr));
    let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
    let parameters=[];
    if(newOperateRecord.length<=0){
      newOperateRecord.push({
        id:1, seriesId, seriesName,newPicCheck,newCardInfo,newCardActions
      })
    } else {
      newOperateRecord.sort((a,b)=>{return b.id - a.id});
      let id =newOperateRecord[0].id;
      newOperateRecord.push({
        id:id+1, seriesId, seriesName,newPicCheck,newCardInfo,newCardActions
      });
    }
    if(newPicCheck){
      if(newSeriesArr.length>0){
        for(let i=0;i<newSeriesArr.length;i++){
          newSeriesArr[i].card_info = "card_info";
          newSeriesArr[i].picCheck = false;
          newSeriesArr[i].card_actions = "card_actions";
        }
        for(let i=0;i<newSeriesArr.length;i++){
          let {key} = newSeriesArr[i];
          if(key === seriesId){
            parameters.push(newSeriesArr[i]);
            newSeriesArr[i].card_info = newCardInfo;
            newSeriesArr[i].picCheck = newPicCheck;
            newSeriesArr[i].card_actions = newCardActions;
          }
        }
      }
      //同时获取右侧条件
      this.setState({
        seriesArr:newSeriesArr,
        rightWidth: "260px",
        parameters
      },()=>{
        console.info(JSON.stringify(this.state.parameters))
      })
    } else {
      if(newSeriesArr.length>0){
        for(let i=0;i<newSeriesArr.length;i++){
          newSeriesArr[i].card_info = "card_info";
          newSeriesArr[i].picCheck = false;
          newSeriesArr[i].card_actions = "card_actions";
        }
      }
      this.setState({
        seriesArr:newSeriesArr,
        rightWidth: 0,
        parameters: [],
      })
    }
    newOperateRecord.sort((a,b)=>{return a.id - b.id});
    this.setState({
      operateRecord:newOperateRecord,
      operateRecordPre:newOperateRecord
    }, () => {
      console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
    });
  };
  handleSeriesData1 = (operateRecordArr,newSeriesArr,parameters,rightWidth) => {
    if(operateRecordArr.length>0){
      operateRecordArr.forEach(async item=>{
        let {seriesId, newPicCheck,newCardInfo,newCardActions} = item;
        if(newPicCheck){
          rightWidth="260px";
          if(newSeriesArr.length>0){
            for(let i=0;i<newSeriesArr.length;i++){
              newSeriesArr[i].card_info = "card_info";
              newSeriesArr[i].picCheck = false;
              newSeriesArr[i].card_actions = "card_actions";
            }
            for(let i=0;i<newSeriesArr.length;i++){
              let {key} = newSeriesArr[i];
              if(key === seriesId){
                parameters.push(newSeriesArr[i]);
                newSeriesArr[i].card_info = newCardInfo;
                newSeriesArr[i].picCheck = newPicCheck;
                newSeriesArr[i].card_actions = newCardActions;
              }
            }
          }
        } else {
          if(newSeriesArr.length>0){
            for(let i=0;i<newSeriesArr.length;i++){
              newSeriesArr[i].card_info = "card_info";
              newSeriesArr[i].picCheck = false;
              newSeriesArr[i].card_actions = "card_actions";
            }
          }
        }
      });
    }
  };
  handleSeriesOptionsData = async (type,values,newPicCheck,newCardInfo,newCardActions,seriesName,themeName,modelName) => {
    let {parameters, submitData,operateRecord} = this.state;
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    let newParameters = JSON.parse(JSON.stringify(parameters));
    let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
    if(newOperateRecord.length<=0){
      newOperateRecord.push({
        id:1, values, type, newPicCheck,newCardInfo,newCardActions, seriesName, themeName, modelName
      })
    } else {
      newOperateRecord.sort((a,b)=>{return b.id - a.id});
      let id =newOperateRecord[0].id;
      newOperateRecord.push({
        id:id+1, values, type, newPicCheck,newCardInfo,newCardActions, seriesName, themeName, modelName
      });
    }
    if(newParameters.length>0){
      for(let i=0;i<newParameters.length;i++){
        if(type ==='主流色'){
            let {main_color} = newParameters[i];
            for(let j=0;j<main_color.length;j++){
              main_color[j].card_info = "card_info";
              main_color[j].picCheck = false;
              main_color[j].card_actions = "card_actions";
            }
            for(let j=0;j<main_color.length;j++){
              let {color_value} = main_color[j];
              if(color_value === values){
                main_color[j].card_info = newCardInfo;
                main_color[j].picCheck = newPicCheck;
                main_color[j].card_actions = newCardActions;
              }
            }
        } else if(type ==='点缀色'){
          let {embellish_color} = newParameters[i];
          for(let j=0;j<embellish_color.length;j++){
            embellish_color[j].card_info = "card_info";
            embellish_color[j].picCheck = false;
            embellish_color[j].card_actions = "card_actions";
          }
          for(let j=0;j<embellish_color.length;j++){
            let {color_value} = embellish_color[j];
            if(color_value === values){
              embellish_color[j].card_info = newCardInfo;
              embellish_color[j].picCheck = newPicCheck;
              embellish_color[j].card_actions = newCardActions;
            }
          }
        } else if(type ==='常用色'){
          let {common_color} = newParameters[i];
          for(let j=0;j<common_color.length;j++){
            common_color[j].card_info = "card_info";
            common_color[j].picCheck = false;
            common_color[j].card_actions = "card_actions";
          }
          for(let j=0;j<common_color.length;j++){
            let {color_value} = common_color[j];
            if(color_value === values){
              common_color[j].card_info = newCardInfo;
              common_color[j].picCheck = newPicCheck;
              common_color[j].card_actions = newCardActions;
            }
          }
        } else if(type ==='主推面料'){
          let {main_fabric} = newParameters[i];
          for(let j=0;j<main_fabric.length;j++){
            main_fabric[j].card_info = "card_info";
            main_fabric[j].picCheck = false;
            main_fabric[j].card_actions = "card_actions";
          }
          for(let j=0;j<main_fabric.length;j++){
            let {img_path} = main_fabric[j];
            if(img_path === values){
              main_fabric[j].card_info = newCardInfo;
              main_fabric[j].picCheck = newPicCheck;
              main_fabric[j].card_actions = newCardActions;
            }
          }
        } else if(type ==='点缀面料'){
          let {embellish_fabric} = newParameters[i];
          for(let j=0;j<embellish_fabric.length;j++){
            embellish_fabric[j].card_info = "card_info";
            embellish_fabric[j].picCheck = false;
            embellish_fabric[j].card_actions = "card_actions";
          }
          for(let j=0;j<embellish_fabric.length;j++){
            let {img_path} = embellish_fabric[j];
            if(img_path === values){
              embellish_fabric[j].card_info = newCardInfo;
              embellish_fabric[j].picCheck = newPicCheck;
              embellish_fabric[j].card_actions = newCardActions;
            }
          }
        }
      }
    }
    if (newSubmitData.length <= 0) {
      newSubmitData.push({
        modelName, themeName, seriesName, type, values
      });
    } else {
      let flag = newSubmitData.some(item=>{
        return item.modelName === modelName && item.themeName === themeName &&  item.seriesName  === seriesName &&  item.type ===  type
      });
      if(flag){
        for (let i = 0; i < newSubmitData.length; i++) {
          if (newSubmitData[i].modelName === modelName && newSubmitData[i].themeName === themeName &&   newSubmitData[i].seriesName  === seriesName &&  newSubmitData[i].type ===  type){
            newSubmitData[i].values=values;
          }
        }
      } else {
        newSubmitData.push({
          modelName, themeName, seriesName, type,values
        });
      }
    }
    newOperateRecord.sort((a,b)=>{return a.id - b.id});
    this.setState({
      submitData: newSubmitData,
      parameters: newParameters,
      operateRecord:newOperateRecord,
      operateRecordPre:newOperateRecord
    }, () => {
      console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
      console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    });
  };
  handleOptionsSecond=async (values,type,seriesName, themeName, modelName)=>{
    let {parameters, submitData,operateRecord} = this.state;
    let newSubmitData = JSON.parse(JSON.stringify(submitData));
    let newParameters = JSON.parse(JSON.stringify(parameters));
    let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
    if(newOperateRecord.length<=0){
      newOperateRecord.push({
        id:1, values, type, seriesName, themeName, modelName
      })
    } else {
      newOperateRecord.sort((a,b)=>{return b.id - a.id});
      let id =newOperateRecord[0].id;
      newOperateRecord.push({
        id:id+1, values, type, seriesName, themeName, modelName
      });
    }
    for (let i = 0; i < newParameters.length; i++) {
      let {model_name, theme_name, series_name} = newParameters[i];
      if (model_name === modelName && theme_name === themeName && series_name === seriesName) {
        if(type ==='外穿'){
          newParameters[i].wear_outside_values = values;
        } else if(type ==='内搭'){
          newParameters[i].inner_cloth_values = values;
        } else if(type ==='廓形'){
          newParameters[i].silhouette_values = values;
        } else if(type ==='工艺'){
          newParameters[i].craft_values = values;
        } else if(type ==='配件'){
          newParameters[i].mountings_values = values;
        }
      }
    }
    if (newSubmitData.length <= 0) {
      newSubmitData.push({
        modelName, themeName, seriesName, type,values
      });
    } else {
      let flag = newSubmitData.some(item=>{
        return item.modelName === modelName && item.themeName === themeName &&  item.seriesName  === seriesName &&  item.type ===  type
      });
      if(flag){
        for (let i = 0; i < newSubmitData.length; i++) {
          if (newSubmitData[i].modelName === modelName && newSubmitData[i].themeName === themeName &&   newSubmitData[i].seriesName  === seriesName &&  newSubmitData[i].type ===  type){
            newSubmitData[i].values=values;
          }
        }
      } else {
        newSubmitData.push({
          modelName, themeName, seriesName, type,values
        });
      }
    }
    newOperateRecord.sort((a,b)=>{return a.id - b.id});
    this.setState({
      submitData: newSubmitData,
      parameters: newParameters,
      operateRecord:newOperateRecord,
      operateRecordPre:newOperateRecord
    }, () => {
      console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
      console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
    });
  };
  handleSeriesDataIntegration =(operateRecordArr,newSubmitData,newParameters)=>{
    let {seriesArr} = this.state;
    let newSeriesName='';
    let arr=seriesArr.filter(item=>{return item.picCheck === true});
    if(arr.length>0){
      newSeriesName =arr[0].series_name;
    }
    if(operateRecordArr.length>0){
      operateRecordArr.forEach(async item=>{
        let {modelName, themeName, seriesName,type,values} = item;
        if(newSeriesName === seriesName){
          if(newParameters.length>0){
            for(let i=0;i<newParameters.length;i++){
              if(type ==='主流色'){
                let {values,newPicCheck,newCardInfo,newCardActions} = item;
                let {main_color} = newParameters[i];
                for(let j=0;j<main_color.length;j++){
                  main_color[j].card_info = "card_info";
                  main_color[j].picCheck = false;
                  main_color[j].card_actions = "card_actions";
                }
                for(let j=0;j<main_color.length;j++){
                  let {color_value} = main_color[j];
                  if(color_value === values){
                    main_color[j].card_info = newCardInfo;
                    main_color[j].picCheck = newPicCheck;
                    main_color[j].card_actions = newCardActions;
                  }
                }
              } else if(type ==='点缀色'){
                let {values,newPicCheck,newCardInfo,newCardActions} = item;
                let {embellish_color} = newParameters[i];
                for(let j=0;j<embellish_color.length;j++){
                  embellish_color[j].card_info = "card_info";
                  embellish_color[j].picCheck = false;
                  embellish_color[j].card_actions = "card_actions";
                }
                for(let j=0;j<embellish_color.length;j++){
                  let {color_value} = embellish_color[j];
                  if(color_value === values){
                    embellish_color[j].card_info = newCardInfo;
                    embellish_color[j].picCheck = newPicCheck;
                    embellish_color[j].card_actions = newCardActions;
                  }
                }
              } else if(type ==='常用色'){
                let {values,newPicCheck,newCardInfo,newCardActions} = item;
                let {common_color} = newParameters[i];
                for(let j=0;j<common_color.length;j++){
                  common_color[j].card_info = "card_info";
                  common_color[j].picCheck = false;
                  common_color[j].card_actions = "card_actions";
                }
                for(let j=0;j<common_color.length;j++){
                  let {color_value} = common_color[j];
                  if(color_value === values){
                    common_color[j].card_info = newCardInfo;
                    common_color[j].picCheck = newPicCheck;
                    common_color[j].card_actions = newCardActions;
                  }
                }
              } else if(type ==='主推面料'){
                let {values,newPicCheck,newCardInfo,newCardActions} = item;
                let {main_fabric} = newParameters[i];
                for(let j=0;j<main_fabric.length;j++){
                  main_fabric[j].card_info = "card_info";
                  main_fabric[j].picCheck = false;
                  main_fabric[j].card_actions = "card_actions";
                }
                for(let j=0;j<main_fabric.length;j++){
                  let {img_path} = main_fabric[j];
                  if(img_path === values){
                    main_fabric[j].card_info = newCardInfo;
                    main_fabric[j].picCheck = newPicCheck;
                    main_fabric[j].card_actions = newCardActions;
                  }
                }
              } else if(type ==='点缀面料'){
                let {values,newPicCheck,newCardInfo,newCardActions} = item;
                let {embellish_fabric} = newParameters[i];
                for(let j=0;j<embellish_fabric.length;j++){
                  embellish_fabric[j].card_info = "card_info";
                  embellish_fabric[j].picCheck = false;
                  embellish_fabric[j].card_actions = "card_actions";
                }
                for(let j=0;j<embellish_fabric.length;j++){
                  let {img_path} = embellish_fabric[j];
                  if(img_path === values){
                    embellish_fabric[j].card_info = newCardInfo;
                    embellish_fabric[j].picCheck = newPicCheck;
                    embellish_fabric[j].card_actions = newCardActions;
                  }
                }
              } else if(type ==='外穿'){
                newParameters[i].wear_outside_values = values;
              } else if(type ==='内搭'){
                newParameters[i].inner_cloth_values = values;
              } else if(type ==='廓形'){
                newParameters[i].silhouette_values = values;
              } else if(type ==='工艺'){
                newParameters[i].craft_values = values;
              } else if(type ==='配件'){
                newParameters[i].mountings_values = values;
              }
            }
          }
          if (newSubmitData.length <= 0) {
            newSubmitData.push({
              modelName, themeName, seriesName, type,values
            });
          } else {
            let flag = newSubmitData.some(item=>{
              return item.modelName === modelName && item.themeName === themeName &&  item.seriesName  === seriesName &&  item.type ===  type
            });
            if(flag){
              for (let i = 0; i < newSubmitData.length; i++) {
                if (newSubmitData[i].modelName === modelName && newSubmitData[i].themeName === themeName &&   newSubmitData[i].seriesName  === seriesName &&  newSubmitData[i].type ===  type){
                  newSubmitData[i].values=values;
                }
              }
            } else {
              newSubmitData.push({
                modelName, themeName, seriesName, type,values
              });
            }
          }
        }
      });
    }
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
    let query = this.props.location.query;
    if(query.step === '1'){
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
                    handleOptions={this.handleOptions}
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
                  handleOptions={this.handleOptions}
                  handleChangeOption={this.handleChangeOption}
                />
              </Card>
            );
          }
        })
      });
    } else if(query.step === '2'){
      vDOM.push(
        <div key={Math.random()}>
          <OptionsComponentSecond
            parameters={parameters}
            handleSeriesOptionsData={this.handleSeriesOptionsData}
            handleOptionsSecond={this.handleOptionsSecond}
          />
        </div>
      );
    } else if(query.step === '4'){
      vDOM.push(
        <div key={Math.random()}>
          <OptionsComponentFourth
            data={parameters}
          />
        </div>
      );
    } else if(query.step === '5'){
      vDOM.push(
        <div key={Math.random()}>
          <OptionsComponentFifth
            data={parameters}
          />
        </div>
      );
    } else if(query.step === '6'){
      vDOM.push(
        <div key={Math.random()}>
          <OptionsComponentSixth
            data={parameters}
          />
        </div>
      );
    }
    return <div style={{marginTop: "20px"}}>{vDOM}</div>;
  };
  handleUndo=async ()=>{
    let {operateRecord} = this.state;
    let query = this.props.location.query;
    if(operateRecord.length>0){
      if(query.step === '1'){
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        newOperateRecord.sort((a,b)=>{return b.id - a.id});
        let id =newOperateRecord[0].id;
        if(id ===1){
          if(typeof newOperateRecord[0].values!=='undefined'){
            newOperateRecord[0].values=[];
          } else if(typeof newOperateRecord[0].isChecked!=='undefined'){
            newOperateRecord[0].isChecked=false;
          }
          let {parameters, submitData} = this.state;
          let newSubmitData = JSON.parse(JSON.stringify(submitData));
          let newParameters = JSON.parse(JSON.stringify(parameters));
          let themeName="";
          let stylesFlag=false;
          await this.handleDataIntegration(newOperateRecord,newSubmitData,newParameters);
          for(let i=0;i<newParameters.length;i++){
            let {parameters} = newParameters[i];
            for(let j=0;j<parameters.length;j++){
              let {option_title, options} = parameters[j];
              if(option_title ==='主题设定'){
                for(let k=0;k<options.length;k++){
                  let {children_flag,children_title} = options[k];
                  if(children_flag){
                    themeName =children_title;
                  }
                }
              } else if(option_title ==='品牌风格' && typeof parameters[j].checkedValues.length<=0){
                stylesFlag=true
              }
            }
          }
          if(stylesFlag){
            this.setState({
              stylesArr:[]
            });
          }
          if(themeName!==''){
            await this.queryThemes({
              themeName
            });
          } else {
            this.setState({
              themesArr:[]
            });
          }
          this.setState({
            parameters: newParameters,
            submitData: newSubmitData,
            themeName
          }, () => {
            console.info(`主题:${JSON.stringify(this.state.themeName)}`);
            console.info(`更新:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
          })
        } else {
          for (let i = 0; i < newOperateRecord.length; i++) {
            if (newOperateRecord[i].id === id) {
              let {parameters} = this.state;
              let newParameters = JSON.parse(JSON.stringify(parameters));
              newParameters.forEach(item => {
                let {model_name, step_name, parameters} = item;
                if (model_name === newOperateRecord[i].modelName && step_name === newOperateRecord[i].stepName) {
                  parameters.forEach(item => {
                    let {option_title,option_type, options} = item;
                    if (option_title === newOperateRecord[i].optionTitle && option_type ==='单选') {
                      if (options.length > 0 && typeof options[0] === 'object') {
                        for (let i = 0; i < options.length; i++) {
                          options[i].children_flag = false;
                          options[i].subset_flag = false;
                        }
                        for (let k = 0; k < options.length; k++) {
                          let {children_title} = options[k];
                          if (children_title === newOperateRecord[i].childrenTitle) {
                            if(typeof newOperateRecord[i].isChecked!=='undefined'){
                              options[k].children_flag = false;
                              options[k].subset_flag = false;
                              options[k].checkedValues =[];
                            } else if(typeof newOperateRecord[i].values!=='undefined' && newOperateRecord[i].values.length>0){
                              options[k].children_flag = true;
                              options[k].subset_flag = true;
                            }
                          }
                        }
                      }
                    } else if(option_title === newOperateRecord[i].optionTitle && option_type ==='多选'){
                      if (options.length > 0 && typeof options[0] === 'object') {
                        for (let k = 0; k < options.length; k++) {
                          let {children_title} = options[k];
                          if (children_title === newOperateRecord[i].childrenTitle) {
                            options[k].children_flag = newOperateRecord[i].isChecked;
                            options[k].subset_flag = newOperateRecord[i].isChecked;
                          }
                        }
                      }
                    }
                  });
                }
              });
              newOperateRecord[i] = newOperateRecord[newOperateRecord.length - 1];
              newOperateRecord.length--;
              i--;
              newOperateRecord.sort((a,b)=>{return a.id - b.id});
              this.setState({
                parameters: newParameters,
                operateRecord: newOperateRecord
              },async ()=>{
                console.info(JSON.stringify(this.state.parameters));
                console.info(JSON.stringify(this.state.operateRecord));
                let {parameters, submitData} = this.state;
                let newSubmitData = JSON.parse(JSON.stringify(submitData));
                let newParameters = JSON.parse(JSON.stringify(parameters));
                let themeName="",stylesFlag=false;
                await this.handleDataIntegration(newOperateRecord,newSubmitData,newParameters);
                for(let i=0;i<newParameters.length;i++){
                  let {parameters} = newParameters[i];
                  for(let j=0;j<parameters.length;j++){
                    let {option_title, options} = parameters[j];
                    if(option_title ==='主题设定'){
                      for(let k=0;k<options.length;k++){
                        let {children_flag,children_title} = options[k];
                        if(children_flag){
                          themeName =children_title;
                        }
                      }
                    } else if(option_title ==='品牌风格' && typeof parameters[j].checkedValues.length<=0){
                      stylesFlag=true
                    }
                  }
                }
                if(stylesFlag){
                  this.setState({
                    stylesArr:[]
                  });
                }
                if(themeName!==''){
                  await this.queryThemes({
                    themeName
                  });
                } else {
                  this.setState({
                    themesArr:[]
                  });
                }
                this.setState({
                  parameters: newParameters,
                  submitData: newSubmitData,
                  themeName
                }, () => {
                  console.info(`主题:${JSON.stringify(this.state.themeName)}`);
                  console.info(`更新:${JSON.stringify(this.state.parameters)}`);
                  console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
                })
              });
            }
          }
        }
      }
      else if(query.step === '2'){
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        newOperateRecord.sort((a,b)=>{return b.id - a.id});
        let id =newOperateRecord[0].id;
        if(id ===1){
          if(typeof newOperateRecord[0].seriesId!=='undefined'){
            newOperateRecord[0].newPicCheck=false;
            let {seriesArr} = this.state;
            let newSeriesArr= JSON.parse(JSON.stringify(seriesArr));
            let parameters=[],rightWidth=0;
            await this.handleSeriesData1(newOperateRecord,newSeriesArr,parameters,rightWidth);
            this.setState({
              seriesArr: newSeriesArr,
              rightWidth,
              parameters
            }, () => {
              console.info(`更新:${JSON.stringify(this.state.seriesArr)}`);
            })
          } else {
            if(newOperateRecord[0].type ==='主流色'
              || newOperateRecord[0].type ==='点缀色'
              || newOperateRecord[0].type ==='常用色'
              || newOperateRecord[0].type ==='主推面料'
              || newOperateRecord[0].type ==='点缀面料'
            ){
              newOperateRecord[0].values="";
            } else if(newOperateRecord[0].type ==='外穿'
              || newOperateRecord[0].type ==='内搭'
              || newOperateRecord[0].type ==='廓形'
              || newOperateRecord[0].type ==='工艺'
              || newOperateRecord[0].type ==='配件'){
              newOperateRecord[0].values=[];
            }
            let {parameters, submitData} = this.state;
            let newSubmitData = JSON.parse(JSON.stringify(submitData));
            let newParameters = JSON.parse(JSON.stringify(parameters));
            await this.handleSeriesDataIntegration(newOperateRecord,newSubmitData,newParameters);
            this.setState({
              parameters: newParameters,
              submitData: newSubmitData
            }, () => {
              console.info(`更新:${JSON.stringify(this.state.parameters)}`);
              console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
            })
          }
        } else {
          for (let i = 0; i < newOperateRecord.length; i++) {
            if (newOperateRecord[i].id === id) {
              if(typeof newOperateRecord[0].seriesId!=='undefined'){
                let {seriesArr} = this.state;
                let newSeriesArr= JSON.parse(JSON.stringify(seriesArr));
                newSeriesArr.forEach(item => {
                  let {key} = item;
                  if(key === newOperateRecord[i].seriesId){
                    item.card_info = "card_info";
                    item.picCheck = false;
                    item.card_actions = "card_actions";
                  }
                });
                newOperateRecord[i] = newOperateRecord[newOperateRecord.length - 1];
                newOperateRecord.length--;
                i--;
                newOperateRecord.sort((a,b)=>{return a.id - b.id});
                let tmpOperateRecord = newOperateRecord;
                tmpOperateRecord.sort((a,b)=>{return b.id - a.id});
                let tmpSeriesId='',parameters=[];
                for(let t=0;t<tmpOperateRecord.length;t++){
                  if(typeof tmpOperateRecord[t].seriesId!=='undefined'){
                    tmpSeriesId = tmpOperateRecord[t].seriesId;
                    break;
                  }
                }
                if(tmpSeriesId!==''){
                  for(let i=0;i<newSeriesArr.length;i++){
                    newSeriesArr[i].card_info = "card_info";
                    newSeriesArr[i].picCheck = false;
                    newSeriesArr[i].card_actions = "card_actions";
                  }
                  newSeriesArr.forEach(item => {
                    let {key} = item;
                    if(key === tmpSeriesId){
                      item.card_info = "card_infoBefore";
                      item.picCheck = true;
                      item.card_actions = "card_actionsBefore";
                      parameters.push(item);
                    }
                  });
                  this.setState({
                    rightWidth:"260px",
                    parameters,
                    seriesArr: newSeriesArr,
                    operateRecord: newOperateRecord
                  },async ()=>{
                    console.info(JSON.stringify(this.state.parameters));
                    console.info(JSON.stringify(this.state.operateRecord));
                    let {parameters, submitData} = this.state;
                    let newSubmitData = JSON.parse(JSON.stringify(submitData));
                    let newParameters = JSON.parse(JSON.stringify(parameters));
                    await this.handleSeriesDataIntegration(newOperateRecord,newSubmitData,newParameters);
                    this.setState({
                      parameters: newParameters,
                      submitData: newSubmitData
                    }, () => {
                      console.info(`更新:${JSON.stringify(this.state.parameters)}`);
                      console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
                    })
                  });
                } else{
                  this.setState({
                    seriesArr: newSeriesArr,
                    operateRecord: newOperateRecord
                  },async ()=>{
                    console.info(JSON.stringify(this.state.operateRecord));
                    let parameters=[],rightWidth=0;
                    await this.handleSeriesData1(newOperateRecord,newSeriesArr,parameters,rightWidth);
                    this.setState({
                      seriesArr: newSeriesArr,
                      rightWidth,
                      parameters
                    }, () => {
                      console.info(`更新:${JSON.stringify(this.state.seriesArr)}`);
                    })
                  });
                }
              } else {
                let {parameters} = this.state;
                let newParameters = JSON.parse(JSON.stringify(parameters));
                newParameters.forEach(item => {
                  let {model_name, theme_name, series_name} = item;
                  if (model_name === newOperateRecord[i].modelName && theme_name === newOperateRecord[i].themeName && series_name === newOperateRecord[i].seriesName) {
                    if(newOperateRecord[i].type ==='主流色'){
                      let {main_color} = newParameters[i];
                      for(let j=0;j<main_color.length;j++){
                        main_color[j].card_info = "card_info";
                        main_color[j].picCheck = false;
                        main_color[j].card_actions = "card_actions";
                      }
                    } else if(newOperateRecord[i].type ==='点缀色'){
                      let {embellish_color} = newParameters[i];
                      for(let j=0;j<embellish_color.length;j++){
                        embellish_color[j].card_info = "card_info";
                        embellish_color[j].picCheck = false;
                        embellish_color[j].card_actions = "card_actions";
                      }
                    } else if(newOperateRecord[i].type ==='常用色'){
                      let {common_color} = newParameters[i];
                      for(let j=0;j<common_color.length;j++){
                        common_color[j].card_info = "card_info";
                        common_color[j].picCheck = false;
                        common_color[j].card_actions = "card_actions";
                      }
                    } else if(newOperateRecord[i].type ==='主推面料'){
                      let {main_fabric} = newParameters[i];
                      for(let j=0;j<main_fabric.length;j++){
                        main_fabric[j].card_info = "card_info";
                        main_fabric[j].picCheck = false;
                        main_fabric[j].card_actions = "card_actions";
                      }
                    } else if(newOperateRecord[i].type ==='点缀面料'){
                      let {embellish_fabric} = newParameters[i];
                      for(let j=0;j<embellish_fabric.length;j++){
                        embellish_fabric[j].card_info = "card_info";
                        embellish_fabric[j].picCheck = false;
                        embellish_fabric[j].card_actions = "card_actions";
                      }
                    }else if(newOperateRecord[i].type ==='外穿'){
                      newParameters[i].wear_outside_values = [];
                    } else if(newOperateRecord[i].type ==='内搭'){
                      newParameters[i].inner_cloth_values = [];
                    } else if(newOperateRecord[i].type ==='廓形'){
                      newParameters[i].silhouette_values = [];
                    } else if(newOperateRecord[i].type ==='工艺'){
                      newParameters[i].craft_values =[];
                    } else if(newOperateRecord[i].type ==='配件'){
                      newParameters[i].mountings_values = [];
                    }
                  }
                });
                newOperateRecord[i] = newOperateRecord[newOperateRecord.length - 1];
                newOperateRecord.length--;
                i--;
                newOperateRecord.sort((a,b)=>{return a.id - b.id});
                this.setState({
                  parameters: newParameters,
                  operateRecord: newOperateRecord
                },async ()=>{
                  console.info(JSON.stringify(this.state.parameters));
                  console.info(JSON.stringify(this.state.operateRecord));
                  let {parameters, submitData} = this.state;
                  let newSubmitData = JSON.parse(JSON.stringify(submitData));
                  let newParameters = JSON.parse(JSON.stringify(parameters));
                  await this.handleSeriesDataIntegration(newOperateRecord,newSubmitData,newParameters);
                  this.setState({
                    parameters: newParameters,
                    submitData: newSubmitData
                  }, () => {
                    console.info(`更新:${JSON.stringify(this.state.parameters)}`);
                    console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
                  })
                });
              }
            }
          }
        }
      }
    }
  };
  handleRedo=()=>{
    let {operateRecord,operateRecordPre} = this.state;
    console.info(JSON.stringify(operateRecordPre))
    let newOperateRecord=[],themeName="",stylesFlag=false;
    let query = this.props.location.query;
    if(operateRecord.length>0){
      newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
      newOperateRecord.sort((a,b)=>{return b.id - a.id});
      let id =newOperateRecord[0].id;
      let arr=operateRecordPre.filter(item=>{
        return item.id === (id+1);
      });
      newOperateRecord = newOperateRecord.concat(arr);
    } else {
      operateRecordPre.sort((a,b)=>{return a.id - b.id});
      newOperateRecord.concat(operateRecordPre[0]);
    }
    console.info(JSON.stringify(newOperateRecord));
    if(query.step === '1'){
      newOperateRecord.sort((a,b)=>{return a.id - b.id});
      this.setState({
        operateRecord: newOperateRecord
      },async ()=>{
        console.info(JSON.stringify(this.state.operateRecord));
        let {parameters, submitData} = this.state;
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newParameters = JSON.parse(JSON.stringify(parameters));
        await this.handleDataIntegration(newOperateRecord,newSubmitData,newParameters);
        for(let i=0;i<newParameters.length;i++){
          let {parameters} = newParameters[i];
          for(let j=0;j<parameters.length;j++){
            let {option_title, options} = parameters[j];
            if(option_title ==='主题设定'){
              for(let k=0;k<options.length;k++){
                let {children_flag,children_title} = options[k];
                if(children_flag){
                  themeName =children_title;
                }
              }
            } else if(option_title ==='品牌风格' && typeof parameters[j].checkedValues.length<=0){
              stylesFlag=true
            }
          }
        }
        if(stylesFlag){
          this.setState({
            stylesArr:[]
          });
        }
        if(themeName!==''){
          await this.queryThemes({
            themeName
          });
        } else {
          this.setState({
            themesArr:[]
          });
        }
        this.setState({
          parameters: newParameters,
          submitData: newSubmitData,
          themeName
        }, () => {
          console.info(`主题:${JSON.stringify(this.state.themeName)}`);
          console.info(`更新:${JSON.stringify(this.state.parameters)}`);
          console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        });
      });
    }
    else if(query.step === '2'){
      newOperateRecord.sort((a,b)=>{return a.id - b.id});
      this.setState({
        operateRecord: newOperateRecord
      },async ()=>{
        console.info(JSON.stringify(this.state.operateRecord));
        let newOperateRecord = JSON.parse(JSON.stringify(this.state.operateRecord));
        newOperateRecord.sort((a,b)=>{return a.id - b.id});
        for (let i = 0; i < newOperateRecord.length; i++) {
          if(typeof newOperateRecord[i].seriesId!=='undefined'){
            let {seriesArr} = this.state;
            let newSeriesArr= JSON.parse(JSON.stringify(seriesArr));
            newSeriesArr.forEach(item => {
              let {key} = item;
              if(key === newOperateRecord[i].seriesId){
                item.card_info = "card_info";
                item.picCheck = false;
                item.card_actions = "card_actions";
              }
            });
            let tmpOperateRecord = newOperateRecord;
            tmpOperateRecord.sort((a,b)=>{return b.id - a.id});
            let tmpSeriesId='',parameters=[];
            for(let t=0;t<tmpOperateRecord.length;t++){
              if(typeof tmpOperateRecord[t].seriesId!=='undefined'){
                tmpSeriesId = tmpOperateRecord[t].seriesId;
                break;
              }
            }
            console.info(tmpSeriesId)
            if(tmpSeriesId!==''){
              for(let i=0;i<newSeriesArr.length;i++){
                newSeriesArr[i].card_info = "card_info";
                newSeriesArr[i].picCheck = false;
                newSeriesArr[i].card_actions = "card_actions";
              }
              newSeriesArr.forEach(item => {
                let {key} = item;
                if(key === tmpSeriesId){
                  item.card_info = "card_infoBefore";
                  item.picCheck = true;
                  item.card_actions = "card_actionsBefore";
                  parameters.push(item);
                }
              });
              console.info(JSON.stringify(newSeriesArr))
              this.setState({
                rightWidth:"260px",
                parameters,
                seriesArr: newSeriesArr,
                operateRecord: newOperateRecord
              },async ()=>{
                console.info(JSON.stringify(this.state.parameters));
                console.info(JSON.stringify(this.state.operateRecord));
                let {parameters, submitData} = this.state;
                let newSubmitData = JSON.parse(JSON.stringify(submitData));
                let newParameters = JSON.parse(JSON.stringify(parameters));
                await this.handleSeriesDataIntegration(newOperateRecord,newSubmitData,newParameters);
                this.setState({
                  parameters: newParameters,
                  submitData: newSubmitData
                }, () => {
                  console.info(`更新:${JSON.stringify(this.state.parameters)}`);
                  console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
                })
              });
            }
          }
          else {
            let {parameters, submitData} = this.state;
            let newSubmitData = JSON.parse(JSON.stringify(submitData));
            let newParameters = JSON.parse(JSON.stringify(parameters));
            await this.handleSeriesDataIntegration(newOperateRecord,newSubmitData,newParameters);
            this.setState({
              parameters: newParameters,
              submitData: newSubmitData
            }, () => {
              console.info(`更新:${JSON.stringify(this.state.parameters)}`);
              console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
            });
          }
        }
      });
    }
  };
  handleSaveStep=()=>{

  };
  handleExecute=()=>{
    let query = this.props.location.query;
    let {submitData} = this.state;
    if(submitData.length>0){
      if(query.step ==='1'){
        let themeName='';
        submitData.forEach(item=>{
          let {parameters} =item;
          if(parameters.length>0){
            parameters.forEach(cur=>{
              let {optionTitle} = cur;
              if(optionTitle ==='主题设定'){
                if(typeof cur.childrenTitle!=='undefined' && cur.childrenTitle!==''){
                  themeName = cur.childrenTitle
                }
              }
            });
          }
        });
        if(themeName!==''){
          this.setState({
            checkStep: "2",
            rightWidth: 0,
            parameters:[],
            themesArr:[],
            stylesArr:[],
            submitData:[],
            operateRecord: [],
            operateRecordPre: []
          });
          router.push(`/follow?modelName=${query.modelName ||''}&step=2&themeName=${themeName}`);
          this.querySeries({
            themeName
          });
        }
      } else if(query.step ==='2'){
        let themeName="",seriesNameArr=[];
        themeName =submitData[0].themeName;
        submitData.forEach(item=>{
            let {seriesName} = item;
            if(seriesNameArr<=0){
              seriesNameArr.push(seriesName);
            } else {
              let seriesNameFlag =seriesNameArr.some(item=>{return item ===seriesName});
              if(!seriesNameFlag){
                seriesNameArr.push(seriesName);
              }
            }
        });
        let subArr=[];
        if(seriesNameArr.length>0){
          for(let i=0;i<seriesNameArr.length;i++){
            let cur=seriesNameArr[i];
            let dressStyleArr=[],silhouetteArr=[],craftArr=[],mountingsArr=[];
            for(let j=0;j<submitData.length;j++){
              let {seriesName,type,values} =submitData[j];
              if(cur === seriesName){
                if(typeof values==='object' && values.length>0){
                  if(type ==='外穿' || type ==='内搭'){
                    values.forEach(v=>{
                      if(dressStyleArr.length>0){
                        let flag =dressStyleArr.some(item=>{return item ===v});
                        if(!flag){
                          dressStyleArr.push(v);
                        }
                      } else {
                        dressStyleArr.push(v)
                      }
                    });
                  } else if(type ==='廓形'){
                    values.forEach(v=>{
                      if(silhouetteArr.length>0){
                        let flag =silhouetteArr.some(item=>{return item ===v});
                        if(!flag){
                          silhouetteArr.push(v);
                        }
                      } else {
                        silhouetteArr.push(v)
                      }
                    });
                  } else if(type ==='工艺'){
                    values.forEach(v=>{
                      if(craftArr.length>0){
                        let flag =craftArr.some(item=>{return item ===v});
                        if(!flag){
                          craftArr.push(v);
                        }
                      } else {
                        craftArr.push(v)
                      }
                    });
                  } else if(type ==='配件'){
                    values.forEach(v=>{
                      if(mountingsArr.length>0){
                        let flag =mountingsArr.some(item=>{return item ===v});
                        if(!flag){
                          mountingsArr.push(v);
                        }
                      } else {
                        mountingsArr.push(v)
                      }
                    });
                  }
                }
              }
            }
            subArr.push({
              themeName,
              seriesName:cur,
              dressStyleArr:dressStyleArr||[],
              silhouetteArr:silhouetteArr||[],
              craftArr:craftArr||[],
              mountingsArr:mountingsArr||[]
            })
          }
        }
        console.info(JSON.stringify(subArr));
        if(subArr.length>0){
          this.setState({
            checkStep: "4",
            rightWidth: 0,
            parameters:[],
            themesArr:[],
            stylesArr:[],
            seriesArr:[],
            submitData:[],
            operateRecord: [],
            operateRecordPre: [],
          });
          router.push(`/follow?modelName=${query.modelName ||''}&step=4&themeName=${themeName}`);
          this.queryKxsj({
            paramArr:subArr
          });
        }
      } else if(query.step ==='3'){

      } else if(query.step ==='4'){

      } else if(query.step ==='5'){

      } else if(query.step ==='6'){

      }
    }
  };
  renderMainContent(){
    let vDOM=[];
    let {themesArr,stylesArr} = this.state;
    if(themesArr.length <=0 && stylesArr.length>0){
      let vDOM_1=[];
      stylesArr.forEach(item=>{
        let {img_path,style_type} = item;
        vDOM_1.push(
           <Col key={Math.random()} span={6.5} order={2}
               style={{ paddingTop: '5px', paddingBottom: '5px', height: '350px'}}>
            <img style={{width: '100%', height: '100%'}} src={img_path} alt=""/>
            <p style={{
              textAlign: "center",
              marginTop: "10px"
            }}>{style_type}</p>
          </Col>
        );
      });
      vDOM.push(<div key={Math.random()}>
        <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>风格分析</h3>
        <Row type="flex" justify="space-around"
             style={{marginBottom: '20px', marginTop: '20px'}}>
          {vDOM_1}
        </Row>
      </div>);
    } else if(themesArr.length >0 && stylesArr.length<=0){
      themesArr.forEach((item,index)=>{
        let {children_name,children_img,children_desc} = item;
        if(index ===0){
          vDOM.push(
            <div key={Math.random()}>
              <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>主题: {children_name}</h3>
              <div style={{width: '100%', padding: '20px'}}>
                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
              </div>
              <p style={{marginTop: '20px',fontSize: "20px"}}>{children_desc}</p>
            </div>
          );
        } else if(index ===1){
          vDOM.push(
            <div key={Math.random()}>
              <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>{children_name}</h3>
              <div className={sty.colorWrapper}>
                <div style={{width: '100%', padding: '20px'}}>
                  <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                </div>
              </div>
              <p style={{marginTop: '20px',fontSize: "20px"}}>{children_desc}</p>
            </div>
          );
        } else {
          vDOM.push(
            <div key={Math.random()}>
              <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>{children_name}</h3>
              <div style={{width: '100%', padding: '20px'}}>
                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
              </div>
              <p style={{marginTop: '20px',fontSize: "20px"}}>{children_desc}</p>
            </div>
          );
        }
      });
    } else if(themesArr.length >0 && stylesArr.length>0){
      themesArr.forEach((item,index)=>{
        let {children_name,children_img,children_desc} = item;
        if(index ===0){
          vDOM.push(
            <div key={Math.random()}>
              <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>主题: {children_name}</h3>
              <div style={{width: '100%', padding: '20px'}}>
                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
              </div>
              <p style={{marginTop: '20px',fontSize: "20px"}}>{children_desc}</p>
            </div>
          );
        } else if(index ===1){
          vDOM.push(
            <div key={Math.random()}>
              <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>{children_name}</h3>
              <div className={sty.colorWrapper}>
                <div style={{width: '100%', padding: '20px'}}>
                  <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                </div>
              </div>
              <p style={{marginTop: '20px',fontSize: "20px"}}>{children_desc}</p>
            </div>
          );
        } else {
          vDOM.push(
            <div key={Math.random()}>
              <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>{children_name}</h3>
              <div style={{width: '100%', padding: '20px'}}>
                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
              </div>
              <p style={{marginTop: '20px',fontSize: "20px"}}>{children_desc}</p>
            </div>
          );
        }
      });
      let vDOM_1=[];
      stylesArr.forEach(item=>{
        let {img_path,style_type} = item;
        vDOM_1.push(
          <Col key={Math.random()} span={6.5} order={2}
               style={{ paddingTop: '5px', paddingBottom: '5px', height: '350px'}}>
            <img style={{width: '100%', height: '100%'}} src={img_path} alt=""/>
            <p style={{
              textAlign: "center",
              marginTop: "10px"
            }}>{style_type}</p>
          </Col>
        );
      });
      vDOM.push(<div key={Math.random()}>
        <h3 style={{textAlign: 'center', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "20px"}}>风格分析</h3>
        <Row type="flex" justify="space-around"
             style={{marginBottom: '20px', marginTop: '20px'}}>
          {vDOM_1}
        </Row>
      </div>);
    }
    return <div className={sty.themeWrapper}>{vDOM}</div>;
  };
  renderSeriesDom(){
    let vDOM=[];
    let {seriesArr} = this.state;
     if(seriesArr.length>0){
       seriesArr.forEach(item=>{
         let {key,card_info,card_actions,picCheck,series_name,img_path} = item;
         vDOM.push(
           <Col key={key} style={{marginLeft: '40px',marginTop: '10px'}}>
             <SingleImgCard
               id={key}
               card_info={card_info}
               series_name={series_name}
               card_actions={card_actions}
               picCheck={picCheck}
               picAddress={img_path}
               handleSeriesData={this.handleSeriesData}
             />
             <p style={{
               textAlign: "center",
               marginTop: "10px",
               fontSize: "15px"
             }}>产品系列: {series_name}</p>
           </Col>
        );
     });
       return <div className={sty.themeWrapper} style={{
         height: `${document.body.clientHeight-180}px`
       }}><Row type="flex">{vDOM}</Row></div>;
    } else {
       return vDOM;
     }
  };
  handleDesignData=()=>{

  };
  renderKxsjCommonDom(){
    let vDOM=[];
    let {kxsjArr} = this.state;
    if(kxsjArr.length>0){
      kxsjArr.forEach((item,i)=>{
        let {seriesName,dressStyleArr} = item;
        let dressStyleVDOM=[];
        if(dressStyleArr.length>0){
          dressStyleArr.forEach((cur,index)=>{
            let {dressStyle,designData} =cur;
            let designDataVDOM=[];
            if(designData.length>0){
              designData.forEach(c=>{
                let {img_path,silhouette,card_info,card_actions,picCheck} = c;
                designDataVDOM.push(
                  <Col key={Math.random()} style={{marginLeft: '40px',marginTop: '10px'}}>
                    <DesginSingleImgCard
                      card_info={card_info}
                      card_actions={card_actions}
                      picCheck={picCheck}
                      picAddress={img_path}
                      data={c}
                      handleDesignData={this.handleDesignData}
                    />
                    <p style={{
                      textAlign: "center",
                      marginTop: "10px",
                      fontSize: "15px",
                      color:"#ffffff"
                    }}>{silhouette}</p>
                  </Col>
                );
              });
            }
            dressStyleVDOM.push(<Panel header={dressStyle} key={`d_${index+1}`}><Row type="flex">{designDataVDOM}</Row></Panel>);
          });
        }
        if(i === 0){
          vDOM.push(<div key={Math.random()} className={sty.themeWrapper}>
            <h3 style={{textAlign: 'left', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "30px"}}>产品系列: {seriesName}</h3>
            <Collapse
              defaultActiveKey={['d_1']}
              expandIconPosition="right"
            >{dressStyleVDOM}</Collapse>
          </div>)
        } else {
          vDOM.push(<div key={Math.random()} className={sty.themeWrapper} style={{marginTop: "30px"}}>
            <h3 style={{textAlign: 'left', fontWeight: 'bold', color: 'white', padding: '20px', fontSize: "30px"}}>产品系列: {seriesName}</h3>
            <Collapse
              defaultActiveKey={['d_1']}
              expandIconPosition="right"
            >{dressStyleVDOM}</Collapse>
          </div>)
        }
      });
    }
    return vDOM;
  };
  render() {
    const {leftWidth, rightWidth} = this.state;
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
          <div style={{padding:"24px"}}>
            {
              this.state.operateRecordPre.length>0 ?
                (<ul className={sty.editWrapper}>
                  <li onClick={this.handleUndo}>
                    <UndoOutlined className={sty.iconComm}/>
                    <p>撤销</p>
                  </li>
                  <li onClick={this.handleRedo}>
                    <RedoOutlined className={sty.iconComm}/>
                    <p>重做</p>
                  </li>
                  <li onClick={this.handleSaveStep}>
                    <SaveOutlined className={sty.iconComm}/>
                    <p>保存</p>
                  </li>
                  <li onClick={this.handleExecute}>
                    <ArrowRightOutlined className={sty.iconComm}/>
                    <p>执行</p>
                  </li>
                </ul>)
                :
                (<ul className={sty.editWrapper}>
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
                </ul>)
            }
          </div>
          {
            this.state.checkStep ==='1' && this.state.themeName && this.state.themesArr.length>0 ?
            this.renderMainContent(): this.state.stylesArr.length>0 ? this.renderMainContent() : ''
          }
          {
            this.state.checkStep ==='2' && this.state.seriesArr.length>0 &&
              this.renderSeriesDom()
          }
          {
            this.state.checkStep ==='4' && this.state.kxsjArr.length>0 &&
              this.renderKxsjCommonDom()
          }
        </div>
        {
          this.state.checkStep!=='' &&
          <div className={style.rightWrapper} style={{width: rightWidth}}>
            {
              rightWidth === '260px' && <RightCircleOutlined className={style.selecRightshow} onClick={this.showRightAway}/>
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
  };
}
export default ResearchFollow;
