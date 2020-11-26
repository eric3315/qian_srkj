import React, {PureComponent} from 'react';
import router from 'umi/router';
import {
    LeftOutlined,
    RightOutlined,
    UndoOutlined,
    RedoOutlined,
    ArrowRightOutlined,
    SaveOutlined
} from '@ant-design/icons';
import OptionsComponentFirst from '../../component/OptionsComponent_first';
import OptionsComponentSecond from '../../component/OptionsComponent_second';
import OptionsComponentFourth from '../../component/OptionsComponent_fourth';
import OptionsComponentFifth from '../../component/OptionsComponent_fifth';
import OptionsComponentSixth from '../../component/OptionsComponent_sixth';
import SingleImgCard from "../../component/singleImgCard";
import DesginSingleImgCard from "../../component/desginSingleImgCard";
import {Menu, Collapse, Badge, Card, Divider, Row, Col, Spin} from 'antd';
import style from './design.less';
import sty from './mainContent.less'
import axios from "../../util/axios";


const {Panel} = Collapse;

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
        themeName: '',
        operateRecord: [],
        operateRecordPre: [],
        themesArr: [],
        stylesArr: [],
        seriesArr: [],
        kxsjArr: [],
        kxsjDesginArr: [],
        tempKxsjName: '',
        jgxsjArr: [],
        jgxsjDesginArr: [],
        tempJgxsjName: '',
        xjsjArr: [],
        xjsjDesginArr: [],
        tempXjsjName: '',
        loadding:false,
    };

    componentDidMount() {
        let query = this.props.location.query;
        if (typeof query.modelName !== 'undefined' && query.modelName !== '') {
            this.queryStep({
                modelName: query.modelName
            });
            if (typeof query.step !== 'undefined' && query.step !== '') {
                this.queryStepJSON({
                    step: query.step,
                    modelName: query.modelName
                });
                if (query.step === '1') {
                    router.push(`/follow?modelName=${query.modelName || ''}&step=${query.step || ''}`);
                    this.queryParameters({
                        stepKey: query.step,
                        modelName: query.modelName
                    });
                } else if (query.step === '3' || query.step === '4' || query.step === '5') {
                    router.push(`/follow?modelName=${query.modelName || ''}&step=${query.step || ''}&themeName=${query.themeName || ''}&seriesName=${query.seriesName || ''}`);
                    this.queryParameters({
                        stepKey: query.step,
                        modelName: query.modelName
                    });

                } else if (query.step === '2') {
                    router.push(`/follow?modelName=${query.modelName || ''}&step=${query.step || ''}&themeName=${query.themeName || ''}`);
                    if (typeof query.themeName !== 'undefined' && query.themeName !== '') {
                        this.querySeries({
                            themeName: query.themeName
                        });
                    }
                }
                this.setState({
                    checkStep: query.step || ''
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
    queryParameters = async (param) => {
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
    queryThemes = async (param) => {
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
    queryStyles = async (param) => {
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
    querySeries = async (param) => {
        let result = await axios({
            method: "GET",
            url: `/design/getSeries?themeName=${param.themeName || ''}`,
        });
        const {data} = result;
        let dataList = [];
        for (const [index, val] of data.entries()) {
            const obj = {
                key: (index + 1),
                card_info: 'card_info',
                card_actions: 'card_actions',
                picCheck: false
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
    queryKxsj = async (param) => {
        let result = await axios({
            method: "POST",
            url: `/design/getKxsj`,
            data: {
                paramArr: param.paramArr
            }
        });
        const {data} = result;
        if (result.data.length > 0) {
            let dataList = [];
            let themeName = "", seriesNameArr = [];
            themeName = data[0].theme_name;
            data.forEach(item => {
                let {series_name} = item;
                let seriesNameFlag = seriesNameArr.some(item => {
                    return item.seriesName === series_name
                });
                if (!seriesNameFlag) {
                    seriesNameArr.push({seriesName: series_name, dressStyleArr: []});
                }
            });
            if (seriesNameArr.length > 0) {
                for (let i = 0; i < seriesNameArr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        let {series_name, dress_style} = data[j];
                        if (seriesNameArr[i].seriesName === series_name) {
                            let flag = seriesNameArr[i].dressStyleArr.some(item => {
                                return item.dressStyle === dress_style
                            });
                            if (!flag) {
                                seriesNameArr[i].dressStyleArr.push({dressStyle: dress_style, designData: []});
                            }
                        }
                    }
                }
            }
            if (seriesNameArr.length > 0) {
                seriesNameArr.forEach(item => {
                    let {seriesName, dressStyleArr} = item;
                    if (dressStyleArr.length > 0) {
                        dressStyleArr.forEach(cur => {
                            let {dressStyle, designData} = cur;
                            for (let j = 0; j < data.length; j++) {
                                let {series_name, dress_style, silhouette, craft, mountings} = data[j];
                                if (seriesName === series_name && dressStyle === dress_style) {
                                    let flag = designData.some(item => {
                                        return item.dress_style === dress_style &&
                                            item.silhouette === silhouette &&
                                            item.craft === craft &&
                                            item.mountings === mountings
                                    });
                                    if (!flag) {
                                        data[j].card_info = 'card_info';
                                        data[j].card_actions = 'card_actions';
                                        data[j].picCheck = false;
                                        designData.push(data[j]);
                                    }
                                }
                            }
                        });
                        dataList.push({
                            themeName, seriesName, dressStyleArr
                        })
                    }
                })
            }
            this.setState({
                kxsjArr: dataList
            }, () => {
                console.info(`获取系列信息:${JSON.stringify(this.state.kxsjArr)}`);
            });
        }
    };
    queryJgxsj = async () => {
        let result = await axios({
            method: "POST",
            url: `/design/geJgxsj`
        });
        const {data} = result;
        if (result.data.length > 0) {
            let dataList = [];
            let themeName = "", seriesNameArr = [];
            themeName = data[0].theme_name;
            data.forEach(item => {
                let {series_name} = item;
                let seriesNameFlag = seriesNameArr.some(item => {
                    return item.seriesName === series_name
                });
                if (!seriesNameFlag) {
                    seriesNameArr.push({seriesName: series_name, dressStyleArr: []});
                }
            });
            if (seriesNameArr.length > 0) {
                for (let i = 0; i < seriesNameArr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        let {series_name, dress_style} = data[j];
                        if (seriesNameArr[i].seriesName === series_name) {
                            let flag = seriesNameArr[i].dressStyleArr.some(item => {
                                return item.dressStyle === dress_style
                            });
                            if (!flag) {
                                seriesNameArr[i].dressStyleArr.push({dressStyle: dress_style, designData: []});
                            }
                        }
                    }
                }
            }
            if (seriesNameArr.length > 0) {
                seriesNameArr.forEach(item => {
                    let {seriesName, dressStyleArr} = item;
                    if (dressStyleArr.length > 0) {
                        dressStyleArr.forEach(cur => {
                            let {dressStyle, designData} = cur;
                            for (let j = 0; j < data.length; j++) {
                                let {series_name, dress_style, silhouette, craft, mountings, name} = data[j];
                                if (seriesName === series_name && dressStyle === dress_style) {
                                    let flag = designData.some(item => {
                                        return item.dress_style === dress_style &&
                                            item.silhouette === silhouette &&
                                            item.craft === craft &&
                                            item.mountings === mountings &&
                                            item.name === name
                                    });
                                    if (!flag) {
                                        data[j].card_info = 'card_info';
                                        data[j].card_actions = 'card_actions';
                                        data[j].picCheck = false;
                                        designData.push(data[j]);
                                    }
                                }
                            }
                        });
                        dataList.push({
                            themeName, seriesName, dressStyleArr
                        })
                    }
                })
            }
            this.setState({
                jgxsjArr: dataList
            }, () => {
                console.info(`获取系列信息:${JSON.stringify(this.state.jgxsjArr)}`);
            });
        }
    };
    queryXjsj = async () => {
        let result = await axios({
            method: "POST",
            url: `/design/geXjsj`
        });
        const {data} = result;
        if (result.data.length > 0) {
            let dataList = [];
            let themeName = "", seriesNameArr = [];
            themeName = data[0].theme_name;
            data.forEach(item => {
                let {series_name} = item;
                let seriesNameFlag = seriesNameArr.some(item => {
                    return item.seriesName === series_name
                });
                if (!seriesNameFlag) {
                    seriesNameArr.push({seriesName: series_name, dressStyleArr: []});
                }
            });
            if (seriesNameArr.length > 0) {
                for (let i = 0; i < seriesNameArr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        let {series_name, dress_style} = data[j];
                        if (seriesNameArr[i].seriesName === series_name) {
                            let flag = seriesNameArr[i].dressStyleArr.some(item => {
                                return item.dressStyle === dress_style
                            });
                            if (!flag) {
                                seriesNameArr[i].dressStyleArr.push({dressStyle: dress_style, designData: []});
                            }
                        }
                    }
                }
            }
            if (seriesNameArr.length > 0) {
                seriesNameArr.forEach(item => {
                    let {seriesName, dressStyleArr} = item;
                    if (dressStyleArr.length > 0) {
                        dressStyleArr.forEach(cur => {
                            let {dressStyle, designData} = cur;
                            for (let j = 0; j < data.length; j++) {
                                let {series_name, dress_style, silhouette, craft, mountings, name} = data[j];
                                if (seriesName === series_name && dressStyle === dress_style) {
                                    let flag = designData.some(item => {
                                        return item.dress_style === dress_style &&
                                            item.silhouette === silhouette &&
                                            item.craft === craft &&
                                            item.mountings === mountings &&
                                            item.name === name
                                    });
                                    if (!flag) {
                                        data[j].card_info = 'card_info';
                                        data[j].card_actions = 'card_actions';
                                        data[j].picCheck = false;
                                        designData.push(data[j]);
                                    }
                                }
                            }
                        });
                        dataList.push({
                            themeName, seriesName, dressStyleArr
                        })
                    }
                })
            }
            this.setState({
                xjsjArr: dataList
            }, () => {
                console.info(`获取系列信息:${JSON.stringify(this.state.xjsjArr)}`);
            });
        }
    };
    saveKxsj = () => {
        this.setState({
            loadding: true
        },async ()=>{
            let {submitData} = this.state;
            let result = await axios({
                method: "POST",
                url: `/design/saveKxsjDesign`,
                data: {
                    paramJson: submitData
                }
            });
            const {data} = result;
            let dataList = [];
            for (const [index, val] of data.entries()) {
                const obj = {
                    key: (index + 1),
                    card_info: 'card_info',
                    card_actions: 'card_actions',
                    picCheck: false
                };
                Object.assign(val, obj);
                dataList.push(val);
            }
            this.setState({
                kxsjDesginArr: dataList,
                loadding: false
            }, () => {
                console.info(`获取系列信息:${JSON.stringify(this.state.kxsjDesginArr)}`);
            });
        });
    };
    saveJgxsj = () => {
        this.setState({
            loadding: true
        },async ()=>{
            let {submitData} = this.state;
            let result = await axios({
                method: "POST",
                url: `/design/saveJgxsjDesign`,
                data: {
                    paramJson: submitData
                }
            });
            const {data} = result;
            let dataList = [];
            for (const [index, val] of data.entries()) {
                const obj = {
                    key: (index + 1),
                    card_info: 'card_info',
                    card_actions: 'card_actions',
                    picCheck: false
                };
                Object.assign(val, obj);
                dataList.push(val);
            }
            this.setState({
                jgxsjDesginArr: dataList,
                loadding: false
            }, () => {
                console.info(`获取系列信息:${JSON.stringify(this.state.jgxsjDesginArr)}`);
            });
        });
    };
    saveXjsj = () => {
        this.setState({
            loadding: true
        },async ()=>{
            let {submitData} = this.state;
            let result = await axios({
                method: "POST",
                url: `/design/saveXjsjDesign`,
                data: {
                    paramJson: submitData
                }
            });
            const {data} = result;
            let dataList = [];
            for (const [index, val] of data.entries()) {
                const obj = {
                    key: (index + 1),
                    card_info: 'card_info',
                    card_actions: 'card_actions',
                    picCheck: false
                };
                Object.assign(val, obj);
                dataList.push(val);
            }
            this.setState({
                xjsjDesginArr: dataList,
                loadding: false
            }, () => {
                console.info(`获取系列信息:${JSON.stringify(this.state.xjsjDesginArr)}`);
            });
        });
    };
    queryStepJSON = async (param) => {
        let result = await axios({
            method: "POST",
            url: `/design/geStepJSON`,
            data: {
                step: param.step,
                modelName: param.modelName
            }
        });
        if (typeof result.data !== 'undefined') {
            const {data} = result;
            if (param.step === "1") {
                let {parameters, themesArr, stylesArr, step, modelName, themeName, submitData, operateRecordPre} = data;
                if (parameters.length > 0) {
                    for (let i = 0; i < parameters.length; i++) {
                        let {parameters: parameters1} = parameters[i];
                        for (let i = 0; i < parameters1.length; i++) {
                            let {options} = parameters1[i];
                            if (options.length > 0 && typeof options[0] === 'string') {
                                parameters1[i].checkedValues = [];
                            } else {
                                for (let i = 0; i < options.length; i++) {
                                    options[i].children_flag = false;
                                    options[i].subset_flag = false;
                                    options[i].checkedValues = [];
                                }
                            }
                        }
                    }
                }
                router.push(`/follow?modelName=${modelName || ''}&step=${step || ''}`);
                this.setState({parameters, themesArr, stylesArr, themeName, submitData, operateRecordPre});
            }
            else if (param.step === "2") {
                let {seriesArr, themeName, step, modelName, submitData, operateRecordPre} = data;
                router.push(`/follow?modelName=${modelName || ''}&step=${step || ''}&themeName=${modelName || ''}`);
                if (seriesArr.length > 0) {
                    for (let i = 0; i < seriesArr.length; i++) {
                        seriesArr[i].card_info = "card_info";
                        seriesArr[i].picCheck = false;
                        seriesArr[i].card_actions = "card_actions";
                    }
                }
                this.setState({seriesArr, themeName, submitData, operateRecordPre});
            }
            else if (param.step === "3") {
                let {parameters, kxsjArr, kxsjDesginArr, step, modelName, themeName, seriesName, submitData, operateRecordPre} = data;
                router.push(`/follow?modelName=${modelName || ''}&step=${step || ''}&themeName=${themeName || ''}&seriesName=${seriesName || ''}`);
                if (kxsjArr.length > 0) {
                    for (let i = 0; i < kxsjArr.length; i++) {
                        let {dressStyleArr} = kxsjArr[i];
                        for (let j = 0; j < dressStyleArr.length; j++) {
                            let {designData} = dressStyleArr[j];
                            for (let k = 0; k < designData.length; k++) {
                                designData[k].card_info = "card_info";
                                designData[k].picCheck = false;
                                designData[k].card_actions = "card_actions";
                            }
                        }
                    }
                }
                if (kxsjDesginArr.length > 0) {
                    for (let i = 0; i < kxsjDesginArr.length; i++) {
                        kxsjDesginArr[i].card_info = "card_info";
                        kxsjDesginArr[i].picCheck = false;
                        kxsjDesginArr[i].card_actions = "card_actions";
                    }
                }
                if (parameters.length > 0) {
                    for (let i = 0; i < parameters.length; i++) {
                        let {parameters: parameters1} = parameters[i];
                        parameters1.forEach(item => {
                            item.values = 0;
                        })
                    }
                }
                this.setState({kxsjArr, kxsjDesginArr, parameters, submitData, operateRecordPre});
            }
            else if (param.step === "4") {
                let {parameters, jgxsjArr, jgxsjDesginArr, step, modelName, themeName, seriesName, submitData, operateRecordPre} = data;
                router.push(`/follow?modelName=${modelName || ''}&step=${step || ''}&themeName=${themeName || ''}&seriesName=${seriesName || ''}`);
                if (jgxsjArr.length > 0) {
                    for (let i = 0; i < jgxsjArr.length; i++) {
                        let {dressStyleArr} = jgxsjArr[i];
                        for (let j = 0; j < dressStyleArr.length; j++) {
                            let {designData} = dressStyleArr[j];
                            for (let k = 0; k < designData.length; k++) {
                                designData[k].card_info = "card_info";
                                designData[k].picCheck = false;
                                designData[k].card_actions = "card_actions";
                            }
                        }
                    }
                }
                if (jgxsjDesginArr.length > 0) {
                    for (let i = 0; i < jgxsjDesginArr.length; i++) {
                        jgxsjDesginArr[i].card_info = "card_info";
                        jgxsjDesginArr[i].picCheck = false;
                        jgxsjDesginArr[i].card_actions = "card_actions";
                    }
                }
                if (parameters.length > 0) {
                    for (let i = 0; i < parameters.length; i++) {
                        let {parameters: parameters1} = parameters[i];
                        parameters1.forEach(item => {
                            let {options} = item;
                            if (options.length > 0 && typeof options[0] !== 'object') {
                                item.values = "";
                            } else {
                                options.forEach(cur => {
                                    cur.values = 0;
                                });
                            }
                        })
                    }
                }
                this.setState({jgxsjArr, jgxsjDesginArr, parameters, submitData, operateRecordPre});
            }
            else if (param.step === "5") {
                let {parameters, xjsjArr, xjsjDesginArr, step, modelName, themeName, seriesName, submitData, operateRecordPre} = data;
                router.push(`/follow?modelName=${modelName || ''}&step=${step || ''}&themeName=${themeName || ''}&seriesName=${seriesName || ''}`);
                if (xjsjArr.length > 0) {
                    for (let i = 0; i < xjsjArr.length; i++) {
                        let {dressStyleArr} = xjsjArr[i];
                        for (let j = 0; j < dressStyleArr.length; j++) {
                            let {designData} = dressStyleArr[j];
                            for (let k = 0; k < designData.length; k++) {
                                designData[k].card_info = "card_info";
                                designData[k].picCheck = false;
                                designData[k].card_actions = "card_actions";
                            }
                        }
                    }
                }
                if (xjsjDesginArr.length > 0) {
                    for (let i = 0; i < xjsjDesginArr.length; i++) {
                        xjsjDesginArr[i].card_info = "card_info";
                        xjsjDesginArr[i].picCheck = false;
                        xjsjDesginArr[i].card_actions = "card_actions";
                    }
                }
                if (parameters.length > 0) {
                    for (let i = 0; i < parameters.length; i++) {
                        let {parameters: parameters1} = parameters[i];
                        parameters1.forEach(item => {
                            let {options} = item;
                            if (options.length > 0 && typeof options[0] !== 'object') {
                                item.values = "";
                            }
                        })
                    }
                }
                this.setState({xjsjArr, xjsjDesginArr, parameters, submitData, operateRecordPre});
            }
        }
    };
    saveStepJSON = async (param) => {
        await axios({
            method: "POST",
            url: `/design/saveStepJSON`,
            data: {
                step: param.step,
                modelName: param.modelName,
                paramJson: param.data
            }
        });
    };
    showDrawer = () => {
        this.setState({
            leftWidth: "10px"
        });
    };
    showRightAway = () => {
        this.setState({
            rightWidth: "10px"
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
    handleClickMenu = (e, modelName) => {
        this.setState({
            parameters: [],
            submitData: [],
            themeName: '',
            operateRecord: [],
            operateRecordPre: [],
            themesArr: [],
            stylesArr: [],
            seriesArr: [],
            kxsjArr: [],
            kxsjDesginArr: [],
            tempKxsjName: '',
            jgxsjArr: [],
            jgxsjDesginArr: [],
            tempJgxsjName: '',
            xjsjArr: [],
            xjsjDesginArr: [],
            tempXjsjName: '',
            rightWidth: "260px",
        }, async () => {
            router.push(`/follow?modelName=${modelName || ''}&step=${e.keyPath[0] || ''}`);
            if (e.keyPath[0] === '6') {
                this.setState({
                    checkStep: e.keyPath[0]
                })
            } else {
                await this.queryStepJSON({
                    step: e.keyPath[0],
                    modelName: modelName
                });
                await this.queryParameters({
                    stepKey: e.keyPath[0],
                    modelName
                });
            }
        })
    };
    handleOptions = async (values, childrenTitle, optionTitle, stepName, modelName) => {
        let {parameters, submitData, operateRecord} = this.state;
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newParameters = JSON.parse(JSON.stringify(parameters));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));

        if (optionTitle === '品牌风格' && values.length > 0) {
            await this.queryStyles({
                styles: values.join(',')
            });
        }
        if (optionTitle === '品牌风格' && values.length <= 0) {
            this.setState({stylesArr: []});
        }
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, values, childrenTitle, optionTitle, stepName, modelName
            })
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, values, childrenTitle, optionTitle, stepName, modelName,
            });
        }
        for (let i = 0; i < newParameters.length; i++) {
            let {model_name, step_name, parameters} = newParameters[i];
            if (model_name === modelName && step_name === stepName) {
                for (let i = 0; i < parameters.length; i++) {
                    let {option_title, options} = parameters[i];
                    if (option_title === optionTitle && options.length > 0 && typeof options[0] === 'string') {
                        parameters[i].checkedValues = values;
                    } else {
                        for (let i = 0; i < options.length; i++) {
                            let {children_title} = options[i];
                            if (children_title === childrenTitle) {
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
                    if (childrenTitle !== '') {
                        let flag = parameters.some(item => {
                            return item.optionTitle === optionTitle && item.childrenTitle === childrenTitle
                        });
                        if (flag) {
                            for (let j = 0; j < parameters.length; j++) {
                                if (parameters[j].optionTitle === optionTitle && parameters[j].childrenTitle === childrenTitle) {
                                    parameters[j].values = values;
                                }
                            }
                        } else {
                            if (values.length > 0) {
                                newSubmitData[i].parameters.push({
                                    optionTitle, childrenTitle, values
                                })
                            }
                        }
                    } else {
                        let flag = parameters.some(item => {
                            return item.optionTitle === optionTitle
                        });
                        if (flag) {
                            for (let j = 0; j < parameters.length; j++) {
                                if (parameters[j].optionTitle === optionTitle) {
                                    parameters[j].values = values;
                                }
                            }
                        } else {
                            if (values.length > 0) {
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
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            submitData: newSubmitData,
            parameters: newParameters,
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        })
    };
    handleChangeOption = async (isChecked, childrenTitle, optionTitle, stepName, modelName) => {
        let {parameters, submitData, operateRecord} = this.state;
        let themeName = "";
        if (isChecked && optionTitle === '主题设定') {
            themeName = childrenTitle;
            await this.queryThemes({
                themeName: childrenTitle
            });
        }
        if (!isChecked && optionTitle === '主题设定') {
            this.setState({
                themesArr: []
            })
        }
        let newParameters = JSON.parse(JSON.stringify(parameters));
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, isChecked, childrenTitle, optionTitle, stepName, modelName
            });
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, isChecked, childrenTitle, optionTitle, stepName, modelName
            });
        }
        newParameters.forEach(item => {
            let {model_name, step_name, parameters} = item;
            if (model_name === modelName && step_name === stepName) {
                parameters.forEach(item => {
                    let {option_title, option_type, options} = item;
                    if (option_title === optionTitle && option_type === '单选') {
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
                                    options[i].checkedValues = [];
                                }
                            }
                        }
                    } else if (option_title === optionTitle && option_type === '多选') {
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
                        if (optionTitle === "主题设定") {
                            for (let i = 0; i < parameters.length; i++) {
                                if (parameters[i].optionTitle === optionTitle && optionTitle === "主题设定") {
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
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            parameters: newParameters,
            submitData: newSubmitData,
            themeName,
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            console.info(`主题:${JSON.stringify(this.state.themeName)}`);
            console.info(`更新:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        })
    };
    handleDataIntegration = (operateRecordArr, newSubmitData, newParameters) => {
        if (operateRecordArr.length > 0) {
            operateRecordArr.forEach(async item => {
                if (typeof item.values !== 'undefined') {
                    let {values, childrenTitle, optionTitle, stepName, modelName} = item;
                    if (optionTitle === '品牌风格' && values.length > 0) {
                        await this.queryStyles({
                            styles: values.join(',')
                        });
                    }
                    for (let i = 0; i < newParameters.length; i++) {
                        let {model_name, step_name, parameters} = newParameters[i];
                        if (model_name === modelName && step_name === stepName) {
                            for (let i = 0; i < parameters.length; i++) {
                                let {option_title, options} = parameters[i];
                                if (option_title === optionTitle && options.length > 0 && typeof options[0] === 'string') {
                                    parameters[i].checkedValues = values;
                                } else {
                                    for (let i = 0; i < options.length; i++) {
                                        let {children_title} = options[i];
                                        if (children_title === childrenTitle) {
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
                                if (childrenTitle !== '') {
                                    let flag = parameters.some(item => {
                                        return item.optionTitle === optionTitle && item.childrenTitle === childrenTitle
                                    });
                                    if (flag) {
                                        for (let j = 0; j < parameters.length; j++) {
                                            if (parameters[j].optionTitle === optionTitle && parameters[j].childrenTitle === childrenTitle) {
                                                parameters[j].values = values;
                                            }
                                        }
                                    } else {
                                        if (values.length > 0) {
                                            newSubmitData[i].parameters.push({
                                                optionTitle, childrenTitle, values
                                            })
                                        }
                                    }
                                } else {
                                    let flag = parameters.some(item => {
                                        return item.optionTitle === optionTitle
                                    });
                                    if (flag) {
                                        for (let j = 0; j < parameters.length; j++) {
                                            if (parameters[j].optionTitle === optionTitle) {
                                                parameters[j].values = values;
                                            }
                                        }
                                    } else {
                                        if (values.length > 0) {
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
                } else if (typeof item.isChecked !== 'undefined') {
                    let {isChecked, childrenTitle, optionTitle, stepName, modelName} = item;
                    newParameters.forEach(item => {
                        let {model_name, step_name, parameters} = item;
                        if (model_name === modelName && step_name === stepName) {
                            parameters.forEach(item => {
                                let {option_title, option_type, options} = item;
                                if (option_title === optionTitle && option_type === '单选') {
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
                                                options[i].checkedValues = [];
                                            }
                                        }
                                    }
                                } else if (option_title === optionTitle && option_type === '多选') {
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
                                    if (optionTitle === "主题设定") {
                                        for (let i = 0; i < parameters.length; i++) {
                                            if (parameters[i].optionTitle === optionTitle && optionTitle === "主题设定") {
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
    handleSeriesData = (seriesId, seriesName, newPicCheck, newCardInfo, newCardActions) => {
        let {seriesArr, operateRecord} = this.state;
        let newSeriesArr = JSON.parse(JSON.stringify(seriesArr));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        let parameters = [];
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, seriesId, seriesName, newPicCheck, newCardInfo, newCardActions
            })
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, seriesId, seriesName, newPicCheck, newCardInfo, newCardActions
            });
        }
        if (newPicCheck) {
            if (newSeriesArr.length > 0) {
                for (let i = 0; i < newSeriesArr.length; i++) {
                    newSeriesArr[i].card_info = "card_info";
                    newSeriesArr[i].picCheck = false;
                    newSeriesArr[i].card_actions = "card_actions";
                }
                for (let i = 0; i < newSeriesArr.length; i++) {
                    let {key} = newSeriesArr[i];
                    if (key === seriesId) {
                        parameters.push(newSeriesArr[i]);
                        newSeriesArr[i].card_info = newCardInfo;
                        newSeriesArr[i].picCheck = newPicCheck;
                        newSeriesArr[i].card_actions = newCardActions;
                    }
                }
            }
            //同时获取右侧条件
            this.setState({
                seriesArr: newSeriesArr,
                rightWidth: "260px",
                parameters
            }, () => {
                console.info(JSON.stringify(this.state.parameters))
            })
        } else {
            if (newSeriesArr.length > 0) {
                for (let i = 0; i < newSeriesArr.length; i++) {
                    newSeriesArr[i].card_info = "card_info";
                    newSeriesArr[i].picCheck = false;
                    newSeriesArr[i].card_actions = "card_actions";
                }
            }
            this.setState({
                seriesArr: newSeriesArr,
                rightWidth: 0,
                parameters: [],
            })
        }
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
        });
    };
    handleSeriesData1 = (operateRecordArr, newSeriesArr, parameters, rightWidth) => {
        if (operateRecordArr.length > 0) {
            operateRecordArr.forEach(async item => {
                let {seriesId, newPicCheck, newCardInfo, newCardActions} = item;
                if (newPicCheck) {
                    rightWidth = "260px";
                    if (newSeriesArr.length > 0) {
                        for (let i = 0; i < newSeriesArr.length; i++) {
                            newSeriesArr[i].card_info = "card_info";
                            newSeriesArr[i].picCheck = false;
                            newSeriesArr[i].card_actions = "card_actions";
                        }
                        for (let i = 0; i < newSeriesArr.length; i++) {
                            let {key} = newSeriesArr[i];
                            if (key === seriesId) {
                                parameters.push(newSeriesArr[i]);
                                newSeriesArr[i].card_info = newCardInfo;
                                newSeriesArr[i].picCheck = newPicCheck;
                                newSeriesArr[i].card_actions = newCardActions;
                            }
                        }
                    }
                } else {
                    if (newSeriesArr.length > 0) {
                        for (let i = 0; i < newSeriesArr.length; i++) {
                            newSeriesArr[i].card_info = "card_info";
                            newSeriesArr[i].picCheck = false;
                            newSeriesArr[i].card_actions = "card_actions";
                        }
                    }
                }
            });
        }
    };
    handleSeriesOptionsData = async (type, values, newPicCheck, newCardInfo, newCardActions, seriesName, themeName, modelName) => {
        let {parameters, submitData, operateRecord} = this.state;
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newParameters = JSON.parse(JSON.stringify(parameters));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, values, type, newPicCheck, newCardInfo, newCardActions, seriesName, themeName, modelName
            })
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, values, type, newPicCheck, newCardInfo, newCardActions, seriesName, themeName, modelName
            });
        }
        if (newParameters.length > 0) {
            for (let i = 0; i < newParameters.length; i++) {
                if (type === '主流色') {
                    let {main_color} = newParameters[i];
                    for (let j = 0; j < main_color.length; j++) {
                        main_color[j].card_info = "card_info";
                        main_color[j].picCheck = false;
                        main_color[j].card_actions = "card_actions";
                    }
                    for (let j = 0; j < main_color.length; j++) {
                        let {color_value} = main_color[j];
                        if (color_value === values) {
                            main_color[j].card_info = newCardInfo;
                            main_color[j].picCheck = newPicCheck;
                            main_color[j].card_actions = newCardActions;
                        }
                    }
                } else if (type === '点缀色') {
                    let {embellish_color} = newParameters[i];
                    for (let j = 0; j < embellish_color.length; j++) {
                        embellish_color[j].card_info = "card_info";
                        embellish_color[j].picCheck = false;
                        embellish_color[j].card_actions = "card_actions";
                    }
                    for (let j = 0; j < embellish_color.length; j++) {
                        let {color_value} = embellish_color[j];
                        if (color_value === values) {
                            embellish_color[j].card_info = newCardInfo;
                            embellish_color[j].picCheck = newPicCheck;
                            embellish_color[j].card_actions = newCardActions;
                        }
                    }
                } else if (type === '常用色') {
                    let {common_color} = newParameters[i];
                    for (let j = 0; j < common_color.length; j++) {
                        common_color[j].card_info = "card_info";
                        common_color[j].picCheck = false;
                        common_color[j].card_actions = "card_actions";
                    }
                    for (let j = 0; j < common_color.length; j++) {
                        let {color_value} = common_color[j];
                        if (color_value === values) {
                            common_color[j].card_info = newCardInfo;
                            common_color[j].picCheck = newPicCheck;
                            common_color[j].card_actions = newCardActions;
                        }
                    }
                } else if (type === '主推面料') {
                    let {main_fabric} = newParameters[i];
                    for (let j = 0; j < main_fabric.length; j++) {
                        main_fabric[j].card_info = "card_info";
                        main_fabric[j].picCheck = false;
                        main_fabric[j].card_actions = "card_actions";
                    }
                    for (let j = 0; j < main_fabric.length; j++) {
                        let {img_path} = main_fabric[j];
                        if (img_path === values) {
                            main_fabric[j].card_info = newCardInfo;
                            main_fabric[j].picCheck = newPicCheck;
                            main_fabric[j].card_actions = newCardActions;
                        }
                    }
                } else if (type === '点缀面料') {
                    let {embellish_fabric} = newParameters[i];
                    for (let j = 0; j < embellish_fabric.length; j++) {
                        embellish_fabric[j].card_info = "card_info";
                        embellish_fabric[j].picCheck = false;
                        embellish_fabric[j].card_actions = "card_actions";
                    }
                    for (let j = 0; j < embellish_fabric.length; j++) {
                        let {img_path} = embellish_fabric[j];
                        if (img_path === values) {
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
            let flag = newSubmitData.some(item => {
                return item.modelName === modelName && item.themeName === themeName && item.seriesName === seriesName && item.type === type
            });
            if (flag) {
                for (let i = 0; i < newSubmitData.length; i++) {
                    if (newSubmitData[i].modelName === modelName && newSubmitData[i].themeName === themeName && newSubmitData[i].seriesName === seriesName && newSubmitData[i].type === type) {
                        newSubmitData[i].values = values;
                    }
                }
            } else {
                newSubmitData.push({
                    modelName, themeName, seriesName, type, values
                });
            }
        }
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            submitData: newSubmitData,
            parameters: newParameters,
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        });
    };
    handleOptionsSecond = async (values, type, seriesName, themeName, modelName) => {
        let {parameters, submitData, operateRecord} = this.state;
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newParameters = JSON.parse(JSON.stringify(parameters));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, values, type, seriesName, themeName, modelName
            })
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, values, type, seriesName, themeName, modelName
            });
        }
        for (let i = 0; i < newParameters.length; i++) {
            let {model_name, theme_name, series_name} = newParameters[i];
            if (model_name === modelName && theme_name === themeName && series_name === seriesName) {
                if (type === '外穿') {
                    newParameters[i].wear_outside_values = values;
                } else if (type === '内搭') {
                    newParameters[i].inner_cloth_values = values;
                } else if (type === '廓形') {
                    newParameters[i].silhouette_values = values;
                } else if (type === '工艺') {
                    newParameters[i].craft_values = values;
                } else if (type === '配件') {
                    newParameters[i].mountings_values = values;
                }
            }
        }
        if (newSubmitData.length <= 0) {
            newSubmitData.push({
                modelName, themeName, seriesName, type, values
            });
        } else {
            let flag = newSubmitData.some(item => {
                return item.modelName === modelName && item.themeName === themeName && item.seriesName === seriesName && item.type === type
            });
            if (flag) {
                for (let i = 0; i < newSubmitData.length; i++) {
                    if (newSubmitData[i].modelName === modelName && newSubmitData[i].themeName === themeName && newSubmitData[i].seriesName === seriesName && newSubmitData[i].type === type) {
                        newSubmitData[i].values = values;
                    }
                }
            } else {
                newSubmitData.push({
                    modelName, themeName, seriesName, type, values
                });
            }
        }
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            submitData: newSubmitData,
            parameters: newParameters,
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        });
    };
    handleOptionsFourth = async (values, optionTitle, stepName, modelName) => {
        let {parameters, kxsjArr, kxsjDesginArr, submitData, operateRecord, tempKxsjName} = this.state;
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newParameters = JSON.parse(JSON.stringify(parameters));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        let newKxsjArr = JSON.parse(JSON.stringify(kxsjArr));
        let newKxsjDesginArr = JSON.parse(JSON.stringify(kxsjDesginArr));
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, values, optionTitle, stepName, modelName
            })
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, values, optionTitle, stepName, modelName
            });
        }
        for (let i = 0; i < newParameters.length; i++) {
            let {model_name, step_name, parameters} = newParameters[i];
            if (model_name === modelName && stepName === step_name) {
                parameters.forEach(item => {
                    if (item.option_title === optionTitle) {
                        item.values = values;
                    }
                })
            }
        }
        let subObj = {
            yishen_changdu: 0,
            yishen_songliang: 0,
            xiushen_changdu: 0,
            xiushen_songliang: 0,
            jianxing_kuandu: 0,
            yaobu_yaogao: 0,
            yaobu_songliang: 0,
            name: tempKxsjName,
            stepName, modelName
        };
        if (optionTitle === '衣身_长度') {
            subObj.yishen_changdu = values;
        } else if (optionTitle === '衣身_松量') {
            subObj.yishen_songliang = values;
        } else if (optionTitle === '袖身_长度') {
            subObj.xiushen_changdu = values;
        } else if (optionTitle === '袖身_松量') {
            subObj.xiushen_songliang = values;
        } else if (optionTitle === '肩型_宽度') {
            subObj.jianxing_kuandu = values;
        } else if (optionTitle === '腰部_腰高') {
            subObj.yaobu_yaogao = values;
        } else if (optionTitle === '腰部_松量') {
            subObj.yaobu_songliang = values;
        }

        let flag = false;
        if (newKxsjDesginArr.length > 0) {
            flag = newKxsjDesginArr.some(item => {
                return item.picCheck === true
            });
        }
        if (flag) {
            for (let i = 0; i < newKxsjDesginArr.length; i++) {
                let {theme_name, series_name, dress_style, silhouette, name, picCheck} = newKxsjDesginArr[i];
                if (picCheck) {
                    subObj.theme_name = theme_name || '';
                    subObj.series_name = series_name || '';
                    subObj.dress_style = dress_style || '';
                    subObj.silhouette = silhouette || '';
                    subObj.name = name || '';
                }
            }
        } else {
            newKxsjArr.forEach(item => {
                let {dressStyleArr} = item;
                dressStyleArr.forEach(cur => {
                    let {designData} = cur;
                    designData.forEach(c => {
                        let {theme_name, series_name, dress_style, silhouette, picCheck} = c;
                        if (picCheck) {
                            subObj.theme_name = theme_name || '';
                            subObj.series_name = series_name || '';
                            subObj.dress_style = dress_style || '';
                            subObj.silhouette = silhouette || '';
                        }
                    });
                });
            });
        }
        if (newSubmitData.length <= 0) {
            newSubmitData.push(subObj);
        } else {
            let flag = newSubmitData.some(item => {
                return item.modelName === subObj.modelName
                    && item.stepName === subObj.stepName
                    && item.series_name === subObj.series_name
                    && item.dress_style === subObj.dress_style
                    && item.silhouette === subObj.silhouette
                    && item.theme_name === subObj.theme_name
                    && item.name === subObj.name
            });
            if (flag) {
                for (let i = 0; i < newSubmitData.length; i++) {
                    if (newSubmitData[i].modelName === subObj.modelName
                        && newSubmitData[i].stepName === subObj.stepName
                        && newSubmitData[i].series_name === subObj.series_name
                        && newSubmitData[i].dress_style === subObj.dress_style
                        && newSubmitData[i].silhouette === subObj.silhouette
                        && newSubmitData[i].theme_name === subObj.theme_name
                        && newSubmitData[i].name === subObj.name
                    ) {
                        if (optionTitle === '衣身_长度') {
                            newSubmitData[i].yishen_changdu = values;
                        } else if (optionTitle === '衣身_松量') {
                            newSubmitData[i].yishen_songliang = values;
                        } else if (optionTitle === '袖身_长度') {
                            newSubmitData[i].xiushen_changdu = values;
                        } else if (optionTitle === '袖身_松量') {
                            newSubmitData[i].xiushen_songliang = values;
                        } else if (optionTitle === '肩型_宽度') {
                            newSubmitData[i].jianxing_kuandu = values;
                        } else if (optionTitle === '腰部_腰高') {
                            newSubmitData[i].yaobu_yaogao = values;
                        } else if (optionTitle === '腰部_松量') {
                            newSubmitData[i].yaobu_songliang = values;
                        }
                    }
                }
            } else {
                newSubmitData.push(subObj);
            }
        }
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            submitData: newSubmitData,
            parameters: newParameters,
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        });
    };
    handleOptionsFifth = async (values, optionTitle, stepName, modelName) => {
        let {parameters, jgxsjArr, jgxsjDesginArr, submitData, operateRecord, tempJgxsjName} = this.state;
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newParameters = JSON.parse(JSON.stringify(parameters));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        let newJgxsjArr = JSON.parse(JSON.stringify(jgxsjArr));
        let newJgxsjDesginArr = JSON.parse(JSON.stringify(jgxsjDesginArr));
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, values, optionTitle, stepName, modelName
            })
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, values, optionTitle, stepName, modelName
            });
        }
        for (let i = 0; i < newParameters.length; i++) {
            let {model_name, step_name, parameters} = newParameters[i];
            if (model_name === modelName && stepName === step_name) {
                parameters.forEach(item => {
                    if (typeof item.options !== 'undefined' && typeof item.options[0] === 'object') {
                        item.options.forEach(c => {
                            if (c.children_title === optionTitle) {
                                c.values = values;
                            }
                        });
                    }
                    if (item.option_title === optionTitle) {
                        item.values = values;
                    }
                })
            }
        }
        let subObj = {
            lingxing: "",
            jianxing: "",
            xiuxing: "",
            menjin: "",
            koudai: "",
            name: tempJgxsjName,
            stepName, modelName
        };
        if (optionTitle === '领型') {
            subObj.lingxing = values;
        } else if (optionTitle === '肩型') {
            subObj.jianxing = values;
        } else if (optionTitle === '袖型') {
            subObj.xiuxing = values;
        } else if (optionTitle === '门襟') {
            subObj.menjin = values;
        } else if (optionTitle === '口袋') {
            subObj.koudai = values;
        }

        let flag = false;
        if (newJgxsjDesginArr.length > 0) {
            flag = newJgxsjDesginArr.some(item => {
                return item.picCheck === true
            });
        }
        if (flag) {
            for (let i = 0; i < newJgxsjDesginArr.length; i++) {
                let {theme_name, series_name, dress_style, silhouette, name, picCheck, yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang} = newJgxsjDesginArr[i];
                if (picCheck) {
                    subObj.theme_name = theme_name || '';
                    subObj.series_name = series_name || '';
                    subObj.dress_style = dress_style || '';
                    subObj.silhouette = silhouette || '';
                    subObj.name = name || '';
                    subObj.yishen_changdu = yishen_changdu || '';
                    subObj.yishen_songliang = yishen_songliang || '';
                    subObj.xiushen_changdu = xiushen_changdu || '';
                    subObj.xiushen_songliang = xiushen_songliang || '';
                    subObj.jianxing_kuandu = jianxing_kuandu || '';
                    subObj.yaobu_yaogao = yaobu_yaogao || '';
                    subObj.yaobu_songliang = yaobu_songliang || '';
                }
            }
        } else {
            newJgxsjArr.forEach(item => {
                let {dressStyleArr} = item;
                dressStyleArr.forEach(cur => {
                    let {designData} = cur;
                    designData.forEach(c => {
                        let {theme_name, series_name, dress_style, silhouette, picCheck, yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang} = c;
                        if (picCheck) {
                            subObj.theme_name = theme_name || '';
                            subObj.series_name = series_name || '';
                            subObj.dress_style = dress_style || '';
                            subObj.silhouette = silhouette || '';
                            subObj.yishen_changdu = yishen_changdu || '';
                            subObj.yishen_songliang = yishen_songliang || '';
                            subObj.xiushen_changdu = xiushen_changdu || '';
                            subObj.xiushen_songliang = xiushen_songliang || '';
                            subObj.jianxing_kuandu = jianxing_kuandu || '';
                            subObj.yaobu_yaogao = yaobu_yaogao || '';
                            subObj.yaobu_songliang = yaobu_songliang || '';
                        }
                    });
                });
            });
        }
        if (newSubmitData.length <= 0) {
            newSubmitData.push(subObj);
        } else {
            let flag = newSubmitData.some(item => {
                return item.modelName === subObj.modelName
                    && item.stepName === subObj.stepName
                    && item.series_name === subObj.series_name
                    && item.dress_style === subObj.dress_style
                    && item.silhouette === subObj.silhouette
                    && item.theme_name === subObj.theme_name
                    && item.name === subObj.name
            });
            if (flag) {
                for (let i = 0; i < newSubmitData.length; i++) {
                    if (newSubmitData[i].modelName === subObj.modelName
                        && newSubmitData[i].stepName === subObj.stepName
                        && newSubmitData[i].series_name === subObj.series_name
                        && newSubmitData[i].dress_style === subObj.dress_style
                        && newSubmitData[i].silhouette === subObj.silhouette
                        && newSubmitData[i].theme_name === subObj.theme_name
                        && newSubmitData[i].name === subObj.name
                    ) {
                        if (optionTitle === '领型') {
                            newSubmitData[i].lingxing = values;
                        } else if (optionTitle === '肩型') {
                            newSubmitData[i].jianxing = values;
                        } else if (optionTitle === '袖型') {
                            newSubmitData[i].xiuxing = values;
                        } else if (optionTitle === '门襟') {
                            newSubmitData[i].menjin = values;
                        } else if (optionTitle === '口袋') {
                            newSubmitData[i].koudai = values;
                        }
                    }
                }
            } else {
                newSubmitData.push(subObj);
            }
        }
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            submitData: newSubmitData,
            parameters: newParameters,
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        });
    };
    handleOptionsSixth = async (values, optionTitle, stepName, modelName) => {
        let {parameters, xjsjArr, xjsjDesginArr, submitData, operateRecord, tempXjsjName} = this.state;
        let newSubmitData = JSON.parse(JSON.stringify(submitData));
        let newParameters = JSON.parse(JSON.stringify(parameters));
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        let newXjsjArr = JSON.parse(JSON.stringify(xjsjArr));
        let newXjsjDesginArr = JSON.parse(JSON.stringify(xjsjDesginArr));
        if (newOperateRecord.length <= 0) {
            newOperateRecord.push({
                id: 1, values, optionTitle, stepName, modelName
            })
        } else {
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            newOperateRecord.push({
                id: id + 1, values, optionTitle, stepName, modelName
            });
        }
        for (let i = 0; i < newParameters.length; i++) {
            let {model_name, step_name, parameters} = newParameters[i];
            if (model_name === modelName && stepName === step_name) {
                parameters.forEach(item => {
                    if (typeof item.options !== 'undefined' && typeof item.options[0] === 'object') {
                        item.options.forEach(c => {
                            if (c.children_title === optionTitle) {
                                c.values = values;
                            }
                        });
                    }
                    if (item.option_title === optionTitle) {
                        item.values = values;
                    }
                })
            }
        }
        let subObj = {
            zhezhou: "",
            niukou: "",
            lalian: "",
            name: tempXjsjName,
            stepName, modelName
        };
        if (optionTitle === '褶皱') {
            subObj.zhezhou = values;
        } else if (optionTitle === '纽扣') {
            subObj.niukou = values;
        } else if (optionTitle === '拉链') {
            subObj.lalian = values;
        }
        let flag = false;
        if (newXjsjDesginArr.length > 0) {
            flag = newXjsjDesginArr.some(item => {
                return item.picCheck === true
            });
        }
        if (flag) {
            for (let i = 0; i < newXjsjDesginArr.length; i++) {
                let {theme_name, series_name, dress_style, silhouette,  name, picCheck, yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang, lingxing,jianxing,xiuxing,menjin,koudai} = newXjsjDesginArr[i];
                if (picCheck) {
                    subObj.theme_name = theme_name || '';
                    subObj.series_name = series_name || '';
                    subObj.dress_style = dress_style || '';
                    subObj.silhouette = silhouette || '';
                    subObj.name = name || '';
                    subObj.yishen_changdu = yishen_changdu || '';
                    subObj.yishen_songliang = yishen_songliang || '';
                    subObj.xiushen_changdu = xiushen_changdu || '';
                    subObj.xiushen_songliang = xiushen_songliang || '';
                    subObj.jianxing_kuandu = jianxing_kuandu || '';
                    subObj.yaobu_yaogao = yaobu_yaogao || '';
                    subObj.yaobu_songliang = yaobu_songliang || '';
                    subObj.lingxing = lingxing || '';
                    subObj.jianxing = jianxing || '';
                    subObj.xiuxing = xiuxing || '';
                    subObj.menjin = menjin || '';
                    subObj.koudai = koudai || '';
                }
            }
        } else {
            newXjsjArr.forEach(item => {
                let {dressStyleArr} = item;
                dressStyleArr.forEach(cur => {
                    let {designData} = cur;
                    designData.forEach(c => {
                        let {theme_name, series_name, dress_style, silhouette,  picCheck, yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang, lingxing,jianxing,xiuxing,menjin,koudai} = c;
                        if (picCheck) {
                            subObj.theme_name = theme_name || '';
                            subObj.series_name = series_name || '';
                            subObj.dress_style = dress_style || '';
                            subObj.silhouette = silhouette || '';
                            subObj.yishen_changdu = yishen_changdu || '';
                            subObj.yishen_songliang = yishen_songliang || '';
                            subObj.xiushen_changdu = xiushen_changdu || '';
                            subObj.xiushen_songliang = xiushen_songliang || '';
                            subObj.jianxing_kuandu = jianxing_kuandu || '';
                            subObj.yaobu_yaogao = yaobu_yaogao || '';
                            subObj.yaobu_songliang = yaobu_songliang || '';
                            subObj.lingxing = lingxing || '';
                            subObj.jianxing = jianxing || '';
                            subObj.xiuxing = xiuxing || '';
                            subObj.menjin = menjin || '';
                            subObj.koudai = koudai || '';
                        }
                    });
                });
            });
        }
        if (newSubmitData.length <= 0) {
            newSubmitData.push(subObj);
        } else {
            let flag = newSubmitData.some(item => {
                return item.modelName === subObj.modelName
                    && item.stepName === subObj.stepName
                    && item.series_name === subObj.series_name
                    && item.dress_style === subObj.dress_style
                    && item.silhouette === subObj.silhouette
                    && item.theme_name === subObj.theme_name
                    && item.name === subObj.name
            });
            if (flag) {
                for (let i = 0; i < newSubmitData.length; i++) {
                    if (newSubmitData[i].modelName === subObj.modelName
                        && newSubmitData[i].stepName === subObj.stepName
                        && newSubmitData[i].series_name === subObj.series_name
                        && newSubmitData[i].dress_style === subObj.dress_style
                        && newSubmitData[i].silhouette === subObj.silhouette
                        && newSubmitData[i].theme_name === subObj.theme_name
                        && newSubmitData[i].name === subObj.name
                    ) {
                        if (optionTitle === '褶皱') {
                            newSubmitData[i].zhezhou = values;
                        } else if (optionTitle === '纽扣') {
                            newSubmitData[i].niukou = values;
                        } else if (optionTitle === '拉链') {
                            newSubmitData[i].lalian = values;
                        }
                    }
                }
            } else {
                newSubmitData.push(subObj);
            }
        }
        newOperateRecord.sort((a, b) => {
            return a.id - b.id
        });
        this.setState({
            submitData: newSubmitData,
            parameters: newParameters,
            operateRecord: newOperateRecord,
            operateRecordPre: newOperateRecord
        }, () => {
            console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            console.info(`parameters:${JSON.stringify(this.state.parameters)}`);
            console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
        });
    };
    handleSeriesDataIntegration = (operateRecordArr, newSubmitData, newParameters) => {
        let {seriesArr} = this.state;
        let newSeriesName = '';
        let arr = seriesArr.filter(item => {
            return item.picCheck === true
        });
        if (arr.length > 0) {
            newSeriesName = arr[0].series_name;
        }
        if (operateRecordArr.length > 0) {
            operateRecordArr.forEach(async item => {
                let {modelName, themeName, seriesName, type, values} = item;
                if (newSeriesName === seriesName) {
                    if (newParameters.length > 0) {
                        for (let i = 0; i < newParameters.length; i++) {
                            if (type === '主流色') {
                                let {values, newPicCheck, newCardInfo, newCardActions} = item;
                                let {main_color} = newParameters[i];
                                for (let j = 0; j < main_color.length; j++) {
                                    main_color[j].card_info = "card_info";
                                    main_color[j].picCheck = false;
                                    main_color[j].card_actions = "card_actions";
                                }
                                for (let j = 0; j < main_color.length; j++) {
                                    let {color_value} = main_color[j];
                                    if (color_value === values) {
                                        main_color[j].card_info = newCardInfo;
                                        main_color[j].picCheck = newPicCheck;
                                        main_color[j].card_actions = newCardActions;
                                    }
                                }
                            } else if (type === '点缀色') {
                                let {values, newPicCheck, newCardInfo, newCardActions} = item;
                                let {embellish_color} = newParameters[i];
                                for (let j = 0; j < embellish_color.length; j++) {
                                    embellish_color[j].card_info = "card_info";
                                    embellish_color[j].picCheck = false;
                                    embellish_color[j].card_actions = "card_actions";
                                }
                                for (let j = 0; j < embellish_color.length; j++) {
                                    let {color_value} = embellish_color[j];
                                    if (color_value === values) {
                                        embellish_color[j].card_info = newCardInfo;
                                        embellish_color[j].picCheck = newPicCheck;
                                        embellish_color[j].card_actions = newCardActions;
                                    }
                                }
                            } else if (type === '常用色') {
                                let {values, newPicCheck, newCardInfo, newCardActions} = item;
                                let {common_color} = newParameters[i];
                                for (let j = 0; j < common_color.length; j++) {
                                    common_color[j].card_info = "card_info";
                                    common_color[j].picCheck = false;
                                    common_color[j].card_actions = "card_actions";
                                }
                                for (let j = 0; j < common_color.length; j++) {
                                    let {color_value} = common_color[j];
                                    if (color_value === values) {
                                        common_color[j].card_info = newCardInfo;
                                        common_color[j].picCheck = newPicCheck;
                                        common_color[j].card_actions = newCardActions;
                                    }
                                }
                            } else if (type === '主推面料') {
                                let {values, newPicCheck, newCardInfo, newCardActions} = item;
                                let {main_fabric} = newParameters[i];
                                for (let j = 0; j < main_fabric.length; j++) {
                                    main_fabric[j].card_info = "card_info";
                                    main_fabric[j].picCheck = false;
                                    main_fabric[j].card_actions = "card_actions";
                                }
                                for (let j = 0; j < main_fabric.length; j++) {
                                    let {img_path} = main_fabric[j];
                                    if (img_path === values) {
                                        main_fabric[j].card_info = newCardInfo;
                                        main_fabric[j].picCheck = newPicCheck;
                                        main_fabric[j].card_actions = newCardActions;
                                    }
                                }
                            } else if (type === '点缀面料') {
                                let {values, newPicCheck, newCardInfo, newCardActions} = item;
                                let {embellish_fabric} = newParameters[i];
                                for (let j = 0; j < embellish_fabric.length; j++) {
                                    embellish_fabric[j].card_info = "card_info";
                                    embellish_fabric[j].picCheck = false;
                                    embellish_fabric[j].card_actions = "card_actions";
                                }
                                for (let j = 0; j < embellish_fabric.length; j++) {
                                    let {img_path} = embellish_fabric[j];
                                    if (img_path === values) {
                                        embellish_fabric[j].card_info = newCardInfo;
                                        embellish_fabric[j].picCheck = newPicCheck;
                                        embellish_fabric[j].card_actions = newCardActions;
                                    }
                                }
                            } else if (type === '外穿') {
                                newParameters[i].wear_outside_values = values;
                            } else if (type === '内搭') {
                                newParameters[i].inner_cloth_values = values;
                            } else if (type === '廓形') {
                                newParameters[i].silhouette_values = values;
                            } else if (type === '工艺') {
                                newParameters[i].craft_values = values;
                            } else if (type === '配件') {
                                newParameters[i].mountings_values = values;
                            }
                        }
                    }
                    if (newSubmitData.length <= 0) {
                        newSubmitData.push({
                            modelName, themeName, seriesName, type, values
                        });
                    } else {
                        let flag = newSubmitData.some(item => {
                            return item.modelName === modelName && item.themeName === themeName && item.seriesName === seriesName && item.type === type
                        });
                        if (flag) {
                            for (let i = 0; i < newSubmitData.length; i++) {
                                if (newSubmitData[i].modelName === modelName && newSubmitData[i].themeName === themeName && newSubmitData[i].seriesName === seriesName && newSubmitData[i].type === type) {
                                    newSubmitData[i].values = values;
                                }
                            }
                        } else {
                            newSubmitData.push({
                                modelName, themeName, seriesName, type, values
                            });
                        }
                    }
                }
            });
        }
    };
    handleKxsjDataIntegration = (operateRecordArr, newKxsjArr, newKxsjDesginArr, newSubmitData, newParameters) => {
        if (operateRecordArr.length > 0) {
            operateRecordArr.forEach(async item => {
                if (typeof item.name !== 'undefined' && typeof item.newPicCheck !== 'undefined') {
                    let {newPicCheck, theme_name, series_name, dress_style, silhouette, name, newCardInfo, newCardActions} = item;
                    for (let i = 0; i < newParameters.length; i++) {
                        let {parameters} = newParameters[i];
                        parameters.forEach(item => {
                            item.values = 0;
                        })
                    }
                    if (newKxsjArr.length > 0) {
                        for (let i = 0; i < newKxsjArr.length; i++) {
                            let {dressStyleArr} = newKxsjArr[i];
                            for (let j = 0; j < dressStyleArr.length; j++) {
                                let {designData} = dressStyleArr[j];
                                for (let k = 0; k < designData.length; k++) {
                                    designData[k].card_info = "card_info";
                                    designData[k].picCheck = false;
                                    designData[k].card_actions = "card_actions";
                                }
                            }
                        }
                    }
                    if (newPicCheck) {
                        if (newKxsjDesginArr.length > 0) {
                            for (let i = 0; i < newKxsjDesginArr.length; i++) {
                                newKxsjDesginArr[i].card_info = "card_info";
                                newKxsjDesginArr[i].picCheck = false;
                                newKxsjDesginArr[i].card_actions = "card_actions";
                            }
                            for (let i = 0; i < newKxsjDesginArr.length; i++) {
                                if (newKxsjDesginArr[i].theme_name === theme_name
                                    && newKxsjDesginArr[i].series_name === series_name
                                    && newKxsjDesginArr[i].dress_style === dress_style
                                    && newKxsjDesginArr[i].silhouette === silhouette
                                    && newKxsjDesginArr[i].name === name) {
                                    newKxsjDesginArr[i].card_info = newCardInfo;
                                    newKxsjDesginArr[i].picCheck = newPicCheck;
                                    newKxsjDesginArr[i].card_actions = newCardActions;
                                }
                            }
                        }
                    }
                } else if (typeof item.name === 'undefined' && typeof item.newPicCheck !== 'undefined') {
                    let {newPicCheck, theme_name, series_name, dress_style, silhouette, craft, mountings, newCardInfo, newCardActions} = item;
                    if (newKxsjDesginArr.length > 0) {
                        for (let i = 0; i < newKxsjDesginArr.length; i++) {
                            newKxsjDesginArr[i].card_info = "card_info";
                            newKxsjDesginArr[i].picCheck = false;
                            newKxsjDesginArr[i].card_actions = "card_actions";
                        }
                    }
                    if (newPicCheck) {
                        if (newKxsjArr.length > 0) {
                            for (let i = 0; i < newKxsjArr.length; i++) {
                                let {dressStyleArr} = newKxsjArr[i];
                                for (let j = 0; j < dressStyleArr.length; j++) {
                                    let {designData} = dressStyleArr[j];
                                    for (let k = 0; k < designData.length; k++) {
                                        designData[k].card_info = "card_info";
                                        designData[k].picCheck = false;
                                        designData[k].card_actions = "card_actions";
                                    }
                                }
                            }
                            for (let i = 0; i < newKxsjArr.length; i++) {
                                let {themeName, seriesName, dressStyleArr} = newKxsjArr[i];
                                if (themeName === theme_name && seriesName === series_name) {
                                    for (let j = 0; j < dressStyleArr.length; j++) {
                                        let {dressStyle, designData} = dressStyleArr[j];
                                        if (dressStyle === dress_style) {
                                            for (let k = 0; k < designData.length; k++) {
                                                if (designData[k].silhouette === silhouette && designData[k].craft === craft && designData[k].mountings === mountings) {
                                                    designData[k].card_info = newCardInfo;
                                                    designData[k].picCheck = newPicCheck;
                                                    designData[k].card_actions = newCardActions;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    let {values, optionTitle, stepName, modelName} = item;
                    for (let i = 0; i < newParameters.length; i++) {
                        let {model_name, step_name, parameters} = newParameters[i];
                        if (model_name === modelName && stepName === step_name) {
                            parameters.forEach(item => {
                                if (item.option_title === optionTitle) {
                                    item.values = values;
                                }
                            })
                        }
                    }
                    let subObj = {
                        yisheng_changdu: 0,
                        jyisheng_songliang: 0,
                        xiaosheng_changdu: 0,
                        xiaosheng_songliang: 0,
                        jianxing_kuandu: 0,
                        yaobu_yaogao: 0,
                        yaobu_songliang: 0,
                        name: "",
                        stepName, modelName
                    };
                    if (optionTitle === '衣身_长度') {
                        subObj.yisheng_changdu = values;
                    } else if (optionTitle === '衣身_松量') {
                        subObj.jyisheng_songliang = values;
                    } else if (optionTitle === '袖身_长度') {
                        subObj.xiaosheng_changdu = values;
                    } else if (optionTitle === '袖身_松量') {
                        subObj.xiaosheng_songliang = values;
                    } else if (optionTitle === '肩型_宽度') {
                        subObj.jianxing_kuandu = values;
                    } else if (optionTitle === '腰部_腰高') {
                        subObj.yaobu_yaogao = values;
                    } else if (optionTitle === '腰部_松量') {
                        subObj.yaobu_songliang = values;
                    }
                    let flag = false;
                    if (newKxsjDesginArr.length > 0) {
                        flag = newKxsjDesginArr.some(item => {
                            return item.picCheck === true
                        });
                    }
                    if (flag) {
                        for (let i = 0; i < newKxsjDesginArr.length; i++) {
                            let {theme_name, series_name, dress_style, silhouette, name, picCheck} = newKxsjDesginArr[i];
                            if (picCheck) {
                                subObj.theme_name = theme_name || '';
                                subObj.series_name = series_name || '';
                                subObj.dress_style = dress_style || '';
                                subObj.silhouette = silhouette || '';
                                subObj.name = name || '';
                            }
                        }
                    } else {
                        newKxsjArr.forEach(item => {
                            let {dressStyleArr} = item;
                            dressStyleArr.forEach(cur => {
                                let {designData} = cur;
                                designData.forEach(c => {
                                    let {theme_name, series_name, dress_style, silhouette,picCheck} = c;
                                    if (picCheck) {
                                        subObj.theme_name = theme_name || '';
                                        subObj.series_name = series_name || '';
                                        subObj.dress_style = dress_style || '';
                                        subObj.silhouette = silhouette || '';
                                    }
                                });
                            });
                        });
                    }
                    if (newSubmitData.length <= 0) {
                        newSubmitData.push(subObj);
                    } else {
                        let flag = newSubmitData.some(item => {
                            return item.modelName === subObj.modelName
                                && item.stepName === subObj.stepName
                                && item.series_name === subObj.series_name
                                && item.dress_style === subObj.dress_style
                                && item.silhouette === subObj.silhouette
                                && item.theme_name === subObj.theme_name
                                && item.name === subObj.name
                        });
                        if (flag) {
                            for (let i = 0; i < newSubmitData.length; i++) {
                                if (newSubmitData[i].modelName === subObj.modelName
                                    && newSubmitData[i].stepName === subObj.stepName
                                    && newSubmitData[i].series_name === subObj.series_name
                                    && newSubmitData[i].dress_style === subObj.dress_style
                                    && newSubmitData[i].silhouette === subObj.silhouette
                                    && newSubmitData[i].theme_name === subObj.theme_name
                                    && newSubmitData[i].name === subObj.name
                                ) {
                                    if (optionTitle === '衣身_长度') {
                                        newSubmitData[i].yisheng_changdu = values;
                                    } else if (optionTitle === '衣身_松量') {
                                        newSubmitData[i].jyisheng_songliang = values;
                                    } else if (optionTitle === '袖身_长度') {
                                        newSubmitData[i].xiaosheng_changdu = values;
                                    } else if (optionTitle === '袖身_松量') {
                                        newSubmitData[i].xiaosheng_songliang = values;
                                    } else if (optionTitle === '肩型_宽度') {
                                        newSubmitData[i].jianxing_kuandu = values;
                                    } else if (optionTitle === '腰部_腰高') {
                                        newSubmitData[i].yaobu_yaogao = values;
                                    } else if (optionTitle === '腰部_松量') {
                                        newSubmitData[i].yaobu_songliang = values;
                                    }
                                }
                            }
                        } else {
                            newSubmitData.push(subObj);
                        }
                    }
                }
            });
        }
    };
    renderStep() {
        let vDOM = [], {steps} = this.state;
        let modelName = steps[0].model_name;
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
            onClick={(e) => {
                this.handleClickMenu(e, modelName)
            }}>{vDOM}
        </Menu>;
    };
    renderParameters() {
        let vDOM = [], {parameters} = this.state;
        let query = this.props.location.query;
        if (parameters.length > 0) {
            if (query.step === '1') {
                parameters.forEach(item => {
                    let {model_name, step_name, parameters: parameters1} = item;
                    parameters1.forEach((item, index) => {
                        let {option_title, option_desc, option_type, options} = item;
                        if (index < parameters1.length - 1) {
                            vDOM.push(
                                <div key={Math.random()}>
                                    <Card className={style.rightCard} title={
                                        <div>
                                            <p style={{
                                                color: 'white',
                                                fontSize: '22px',
                                                fontWeight: 'bold',
                                                marginBottom: '4px'
                                            }}>{option_title}</p>
                                            <span style={{fontSize: '10px', color: '#dbdbdb'}}>{option_desc}</span>
                                        </div>
                                    }
                                          size="small"
                                          headStyle={{color: 'white'}}
                                          bordered={false}
                                          style={{background: "none"}}>
                                        <OptionsComponentFirst
                                            checkedValues={typeof options[0] === 'string' ? item.checkedValues : ''}
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
                                        <p style={{
                                            color: 'white',
                                            fontSize: '22px',
                                            fontWeight: 'bold',
                                            marginBottom: '4px'
                                        }}>{option_title}</p>
                                        <span style={{fontSize: '10px', color: '#dbdbdb'}}>{option_desc}</span>
                                    </div>
                                }
                                      size="small"
                                      headStyle={{color: 'white'}}
                                      bordered={false}
                                      style={{background: "none"}}>
                                    <OptionsComponentFirst
                                        checkedValues={typeof options[0] === 'string' ? item.checkedValues : ''}
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
            }
            else if (query.step === '2') {
                vDOM.push(
                    <div key={Math.random()}>
                        <OptionsComponentSecond
                            parameters={parameters}
                            handleSeriesOptionsData={this.handleSeriesOptionsData}
                            handleOptionsSecond={this.handleOptionsSecond}
                        />
                    </div>
                );
            }
            else if (query.step === '3') {
                vDOM.push(
                    <div key={Math.random()}>
                        <OptionsComponentFourth
                            data={parameters}
                            handleOptionsFourth={this.handleOptionsFourth}
                        />
                    </div>
                );
            }
            else if (query.step === '4') {
                vDOM.push(
                    <div key={Math.random()}>
                        <OptionsComponentFifth
                            data={parameters}
                            handleOptionsFifth={this.handleOptionsFifth}
                        />
                    </div>
                );
            }
            else if (query.step === '5') {
                vDOM.push(
                    <div key={Math.random()}>
                        <OptionsComponentSixth
                            data={parameters}
                            handleOptionsSixth={this.handleOptionsSixth}
                        />
                    </div>
                );
            }
        }
        return <div style={{marginTop: "20px"}}>{vDOM}</div>;
    };
    handleUndoStep1 = async (operateRecord) => {
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        newOperateRecord.sort((a, b) => {
            return b.id - a.id
        });
        let id = newOperateRecord[0].id;
        if (id === 1) {
            if (typeof newOperateRecord[0].values !== 'undefined') {
                newOperateRecord[0].values = [];
            } else if (typeof newOperateRecord[0].isChecked !== 'undefined') {
                newOperateRecord[0].isChecked = false;
            }
            let {parameters, submitData} = this.state;
            let newSubmitData = JSON.parse(JSON.stringify(submitData));
            let newParameters = JSON.parse(JSON.stringify(parameters));
            let themeName = "";
            let stylesFlag = false;
            await this.handleDataIntegration(newOperateRecord, newSubmitData, newParameters);
            for (let i = 0; i < newParameters.length; i++) {
                let {parameters} = newParameters[i];
                for (let j = 0; j < parameters.length; j++) {
                    let {option_title, options} = parameters[j];
                    if (option_title === '主题设定') {
                        for (let k = 0; k < options.length; k++) {
                            let {children_flag, children_title} = options[k];
                            if (children_flag) {
                                themeName = children_title;
                            }
                        }
                    } else if (option_title === '品牌风格' && typeof parameters[j].checkedValues.length <= 0) {
                        stylesFlag = true
                    }
                }
            }
            if (stylesFlag) {
                this.setState({
                    stylesArr: []
                });
            }
            if (themeName !== '') {
                await this.queryThemes({
                    themeName
                });
            } else {
                this.setState({
                    themesArr: []
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
                                let {option_title, option_type, options} = item;
                                if (option_title === newOperateRecord[i].optionTitle && option_type === '单选') {
                                    if (options.length > 0 && typeof options[0] === 'object') {
                                        for (let i = 0; i < options.length; i++) {
                                            options[i].children_flag = false;
                                            options[i].subset_flag = false;
                                        }
                                        for (let k = 0; k < options.length; k++) {
                                            let {children_title} = options[k];
                                            if (children_title === newOperateRecord[i].childrenTitle) {
                                                if (typeof newOperateRecord[i].isChecked !== 'undefined') {
                                                    options[k].children_flag = false;
                                                    options[k].subset_flag = false;
                                                    options[k].checkedValues = [];
                                                } else if (typeof newOperateRecord[i].values !== 'undefined' && newOperateRecord[i].values.length > 0) {
                                                    options[k].children_flag = true;
                                                    options[k].subset_flag = true;
                                                }
                                            }
                                        }
                                    }
                                } else if (option_title === newOperateRecord[i].optionTitle && option_type === '多选') {
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
                    newOperateRecord.sort((a, b) => {
                        return a.id - b.id
                    });
                    this.setState({
                        parameters: newParameters,
                        operateRecord: newOperateRecord
                    }, async () => {
                        console.info(JSON.stringify(this.state.parameters));
                        console.info(JSON.stringify(this.state.operateRecord));
                        let {parameters, submitData} = this.state;
                        let newSubmitData = JSON.parse(JSON.stringify(submitData));
                        let newParameters = JSON.parse(JSON.stringify(parameters));
                        let themeName = "", stylesFlag = false;
                        await this.handleDataIntegration(newOperateRecord, newSubmitData, newParameters);
                        for (let i = 0; i < newParameters.length; i++) {
                            let {parameters} = newParameters[i];
                            for (let j = 0; j < parameters.length; j++) {
                                let {option_title, options} = parameters[j];
                                if (option_title === '主题设定') {
                                    for (let k = 0; k < options.length; k++) {
                                        let {children_flag, children_title} = options[k];
                                        if (children_flag) {
                                            themeName = children_title;
                                        }
                                    }
                                } else if (option_title === '品牌风格' && typeof parameters[j].checkedValues.length <= 0) {
                                    stylesFlag = true
                                }
                            }
                        }
                        if (stylesFlag) {
                            this.setState({
                                stylesArr: []
                            });
                        }
                        if (themeName !== '') {
                            await this.queryThemes({
                                themeName
                            });
                        } else {
                            this.setState({
                                themesArr: []
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
    };
    handleUndoStep2 = async (operateRecord) => {
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        newOperateRecord.sort((a, b) => {
            return b.id - a.id
        });
        let id = newOperateRecord[0].id;
        if (id === 1) {
            if (typeof newOperateRecord[0].seriesId !== 'undefined') {
                newOperateRecord[0].newPicCheck = false;
                let {seriesArr} = this.state;
                let newSeriesArr = JSON.parse(JSON.stringify(seriesArr));
                let parameters = [], rightWidth = 0;
                await this.handleSeriesData1(newOperateRecord, newSeriesArr, parameters, rightWidth);
                this.setState({
                    seriesArr: newSeriesArr,
                    rightWidth,
                    parameters
                }, () => {
                    console.info(`更新:${JSON.stringify(this.state.seriesArr)}`);
                })
            } else {
                if (newOperateRecord[0].type === '主流色'
                    || newOperateRecord[0].type === '点缀色'
                    || newOperateRecord[0].type === '常用色'
                    || newOperateRecord[0].type === '主推面料'
                    || newOperateRecord[0].type === '点缀面料'
                ) {
                    newOperateRecord[0].values = "";
                } else if (newOperateRecord[0].type === '外穿'
                    || newOperateRecord[0].type === '内搭'
                    || newOperateRecord[0].type === '廓形'
                    || newOperateRecord[0].type === '工艺'
                    || newOperateRecord[0].type === '配件') {
                    newOperateRecord[0].values = [];
                }
                let {parameters, submitData} = this.state;
                let newSubmitData = JSON.parse(JSON.stringify(submitData));
                let newParameters = JSON.parse(JSON.stringify(parameters));
                await this.handleSeriesDataIntegration(newOperateRecord, newSubmitData, newParameters);
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
                    if (typeof newOperateRecord[0].seriesId !== 'undefined') {
                        let {seriesArr} = this.state;
                        let newSeriesArr = JSON.parse(JSON.stringify(seriesArr));
                        newSeriesArr.forEach(item => {
                            let {key} = item;
                            if (key === newOperateRecord[i].seriesId) {
                                item.card_info = "card_info";
                                item.picCheck = false;
                                item.card_actions = "card_actions";
                            }
                        });
                        newOperateRecord[i] = newOperateRecord[newOperateRecord.length - 1];
                        newOperateRecord.length--;
                        i--;
                        newOperateRecord.sort((a, b) => {
                            return a.id - b.id
                        });
                        let tmpOperateRecord = newOperateRecord;
                        tmpOperateRecord.sort((a, b) => {
                            return b.id - a.id
                        });
                        let tmpSeriesId = '', parameters = [];
                        for (let t = 0; t < tmpOperateRecord.length; t++) {
                            if (typeof tmpOperateRecord[t].seriesId !== 'undefined') {
                                tmpSeriesId = tmpOperateRecord[t].seriesId;
                                break;
                            }
                        }
                        if (tmpSeriesId !== '') {
                            for (let i = 0; i < newSeriesArr.length; i++) {
                                newSeriesArr[i].card_info = "card_info";
                                newSeriesArr[i].picCheck = false;
                                newSeriesArr[i].card_actions = "card_actions";
                            }
                            newSeriesArr.forEach(item => {
                                let {key} = item;
                                if (key === tmpSeriesId) {
                                    item.card_info = "card_infoBefore";
                                    item.picCheck = true;
                                    item.card_actions = "card_actionsBefore";
                                    parameters.push(item);
                                }
                            });
                            this.setState({
                                rightWidth: "260px",
                                parameters,
                                seriesArr: newSeriesArr,
                                operateRecord: newOperateRecord
                            }, async () => {
                                console.info(JSON.stringify(this.state.parameters));
                                console.info(JSON.stringify(this.state.operateRecord));
                                let {parameters, submitData} = this.state;
                                let newSubmitData = JSON.parse(JSON.stringify(submitData));
                                let newParameters = JSON.parse(JSON.stringify(parameters));
                                await this.handleSeriesDataIntegration(newOperateRecord, newSubmitData, newParameters);
                                this.setState({
                                    parameters: newParameters,
                                    submitData: newSubmitData
                                }, () => {
                                    console.info(`更新:${JSON.stringify(this.state.parameters)}`);
                                    console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
                                })
                            });
                        } else {
                            this.setState({
                                seriesArr: newSeriesArr,
                                operateRecord: newOperateRecord
                            }, async () => {
                                console.info(JSON.stringify(this.state.operateRecord));
                                let parameters = [], rightWidth = 0;
                                await this.handleSeriesData1(newOperateRecord, newSeriesArr, parameters, rightWidth);
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
                                if (newOperateRecord[i].type === '主流色') {
                                    let {main_color} = newParameters[i];
                                    for (let j = 0; j < main_color.length; j++) {
                                        main_color[j].card_info = "card_info";
                                        main_color[j].picCheck = false;
                                        main_color[j].card_actions = "card_actions";
                                    }
                                } else if (newOperateRecord[i].type === '点缀色') {
                                    let {embellish_color} = newParameters[i];
                                    for (let j = 0; j < embellish_color.length; j++) {
                                        embellish_color[j].card_info = "card_info";
                                        embellish_color[j].picCheck = false;
                                        embellish_color[j].card_actions = "card_actions";
                                    }
                                } else if (newOperateRecord[i].type === '常用色') {
                                    let {common_color} = newParameters[i];
                                    for (let j = 0; j < common_color.length; j++) {
                                        common_color[j].card_info = "card_info";
                                        common_color[j].picCheck = false;
                                        common_color[j].card_actions = "card_actions";
                                    }
                                } else if (newOperateRecord[i].type === '主推面料') {
                                    let {main_fabric} = newParameters[i];
                                    for (let j = 0; j < main_fabric.length; j++) {
                                        main_fabric[j].card_info = "card_info";
                                        main_fabric[j].picCheck = false;
                                        main_fabric[j].card_actions = "card_actions";
                                    }
                                } else if (newOperateRecord[i].type === '点缀面料') {
                                    let {embellish_fabric} = newParameters[i];
                                    for (let j = 0; j < embellish_fabric.length; j++) {
                                        embellish_fabric[j].card_info = "card_info";
                                        embellish_fabric[j].picCheck = false;
                                        embellish_fabric[j].card_actions = "card_actions";
                                    }
                                } else if (newOperateRecord[i].type === '外穿') {
                                    newParameters[i].wear_outside_values = [];
                                } else if (newOperateRecord[i].type === '内搭') {
                                    newParameters[i].inner_cloth_values = [];
                                } else if (newOperateRecord[i].type === '廓形') {
                                    newParameters[i].silhouette_values = [];
                                } else if (newOperateRecord[i].type === '工艺') {
                                    newParameters[i].craft_values = [];
                                } else if (newOperateRecord[i].type === '配件') {
                                    newParameters[i].mountings_values = [];
                                }
                            }
                        });
                        newOperateRecord[i] = newOperateRecord[newOperateRecord.length - 1];
                        newOperateRecord.length--;
                        i--;
                        newOperateRecord.sort((a, b) => {
                            return a.id - b.id
                        });
                        this.setState({
                            parameters: newParameters,
                            operateRecord: newOperateRecord
                        }, async () => {
                            console.info(JSON.stringify(this.state.parameters));
                            console.info(JSON.stringify(this.state.operateRecord));
                            let {parameters, submitData} = this.state;
                            let newSubmitData = JSON.parse(JSON.stringify(submitData));
                            let newParameters = JSON.parse(JSON.stringify(parameters));
                            await this.handleSeriesDataIntegration(newOperateRecord, newSubmitData, newParameters);
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
    };
    handleUndoStep4 = async (operateRecord) => {
        let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
        newOperateRecord.sort((a, b) => {
            return b.id - a.id
        });
        let id = newOperateRecord[0].id;
        for (let i = 0; i < newOperateRecord.length; i++) {
            if (newOperateRecord[i].id === id) {
                let tempSubmitData = newOperateRecord[i].tempSubmitData;
                let {submitData} = this.state;
                let newSubmitData = JSON.parse(JSON.stringify(submitData));
                if (typeof newOperateRecord[i].tempSubmitData !== 'undefined') {
                    if (newSubmitData.length > 0) {
                        for (let s = 0; s < newSubmitData.length; s++) {
                            let flag = tempSubmitData.some(item => {
                                return item.modelName === newSubmitData[s].modelName
                                    && item.stepName === newSubmitData[s].stepName
                                    && item.series_name === newSubmitData[s].series_name
                                    && item.dress_style === newSubmitData[s].dress_style
                                    && item.silhouette === newSubmitData[s].silhouette
                                    && item.craft === newSubmitData[s].craft
                                    && item.mountings === newSubmitData[s].mountings
                                    && item.style === newSubmitData[s].style
                                    && item.theme_name === newSubmitData[s].theme_name
                                    && item.name === newSubmitData[s].name
                            });
                            if (flag) {
                                newSubmitData[s] = newSubmitData[newSubmitData.length - 1];
                                newSubmitData.length--;
                                s--;
                            }
                        }
                    }
                }
                newOperateRecord[i] = newOperateRecord[newOperateRecord.length - 1];
                newOperateRecord.length--;
                i--;
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                this.setState({
                    submitData: newSubmitData,
                    operateRecord: newOperateRecord
                }, async () => {
                    //循环处理
                    let {kxsjArr, kxsjDesginArr, parameters, submitData} = this.state;
                    let newSubmitData = JSON.parse(JSON.stringify(submitData));
                    let newKxsjArr = JSON.parse(JSON.stringify(kxsjArr));
                    let newKxsjDesginArr = JSON.parse(JSON.stringify(kxsjDesginArr));
                    let newParameters = JSON.parse(JSON.stringify(parameters));
                    await this.handleKxsjDataIntegration(newOperateRecord, newKxsjArr, newKxsjDesginArr, newSubmitData, newParameters);
                    this.setState({
                        kxsjArr: newKxsjArr,
                        kxsjDesginArr: newKxsjDesginArr,
                        parameters: newParameters,
                        submitData: newSubmitData
                    });
                })
            }
        }
    };
    handleUndo = async () => {
        let {operateRecord} = this.state;
        let query = this.props.location.query;
        if (operateRecord.length > 0) {
            if (query.step === '1') {
                await this.handleUndoStep1(operateRecord);
            } else if (query.step === '2') {
                await this.handleUndoStep2(operateRecord);
            } else if (query.step === '3') {
                // await this.handleUndoStep4(operateRecord);
            } else if (query.step === '4') {

            } else if (query.step === '5') {

            }
        }
    };
    handleRedo = () => {
        let {operateRecord, operateRecordPre} = this.state;
        console.info(JSON.stringify(operateRecordPre))
        let newOperateRecord = [], themeName = "", stylesFlag = false;
        let query = this.props.location.query;
        if (operateRecord.length > 0) {
            newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
            newOperateRecord.sort((a, b) => {
                return b.id - a.id
            });
            let id = newOperateRecord[0].id;
            let arr = operateRecordPre.filter(item => {
                return item.id === (id + 1);
            });
            newOperateRecord = newOperateRecord.concat(arr);
        } else {
            operateRecordPre.sort((a, b) => {
                return a.id - b.id
            });
            newOperateRecord.concat(operateRecordPre[0]);
        }
        console.info(JSON.stringify(newOperateRecord));
        if (query.step === '1') {
            newOperateRecord.sort((a, b) => {
                return a.id - b.id
            });
            this.setState({
                operateRecord: newOperateRecord
            }, async () => {
                console.info(JSON.stringify(this.state.operateRecord));
                let {parameters, submitData} = this.state;
                let newSubmitData = JSON.parse(JSON.stringify(submitData));
                let newParameters = JSON.parse(JSON.stringify(parameters));
                await this.handleDataIntegration(newOperateRecord, newSubmitData, newParameters);
                for (let i = 0; i < newParameters.length; i++) {
                    let {parameters} = newParameters[i];
                    for (let j = 0; j < parameters.length; j++) {
                        let {option_title, options} = parameters[j];
                        if (option_title === '主题设定') {
                            for (let k = 0; k < options.length; k++) {
                                let {children_flag, children_title} = options[k];
                                if (children_flag) {
                                    themeName = children_title;
                                }
                            }
                        } else if (option_title === '品牌风格' && typeof parameters[j].checkedValues.length <= 0) {
                            stylesFlag = true
                        }
                    }
                }
                if (stylesFlag) {
                    this.setState({
                        stylesArr: []
                    });
                }
                if (themeName !== '') {
                    await this.queryThemes({
                        themeName
                    });
                } else {
                    this.setState({
                        themesArr: []
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
        else if (query.step === '2') {
            newOperateRecord.sort((a, b) => {
                return a.id - b.id
            });
            this.setState({
                operateRecord: newOperateRecord
            }, async () => {
                console.info(JSON.stringify(this.state.operateRecord));
                let newOperateRecord = JSON.parse(JSON.stringify(this.state.operateRecord));
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                for (let i = 0; i < newOperateRecord.length; i++) {
                    if (typeof newOperateRecord[i].seriesId !== 'undefined') {
                        let {seriesArr} = this.state;
                        let newSeriesArr = JSON.parse(JSON.stringify(seriesArr));
                        newSeriesArr.forEach(item => {
                            let {key} = item;
                            if (key === newOperateRecord[i].seriesId) {
                                item.card_info = "card_info";
                                item.picCheck = false;
                                item.card_actions = "card_actions";
                            }
                        });
                        let tmpOperateRecord = newOperateRecord;
                        tmpOperateRecord.sort((a, b) => {
                            return b.id - a.id
                        });
                        let tmpSeriesId = '', parameters = [];
                        for (let t = 0; t < tmpOperateRecord.length; t++) {
                            if (typeof tmpOperateRecord[t].seriesId !== 'undefined') {
                                tmpSeriesId = tmpOperateRecord[t].seriesId;
                                break;
                            }
                        }
                        console.info(tmpSeriesId)
                        if (tmpSeriesId !== '') {
                            for (let i = 0; i < newSeriesArr.length; i++) {
                                newSeriesArr[i].card_info = "card_info";
                                newSeriesArr[i].picCheck = false;
                                newSeriesArr[i].card_actions = "card_actions";
                            }
                            newSeriesArr.forEach(item => {
                                let {key} = item;
                                if (key === tmpSeriesId) {
                                    item.card_info = "card_infoBefore";
                                    item.picCheck = true;
                                    item.card_actions = "card_actionsBefore";
                                    parameters.push(item);
                                }
                            });
                            console.info(JSON.stringify(newSeriesArr))
                            this.setState({
                                rightWidth: "260px",
                                parameters,
                                seriesArr: newSeriesArr,
                                operateRecord: newOperateRecord
                            }, async () => {
                                console.info(JSON.stringify(this.state.parameters));
                                console.info(JSON.stringify(this.state.operateRecord));
                                let {parameters, submitData} = this.state;
                                let newSubmitData = JSON.parse(JSON.stringify(submitData));
                                let newParameters = JSON.parse(JSON.stringify(parameters));
                                await this.handleSeriesDataIntegration(newOperateRecord, newSubmitData, newParameters);
                                this.setState({
                                    parameters: newParameters,
                                    submitData: newSubmitData
                                }, () => {
                                    console.info(`更新:${JSON.stringify(this.state.parameters)}`);
                                    console.info(`submitData:${JSON.stringify(this.state.submitData)}`);
                                })
                            });
                        }
                    } else {
                        let {parameters, submitData} = this.state;
                        let newSubmitData = JSON.parse(JSON.stringify(submitData));
                        let newParameters = JSON.parse(JSON.stringify(parameters));
                        await this.handleSeriesDataIntegration(newOperateRecord, newSubmitData, newParameters);
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
    handleSaveStep =async () => {
        let query = this.props.location.query;
        if (query.step === '3') {
            let {parameters, submitData, operateRecord, kxsjArr} = this.state;
            let newParameters = JSON.parse(JSON.stringify(parameters));
            let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
            if (newOperateRecord.length <= 0) {
                newOperateRecord.push({
                    id: 1, tempSubmitData: submitData
                })
            } else {
                newOperateRecord.sort((a, b) => {
                    return b.id - a.id
                });
                let id = newOperateRecord[0].id;
                newOperateRecord.push({
                    id: id + 1, tempSubmitData: submitData
                });
            }
            let newKxsjArr = JSON.parse(JSON.stringify(kxsjArr));
            for (let i = 0; i < newKxsjArr.length; i++) {
                let {dressStyleArr} = newKxsjArr[i];
                for (let j = 0; j < dressStyleArr.length; j++) {
                    let {designData} = dressStyleArr[j];
                    for (let k = 0; k < designData.length; k++) {
                        designData[k].card_info = "card_info";
                        designData[k].picCheck = false;
                        designData[k].card_actions = "card_actions";
                    }
                }
            }
            for (let i = 0; i < newParameters.length; i++) {
                let {parameters} = newParameters[i];
                parameters.forEach(item => {
                    item.values = 0;
                })
            }
            await this.saveKxsj();
            this.setState({
                parameters: newParameters, kxsjArr: newKxsjArr,
                operateRecord: newOperateRecord,
                operateRecordPre: newOperateRecord
            }, () => {
                console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            });
        }
        else if (query.step === '4') {
            let {parameters, submitData, operateRecord, jgxsjArr} = this.state;
            let newParameters = JSON.parse(JSON.stringify(parameters));
            let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
            if (newOperateRecord.length <= 0) {
                newOperateRecord.push({
                    id: 1, tempSubmitData: submitData
                })
            } else {
                newOperateRecord.sort((a, b) => {
                    return b.id - a.id
                });
                let id = newOperateRecord[0].id;
                newOperateRecord.push({
                    id: id + 1, tempSubmitData: submitData
                });
            }
            let newJgxsjArr = JSON.parse(JSON.stringify(jgxsjArr));
            for (let i = 0; i < newJgxsjArr.length; i++) {
                let {dressStyleArr} = newJgxsjArr[i];
                for (let j = 0; j < dressStyleArr.length; j++) {
                    let {designData} = dressStyleArr[j];
                    for (let k = 0; k < designData.length; k++) {
                        designData[k].card_info = "card_info";
                        designData[k].picCheck = false;
                        designData[k].card_actions = "card_actions";
                    }
                }
            }
            for (let i = 0; i < newParameters.length; i++) {
                let {parameters} = newParameters[i];
                parameters.forEach(item => {
                    if (typeof item.options !== 'undefined' && typeof item.options[0] === 'object') {
                        item.options.forEach(c => {
                            c.values = 0;
                        });
                    }
                    item.values = 'values';
                })
            }
            await this.saveJgxsj();
            this.setState({
                parameters: newParameters, jgxsjArr: newJgxsjArr,
                operateRecord: newOperateRecord,
                operateRecordPre: newOperateRecord
            }, () => {
                console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            });
        }
        else if (query.step === '5') {
            let {parameters, submitData, operateRecord, xjsjArr} = this.state;
            let newParameters = JSON.parse(JSON.stringify(parameters));
            let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
            if (newOperateRecord.length <= 0) {
                newOperateRecord.push({
                    id: 1, tempSubmitData: submitData
                })
            } else {
                newOperateRecord.sort((a, b) => {
                    return b.id - a.id
                });
                let id = newOperateRecord[0].id;
                newOperateRecord.push({
                    id: id + 1, tempSubmitData: submitData
                });
            }
            let newXjsjArr = JSON.parse(JSON.stringify(xjsjArr));
            for (let i = 0; i < newXjsjArr.length; i++) {
                let {dressStyleArr} = newXjsjArr[i];
                for (let j = 0; j < dressStyleArr.length; j++) {
                    let {designData} = dressStyleArr[j];
                    for (let k = 0; k < designData.length; k++) {
                        designData[k].card_info = "card_info";
                        designData[k].picCheck = false;
                        designData[k].card_actions = "card_actions";
                    }
                }
            }
            for (let i = 0; i < newParameters.length; i++) {
                let {parameters} = newParameters[i];
                parameters.forEach(item => {
                    if (typeof item.options !== 'undefined' && typeof item.options[0] === 'object') {
                        item.options.forEach(c => {
                            c.values = 0;
                        });
                    }
                    item.values = 'values';
                })
            }
            await this.saveXjsj();
            this.setState({
                parameters: newParameters, xjsjArr: newXjsjArr,
                operateRecord: newOperateRecord,
                operateRecordPre: newOperateRecord
            }, () => {
                console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
            });
        }
    };
    handleExecute = () => {
        let query = this.props.location.query;
        let {submitData} = this.state;
        if (submitData.length > 0) {
            if (query.step === '1') {
                let {parameters, themesArr, stylesArr, submitData, operateRecordPre} = this.state;
                this.saveStepJSON({
                    step: query.step,
                    modelName: query.modelName,
                    data: {
                        parameters,
                        themesArr,
                        stylesArr,
                        submitData,
                        operateRecordPre,
                        themeName: this.state.themeName,
                        step: query.step,
                        modelName: query.modelName
                    }
                });
                let themeName = '';
                submitData.forEach(item => {
                    let {parameters} = item;
                    if (parameters.length > 0) {
                        parameters.forEach(cur => {
                            let {optionTitle} = cur;
                            if (optionTitle === '主题设定') {
                                if (typeof cur.childrenTitle !== 'undefined' && cur.childrenTitle !== '') {
                                    themeName = cur.childrenTitle
                                }
                            }
                        });
                    }
                });
                if (themeName !== '') {
                    this.setState({
                        checkStep: "2",
                        parameters: [],
                        themesArr: [],
                        stylesArr: [],
                        submitData: [],
                        operateRecord: [],
                        operateRecordPre: []
                    });
                    router.push(`/follow?modelName=${query.modelName || ''}&step=2&themeName=${themeName}`);
                    this.querySeries({
                        themeName
                    });
                }
            }
            else if (query.step === '2') {
                const {seriesArr, submitData, operateRecordPre} = this.state;
                this.saveStepJSON({
                    step: query.step,
                    modelName: query.modelName,
                    data: {
                        seriesArr,
                        submitData,
                        operateRecordPre,
                        themeName: query.themeName,
                        step: query.step,
                        modelName: query.modelName
                    }
                });
                let themeName = "", seriesNameArr = [];
                themeName = submitData[0].themeName;
                submitData.forEach(item => {
                    let {seriesName} = item;
                    if (seriesNameArr <= 0) {
                        seriesNameArr.push(seriesName);
                    } else {
                        let seriesNameFlag = seriesNameArr.some(item => {
                            return item === seriesName
                        });
                        if (!seriesNameFlag) {
                            seriesNameArr.push(seriesName);
                        }
                    }
                });
                let subArr = [];
                if (seriesNameArr.length > 0) {
                    for (let i = 0; i < seriesNameArr.length; i++) {
                        let cur = seriesNameArr[i];
                        let dressStyleArr = [], silhouetteArr = [], craftArr = [], mountingsArr = [];
                        for (let j = 0; j < submitData.length; j++) {
                            let {seriesName, type, values} = submitData[j];
                            if (cur === seriesName) {
                                if (typeof values === 'object' && values.length > 0) {
                                    if (type === '外穿' || type === '内搭') {
                                        values.forEach(v => {
                                            if (dressStyleArr.length > 0) {
                                                let flag = dressStyleArr.some(item => {
                                                    return item === v
                                                });
                                                if (!flag) {
                                                    dressStyleArr.push(v);
                                                }
                                            } else {
                                                dressStyleArr.push(v)
                                            }
                                        });
                                    } else if (type === '廓形') {
                                        values.forEach(v => {
                                            if (silhouetteArr.length > 0) {
                                                let flag = silhouetteArr.some(item => {
                                                    return item === v
                                                });
                                                if (!flag) {
                                                    silhouetteArr.push(v);
                                                }
                                            } else {
                                                silhouetteArr.push(v)
                                            }
                                        });
                                    } else if (type === '工艺') {
                                        values.forEach(v => {
                                            if (craftArr.length > 0) {
                                                let flag = craftArr.some(item => {
                                                    return item === v
                                                });
                                                if (!flag) {
                                                    craftArr.push(v);
                                                }
                                            } else {
                                                craftArr.push(v)
                                            }
                                        });
                                    } else if (type === '配件') {
                                        values.forEach(v => {
                                            if (mountingsArr.length > 0) {
                                                let flag = mountingsArr.some(item => {
                                                    return item === v
                                                });
                                                if (!flag) {
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
                            seriesName: cur,
                            dressStyleArr: dressStyleArr || [],
                            silhouetteArr: silhouetteArr || [],
                            craftArr: craftArr || [],
                            mountingsArr: mountingsArr || []
                        })
                    }
                }
                console.info(JSON.stringify(subArr));
                if (subArr.length > 0) {
                    this.setState({
                        checkStep: "3",
                        rightWidth: 0,
                        parameters: [],
                        themesArr: [],
                        stylesArr: [],
                        seriesArr: [],
                        submitData: [],
                        operateRecord: [],
                        operateRecordPre: [],
                    });
                    router.push(`/follow?modelName=${query.modelName || ''}&step=3&themeName=${themeName}`);
                    this.queryKxsj({
                        paramArr: subArr
                    });
                    this.queryParameters({
                        stepKey: "3",
                        modelName: query.modelName
                    });
                }
            }
            else if (query.step === '3') {
                const {parameters, kxsjArr, kxsjDesginArr, submitData, operateRecordPre} = this.state;
                this.saveStepJSON({
                    step: query.step,
                    modelName: query.modelName,
                    data: {
                        kxsjArr,
                        kxsjDesginArr,
                        parameters,
                        submitData,
                        operateRecordPre,
                        themeName: query.themeName,
                        seriesName: query.seriesName,
                        step: query.step,
                        modelName: query.modelName
                    }
                });
                this.setState({
                    checkStep: "4",
                    parameters: [],
                    themesArr: [],
                    stylesArr: [],
                    seriesArr: [],
                    submitData: [],
                    operateRecord: [],
                    operateRecordPre: [],
                    kxsjArr: [],
                    kxsjDesginArr: [],
                    tempKxsjName: ''
                });
                let themeName = "";
                themeName = submitData[0].theme_name;
                this.queryJgxsj();
                router.push(`/follow?modelName=${query.modelName || ''}&step=4&themeName=${themeName}`);
                this.queryParameters({
                    stepKey: "4",
                    modelName: query.modelName
                });
            }
            else if (query.step === '4') {
                const {parameters, jgxsjArr, jgxsjDesginArr, submitData, operateRecordPre} = this.state;
                this.saveStepJSON({
                    step: query.step,
                    modelName: query.modelName,
                    data: {
                        jgxsjArr,
                        jgxsjDesginArr,
                        parameters,
                        submitData,
                        operateRecordPre,
                        themeName: query.themeName,
                        seriesName: query.seriesName,
                        step: query.step,
                        modelName: query.modelName
                    }
                });
                this.setState({
                    checkStep: "5",
                    parameters: [],
                    themesArr: [],
                    stylesArr: [],
                    seriesArr: [],
                    submitData: [],
                    operateRecord: [],
                    operateRecordPre: [],
                    kxsjArr: [],
                    kxsjDesginArr: [],
                    tempKxsjName: '',
                    jgxsjArr: [],
                    jgxsjDesginArr: [],
                    tempJgxsjName: '',
                });
                let themeName = "";
                themeName = submitData[0].theme_name;
                this.queryXjsj();
                router.push(`/follow?modelName=${query.modelName || ''}&step=5&themeName=${themeName}`);
                this.queryParameters({
                    stepKey: "5",
                    modelName: query.modelName
                });
            }
            else if (query.step === '5') {
                const {parameters, xjsjArr, xjsjDesginArr, submitData, operateRecordPre} = this.state;
                this.saveStepJSON({
                    step: query.step,
                    modelName: query.modelName,
                    data: {
                        xjsjArr,
                        xjsjDesginArr,
                        parameters,
                        submitData,
                        operateRecordPre,
                        themeName: query.themeName,
                        seriesName: query.seriesName,
                        step: query.step,
                        modelName: query.modelName
                    }
                });
                this.setState({
                    checkStep: "6",
                    parameters: [],
                    themesArr: [],
                    stylesArr: [],
                    seriesArr: [],
                    submitData: [],
                    operateRecord: [],
                    operateRecordPre: [],
                    kxsjArr: [],
                    kxsjDesginArr: [],
                    tempKxsjName: '',
                    jgxsjArr: [],
                    jgxsjDesginArr: [],
                    tempJgxsjName: '',
                    xjsjArr: [],
                    xjsjDesginArr: [],
                    tempXjsjName: ''
                });
                let themeName = "";
                themeName = submitData[0].theme_name;
                router.push(`/follow?modelName=${query.modelName || ''}&step=6&themeName=${themeName}`);
            }
            else if (query.step === '6') {
                this.setState({rightWidth: 0})
            }
        }
    };
    renderMainContent() {
        let vDOM = [];
        let {themesArr, stylesArr} = this.state;
        if (themesArr.length <= 0 && stylesArr.length > 0) {
            let vDOM_1 = [];
            stylesArr.forEach(item => {
                let {img_path, style_type} = item;
                vDOM_1.push(
                    <Col key={Math.random()} span={6.5} order={2}
                         style={{paddingTop: '5px', paddingBottom: '5px', height: '350px'}}>
                        <img style={{width: '100%', height: '100%'}} src={img_path} alt=""/>
                        <p style={{
                            textAlign: "center",
                            marginTop: "10px"
                        }}>{style_type}</p>
                    </Col>
                );
            });
            vDOM.push(<div key={Math.random()}>
                <h3 style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    padding: '20px',
                    fontSize: "20px"
                }}>风格分析</h3>
                <Row type="flex" justify="space-around"
                     style={{marginBottom: '20px', marginTop: '20px'}}>
                    {vDOM_1}
                </Row>
            </div>);
        } else if (themesArr.length > 0 && stylesArr.length <= 0) {
            themesArr.forEach((item, index) => {
                let {children_name, children_img, children_desc} = item;
                if (index === 0) {
                    vDOM.push(
                        <div key={Math.random()}>
                            <h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '20px',
                                fontSize: "20px"
                            }}>主题: {children_name}</h3>
                            <div style={{width: '100%', padding: '20px'}}>
                                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                            </div>
                            <p style={{marginTop: '20px', fontSize: "20px"}}>{children_desc}</p>
                        </div>
                    );
                } else if (index === 1) {
                    vDOM.push(
                        <div key={Math.random()}>
                            <h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '20px',
                                fontSize: "20px"
                            }}>{children_name}</h3>
                            <div className={sty.colorWrapper}>
                                <div style={{width: '100%', padding: '20px'}}>
                                    <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                                </div>
                            </div>
                            <p style={{marginTop: '20px', fontSize: "20px"}}>{children_desc}</p>
                        </div>
                    );
                } else {
                    vDOM.push(
                        <div key={Math.random()}>
                            <h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '20px',
                                fontSize: "20px"
                            }}>{children_name}</h3>
                            <div style={{width: '100%', padding: '20px'}}>
                                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                            </div>
                            <p style={{marginTop: '20px', fontSize: "20px"}}>{children_desc}</p>
                        </div>
                    );
                }
            });
        } else if (themesArr.length > 0 && stylesArr.length > 0) {
            themesArr.forEach((item, index) => {
                let {children_name, children_img, children_desc} = item;
                if (index === 0) {
                    vDOM.push(
                        <div key={Math.random()}>
                            <h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '20px',
                                fontSize: "20px"
                            }}>主题: {children_name}</h3>
                            <div style={{width: '100%', padding: '20px'}}>
                                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                            </div>
                            <p style={{marginTop: '20px', fontSize: "20px"}}>{children_desc}</p>
                        </div>
                    );
                } else if (index === 1) {
                    vDOM.push(
                        <div key={Math.random()}>
                            <h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '20px',
                                fontSize: "20px"
                            }}>{children_name}</h3>
                            <div className={sty.colorWrapper}>
                                <div style={{width: '100%', padding: '20px'}}>
                                    <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                                </div>
                            </div>
                            <p style={{marginTop: '20px', fontSize: "20px"}}>{children_desc}</p>
                        </div>
                    );
                } else {
                    vDOM.push(
                        <div key={Math.random()}>
                            <h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '20px',
                                fontSize: "20px"
                            }}>{children_name}</h3>
                            <div style={{width: '100%', padding: '20px'}}>
                                <img src={children_img} alt="图片有误" style={{width: '100%'}}/>
                            </div>
                            <p style={{marginTop: '20px', fontSize: "20px"}}>{children_desc}</p>
                        </div>
                    );
                }
            });
            let vDOM_1 = [];
            stylesArr.forEach(item => {
                let {img_path, style_type} = item;
                vDOM_1.push(
                    <Col key={Math.random()} span={6.5} order={2}
                         style={{paddingTop: '5px', paddingBottom: '5px', height: '350px'}}>
                        <img style={{width: '100%', height: '100%'}} src={img_path} alt=""/>
                        <p style={{
                            textAlign: "center",
                            marginTop: "10px"
                        }}>{style_type}</p>
                    </Col>
                );
            });
            vDOM.push(<div key={Math.random()}>
                <h3 style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    padding: '20px',
                    fontSize: "20px"
                }}>风格分析</h3>
                <Row type="flex" justify="space-around"
                     style={{marginBottom: '20px', marginTop: '20px'}}>
                    {vDOM_1}
                </Row>
            </div>);
        }
        return <div className={sty.themeWrapper}>{vDOM}</div>;
    };
    renderSeriesDom() {
        let vDOM = [];
        let {seriesArr} = this.state;
        if (seriesArr.length > 0) {
            seriesArr.forEach(item => {
                let {key, card_info, card_actions, picCheck, series_name, img_path} = item;
                vDOM.push(
                    <Col key={key} style={{marginLeft: '40px', marginTop: '10px'}}>
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
                height: `${document.body.clientHeight - 180}px`
            }}><Row type="flex">{vDOM}</Row></div>;
        } else {
            return vDOM;
        }
    };
    handleDesignData = (item, newPicCheck, newCardInfo, newCardActions, flag) => {
        let query = this.props.location.query;
        if (query.step === '3') {
            if (parseInt(flag) === 1) {
                let {kxsjArr, kxsjDesginArr, parameters, operateRecord, submitData} = this.state;
                let {theme_name, series_name, dress_style, silhouette} = item;
                let tempKxsjName = "";
                if (submitData.length <= 0) {
                    tempKxsjName = `${silhouette}_K1`;
                } else {
                    let flag = submitData.some(item => {
                        return item.silhouette === silhouette
                    });
                    if (flag) {
                        submitData.forEach(item => {
                            let {name} = item;
                            if (item.silhouette === silhouette) {
                                let index = name.substring(name.length - 1, name.length);
                                tempKxsjName = `${silhouette}_K${parseInt(index) + 1}`;
                            }
                        });
                    } else {
                        tempKxsjName = `${silhouette}_K1`;
                    }
                }
                let newParameters = JSON.parse(JSON.stringify(parameters));
                for (let i = 0; i < newParameters.length; i++) {
                    let {parameters} = newParameters[i];
                    parameters.forEach(item => {
                        item.values = 10;
                    })
                }
                let newKxsjArr = JSON.parse(JSON.stringify(kxsjArr));
                let newKxsjDesginArr = JSON.parse(JSON.stringify(kxsjDesginArr));
                if (newKxsjDesginArr.length > 0) {
                    for (let i = 0; i < newKxsjDesginArr.length; i++) {
                        newKxsjDesginArr[i].card_info = "card_info";
                        newKxsjDesginArr[i].picCheck = false;
                        newKxsjDesginArr[i].card_actions = "card_actions";
                    }
                    this.setState({
                        kxsjDesginArr: newKxsjDesginArr
                    })
                }
                let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
                if (newOperateRecord.length <= 0) {
                    newOperateRecord.push({
                        id: 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    })
                } else {
                    newOperateRecord.sort((a, b) => {
                        return b.id - a.id
                    });
                    let id = newOperateRecord[0].id;
                    newOperateRecord.push({
                        id: id + 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    });
                }
                if (newPicCheck) {
                    if (newKxsjArr.length > 0) {
                        for (let i = 0; i < newKxsjArr.length; i++) {
                            let {dressStyleArr} = newKxsjArr[i];
                            for (let j = 0; j < dressStyleArr.length; j++) {
                                let {designData} = dressStyleArr[j];
                                for (let k = 0; k < designData.length; k++) {
                                    designData[k].card_info = "card_info";
                                    designData[k].picCheck = false;
                                    designData[k].card_actions = "card_actions";
                                }
                            }
                        }
                        for (let i = 0; i < newKxsjArr.length; i++) {
                            let {themeName, seriesName, dressStyleArr} = newKxsjArr[i];
                            if (themeName === theme_name && seriesName === series_name) {
                                for (let j = 0; j < dressStyleArr.length; j++) {
                                    let {dressStyle, designData} = dressStyleArr[j];
                                    if (dressStyle === dress_style) {
                                        for (let k = 0; k < designData.length; k++) {
                                            if (designData[k].silhouette === silhouette) {
                                                designData[k].card_info = newCardInfo;
                                                designData[k].picCheck = newPicCheck;
                                                designData[k].card_actions = newCardActions;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //同时获取右侧条件
                    this.setState({
                        kxsjArr: newKxsjArr,
                        parameters: newParameters,
                        rightWidth: "260px",
                        tempKxsjName
                    }, () => {
                        console.info(JSON.stringify(this.state.kxsjArr))
                        console.info(JSON.stringify(this.state.tempKxsjName))
                    })
                } else {
                    if (newKxsjArr.length > 0) {
                        for (let i = 0; i < newKxsjArr.length; i++) {
                            let {dressStyleArr} = newKxsjArr[i];
                            for (let j = 0; j < dressStyleArr.length; j++) {
                                let {designData} = dressStyleArr[j];
                                for (let k = 0; k < designData.length; k++) {
                                    designData[k].card_info = "card_info";
                                    designData[k].picCheck = false;
                                    designData[k].card_actions = "card_actions";
                                }
                            }
                        }
                    }
                    this.setState({
                        kxsjArr: newKxsjArr,
                        rightWidth: 0,
                        tempKxsjName: ''
                    }, () => {
                        console.info(JSON.stringify(this.state.kxsjArr))
                    })
                }
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                this.setState({
                    operateRecord: newOperateRecord,
                    operateRecordPre: newOperateRecord
                }, () => {
                    console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
                });
            }
            else if (parseInt(flag) === 2) {
                let {kxsjArr, kxsjDesginArr, parameters, operateRecord} = this.state;
                let {theme_name, series_name, dress_style, silhouette,  name, yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang} = item;
                let newParameters = JSON.parse(JSON.stringify(parameters));
                for (let i = 0; i < newParameters.length; i++) {
                    let {parameters} = newParameters[i];
                    parameters.forEach(item => {
                        if (item.option_title === '衣身_长度') {
                            item.values = yishen_changdu;
                        } else if (item.option_title === '衣身_松量') {
                            item.values =  yishen_songliang;
                        } else if (item.option_title === '袖身_长度') {
                            item.values =  xiushen_changdu;
                        } else if (item.option_title === '袖身_松量') {
                            item.values = xiushen_songliang;
                        } else if (item.option_title === '肩型_宽度') {
                            item.values = jianxing_kuandu;
                        } else if (item.option_title === '腰部_腰高') {
                            item.values =yaobu_yaogao;
                        } else if (item.option_title === '腰部_松量') {
                            item.values =yaobu_songliang;
                        }
                    })
                }
                let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
                let newKxsjDesginArr = JSON.parse(JSON.stringify(kxsjDesginArr));
                let newKxsjArr = JSON.parse(JSON.stringify(kxsjArr));
                if (newKxsjArr.length > 0) {
                    for (let i = 0; i < newKxsjArr.length; i++) {
                        let {dressStyleArr} = newKxsjArr[i];
                        for (let j = 0; j < dressStyleArr.length; j++) {
                            let {designData} = dressStyleArr[j];
                            for (let k = 0; k < designData.length; k++) {
                                designData[k].card_info = "card_info";
                                designData[k].picCheck = false;
                                designData[k].card_actions = "card_actions";
                            }
                        }
                    }
                    this.setState({
                        kxsjArr: newKxsjArr
                    });
                }
                if (newOperateRecord.length <= 0) {
                    newOperateRecord.push({
                        id: 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        name,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    })
                } else {
                    newOperateRecord.sort((a, b) => {
                        return b.id - a.id
                    });
                    let id = newOperateRecord[0].id;
                    newOperateRecord.push({
                        id: id + 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        name,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    });
                }
                if (newPicCheck) {
                    if (newKxsjDesginArr.length > 0) {
                        for (let i = 0; i < newKxsjDesginArr.length; i++) {
                            newKxsjDesginArr[i].card_info = "card_info";
                            newKxsjDesginArr[i].picCheck = false;
                            newKxsjDesginArr[i].card_actions = "card_actions";
                        }
                        for (let i = 0; i < newKxsjDesginArr.length; i++) {
                            if (newKxsjDesginArr[i].theme_name === theme_name
                                && newKxsjDesginArr[i].series_name === series_name
                                && newKxsjDesginArr[i].dress_style === dress_style
                                && newKxsjDesginArr[i].silhouette === silhouette
                                && newKxsjDesginArr[i].name === name) {
                                newKxsjDesginArr[i].card_info = newCardInfo;
                                newKxsjDesginArr[i].picCheck = newPicCheck;
                                newKxsjDesginArr[i].card_actions = newCardActions;
                            }
                        }
                    }
                    //同时获取右侧条件
                    this.setState({
                        kxsjDesginArr: newKxsjDesginArr,
                        parameters: newParameters,
                        rightWidth: "260px"
                    }, () => {
                        console.info(JSON.stringify(this.state.kxsjDesginArr))
                    })
                } else {
                    if (newKxsjDesginArr.length > 0) {
                        for (let i = 0; i < newKxsjDesginArr.length; i++) {
                            newKxsjDesginArr[i].card_info = "card_info";
                            newKxsjDesginArr[i].picCheck = false;
                            newKxsjDesginArr[i].card_actions = "card_actions";
                        }
                    }
                    this.setState({
                        kxsjDesginArr: newKxsjDesginArr,
                        rightWidth: 0
                    }, () => {
                        console.info(JSON.stringify(this.state.kxsjDesginArr))
                    })
                }
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                this.setState({
                    operateRecord: newOperateRecord,
                    operateRecordPre: newOperateRecord
                }, () => {
                    console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
                });
            }
        } else if (query.step === '4') {
            if (parseInt(flag) === 1) {
                let {jgxsjArr, jgxsjDesginArr, parameters, operateRecord, submitData} = this.state;
                let {theme_name, series_name, dress_style, silhouette, name} = item;
                let tempJgxsjName = "";
                if (submitData.length <= 0) {
                    tempJgxsjName = `${name}_J1`;
                } else {
                    console.info(JSON.stringify(submitData));
                    let flag = submitData.some(item => {
                        return item.silhouette === silhouette
                    });
                    if (flag) {
                        submitData.forEach(item => {
                            if (item.silhouette === silhouette) {
                                let index = item.name.substring(item.name.length - 1, item.name.length);
                                let newName = item.name.substring(0, item.name.length - 1);
                                tempJgxsjName = `${newName}${parseInt(index) + 1}`;
                            }
                        });
                    } else {
                        tempJgxsjName = `${name}_J1`;
                    }
                }
                console.info(tempJgxsjName)
                let newParameters = JSON.parse(JSON.stringify(parameters));
                for (let i = 0; i < newParameters.length; i++) {
                    let {parameters} = newParameters[i];
                    parameters.forEach(item => {
                        let {options} = item;
                        item.values = "";
                        if (options.length > 0 && typeof options[0] === 'object') {
                            options.forEach(cur => {
                                cur.values = 0;
                            });
                        }
                    })
                }
                let newJgxsjArr = JSON.parse(JSON.stringify(jgxsjArr));
                let newJgxsjDesginArr = JSON.parse(JSON.stringify(jgxsjDesginArr));
                if (newJgxsjDesginArr.length > 0) {
                    for (let i = 0; i < newJgxsjDesginArr.length; i++) {
                        newJgxsjDesginArr[i].card_info = "card_info";
                        newJgxsjDesginArr[i].picCheck = false;
                        newJgxsjDesginArr[i].card_actions = "card_actions";
                    }
                    this.setState({
                        jgxsjDesginArr: newJgxsjDesginArr
                    })
                }
                let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
                if (newOperateRecord.length <= 0) {
                    newOperateRecord.push({
                        id: 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    })
                } else {
                    newOperateRecord.sort((a, b) => {
                        return b.id - a.id
                    });
                    let id = newOperateRecord[0].id;
                    newOperateRecord.push({
                        id: id + 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    });
                }
                if (newPicCheck) {
                    if (newJgxsjArr.length > 0) {
                        for (let i = 0; i < newJgxsjArr.length; i++) {
                            let {dressStyleArr} = newJgxsjArr[i];
                            for (let j = 0; j < dressStyleArr.length; j++) {
                                let {designData} = dressStyleArr[j];
                                for (let k = 0; k < designData.length; k++) {
                                    designData[k].card_info = "card_info";
                                    designData[k].picCheck = false;
                                    designData[k].card_actions = "card_actions";
                                }
                            }
                        }
                        for (let i = 0; i < newJgxsjArr.length; i++) {
                            let {themeName, seriesName, dressStyleArr} = newJgxsjArr[i];
                            if (themeName === theme_name && seriesName === series_name) {
                                for (let j = 0; j < dressStyleArr.length; j++) {
                                    let {dressStyle, designData} = dressStyleArr[j];
                                    if (dressStyle === dress_style) {
                                        for (let k = 0; k < designData.length; k++) {
                                            if (designData[k].silhouette === silhouette && designData[k].name === name) {
                                                designData[k].card_info = newCardInfo;
                                                designData[k].picCheck = newPicCheck;
                                                designData[k].card_actions = newCardActions;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //同时获取右侧条件
                    this.setState({
                        jgxsjArr: newJgxsjArr,
                        parameters: newParameters,
                        rightWidth: "260px",
                        tempJgxsjName
                    }, () => {
                        console.info(JSON.stringify(this.state.jgxsjArr))
                        console.info(JSON.stringify(this.state.tempJgxsjName))
                    })
                } else {
                    if (newJgxsjArr.length > 0) {
                        for (let i = 0; i < newJgxsjArr.length; i++) {
                            let {dressStyleArr} = newJgxsjArr[i];
                            for (let j = 0; j < dressStyleArr.length; j++) {
                                let {designData} = dressStyleArr[j];
                                for (let k = 0; k < designData.length; k++) {
                                    designData[k].card_info = "card_info";
                                    designData[k].picCheck = false;
                                    designData[k].card_actions = "card_actions";
                                }
                            }
                        }
                    }
                    this.setState({
                        jgxsjArr: newJgxsjArr,
                        rightWidth: 0,
                        tempJgxsjName
                    }, () => {
                        console.info(JSON.stringify(this.state.jgxsjArr))
                    })
                }
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                this.setState({
                    operateRecord: newOperateRecord,
                    operateRecordPre: newOperateRecord
                }, () => {
                    console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
                });
            }
            else if (parseInt(flag) === 2) {
                let {jgxsjArr, jgxsjDesginArr, parameters, operateRecord} = this.state;
                let {theme_name, series_name, dress_style, silhouette, name, lingxing,jianxing,xiuxing,menjin,koudai} = item;
                console.info(koudai)
                let newParameters = JSON.parse(JSON.stringify(parameters));
                for (let i = 0; i < newParameters.length; i++) {
                    let {parameters} = newParameters[i];
                    parameters.forEach(item => {
                        if (item.option_title === "领型") {
                            item.values = lingxing;
                        } else if (item.option_title === "肩型") {
                            item.values = jianxing;
                        } else if (item.option_title === "袖型") {
                            item.values = xiuxing;
                        } else if (item.option_title === "门襟") {
                            item.values = menjin;
                        } else if (item.option_title === "口袋") {
                            item.values = koudai;
                        }
                    })
                }
                console.info(JSON.stringify(newParameters));
                let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
                let newJgxsjDesginArr = JSON.parse(JSON.stringify(jgxsjDesginArr));
                let newJgxsjArr = JSON.parse(JSON.stringify(jgxsjArr));
                if (newJgxsjArr.length > 0) {
                    for (let i = 0; i < newJgxsjArr.length; i++) {
                        let {dressStyleArr} = newJgxsjArr[i];
                        for (let j = 0; j < dressStyleArr.length; j++) {
                            let {designData} = dressStyleArr[j];
                            for (let k = 0; k < designData.length; k++) {
                                designData[k].card_info = "card_info";
                                designData[k].picCheck = false;
                                designData[k].card_actions = "card_actions";
                            }
                        }
                    }
                    this.setState({
                        jgxsjArr: newJgxsjArr
                    });
                }
                if (newOperateRecord.length <= 0) {
                    newOperateRecord.push({
                        id: 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        name,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    })
                } else {
                    newOperateRecord.sort((a, b) => {
                        return b.id - a.id
                    });
                    let id = newOperateRecord[0].id;
                    newOperateRecord.push({
                        id: id + 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        name,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    });
                }
                if (newPicCheck) {
                    if (newJgxsjDesginArr.length > 0) {
                        for (let i = 0; i < newJgxsjDesginArr.length; i++) {
                            newJgxsjDesginArr[i].card_info = "card_info";
                            newJgxsjDesginArr[i].picCheck = false;
                            newJgxsjDesginArr[i].card_actions = "card_actions";
                        }
                        for (let i = 0; i < newJgxsjDesginArr.length; i++) {
                            if (newJgxsjDesginArr[i].theme_name === theme_name
                                && newJgxsjDesginArr[i].series_name === series_name
                                && newJgxsjDesginArr[i].dress_style === dress_style
                                && newJgxsjDesginArr[i].silhouette === silhouette
                                && newJgxsjDesginArr[i].name === name) {
                                newJgxsjDesginArr[i].card_info = newCardInfo;
                                newJgxsjDesginArr[i].picCheck = newPicCheck;
                                newJgxsjDesginArr[i].card_actions = newCardActions;
                            }
                        }
                    }
                    //同时获取右侧条件
                    this.setState({
                        jgxsjDesginArr: newJgxsjDesginArr,
                        parameters: newParameters,
                        rightWidth: "260px"
                    }, () => {
                        console.info(JSON.stringify(this.state.jgxsjDesginArr))
                    })
                } else {
                    if (newJgxsjDesginArr.length > 0) {
                        for (let i = 0; i < newJgxsjDesginArr.length; i++) {
                            newJgxsjDesginArr[i].card_info = "card_info";
                            newJgxsjDesginArr[i].picCheck = false;
                            newJgxsjDesginArr[i].card_actions = "card_actions";
                        }
                    }
                    this.setState({
                        jgxsjDesginArr: newJgxsjDesginArr,
                        rightWidth: 0
                    }, () => {
                        console.info(JSON.stringify(this.state.jgxsjDesginArr))
                    })
                }
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                this.setState({
                    operateRecord: newOperateRecord,
                    operateRecordPre: newOperateRecord
                }, () => {
                    console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
                });
            }
        } else if (query.step === '5') {
            if (parseInt(flag) === 1) {
                let {xjsjArr, xjsjDesginArr, parameters, operateRecord, submitData} = this.state;
                let {theme_name, series_name, dress_style, silhouette, name} = item;
                let tempXjsjName = "";
                if (submitData.length <= 0) {
                    tempXjsjName = `${name}_X1`;
                } else {
                    console.info(JSON.stringify(submitData));
                    let flag = submitData.some(item => {
                        return item.silhouette === silhouette
                    });
                    if (flag) {
                        submitData.forEach(item => {
                            if (item.silhouette === silhouette) {
                                let index = item.name.substring(item.name.length - 1, item.name.length);
                                let newName = item.name.substring(0, item.name.length - 1);
                                tempXjsjName = `${newName}${parseInt(index) + 1}`;
                            }
                        });
                    } else {
                        tempXjsjName = `${name}_X1`;
                    }
                }
                let newParameters = JSON.parse(JSON.stringify(parameters));
                for (let i = 0; i < newParameters.length; i++) {
                    let {parameters} = newParameters[i];
                    parameters.forEach(item => {
                        let {options} = item;
                        if (options.length > 0 && typeof options[0] !== 'object') {
                            item.values = "";
                        }
                    })
                }
                let newXjsjArr = JSON.parse(JSON.stringify(xjsjArr));
                let newXjsjDesginArr = JSON.parse(JSON.stringify(xjsjDesginArr));
                if (newXjsjDesginArr.length > 0) {
                    for (let i = 0; i < newXjsjDesginArr.length; i++) {
                        newXjsjDesginArr[i].card_info = "card_info";
                        newXjsjDesginArr[i].picCheck = false;
                        newXjsjDesginArr[i].card_actions = "card_actions";
                    }
                    this.setState({
                        xjsjDesginArr: newXjsjDesginArr
                    })
                }
                let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
                if (newOperateRecord.length <= 0) {
                    newOperateRecord.push({
                        id: 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    })
                } else {
                    newOperateRecord.sort((a, b) => {
                        return b.id - a.id
                    });
                    let id = newOperateRecord[0].id;
                    newOperateRecord.push({
                        id: id + 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    });
                }
                if (newPicCheck) {
                    if (newXjsjArr.length > 0) {
                        for (let i = 0; i < newXjsjArr.length; i++) {
                            let {dressStyleArr} = newXjsjArr[i];
                            for (let j = 0; j < dressStyleArr.length; j++) {
                                let {designData} = dressStyleArr[j];
                                for (let k = 0; k < designData.length; k++) {
                                    designData[k].card_info = "card_info";
                                    designData[k].picCheck = false;
                                    designData[k].card_actions = "card_actions";
                                }
                            }
                        }
                        for (let i = 0; i < newXjsjArr.length; i++) {
                            let {themeName, seriesName, dressStyleArr} = newXjsjArr[i];
                            if (themeName === theme_name && seriesName === series_name) {
                                for (let j = 0; j < dressStyleArr.length; j++) {
                                    let {dressStyle, designData} = dressStyleArr[j];
                                    if (dressStyle === dress_style) {
                                        for (let k = 0; k < designData.length; k++) {
                                            if (designData[k].silhouette === silhouette && designData[k].name === name) {
                                                designData[k].card_info = newCardInfo;
                                                designData[k].picCheck = newPicCheck;
                                                designData[k].card_actions = newCardActions;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //同时获取右侧条件
                    this.setState({
                        xjsjArr: newXjsjArr,
                        parameters: newParameters,
                        rightWidth: "260px",
                        tempXjsjName
                    }, () => {
                        console.info(JSON.stringify(this.state.xjsjArr))
                        console.info(JSON.stringify(this.state.tempXjsjName))
                    })
                } else {
                    if (newXjsjArr.length > 0) {
                        for (let i = 0; i < newXjsjArr.length; i++) {
                            let {dressStyleArr} = newXjsjArr[i];
                            for (let j = 0; j < dressStyleArr.length; j++) {
                                let {designData} = dressStyleArr[j];
                                for (let k = 0; k < designData.length; k++) {
                                    designData[k].card_info = "card_info";
                                    designData[k].picCheck = false;
                                    designData[k].card_actions = "card_actions";
                                }
                            }
                        }
                    }
                    this.setState({
                        xjsjArr: newXjsjArr,
                        rightWidth: 0,
                        tempXjsjName
                    }, () => {
                        console.info(JSON.stringify(this.state.xjsjArr))
                    })
                }
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                this.setState({
                    operateRecord: newOperateRecord,
                    operateRecordPre: newOperateRecord
                }, () => {
                    console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
                });
            }
            else if (parseInt(flag) === 2) {
                let {xjsjArr, xjsjDesginArr, parameters, operateRecord} = this.state;
                // console.info(`进来了:${JSON.stringify(item)}`);
                let {theme_name, series_name, dress_style, silhouette, name, zhezhou, niukou, lalian} = item;
                let newParameters = JSON.parse(JSON.stringify(parameters));
                // console.info(`进来了11:${JSON.stringify(newParameters)}`);
                for (let i = 0; i < newParameters.length; i++) {
                    let {parameters} = newParameters[i];
                    parameters.forEach(item => {
                        if (item.option_title === "褶皱") {
                            item.values = zhezhou;
                        } else if (item.option_title === "纽扣") {
                            item.values = niukou;
                        } else if (item.option_title === "拉链") {
                            item.values = lalian;
                        }
                    })
                }
                let newOperateRecord = JSON.parse(JSON.stringify(operateRecord));
                let newXjsjDesginArr = JSON.parse(JSON.stringify(xjsjDesginArr));
                let newXjsjArr = JSON.parse(JSON.stringify(xjsjArr));
                if (newXjsjArr.length > 0) {
                    for (let i = 0; i < newXjsjArr.length; i++) {
                        let {dressStyleArr} = newXjsjArr[i];
                        for (let j = 0; j < dressStyleArr.length; j++) {
                            let {designData} = dressStyleArr[j];
                            for (let k = 0; k < designData.length; k++) {
                                designData[k].card_info = "card_info";
                                designData[k].picCheck = false;
                                designData[k].card_actions = "card_actions";
                            }
                        }
                    }
                    this.setState({
                        xjsjArr: newXjsjArr
                    });
                }
                if (newOperateRecord.length <= 0) {
                    newOperateRecord.push({
                        id: 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        name,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    })
                } else {
                    newOperateRecord.sort((a, b) => {
                        return b.id - a.id
                    });
                    let id = newOperateRecord[0].id;
                    newOperateRecord.push({
                        id: id + 1,
                        theme_name,
                        series_name,
                        dress_style,
                        silhouette,
                        name,
                        newPicCheck,
                        newCardInfo,
                        newCardActions
                    });
                }
                if (newPicCheck) {
                    if (newXjsjDesginArr.length > 0) {
                        for (let i = 0; i < newXjsjDesginArr.length; i++) {
                            newXjsjDesginArr[i].card_info = "card_info";
                            newXjsjDesginArr[i].picCheck = false;
                            newXjsjDesginArr[i].card_actions = "card_actions";
                        }
                        for (let i = 0; i < newXjsjDesginArr.length; i++) {
                            if (newXjsjDesginArr[i].theme_name === theme_name
                                && newXjsjDesginArr[i].series_name === series_name
                                && newXjsjDesginArr[i].dress_style === dress_style
                                && newXjsjDesginArr[i].silhouette === silhouette
                                && newXjsjDesginArr[i].name === name) {
                                newXjsjDesginArr[i].card_info = newCardInfo;
                                newXjsjDesginArr[i].picCheck = newPicCheck;
                                newXjsjDesginArr[i].card_actions = newCardActions;
                            }
                        }
                    }
                    //同时获取右侧条件
                    this.setState({
                        xjsjDesginArr: newXjsjDesginArr,
                        parameters: newParameters,
                        rightWidth: "260px"
                    }, () => {
                        console.info(JSON.stringify(this.state.xjsjDesginArr))
                    })
                } else {
                    if (newXjsjDesginArr.length > 0) {
                        for (let i = 0; i < newXjsjDesginArr.length; i++) {
                            newXjsjDesginArr[i].card_info = "card_info";
                            newXjsjDesginArr[i].picCheck = false;
                            newXjsjDesginArr[i].card_actions = "card_actions";
                        }
                    }
                    this.setState({
                        xjsjDesginArr: newXjsjDesginArr,
                        rightWidth: 0
                    }, () => {
                        console.info(JSON.stringify(this.state.xjsjDesginArr))
                    })
                }
                newOperateRecord.sort((a, b) => {
                    return a.id - b.id
                });
                this.setState({
                    operateRecord: newOperateRecord,
                    operateRecordPre: newOperateRecord
                }, () => {
                    console.info(`operateRecord:${JSON.stringify(this.state.operateRecord)}`);
                });
            }
        }
    };
    renderKxsjCommonDom() {
        let vDOM = [];
        let {kxsjArr, kxsjDesginArr} = this.state;
        if (kxsjArr.length > 0) {
            kxsjArr.forEach((item, i) => {
                let {seriesName, dressStyleArr} = item;
                let dressStyleVDOM = [], designDataVDOM1 = [];
                if (dressStyleArr.length > 0) {
                    dressStyleArr.forEach((cur, index) => {
                        let {dressStyle, designData} = cur;
                        let designDataVDOM = [];
                        if (designData.length > 0) {
                            designData.forEach(c => {
                                let {img_path, silhouette, card_info, card_actions, picCheck} = c;
                                designDataVDOM.push(
                                    <Col key={Math.random()} style={{marginLeft: '40px', marginTop: '10px'}}>
                                        <DesginSingleImgCard
                                            card_info={card_info}
                                            card_actions={card_actions}
                                            picCheck={picCheck}
                                            picAddress={img_path}
                                            data={c}
                                            handleDesignData={this.handleDesignData}
                                            flag="1"
                                        />
                                        <p style={{
                                            textAlign: "center",
                                            marginTop: "10px",
                                            fontSize: "15px",
                                            color: "#ffffff"
                                        }}>{silhouette}</p>
                                    </Col>
                                );
                            });
                        }
                        if (kxsjDesginArr.length > 0) {
                            let silhouetteArr = [];
                            kxsjDesginArr.forEach(item => {
                                let flag = silhouetteArr.some(c => {
                                    return c.silhouette === item.silhouette
                                });
                                if (!flag) {
                                    silhouetteArr.push({
                                        silhouette: item.silhouette,
                                        data: []
                                    })
                                }
                            });
                            if (silhouetteArr.length > 0) {
                                silhouetteArr.forEach(item => {
                                    let arr = kxsjDesginArr.filter(cur => {
                                        return cur.silhouette === item.silhouette
                                    });
                                    if (arr.length > 0) {
                                        item.data = arr;
                                    }
                                });
                                silhouetteArr.forEach(item => {
                                    let {silhouette, data} = item;
                                    let vDOM = [];
                                    data.forEach(c => {
                                        vDOM.push(
                                            <Col key={Math.random()} style={{marginLeft: '40px', marginTop: '10px'}}>
                                                <DesginSingleImgCard
                                                    card_info={c.card_info}
                                                    card_actions={c.card_actions}
                                                    picCheck={c.picCheck}
                                                    picAddress={c.img_path}
                                                    data={c}
                                                    handleDesignData={this.handleDesignData}
                                                    flag="2"
                                                />
                                                <p style={{
                                                    textAlign: "center",
                                                    marginTop: "10px",
                                                    fontSize: "15px",
                                                    color: "#ffffff"
                                                }}>{c.name}</p>
                                            </Col>
                                        );
                                    });
                                    designDataVDOM1.push(
                                        <div key={Math.random()}>
                                            <Row type="flex"><Col style={{
                                                marginLeft: "40px",
                                                marginTop: "115px",
                                                color: "#ffffff",
                                                fontSize: "15px"
                                            }}>{silhouette}</Col>{vDOM}</Row>
                                        </div>
                                    )
                                });
                            }
                        }
                        dressStyleVDOM.push(
                            <Panel header={dressStyle} style={{
                                marginLeft: "15px"
                            }} key={`d_${index + 1}`}>
                                <div style={{
                                    color: "#ffffff",
                                    fontSize: "15px",
                                    marginLeft: "40px",
                                    marginBottom: "20px"
                                }}>基础廓形
                                </div>
                                <Row type="flex">{designDataVDOM}</Row>
                                {
                                    designDataVDOM1.length > 0 &&
                                    <div>
                                        <Divider style={{margin: '0', background: '#585858'}}/>
                                        <div style={{
                                            color: "#ffffff",
                                            fontSize: "15px",
                                            marginLeft: "40px",
                                            marginTop: "10px",
                                            marginBottom: "20px"
                                        }}>廓形设计
                                        </div>
                                        {designDataVDOM1}
                                    </div>
                                }
                            </Panel>);
                    });
                }
                if (i === 0) {
                    vDOM.push(<div key={Math.random()} className={sty.themeWrapper}>
                        <h3 style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            color: 'white',
                            padding: '20px',
                            fontSize: "30px"
                        }}>产品系列: {seriesName}</h3>
                        <Collapse
                            defaultActiveKey={['d_1']}
                            expandIconPosition="right"
                        >{dressStyleVDOM}</Collapse>
                    </div>)
                } else {
                    vDOM.push(<div key={Math.random()} className={sty.themeWrapper} style={{marginTop: "30px"}}>
                        <h3 style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            color: 'white',
                            padding: '20px',
                            fontSize: "30px"
                        }}>产品系列: {seriesName}</h3>
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
    renderJgxsjCommonDom() {
        let vDOM = [];
        let {jgxsjArr, jgxsjDesginArr} = this.state;
        if (jgxsjArr.length > 0) {
            jgxsjArr.forEach((item, i) => {
                let {seriesName, dressStyleArr} = item;
                let dressStyleVDOM = [], designDataVDOM1 = [];
                if (dressStyleArr.length > 0) {
                    dressStyleArr.forEach((cur, index) => {
                        let {dressStyle, designData} = cur;
                        let designDataVDOM = [];
                        if (designData.length > 0) {
                            designData.forEach(c => {
                                let {img_path, name, card_info, card_actions, picCheck} = c;
                                designDataVDOM.push(
                                    <Col key={Math.random()} style={{marginLeft: '40px', marginTop: '10px'}}>
                                        <DesginSingleImgCard
                                            card_info={card_info}
                                            card_actions={card_actions}
                                            picCheck={picCheck}
                                            picAddress={img_path}
                                            data={c}
                                            handleDesignData={this.handleDesignData}
                                            flag="1"
                                        />
                                        <p style={{
                                            textAlign: "center",
                                            marginTop: "10px",
                                            fontSize: "15px",
                                            color: "#ffffff"
                                        }}>{name}</p>
                                    </Col>
                                );
                            });
                        }
                        if (jgxsjDesginArr.length > 0) {
                            let silhouetteArr = [];
                            jgxsjDesginArr.forEach(item => {
                                let flag = silhouetteArr.some(c => {
                                    return c.silhouette === item.silhouette
                                });
                                if (!flag) {
                                    silhouetteArr.push({
                                        silhouette: item.silhouette,
                                        data: []
                                    })
                                }
                            });
                            if (silhouetteArr.length > 0) {
                                silhouetteArr.forEach(item => {
                                    let arr = jgxsjDesginArr.filter(cur => {
                                        return cur.silhouette === item.silhouette
                                    });
                                    if (arr.length > 0) {
                                        item.data = arr;
                                    }
                                });
                                silhouetteArr.forEach(item => {
                                    let {silhouette, data} = item;
                                    let vDOM = [];
                                    data.forEach(c => {
                                        vDOM.push(
                                            <Col key={Math.random()} style={{marginLeft: '40px', marginTop: '10px'}}>
                                                <DesginSingleImgCard
                                                    card_info={c.card_info}
                                                    card_actions={c.card_actions}
                                                    picCheck={c.picCheck}
                                                    picAddress={c.img_path}
                                                    data={c}
                                                    handleDesignData={this.handleDesignData}
                                                    flag="2"
                                                />
                                                <p style={{
                                                    textAlign: "center",
                                                    marginTop: "10px",
                                                    fontSize: "15px",
                                                    color: "#ffffff"
                                                }}>{c.name}</p>
                                            </Col>
                                        );
                                    });
                                    designDataVDOM1.push(
                                        <div key={Math.random()}>
                                            <Row type="flex"><Col style={{
                                                marginLeft: "40px",
                                                marginTop: "115px",
                                                color: "#ffffff",
                                                fontSize: "15px"
                                            }}>{silhouette}</Col>{vDOM}</Row>
                                        </div>
                                    )
                                });
                            }
                        }
                        dressStyleVDOM.push(
                            <Panel header={dressStyle} style={{
                                marginLeft: "15px"
                            }} key={`d_${index + 1}`}>
                                <div style={{
                                    color: "#ffffff",
                                    fontSize: "15px",
                                    marginLeft: "40px",
                                    marginBottom: "20px"
                                }}>款式廓形
                                </div>
                                <Row type="flex">{designDataVDOM}</Row>
                                {
                                    designDataVDOM1.length > 0 &&
                                    <div>
                                        <Divider style={{margin: '0', background: '#585858'}}/>
                                        <div style={{
                                            color: "#ffffff",
                                            fontSize: "15px",
                                            marginLeft: "40px",
                                            marginTop: "10px",
                                            marginBottom: "20px"
                                        }}>结构性设计
                                        </div>
                                        {designDataVDOM1}
                                    </div>
                                }
                            </Panel>);
                    });
                }
                if (i === 0) {
                    vDOM.push(<div key={Math.random()} className={sty.themeWrapper}>
                        <h3 style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            color: 'white',
                            padding: '20px',
                            fontSize: "30px"
                        }}>产品系列: {seriesName}</h3>
                        <Collapse
                            defaultActiveKey={['d_1']}
                            expandIconPosition="right"
                        >{dressStyleVDOM}</Collapse>
                    </div>)
                } else {
                    vDOM.push(<div key={Math.random()} className={sty.themeWrapper} style={{marginTop: "30px"}}>
                        <h3 style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            color: 'white',
                            padding: '20px',
                            fontSize: "30px"
                        }}>产品系列: {seriesName}</h3>
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
    renderXjsjCommonDom() {
        let vDOM = [];
        let {xjsjArr, xjsjDesginArr} = this.state;
        if (xjsjArr.length > 0) {
            xjsjArr.forEach((item, i) => {
                let {seriesName, dressStyleArr} = item;
                let dressStyleVDOM = [], designDataVDOM1 = [];
                if (dressStyleArr.length > 0) {
                    dressStyleArr.forEach((cur, index) => {
                        let {dressStyle, designData} = cur;
                        let designDataVDOM = [];
                        if (designData.length > 0) {
                            designData.forEach(c => {
                                let {img_path, name, card_info, card_actions, picCheck} = c;
                                designDataVDOM.push(
                                    <Col key={Math.random()} style={{marginLeft: '40px', marginTop: '10px'}}>
                                        <DesginSingleImgCard
                                            card_info={card_info}
                                            card_actions={card_actions}
                                            picCheck={picCheck}
                                            picAddress={img_path}
                                            data={c}
                                            handleDesignData={this.handleDesignData}
                                            flag="1"
                                        />
                                        <p style={{
                                            textAlign: "center",
                                            marginTop: "10px",
                                            fontSize: "15px",
                                            color: "#ffffff"
                                        }}>{name}</p>
                                    </Col>
                                );
                            });
                        }
                        if (xjsjDesginArr.length > 0) {
                            let silhouetteArr = [];
                            xjsjDesginArr.forEach(item => {
                                let flag = silhouetteArr.some(c => {
                                    return c.silhouette === item.silhouette
                                });
                                if (!flag) {
                                    silhouetteArr.push({
                                        silhouette: item.silhouette,
                                        data: []
                                    })
                                }
                            });
                            if (silhouetteArr.length > 0) {
                                silhouetteArr.forEach(item => {
                                    let arr = xjsjDesginArr.filter(cur => {
                                        return cur.silhouette === item.silhouette
                                    });
                                    if (arr.length > 0) {
                                        item.data = arr;
                                    }
                                });
                                silhouetteArr.forEach(item => {
                                    let {silhouette, data} = item;
                                    let vDOM = [];
                                    data.forEach(c => {
                                        vDOM.push(
                                            <Col key={Math.random()} style={{marginLeft: '40px', marginTop: '10px'}}>
                                                <DesginSingleImgCard
                                                    card_info={c.card_info}
                                                    card_actions={c.card_actions}
                                                    picCheck={c.picCheck}
                                                    picAddress={c.img_path}
                                                    data={c}
                                                    handleDesignData={this.handleDesignData}
                                                    flag="2"
                                                />
                                                <p style={{
                                                    textAlign: "center",
                                                    marginTop: "10px",
                                                    fontSize: "15px",
                                                    color: "#ffffff"
                                                }}>{c.name}</p>
                                            </Col>
                                        );
                                    });
                                    designDataVDOM1.push(
                                        <div key={Math.random()}>
                                            <Row type="flex"><Col style={{
                                                marginLeft: "40px",
                                                marginTop: "115px",
                                                color: "#ffffff",
                                                fontSize: "15px"
                                            }}>{silhouette}</Col>{vDOM}</Row>
                                        </div>
                                    )
                                });
                            }
                        }
                        dressStyleVDOM.push(
                            <Panel header={dressStyle} style={{
                                marginLeft: "15px"
                            }} key={`d_${index + 1}`}>
                                <div style={{
                                    color: "#ffffff",
                                    fontSize: "15px",
                                    marginLeft: "40px",
                                    marginBottom: "20px"
                                }}>结构性设计
                                </div>
                                <Row type="flex">{designDataVDOM}</Row>
                                {
                                    designDataVDOM1.length > 0 &&
                                    <div>
                                        <Divider style={{margin: '0', background: '#585858'}}/>
                                        <div style={{
                                            color: "#ffffff",
                                            fontSize: "15px",
                                            marginLeft: "40px",
                                            marginTop: "10px",
                                            marginBottom: "20px"
                                        }}>细节设计
                                        </div>
                                        {designDataVDOM1}
                                    </div>
                                }
                            </Panel>);
                    });
                }
                if (i === 0) {
                    vDOM.push(<div key={Math.random()} className={sty.themeWrapper}>
                        <h3 style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            color: 'white',
                            padding: '20px',
                            fontSize: "30px"
                        }}>产品系列: {seriesName}</h3>
                        <Collapse
                            defaultActiveKey={['d_1']}
                            expandIconPosition="right"
                        >{dressStyleVDOM}</Collapse>
                    </div>)
                } else {
                    vDOM.push(<div key={Math.random()} className={sty.themeWrapper} style={{marginTop: "30px"}}>
                        <h3 style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            color: 'white',
                            padding: '20px',
                            fontSize: "30px"
                        }}>产品系列: {seriesName}</h3>
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
                            <div className={style.iconBack}>
                                <LeftOutlined onClick={this.showDrawer} className={style.selecshow}/>
                            </div>
                        }
                        {
                            leftWidth === '10px' &&
                            //下面图标div整个粘贴
                            <div className={style.iconBackRight}>
                                <RightOutlined onClick={this.showUnfold} className={style.showUnfold}/>
                            </div>
                        }
                        <div className={style.leftMain} style={{width: leftWidth}}>
                            {
                                this.state.steps.length > 0 &&
                                this.renderStep()
                            }
                        </div>
                        {leftWidth === '10px' &&
                        <div onClick={this.showUnfold} className={`${style.leftMainSmall} ${style.leftMain}`}
                             style={{width: leftWidth}}/>
                        }
                    </div>
                    <div className={style.mainWrapper} style={{width: mainWidth, marginLeft: leftWidth}}>

                        {
                            this.state.checkStep !== '6' &&
                            <div style={{padding: "24px"}}>
                                {
                                    this.state.operateRecordPre.length > 0 ?
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
                        }
                        {
                            this.state.checkStep === '1' && this.state.themeName && this.state.themesArr.length > 0 ?
                                this.renderMainContent() : this.state.stylesArr.length > 0 ? this.renderMainContent() : ''
                        }
                        {
                            this.state.checkStep === '2' && this.state.seriesArr.length > 0 &&
                            this.renderSeriesDom()
                        }
                        {
                            this.state.checkStep === '3' && this.state.kxsjArr.length > 0 &&
                            <Spin spinning={this.state.loadding}>
                                {this.renderKxsjCommonDom()}
                            </Spin>
                        }
                        {
                            this.state.checkStep === '4' && this.state.jgxsjArr.length > 0 &&
                            <Spin spinning={this.state.loadding}>
                                {this.renderJgxsjCommonDom()}
                            </Spin>
                        }
                        {
                            this.state.checkStep === '5' && this.state.xjsjArr.length > 0 &&
                            <Spin spinning={this.state.loadding}>
                                {this.renderXjsjCommonDom()}
                            </Spin>
                        }
                        {
                            this.state.checkStep === '6' &&
                            <div/>
                        }

                    </div>
                    {
                        this.state.checkStep !== '' && this.state.checkStep !== '6' &&
                        <div>
                            <div className={style.rightWrapper} style={{width: rightWidth}}>
                                {
                                    rightWidth === '260px' &&
                                    <div className={style.righticonBack}>
                                        <RightOutlined className={style.selecRightshow} onClick={this.showRightAway}/>
                                    </div>
                                }
                                {
                                    rightWidth === '10px' &&
                                    <div className={style.righticonBack}>
                                        <LeftOutlined className={style.selecRightLeft} onClick={this.showRightUnfold}/>
                                    </div>
                                }
                                <div className={style.rightMain} style={{width: rightWidth}}>
                                    {
                                        this.state.parameters.length > 0 &&
                                        this.renderParameters()
                                    }
                                </div>
                            </div>
                            {rightWidth === '10px' &&
                            <div onClick={this.showRightUnfold} className={`${style.rightMain} ${style.rightMainSmall}`}
                                 style={{width: rightWidth}}/>}
                        </div>
                    }

                </div>
        );
    };
}

export default ResearchFollow;
