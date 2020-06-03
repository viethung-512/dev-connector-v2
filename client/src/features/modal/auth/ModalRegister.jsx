import React from 'react';
import RegisterForm from '../../auth/Register/RegisterForm';
import ModalBase from './ModalBase';

function ModalLogin(props) {
  return (
    <ModalBase title='Sign Up'>
      <RegisterForm />
    </ModalBase>
  );
}

export default ModalLogin;
