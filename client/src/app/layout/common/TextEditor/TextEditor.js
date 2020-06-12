import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from './ImageResize';
import { Video } from './quill-video-resize';
import './quill-video-resize.css';

Quill.register('modules/imageResize', ImageResize);
Quill.register({ 'formats/video': Video });

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
  history: {
    delay: 1000,
    maxStack: 50,
    userOnly: false,
  },
  imageResize: {
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white',
    },
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
  },
};
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const TextEditor = ({ handleChange, text, clearContent, quillRef }) => {
  useEffect(() => {
    quillRef.current.focus();

    return () => {
      clearContent();
    };
  }, []);

  return (
    <ReactQuill
      value={text}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder={'Enter new content here...'}
      ref={quillRef}
      style={{ height: '300px' }}
    />
  );
};

export default TextEditor;
