import React, { useEffect, useState, Fragment } from 'react';
import { Typography, Form, Input, Divider, Space, Button, Select } from 'antd';
import {
  TwitterOutlined,
  FacebookFilled,
  YoutubeFilled,
  LinkedinFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from './profile.actions';
import { closeDrawer } from '../drawer/drawer.actions';
import { actionTypes } from '../../app/utils/config';

const formItemLayout = { labelCol: { span: 1 }, wrapperCol: { span: 23 } };

const { Option } = Select;
const { Text } = Typography;

function ProfileActionForm({ profile }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showSocialNetwork, setShowSocialNetwork] = useState(false);

  const { loading, type } = useSelector(state => state.async);

  useEffect(() => {
    if (profile) {
      const newProfile = profile.social
        ? {
            ...profile,
            twitter: profile.social.twitter,
            facebook: profile.social.facebook,
            youtube: profile.social.youtube,
            linkedin: profile.social.linkedin,
            instagram: profile.social.instagram,
          }
        : { ...profile };

      form.setFieldsValue({ ...newProfile });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const { profile: profileAction } = actionTypes;

  const profileLoading =
    type === profileAction.PROFILE_ACTIONS ? loading : false;

  const handleSubmit = profileInfo => {
    profileInfo.skills = profileInfo.skills.join(', ');
    const social = profile && profile.social ? profile.social : {};
    const updatedProfile = { ...profile, ...social, ...profileInfo };

    if (profile) {
      dispatch(profileActions(updatedProfile, true));
    } else {
      dispatch(profileActions(updatedProfile));
    }
  };

  const handleCancel = () => dispatch(closeDrawer());

  const toggleSocialNetwork = () => setShowSocialNetwork(!showSocialNetwork);

  return (
    <Form form={form} autoComplete='off' onFinish={handleSubmit}>
      <Form.Item
        name='status'
        rules={[{ required: true, message: 'Status is required' }]}
      >
        <Select placeholder='Select Professional Status' allowClear>
          <Option value='Developer'>Developer</Option>
          <Option value='Junior Developer'>Junior Developer</Option>
          <Option value='Senior Developer'>Senior Developer</Option>
          <Option value='Manager'>Manager</Option>
          <Option value='Student or Learning'>Student or Learning</Option>
          <Option value='Instructor'>Instructor</Option>
          <Option value='Intern'>Intern</Option>
          <Option value='Other'>Other</Option>
        </Select>
      </Form.Item>
      <Form.Item name='company'>
        <Input placeholder='Company' />
      </Form.Item>
      <Form.Item name='website'>
        <Input placeholder='Website' />
      </Form.Item>
      <Form.Item name='location'>
        <Input placeholder='Location' />
      </Form.Item>
      <Form.Item
        name='skills'
        rules={[{ required: true, message: 'Skills is required' }]}
      >
        <Select mode='tags' style={{ width: '100%' }} placeholder='Skills' />
      </Form.Item>
      <Form.Item name='githubUsername'>
        <Input placeholder='Github Username' />
      </Form.Item>
      <Form.Item name='bio'>
        <Input.TextArea rows={2} placeholder='A short bio of your self' />
      </Form.Item>
      <Divider />
      <Form.Item>
        <Space>
          <Button onClick={toggleSocialNetwork}>
            Add Social Network Links
          </Button>
          <Text>Optional</Text>
        </Space>
      </Form.Item>
      {showSocialNetwork && (
        <Fragment>
          <Form.Item
            label={<TwitterOutlined />}
            name='twitter'
            {...formItemLayout}
          >
            <Input placeholder='Twitter Url' />
          </Form.Item>
          <Form.Item
            label={<FacebookFilled />}
            name='facebook'
            {...formItemLayout}
          >
            <Input placeholder='Facebook Url' />
          </Form.Item>
          <Form.Item
            label={<YoutubeFilled />}
            name='youtube'
            {...formItemLayout}
          >
            <Input placeholder='Youtube Url' />
          </Form.Item>
          <Form.Item
            label={<LinkedinFilled />}
            name='linkedin'
            {...formItemLayout}
          >
            <Input placeholder='LinkedIn Url' />
          </Form.Item>
          <Form.Item
            label={<InstagramOutlined />}
            name='instagram'
            {...formItemLayout}
          >
            <Input placeholder='Instagram Url' />
          </Form.Item>
        </Fragment>
      )}

      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit' loading={profileLoading}>
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

export default ProfileActionForm;
