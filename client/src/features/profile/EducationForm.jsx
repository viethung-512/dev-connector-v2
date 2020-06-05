import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, DatePicker, Space, Button, Checkbox } from 'antd';
import { addEducation } from './profile.actions';
import { closeModal } from '../modal/modal.actions';
import { validateMessage } from '../../app/utils/config';

const requiredRule = {
  required: true,
  message: validateMessage.REQUIRED_EXIST,
};

function EducationForm(props) {
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    state.async.type === 'addEducation' ? state.async.loading : false
  );
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(false);

  const handleCurrentChange = e => setCurrent(e.target.checked);

  const handleCancel = () => dispatch(closeModal());

  const handleSubmit = education => {
    if (education.from) {
      education.from = education.from.format('YYYY-MM-DD');
    }
    if (education.to) {
      education.to = education.to.format('YYYY-MM-DD');
    }
    dispatch(addEducation(education));
  };

  return (
    <Form form={form} onFinish={handleSubmit} autoComplete='off'>
      <Form.Item name='school' rules={[requiredRule]}>
        <Input placeholder='School or Bootcamp' />
      </Form.Item>
      <Form.Item name='degree' rules={[requiredRule]}>
        <Input placeholder='Degree or Certificate' />
      </Form.Item>
      <Form.Item name='fieldOfStudy' rules={[requiredRule]}>
        <Input placeholder='Field Of Study' />
      </Form.Item>
      <Form.Item name='from' rules={[requiredRule]}>
        <DatePicker style={{ width: '100%' }} placeholder='From Date' />
      </Form.Item>
      <Form.Item name='current' valuePropName='checked'>
        <Checkbox onChange={handleCurrentChange}>
          Current School or Bootcamp
        </Checkbox>
      </Form.Item>
      <Form.Item name='to'>
        <DatePicker
          style={{ width: '100%' }}
          placeholder='To Date'
          disabled={current}
        />
      </Form.Item>
      <Form.Item name='description'>
        <Input.TextArea rows={3} placeholder='Program Description' />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
          <Button type='default' onClick={handleCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default EducationForm;
