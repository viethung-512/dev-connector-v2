import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { Modal, Typography } from 'antd';
import { closeModal } from '../modal.actions';

const { Title, Text } = Typography;

function ModalBase({ title, description, children }) {
  const dispatch = useDispatch();

  const handleCancel = () => dispatch(closeModal());

  const header = (
    <div className='modal-header'>
      <Title level={1} className='modal-title'>
        {title}
      </Title>
      <Text>{description}</Text>
    </div>
  );

  return (
    <Modal
      visible
      onCancel={handleCancel}
      title={header}
      width={700}
      footer={null}
    >
      {children}
    </Modal>
  );
}

export default ModalBase;
