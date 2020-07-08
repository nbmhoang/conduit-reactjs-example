import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Col, Row, Tag } from 'antd';
import { Link } from 'react-router-dom';

import PageHeader from '../PageHeader';
import {
    LOAD_ARTICLE_PAGE
} from '../../constants/action';


export default function Article({ match, location }) {
    // console.log(match);
    
    const { title, avatar, createdAt, body, user, tagList } = useSelector(state => state.article);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: LOAD_ARTICLE_PAGE, slug: match.params.id });
    }, []);

    return (
        <Row className="article-detail">
            <Col span={24}>
                <Col span={12} offset={6}>
                    <PageHeader />
                </Col>
                <div className="article-banner">
                    <div className="banner-content">
                    <Col span={12} offset={6}>
                        <div className="article-detail-title">{title}</div>
                        <Avatar className="article-detail-avatar" src={avatar}/>
                        <div style={{display: "inline-block"}}>
                            <div className="article-detail-user">{user}</div>
                            <div className="article-detail-date">{createdAt}</div>
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
                <Col span={12} offset={4} style={{marginTop: "40px"}}>
                    <Link to='/signin'>Sign in</Link> or <Link to='/signup'>sign up</Link> to add comments on this article.
                </Col>
            </Col>
        </Row>
    )
}