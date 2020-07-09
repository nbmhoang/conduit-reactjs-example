import React, { useEffect } from 'react';
import { Row, Col, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import ArticleList from '../ArticleList';
import PopularTagPane from './PopularTagPane';


import {
  APPLY_TAG_FILTER,
  LOAD_ARTICLE,
  LOAD_HOME_PAGE,
  LOAD_POPULAR_TAG,
  CLICK_ON_TAB,
  LOAD_TAB
} from '../../constants/action';


export default function MainLayout() {

    const { TabPane } = Tabs;

    const { articles, tag, page, size, articlesCount, popularTag, panes, selectedTab } = useSelector(state => state.home);
    const { isLoggedIn } = useSelector(state => state.user);
    const dispatch = useDispatch();
    // let panes = ['Your Feed', 'Global Feed', '#sfa']

    const changePage = (page) => {
      dispatch({ type: LOAD_ARTICLE, page: page, tag: tag });
    }

    const filterArticleByTag = (tag) => {
      const tagValue = tag.item;
      // console.log(tagValue);
      
      dispatch({ type: APPLY_TAG_FILTER, payload: tagValue});
    }

    const changeTab = (key, event) => {
      dispatch({ type: CLICK_ON_TAB, payload: key}) 
    }

    useEffect(() => {
      console.log('Logged in?',isLoggedIn);
      
      if (!isLoggedIn) {
        dispatch({ type: LOAD_HOME_PAGE });
      } else {
        dispatch({ type: LOAD_TAB })
      }
      dispatch({ type: LOAD_POPULAR_TAG });
      
      return () => {
        dispatch({ type: "RESET" })
      }
    }, []);

    return (
        <Row className="container">
          <Col span={18}>
            <Row>
              <Col span={18} offset={6}>
                <Tabs defaultActiveKey={panes[0]} activeKey={selectedTab} onTabClick={(k, e) => changeTab(k, e)}>
                  {panes.map(pane => {
                    return (
                      <TabPane tab={pane} key={pane}>
                        <ArticleList tabName={pane} source={articles} loadArticle={changePage} currentPage={page} total={articlesCount}/>
                      </TabPane>    
                    )
                  })}
                </Tabs>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
              {popularTag ? <PopularTagPane tags={popularTag} filterArticleByTag={filterArticleByTag} selectedTag={tag}/> : "There are no popular tag!"}
          </Col>
        </Row>
    )
}

/*
<TabPane tab="Your Feed" key="your">
                    No articles are here... yet.
                  </TabPane>
                  <TabPane tab="Global Feed" key="global">
                   <ArticleList source={articles} loadArticle={changePage} currentPage={page} total={articlesCount}/>
                  </TabPane>
                  <TabPane tab={tag} key="some-tag">
                    <ArticleList source={articles} loadArticle={changePage} currentPage={page} total={articlesCount}/>
                  </TabPane>
                  */