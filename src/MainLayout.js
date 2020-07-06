import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs } from 'antd';
import axios from 'axios';

import ArticleList from './components/ArticleList';
import TagList from './components/TagList';

axios.defaults.baseURL = 'https://conduit.productionready.io';

export default function MainLayout() {

    const { TabPane } = Tabs;

    const [article, setArticle] = useState([]);
    const [tag, setTag] = useState('');
    const [tab, setTab] = useState('global');
    const [tagList, setTagList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const loadArticle = (page, tag) => {
        setPage(page);
        console.log(`/api/articles?offset=${page-1}&limit=10&tag=${tag}`);
        axios.get(`/api/articles?offset=${page-1}&limit=10&tag=${tag}`).then(res => {
            const result = res.data;
            setArticle(result);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        loadArticle(1, "");
        axios.get('/api/tags').then(res => {
            const result = res.data.tags;
            setTagList(result);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const newTab = (anyTag) => {
        setTag(`#${anyTag}`);
        setTab('some-tag');
        loadArticle(1, anyTag);
    }
    
    const removeTab = () => {
        setTag('');
        setTab('global');
        loadArticle(1, '');
    }

    return (
        <Row>
          <Col span={18}>
            <Row>
              <Col span={6}>
              </Col>
              <Col span={18}>
                <Tabs defaultActiveKey="global" activeKey={tab} onTabClick={(k, e) => removeTab()}>
                  <TabPane tab="Global Feed" key="global">
                    {loading ? "Loading..." : <ArticleList source={article} loadArticle={loadArticle} page={page} tag={''}/>}
                  </TabPane>
                  <TabPane tab={tag} key="some-tag">
                    {loading ? "Loading..." : <ArticleList source={article} loadArticle={loadArticle} page={page} tag={tag}/>}
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
              <TagList tags={tagList} viewArticleByTag={newTab}/>
          </Col>
        </Row>
    )
}