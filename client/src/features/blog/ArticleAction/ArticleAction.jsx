import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { Form, Input, Upload, Button, Space, Spin, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextEditor from '../../../app/layout/common/TextEditor/TextEditor';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticleById,
  clearArticle,
  updateArticle,
  createArticle,
} from '../article.actions';
import { actionTypes } from '../../../app/utils/config';
import { LoadingIcon } from '../../../app/layout/common/Icons';
import shortid from 'shortid';

const { Title } = Typography;

function ArticleAction(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const quillRef = useRef(null);
  const currentArticle = useSelector(state => state.blog.current);
  const { loading, type } = useSelector(state => state.async);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState('');

  const { articleId } = params;

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleById(articleId));
    }

    return () => {
      form.resetFields();
      handleClearContent();
      dispatch(clearArticle());
    };

    // eslint-disable-next-line
  }, [articleId]);

  useEffect(() => {
    if (currentArticle) {
      const image = {
        uid: shortid.generate(),
        status: 'done',
        url: currentArticle.mainPhoto,
      };
      form.setFieldsValue({ ...currentArticle, image });
      setContent(currentArticle.content);
      setFileList([...fileList, image]);
    }

    // eslint-disable-next-line
  }, [currentArticle]);

  const handleSubmit = values => {
    if (articleId && currentArticle) {
      const updatedArticle = {
        ...currentArticle,
        ...values,
        content,
      };
      dispatch(updateArticle(updatedArticle, history));
    } else {
      const newArticle = {
        ...values,
        content: content,
      };
      dispatch(createArticle(newArticle, history));
    }
  };

  const handleEditorChange = content => setContent(content);

  const handleImageChange = e => {
    e.file.status = 'done';
    setFileList([e.file]);
  };

  const handleCancel = () => history.goBack();

  const handleClearContent = () =>
    quillRef.current.setEditorContents(quillRef.current.editor, '');

  const contentValidator = (rule, value) => {
    if (!content) {
      return Promise.reject('Please enter the content');
    }

    return Promise.resolve();
  };

  const getArticleLoading =
    type === actionTypes.blog.GET_ARTICLE ? loading : false;
  const createUpdateArticleLoading =
    type === actionTypes.blog.CREATE_UPDATE_ARTICLE ? loading : false;

  return (
    <Spin indicator={LoadingIcon} spinning={getArticleLoading}>
      <Title className='primary article-actions__title'>
        {articleId && currentArticle
          ? `Edit article ${currentArticle.title}`
          : 'Create new article'}
      </Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          rules={[{ required: true, message: 'Title is required' }]}
          name='title'
        >
          <Input placeholder='Article title' />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Short description is required' }]}
          name='shortDescription'
        >
          <Input placeholder='Article Description' />
        </Form.Item>
        <Form.Item
          name='image'
          rules={[
            {
              required: true,
              message: 'Please choose main image for your article',
            },
          ]}
        >
          <Upload
            defaultFileList={[]}
            fileList={fileList}
            onChange={handleImageChange}
            listType='picture-card'
            customRequest={() => {}}
            disabled={articleId ? fileList.length > 1 : fileList.length > 0}
          >
            <UploadOutlined />
          </Upload>
        </Form.Item>
        <Form.Item name='content' rules={[{ validator: contentValidator }]}>
          <TextEditor
            text={content}
            handleChange={handleEditorChange}
            quillRef={quillRef}
            clearContent={handleClearContent}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type='primary'
              className='btn btn--success'
              htmlType='submit'
              loading={createUpdateArticleLoading}
            >
              Submit
            </Button>
            <Button
              type='default'
              className='btn btn--default'
              onClick={handleCancel}
            >
              Go back
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default ArticleAction;
