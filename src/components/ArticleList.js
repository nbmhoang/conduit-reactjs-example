import React from 'react';

import dayjs from 'dayjs';
import { Avatar, List, Pagination } from 'antd';

import { HeartOutlined } from '@ant-design/icons';


function ArticleList({source, loadArticle, page, tag}) {
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={source.articles}
                renderItem={(item, index) => (
                    <List.Item
                        key={index}
                        actions={[
                            <span style={{fontSize:10}}>Read more...</span>,    
                        ]}
                        extra={
                            <HeartOutlined />
                        }
                        >
                        <List.Item.Meta
                        avatar={<Avatar src={item.author.image} />}
                        title={<a className="user" href="#">{item.author.username}</a>}
                        description={dayjs(item.createdAt).format('ddd MMM DD YYYY')}
                        />
                        <div className="post-preview">
                            <div className="post-title">{item.title}</div>
                            <div>{item.description}</div>
                        </div>
                    </List.Item>
                )}
            />
            <Pagination
                current={page}
                showSizeChanger={false}
                total={source.articlesCount}
                onChange={(page) => {
                    loadArticle(page, tag);
                }}
            />
        </>
    )
}

export default ArticleList;