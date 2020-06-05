import React, { useCallback } from 'react';
import './style.css';
import { useDropzone } from 'react-dropzone';
import { Typography } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const DropzoneInput = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'dropzone--active' : ''}`}
    >
      <input {...getInputProps()} />
      <Typography.Text style={{ textAlign: 'center' }}>
        <CloudUploadOutlined size={40} className='upload-icon' />
      </Typography.Text>
      <Typography.Title level={4} className='upload-title'>
        Drag image here
      </Typography.Title>
    </div>
  );
};

export default DropzoneInput;
