import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { openModal } from '../../modal/modal.actions';
import { login } from '../auth.actions';
import { asyncActionClear } from '../../async/async.actions';
import { actionTypes } from '../../../app/utils/config';

import LoadingButton from '../../../app/layout/common/loading/LoadingButton';

const { Text } = Typography;

function LoginForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  const { errors } = useSelector(state => state.async);

  useEffect(() => {
    dispatch(asyncActionClear());

    return () => {
      dispatch(asyncActionClear());
    };

    // eslint-disable-next-line
  }, []);

  const { auth: authAction, profile: profileAction } = actionTypes;

  const handleSubmit = values => {
    const userCredentials = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(userCredentials, history));
  };
  const signUp = () => dispatch(openModal('Register'));

  return (
    <Form form={form} onFinish={handleSubmit} autoComplete='off'>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Your email address' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Password is required' }]}
        style={errors ? { marginBottom: 12 } : null}
      >
        <Input.Password prefix={<LockOutlined />} placeholder='Your password' />
      </Form.Item>
      {errors && (
        <Form.Item style={{ marginBottom: 12, textAlign: 'center' }}>
          <Text type='danger'>{errors.general.msg}</Text>
        </Form.Item>
      )}
      <Form.Item>
        <LoadingButton
          loadingTypes={[authAction.LOGIN, profileAction.GET_PROFILE]}
          type='primary'
          style={{ width: '100%' }}
          htmlType='submit'
        >
          Login
        </LoadingButton>
      </Form.Item>
      <Form.Item>
        <Text
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Don't have an account?
          <Button type='link' onClick={signUp}>
            Sign Up
          </Button>
        </Text>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
