import React from 'react';

import { Avatar, List, Pagination, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { HeartFilled } from '@ant-design/icons';


function ArticleList({tabName, source, loadArticle, currentPage, total}) {
    
    if (tabName === 'Your Feed') {
        return (
            <>
                No articles are here... yet.
            </>
        )
    }

    if (!source) {
        return (
            <>
                Loading...
            </>
        )
    }
    
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
                dataSource={source}
                renderItem={(item, index) => (
                    <List.Item
                        key={index}
                        actions={[
                            <Link to={`/article/${item.slug}`} style={{fontSize:10}}>Read more...</Link>,
                            <ArticleTag article={item} />,
                        ]}
                        extra={
                            <div className={`favorite-button${item.favorited ? ' favorited-article' : ' '+item.favorited}`}>
                                <HeartFilled /> {item.favoritesCount}
                            </div>
                        }
                        >
                        <List.Item.Meta
                        avatar={<Avatar src={item.author.image} />}
                        title={<Link className="user" to="/user">{item.author.username}</Link>}
                        description={new Date(item.createdAt).toDateString()}
                        />
                        <Link className="post-preview" to={`/article/${item.slug}`}>
                            <div className="post-title">{item.title}</div>
                            <div className="post-description">{item.description}</div>
                        </Link>
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                showSizeChanger={false}
                total={total}
                onChange={(page) => {
                    loadArticle(page);
                }}
            />
        </>
    )
}

export default ArticleList;