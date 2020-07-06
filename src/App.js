import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Menu, Layout, Row, Col, Tabs } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios';

import ArticleList from './components/ArticleList';
import TagList from './components/TagList';

const { Header, Footer } = Layout;
const { TabPane } = Tabs;

axios.defaults.baseURL = 'https://conduit.productionready.io';

const App = () => {
  const [article, setArticle] = useState([]);
  const [tag, setTag] = useState('');
  const [tab, setTab] = useState('global');
  const [tagList, setTagList] = useState([]);
  const [page, setPage] = useState(1);
    
  const loadArticle = (page, tag) => {
    setPage(page);
    console.log(`/api/articles?offset=${page-1}&limit=10&tag=${tag}`);
    axios.get(`/api/articles?offset=${page-1}&limit=10&tag=${tag}`).then(res => {
      const result = res.data;
      console.log(result);
      setArticle(result);
    }).catch(err => {
      console.log(err);
    });
  }
  
  const newTab = (anyTag) => {
    setTag(`#${anyTag}`);
    setTab('some-tag');
    loadArticle(1, anyTag);
  }

  const removeTab = (key, event) => {
    setTag('');
    setTab('global');
    loadArticle(1, '');
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

  return (
    <div>
      <Layout>
        <Header>
          <div className="logo" />Conduit
          <Menu mode="horizontal" style={{float: "right"}}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Sign in</Menu.Item>
            <Menu.Item key="3">Sign up</Menu.Item>
          </Menu>
        </Header>
        <div id="banner">
          <div className="website-name">conduit</div>
          <div className="website-description">A place to share your knowledge.</div>
        </div>
        <Row>
          <Col span={18}>
            <Row>
              <Col span={6}>
              </Col>
              <Col span={18}>
                <Tabs defaultActiveKey="global" activeKey={tab} onTabClick={(k, e) => removeTab(k, e)}>
                  <TabPane tab="Global Feed" key="global">
                    <ArticleList source={article} loadArticle={loadArticle} page={page} tag={''}/>
                  </TabPane>
                  <TabPane tab={tag} key="some-tag">
                    <ArticleList source={article} loadArticle={loadArticle} page={page} tag={tag}/>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
              <TagList tags={tagList} viewArticleByTag={newTab}/>
          </Col>
        </Row>
        <Footer>
          <h3>Fork on Github</h3>
        </Footer>
      </Layout>
    </div>
  );
};

export default App;

render(<App />, document.getElementById('root'));