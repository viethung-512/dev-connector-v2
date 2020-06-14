import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Space, Button, Row, Col, Skeleton } from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  LikeFilled,
  DislikeFilled,
  EditOutlined,
  CalendarOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Image from '../../../../app/layout/common/Image';
import ArticleAuthor from './ArticleAuthor';
import { formatDate } from '../../../../app/utils/helper';
import IconText from '../../../../app/layout/common/IconText';

const { Title, Paragraph, Text } = Typography;

function ArticleItem({
  article,
  loading,
  likeArticle,
  dislikeArticle,
  deleteArticle,
  likeLoading,
  dislikeLoading,
  deleteLoading,
  likeCount,
  dislikeCount,
  commentCount,
  isLiked,
  isDisliked,
  isAuth,
}) {
  return (
    <Card
      bordered
      hoverable
      className='article-item'
      bodyStyle={{ width: 'inherit', padding: 12 }}
      headStyle={
        global.window.innerWidth < 450
          ? {
              paddingLeft: 8,
              paddingRight: 8,
            }
          : null
      }
      actions={
        isAuth
          ? [
              <Link to={`/blog/edit/${article._id}`} style={{ width: '100%' }}>
                <Button type='link' icon={<EditOutlined />} />
              </Link>,
              <Button
                style={{ width: '100%' }}
                type='link'
                danger
                icon={<DeleteOutlined />}
                loading={deleteLoading}
                onClick={deleteArticle}
              />,
            ]
          : []
      }
      extra={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={{ marginRight: 32 }}>
            <IconText icon={CalendarOutlined} text={formatDate(article.date)} />{' '}
            | <IconText icon={EyeOutlined} text={article.views} />
          </Text>
          <ArticleAuthor author={article.user} isAuth={isAuth} sty />
        </div>
      }
    >
      <Row gutter={[12, 12]} style={{ marginBottom: 0 }}>
        <Col xs={24} sm={24} md={8} lg={7} xl={6}>
          <div className='article-item__main-photo'>
            <Image
              src={article.mainPhoto}
              className='article-item__main-photo-img'
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={16} lg={17} xl={18}>
          <div className='article-item__container'>
            <Skeleton
              active
              loading={loading}
              title={{ width: '50%' }}
              paragraph={{ rows: 1, width: '100%' }}
            >
              <div className='article-item__container-header'>
                <Link to={`/blog/${article._id}`}>
                  <Title level={4}>{article.title}</Title>
                </Link>
                <Paragraph>{article.shortDescription}</Paragraph>
              </div>
            </Skeleton>
            <div className='article-item__container-content'>
              <Space>
                <Button
                  type='link'
                  icon={isLiked ? <LikeFilled /> : <LikeOutlined />}
                  loading={likeLoading}
                  onClick={likeArticle}
                  disabled={isLiked}
                >
                  {' '}
                  {likeCount}
                </Button>
                <Button
                  type='link'
                  icon={isDisliked ? <DislikeFilled /> : <DislikeOutlined />}
                  loading={dislikeLoading}
                  onClick={dislikeArticle}
                  disabled={isDisliked}
                >
                  {' '}
                  {dislikeCount}
                </Button>
                <Link to={`/blog/${article._id}`}>
                  <Button type='link' icon={<CommentOutlined />}>
                    {' '}
                    {commentCount}
                  </Button>
                </Link>
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default ArticleItem;
