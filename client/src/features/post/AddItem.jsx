import React from 'react';
import './style.css';
import { Form, Input, Button } from 'antd';

function AddItem({ title, placeholder, onSubmit, loading }) {
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
          <Button
            type='default'
            htmlType='submit'
            className='btn btn--dark add-item__submit'
            size='large'
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddItem;
