
import 'braft-editor/dist/index.css'
import React, { PureComponent } from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';
import { Upload, Icon} from 'antd'


class BEditor extends PureComponent {
  state = {
    editorState: BraftEditor.createEditorState(null),
    outputHTML: '<p></p>'
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    },()=>{
      console.info(this.state.outputHTML)
    })
  }
  uploadHandler = (param) => {
    if (!param.file) {
      return false
    }
    console.info(ContentUtils);
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [{
        type: 'IMAGE',
        url: URL.createObjectURL
      }])
    })
  }
  render () {

    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        )
      }
    ]

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={this.state.editorState}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )

  }
}
export default BEditor;
