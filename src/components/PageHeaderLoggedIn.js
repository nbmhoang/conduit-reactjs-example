import React, { useEffect } from 'react';
import { Avatar, Layout, Menu, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {SettingFilled, EditFilled} from '@ant-design/icons';

import {
    LOAD_CURRENT_USER
} from '../constants/action';

export default function PageHeaderLoggedIn() {
    const { Header } = Layout;

    const { image, username } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: LOAD_CURRENT_USER });
    }, []);

    return (
        <Row>
            <Col span={12} offset={6}>
            <Header>
                <Link to="/">
                    <div className="logo" />Conduit
                </Link>
                <Menu mode="horizontal" style={{float: "right"}}>
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="newpost">
                        <Link to="/newpost"><EditFilled />New Post</Link>
                    </Menu.Item>
                    <Menu.Item key="setting">
                        <Link to="/setting"><SettingFilled />Setting</Link>
                    </Menu.Item>
                    <Menu.Item key="x">
                        <Link to={`/@${username}`}>
                            <Avatar src={image} />
                            {username}
                        </Link>
                    </Menu.Item>
                </Menu>
                </Header>
            
            </Col>
        </Row>
    )
}