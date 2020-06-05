import React from 'react';
import { Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function PreviewImage({ upload, cancel, loading }) {
  return (
    <div className='preview-container'>
      <div
        className='img-preview'
        style={{
          minWidth: '200px',
          minHeight: '200px',
          overflow: 'hidden',
        }}
      />
      <div>
        <Button
          loading={loading}
          className='btn btn--success'
          onClick={upload}
          style={{ width: '100px', borderRadius: 'unset' }}
          icon={<CheckOutlined />}
        />
        <Button
          disabled={loading}
          className='btn btn--danger'
          onClick={cancel}
          style={{ width: '100px', borderRadius: 'unset' }}
          icon={<CloseOutlined />}
        />
      </div>
    </div>
  );
}

export default PreviewImage;
