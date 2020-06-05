import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input, DatePicker, Space, Checkbox } from 'antd';
import { addExperience } from './profile.actions';
import { closeModal } from '../modal/modal.actions';
import { validateMessage } from '../../app/utils/config';

const requiredRule = {
  required: true,
  message: validateMessage.REQUIRED_EXIST,
};

function ExperienceForm(props) {
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    state.async.type === 'addExperience' ? state.async.loading : false
  );
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(false);

  const handleCurrentChange = e => setCurrent(e.target.checked);

  const handleCancel = () => dispatch(closeModal());

  const handleSubmit = experience => {
    if (experience.from) {
      experience.from = experience.from.format('YYYY-MM-DD');
    }
    if (experience.to) {
      experience.to = experience.to.format('YYYY-MM-DD');
    }
    dispatch(addExperience(experience));
  };

  return (
    <Form form={form} onFinish={handleSubmit} autoComplete='off'>
      <Form.Item name='title' rules={[requiredRule]}>
        <Input placeholder='Job Title' />
      </Form.Item>
      <Form.Item name='company' rules={[requiredRule]}>
        <Input placeholder='Company' />
      </Form.Item>
      <Form.Item name='location'>
        <Input placeholder='Location' />
      </Form.Item>
      <Form.Item name='from' rules={[requiredRule]}>
        <DatePicker style={{ width: '100%' }} placeholder='From Date' />
      </Form.Item>
      <Form.Item name='current' valuePropName='checked'>
        <Checkbox onChange={handleCurrentChange}>Current Job</Checkbox>
      </Form.Item>
      <Form.Item name='to'>
        <DatePicker
          style={{ width: '100%' }}
          placeholder='To Date'
          disabled={current}
        />
      </Form.Item>
      <Form.Item name='description'>
        <Input.TextArea rows={3} placeholder='Job Description' />
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

export default ExperienceForm;
