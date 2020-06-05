import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography } from 'antd';
import { openModal } from '../../modal/modal.actions';
import { register } from '../auth.actions';
import { asyncActionClear } from '../../async/async.actions';

const { Text } = Typography;

function RegisterForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const { loading, errors } = useSelector(state => state.async);

  useEffect(() => {
    dispatch(asyncActionClear());

    return () => {
      dispatch(asyncActionClear());
    };

    // eslint-disable-next-line
  }, []);

  const validateConfirmPassword = (rule, value) => {
    const currentPassword = form.getFieldValue('password');

    if (value !== currentPassword) {
      return Promise.reject("Password doesn't match");
    }

    return Promise.resolve();
  };
  const handleSubmit = userCredentials =>
    dispatch(register(userCredentials, history));
  const login = () => dispatch(openModal('Login'));

  return (
    <Form form={form} onFinish={handleSubmit} autoComplete='off'>
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input placeholder='Known as' />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input placeholder='Your email address' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Password is required' },
          {
            min: 6,
            message: 'Please enter a password with at least 6 character',
          },
        ]}
      >
        <Input.Password placeholder='Your password' />
      </Form.Item>
      <Form.Item
        name='confirmPassword'
        rules={[{ validator: validateConfirmPassword }]}
        style={errors ? { marginBottom: 12 } : null}
      >
        <Input.Password placeholder='Re-enter your password' />
      </Form.Item>
      {errors && (
        <Form.Item style={{ marginBottom: 12, textAlign: 'center' }}>
          <Text type='danger'>{errors.general.msg}</Text>
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type='primary'
          style={{ width: '100%' }}
          htmlType='submit'
          loading={loading}
        >
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <Text
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Already have an account?
          <Button type='link' onClick={login}>
            Sign In
          </Button>
        </Text>
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
