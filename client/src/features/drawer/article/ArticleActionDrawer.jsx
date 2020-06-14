import React from 'react';
import DrawerBase from '../profile/DrawerBase';
import ArticleAction from '../../blog/ArticleAction/ArticleAction';

function ArticleActionDrawer(props) {
  return (
    <DrawerBase title='Create article' description='description'>
      <ArticleAction />
    </DrawerBase>
  );
}

export default ArticleActionDrawer;
