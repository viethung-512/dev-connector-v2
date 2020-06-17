import React from 'react';
import './style.css';
import { Form, Input } from 'antd';
import LoadingButton from '../../app/layout/common/loading/LoadingButton';

function AddItem({ title, placeholder, onSubmit, createLoadingTypes }) {
  const [form] = Form.useForm();

  const handleCreatePost = values => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <div className='add-item'>
      <div className='add-item__title'>{title}</div>
      <Form form={form} onFinish={handleCreatePost}>
        <Form.Item
          name='text'
          rules={[{ required: true, message: 'Please say some thing' }]}
        >
          <Input.TextArea rows={4} placeholder={placeholder} />
        </Form.Item>
        <Form.Item>
          <LoadingButton
            loadingTypes={createLoadingTypes}
            type='default'
            htmlType='submit'
            className='btn btn--dark add-item__submit'
            size='large'
          >
            Submit
          </LoadingButton>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddItem;
