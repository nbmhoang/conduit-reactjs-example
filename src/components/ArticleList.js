import React from 'react';

import dayjs from 'dayjs';
import { Avatar, List, Pagination, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { HeartFilled } from '@ant-design/icons';


function ArticleList({source, loadArticle, page, tag}) {
    const ArticleTag = (article) => {
        return (
            article.article.tagList.map(tag => {       
                return (
                    <Tag className="article-tag">{tag}</Tag>
                )
            })
        )  
    }

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
                            <ArticleTag article={item} />,
                        ]}
                        extra={
                            <>
                                <div className="favorite-button">
                                    <HeartFilled /> {item.favoritesCount}
                                </div>
                            </>
                        }
                        >
                        <List.Item.Meta
                        avatar={<Avatar src={item.author.image} />}
                        title={<Link className="user" to="/user">{item.author.username}</Link>}
                        description={dayjs(item.createdAt).format('ddd MMM DD YYYY')}
                        />
                        <Link className="post-preview" to={`/article/${item.slug}`}>
                            <div className="post-title">{item.title}</div>
                            <div className="post-description">{item.description}</div>
                        </Link>
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