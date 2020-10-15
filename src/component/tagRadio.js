// import React, { PureComponent } from "react";
// import { Radio } from 'antd';
//
// const RadioGroup = Radio.Group;
//
// class TagRadio extends PureComponent {
//   renderRadio(){
//     let vDOM = [];
//     let {data,groupName,groupId,classifyId} = this.props;
//     if(groupName.length === 2){
//       vDOM.push(<span key={Math.random()} style={{
//         color: 'rgba(0, 0, 0, 0.85)',
//         display: 'inline-block',
//         width: '45px',
//         marginLeft: '70px'
//       }}>{groupName}:</span>);
//     } else if(groupName.length === 3 || groupName.length === 4){
//       vDOM.push(<span key={Math.random()} style={{
//         color: 'rgba(0, 0, 0, 0.85)',
//         display: 'inline-block',
//         width: '75px',
//         marginLeft: '70px'
//       }}>{groupName}:</span>);
//     } else {
//       vDOM.push(<span key={Math.random()} style={{
//         color: 'rgba(0, 0, 0, 0.85)',
//         display: 'inline-block',
//         width: '100px',
//         marginLeft: '70px'
//       }}>{groupName}:</span>);
//     }
//     let radioCheck='';
//     data.forEach((cur)=>{
//       let {id:tagId,tagName,flag} = cur;
//       if(flag===1){
//         radioCheck = tagId;
//       }
//       vDOM.push(<Radio key={Math.random()} value={tagId}>{tagName}</Radio>,)
//     });
//     return (
//       <RadioGroup onChange={(e)=>{this.handleTagRadioChange(e)}} value={radioCheck}>
//         {vDOM}
//       </RadioGroup>
//     );
//   }
//   handleTagRadioChange=(e)=>{
//     this.props.handleTagRadio(e.target.value);
//   };
//   render() {
//     return (
//       <div>
//         {this.renderRadio()}
//       </div>
//     );
//   }
// }
// export default TagRadio;
