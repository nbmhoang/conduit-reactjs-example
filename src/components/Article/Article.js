import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Col, Row, Tag } from 'antd';
import { Link } from 'react-router-dom';

import PageHeaderLoggedIn from '../PageHeaderLoggedIn';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import CommentBox from './Comment';
import UserComment from './CommentList';
import {
    LOAD_ARTICLE_PAGE,
    LOAD_ARTICLE_COMMENT
} from '../../constants/action';



export default function Article({ match: {params: { id}}}) {

    const { title, avatar, createdAt, body, user, tagList, comments, slug } = useSelector(state => state.article);
    
    const { isLoggedIn } = useSelector(state => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: LOAD_ARTICLE_PAGE, slug: id });
        dispatch({ type: LOAD_ARTICLE_COMMENT, slug: id});
    }, []);

    return (
        <>
        <Row className="article-detail container">
            <Col span={24}>
                <Col>
                    {isLoggedIn ? <PageHeaderLoggedIn /> : <PageHeader />}
                </Col>
                <div className="article-banner">
                    <div className="banner-content">
                    <Col span={12} offset={6}>
                        <div className="article-detail-title">{title}</div>
                        <Avatar className="article-detail-avatar" src={avatar}/>
                        <div style={{display: "inline-block"}}>
                            <div className="article-detail-user">{user}</div>
                            <div className="article-detail-date">{new Date(createdAt).toDateString()}</div>
                        </div>
                    </Col>
                    </div>
                </div>
            </Col>
            <Col span={12} offset={6}>
                <div className="article-content">
                    <div className="article-body">
                        {body}
                    </div>
                    {tagList.map(tag => {
                        return <Tag className="article-detail-tag">{tag}</Tag>
                    })}
                </div>
                <hr />
                {isLoggedIn ? 
                    <Col span={20} offset={2}>
                        <CommentBox slug={slug} />
                        <UserComment slug={slug} commentList={comments} />
                    </Col> : 
                    <Col span={12} offset={4} style={{marginTop: "40px"}}>
                        <Link to='/signin'>Sign in</Link> or <Link to='/signup'>sign up</Link> to add comments on this article.
                    </Col>
                }
                
            </Col>
            <Col span={6}></Col>
            
                
            
        </Row>
        <PageFooter />
        </>
    )
}