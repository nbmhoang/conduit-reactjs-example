import React, { useEffect } from 'react';
import { Row, Col, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import ArticleList from '../ArticleList';
import PopularTagPane from './PopularTagPane';
import agent from '../../agent';


import {
  APPLY_TAG_FILTER,
  CHANGE_PAGE,
  LOAD_ARTICLE,
  HOME_PAGE_UNLOADED
} from '../../constants/action';


export default function MainLayout() {

    const { TabPane } = Tabs;

    const { articles, tag, selectedTab, page, size, articlesCount, popularTag } = useSelector(state => state);
    const dispatch = useDispatch();

    const loadArticle = async(page, tag) => {
      dispatch({ type: CHANGE_PAGE, payload: await agent.Articles.all(page, size, tag), page : page});
    }

    const filterArticleByTag = async(tag) => {
      const tagValue = tag.item;
      dispatch({ type: APPLY_TAG_FILTER, payload: await agent.Articles.byTag(tagValue), tag: tagValue});
    }

    useEffect(() => {
      return () => {
        dispatch({ type: HOME_PAGE_UNLOADED })
      }
    }, []);

    return (
        <Row>
          <Col span={18}>
            <Row>
              <Col span={18} offset={6}>
                <Tabs defaultActiveKey="global" activeKey={selectedTab} onTabClick={() => {}}>
                  <TabPane tab="Global Feed" key="global">
                   <ArticleList source={articles} loadArticle={loadArticle} page={page} tag={''} total={articlesCount}/>
                  </TabPane>
                  <TabPane tab={tag} key="some-tag">
                    <ArticleList source={articles} loadArticle={loadArticle} page={page} tag={tag} total={articlesCount}/>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
              {popularTag ? <PopularTagPane tags={popularTag} filterArticleByTag={filterArticleByTag} selectedTag={tag.slice(1)}/> : "There are no popular tag!"}
          </Col>
        </Row>
    )
}