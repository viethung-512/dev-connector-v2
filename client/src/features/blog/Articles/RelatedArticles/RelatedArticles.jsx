import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RelatedArticleItem from './RelatedArticleItem';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const RelatedArticles = ({ articles, deviceType }) => {
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      removeArrowOnDeviceType={['tablet', 'mobile']}
      deviceType={deviceType}
    >
      {articles.map(article => (
        <div
          key={article._id}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <RelatedArticleItem key={article._id} article={article} />
        </div>
      ))}
    </Carousel>
  );
};

export default RelatedArticles;
