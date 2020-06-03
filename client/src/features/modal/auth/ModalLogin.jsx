import React from 'react';
import LoginForm from '../../auth/Login/LoginForm';
import ModalBase from './ModalBase';

function ModalLogin(props) {
  return (
    <ModalBase title='Sign In'>
      <LoginForm />
    </ModalBase>
  );
}

export default ModalLogin;
