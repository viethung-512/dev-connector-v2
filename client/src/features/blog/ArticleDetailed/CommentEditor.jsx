import React from 'react';
import { Form, Input } from 'antd';
import LoadingButton from '../../../app/layout/common/loading/LoadingButton';

const { TextArea } = Input;

const CommentEditor = ({ onChange, onSubmit, loadingTypes, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <LoadingButton
        loadingTypes={loadingTypes}
        htmlType='submit'
        onClick={onSubmit}
        type='primary'
      >
        Commend
      </LoadingButton>
    </Form.Item>
  </>
);

export default CommentEditor;
